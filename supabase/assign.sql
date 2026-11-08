-- Class assignments and exams (#teach → a class → Assignments; learners open #exam/<id>).
-- Run in the Supabase SQL editor after social.sql and xp_catalog.sql. Safe to re-run.
-- Each learner gets their own random set of code tasks from the chosen lessons; the server keeps the start
-- time, refuses answers after the deadline and keeps a log of leaving the page, paste attempts and full-screen exits.
-- Phase 1 limit: whether an answer passed is checked in the browser (phase 2 moves checking to a server).

alter table public.xp_catalog add column if not exists kind text;

create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes (id) on delete cascade,
  title text not null check (char_length(title) between 2 and 80),
  kind text not null check (kind in ('homework', 'exam')),
  lessons text[] not null check (cardinality(lessons) between 1 and 300),
  n integer not null check (n between 1 and 30),
  minutes integer check (minutes is null or minutes between 5 and 300),
  opens_at timestamptz not null default now(),
  due_at timestamptz,
  created_at timestamptz not null default now()
);
create table if not exists public.attempts (
  assignment_id uuid not null references public.assignments (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  tasks text[] not null,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  primary key (assignment_id, user_id)
);
create table if not exists public.answers (
  assignment_id uuid not null,
  user_id uuid not null,
  ex_id text not null,
  ok boolean not null default false,
  code text check (code is null or char_length(code) <= 20000),
  tries integer not null default 1,
  at timestamptz not null default now(),
  primary key (assignment_id, user_id, ex_id),
  foreign key (assignment_id, user_id) references public.attempts on delete cascade
);
create table if not exists public.attempt_events (
  id bigint generated always as identity primary key,
  assignment_id uuid not null,
  user_id uuid not null,
  kind text not null check (kind in ('blur', 'paste', 'copy', 'fs_exit', 'devtools')),
  ms integer,
  at timestamptz not null default now(),
  foreign key (assignment_id, user_id) references public.attempts on delete cascade
);
create index if not exists attempt_events_a on public.attempt_events (assignment_id, at);
alter table public.assignments enable row level security;
alter table public.attempts enable row level security;
alter table public.answers enable row level security;
alter table public.attempt_events enable row level security;
revoke all on public.assignments, public.attempts, public.answers, public.attempt_events from anon, authenticated;

-- Code tasks only: these types are checked automatically and cannot be guessed.
create or replace function public.exam_kinds() returns text[] language sql immutable as $$ select array['sql', 'python', 'java', 'cpp'] $$;

-- When an attempt stops taking answers: the exam's minutes from its start, and the assignment's due time.
create or replace function public.attempt_deadline(a public.assignments, started timestamptz)
returns timestamptz language sql stable as $$
  select least(case when a.minutes is not null then started + make_interval(mins => a.minutes) end, a.due_at);
$$;

-- ---------- teacher ----------
create or replace function public.create_assignment(cid uuid, atitle text, akind text, lesson_ids text[], n integer,
  minutes integer default null, opens timestamptz default null, due timestamptz default null)
returns uuid
language plpgsql security definer set search_path = public as $$
declare bank int; new_id uuid;
begin
  if not exists (select 1 from classes where id = cid and owner = auth.uid()) then raise exception 'not your class'; end if;
  if (select count(*) from assignments where class_id = cid) >= 200 then raise exception 'too many assignments'; end if;
  if akind = 'exam' and minutes is null then raise exception 'exam needs minutes'; end if;
  select count(*) into bank from xp_catalog k where split_part(k.id, '#', 1) = any(lesson_ids) and k.kind = any(exam_kinds());
  if bank = 0 then raise exception 'no code tasks'; end if;
  insert into assignments (class_id, title, kind, lessons, n, minutes, opens_at, due_at)
  values (cid, trim(atitle), akind, lesson_ids, least(n, bank), case when akind = 'exam' then minutes end, coalesce(opens, now()), due)
  returning id into new_id;
  return new_id;
end $$;

create or replace function public.delete_assignment(aid uuid)
returns void language sql security definer set search_path = public as $$
  delete from assignments a using classes c where a.id = aid and c.id = a.class_id and c.owner = auth.uid();
$$;

-- Lets one learner take it again (lost connection, a fresh start).
create or replace function public.reset_attempt(aid uuid, uid uuid)
returns void language sql security definer set search_path = public as $$
  delete from attempts t using assignments a, classes c
  where t.assignment_id = aid and t.user_id = uid and a.id = t.assignment_id and c.id = a.class_id and c.owner = auth.uid();
$$;

create or replace function public.class_assignments(cid uuid)
returns table (id uuid, title text, kind text, lessons text[], n integer, minutes integer, opens_at timestamptz, due_at timestamptz,
               created_at timestamptz, started bigint, finished bigint)
language plpgsql stable security definer set search_path = public as $$
begin
  if not exists (select 1 from classes where classes.id = cid and owner = auth.uid()) then raise exception 'not your class'; end if;
  return query select a.id, a.title, a.kind, a.lessons, a.n, a.minutes, a.opens_at, a.due_at, a.created_at,
    (select count(*) from attempts t where t.assignment_id = a.id),
    (select count(*) from attempts t where t.assignment_id = a.id and (t.finished_at is not null or now() > attempt_deadline(a, t.started_at)))
  from assignments a where a.class_id = cid order by a.created_at desc;
end $$;

-- One row per class member: their tasks, answers with code, and a summary of the event log.
create or replace function public.assignment_report(aid uuid)
returns table (user_id uuid, name text, started_at timestamptz, finished_at timestamptz, deadline timestamptz,
               tasks text[], answers jsonb, events jsonb, last_event timestamptz)
language plpgsql stable security definer set search_path = public as $$
declare a assignments;
begin
  select x.* into a from assignments x join classes c on c.id = x.class_id where x.id = aid and c.owner = auth.uid();
  if a.id is null then raise exception 'not your class'; end if;
  return query
  select m.user_id, coalesce(nullif(trim(p.name), ''), 'Оқушы'), t.started_at, t.finished_at,
         case when t.started_at is not null then attempt_deadline(a, t.started_at) end, t.tasks,
         coalesce((select jsonb_agg(jsonb_build_object('ex', s.ex_id, 'ok', s.ok, 'code', s.code, 'tries', s.tries, 'at', s.at))
                   from answers s where s.assignment_id = aid and s.user_id = m.user_id), '[]'::jsonb),
         coalesce((select jsonb_object_agg(e.kind, jsonb_build_object('n', e.n, 'ms', e.ms)) from (
                     select ev.kind, count(*) as n, coalesce(sum(ev.ms), 0) as ms from attempt_events ev
                     where ev.assignment_id = aid and ev.user_id = m.user_id group by ev.kind) e), '{}'::jsonb),
         (select max(ev.at) from attempt_events ev where ev.assignment_id = aid and ev.user_id = m.user_id)
  from class_members m
  left join progress p on p.user_id = m.user_id
  left join attempts t on t.assignment_id = aid and t.user_id = m.user_id
  where m.class_id = a.class_id
  order by 2;
end $$;

-- Live watch: events after a moment, with the learner's name (the teacher's page asks every few seconds).
create or replace function public.assignment_events(aid uuid, since timestamptz)
returns table (name text, kind text, ms integer, at timestamptz)
language plpgsql stable security definer set search_path = public as $$
begin
  if not exists (select 1 from assignments x join classes c on c.id = x.class_id where x.id = aid and c.owner = auth.uid()) then
    raise exception 'not your class'; end if;
  return query select coalesce(nullif(trim(p.name), ''), 'Оқушы'), e.kind, e.ms, e.at
  from attempt_events e left join progress p on p.user_id = e.user_id
  where e.assignment_id = aid and e.at > since order by e.at limit 100;
end $$;

-- ---------- learner ----------
create or replace function public.my_assignments()
returns table (id uuid, class_name text, title text, kind text, n integer, minutes integer, opens_at timestamptz, due_at timestamptz,
               started_at timestamptz, finished boolean, solved bigint)
language sql stable security definer set search_path = public as $$
  select a.id, c.name, a.title, a.kind, a.n, a.minutes, a.opens_at, a.due_at, t.started_at,
         t.started_at is not null and (t.finished_at is not null or coalesce(now() > attempt_deadline(a, t.started_at), false)),
         (select count(*) from answers s where s.assignment_id = a.id and s.user_id = auth.uid() and s.ok)
  from class_members m join classes c on c.id = m.class_id join assignments a on a.class_id = c.id
  left join attempts t on t.assignment_id = a.id and t.user_id = auth.uid()
  where m.user_id = auth.uid() order by a.created_at desc limit 50;
$$;

-- Starts (or resumes) the learner's attempt. The first call draws their own tasks.
create or replace function public.start_attempt(aid uuid)
returns table (title text, kind text, tasks text[], started_at timestamptz, deadline timestamptz, server_now timestamptz,
               finished boolean, answers jsonb)
language plpgsql security definer set search_path = public as $$
declare a assignments; t attempts; picked text[];
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  select x.* into a from assignments x join class_members m on m.class_id = x.class_id and m.user_id = auth.uid() where x.id = aid;
  if a.id is null then raise exception 'not in class'; end if;
  select * into t from attempts where assignment_id = aid and user_id = auth.uid();
  if t.assignment_id is null then
    if now() < a.opens_at then raise exception 'not open yet'; end if;
    if a.due_at is not null and now() > a.due_at then raise exception 'closed'; end if;
    select array_agg(q.id) into picked from (
      select k.id from xp_catalog k where split_part(k.id, '#', 1) = any(a.lessons) and k.kind = any(exam_kinds()) order by random() limit a.n) q;
    insert into attempts (assignment_id, user_id, tasks) values (aid, auth.uid(), picked) returning * into t;
  end if;
  return query select a.title, a.kind, t.tasks, t.started_at, attempt_deadline(a, t.started_at), now(),
    t.finished_at is not null or coalesce(now() > attempt_deadline(a, t.started_at), false),
    coalesce((select jsonb_object_agg(s.ex_id, jsonb_build_object('ok', s.ok, 'code', s.code)) from answers s
              where s.assignment_id = aid and s.user_id = auth.uid()), '{}'::jsonb);
end $$;

-- Saves an answer. Refused after the deadline (30 s grace for the network), after finishing, or for a task not given.
create or replace function public.submit_answer(aid uuid, ex text, passed boolean, src text)
returns void
language plpgsql security definer set search_path = public as $$
declare a assignments; t attempts; dl timestamptz;
begin
  select * into t from attempts where assignment_id = aid and user_id = auth.uid();
  if t.assignment_id is null then raise exception 'not started'; end if;
  select * into a from assignments where id = aid;
  dl := attempt_deadline(a, t.started_at);
  if t.finished_at is not null or (dl is not null and now() > dl + interval '30 seconds') then raise exception 'time is up'; end if;
  if not ex = any(t.tasks) then raise exception 'not your task'; end if;
  insert into answers as s (assignment_id, user_id, ex_id, ok, code)
  values (aid, auth.uid(), ex, coalesce(passed, false), left(src, 20000))
  on conflict (assignment_id, user_id, ex_id) do update
    set tries = s.tries + 1, at = now(),
        code = case when s.ok and not excluded.ok then s.code else excluded.code end,   -- a later wrong try keeps the passing code
        ok = s.ok or excluded.ok;
end $$;

create or replace function public.log_event(aid uuid, ekind text, ems integer default null)
returns void
language plpgsql security definer set search_path = public as $$
begin
  if ekind not in ('blur', 'paste', 'copy', 'fs_exit', 'devtools') then return; end if;
  if not exists (select 1 from attempts where assignment_id = aid and user_id = auth.uid() and finished_at is null) then return; end if;
  if (select count(*) from attempt_events where assignment_id = aid and user_id = auth.uid()) >= 300 then return; end if;
  insert into attempt_events (assignment_id, user_id, kind, ms) values (aid, auth.uid(), ekind, least(greatest(ems, 0), 86400000));
end $$;

create or replace function public.finish_attempt(aid uuid)
returns void language sql security definer set search_path = public as $$
  update attempts set finished_at = now() where assignment_id = aid and user_id = auth.uid() and finished_at is null;
$$;

do $$
declare f text;
begin
  foreach f in array array['create_assignment(uuid,text,text,text[],integer,integer,timestamptz,timestamptz)', 'delete_assignment(uuid)',
    'reset_attempt(uuid,uuid)', 'class_assignments(uuid)', 'assignment_report(uuid)', 'assignment_events(uuid,timestamptz)',
    'my_assignments()', 'start_attempt(uuid)', 'submit_answer(uuid,text,boolean,text)', 'log_event(uuid,text,integer)', 'finish_attempt(uuid)'] loop
    execute format('revoke all on function public.%s from public, anon', f);
    execute format('grant execute on function public.%s to authenticated', f);
  end loop;
end $$;
