-- Owner dashboard (#admin on the site): numbers from events, client_errors, feedback and progress.
-- Run in the Supabase SQL editor after analytics.sql and feedback.sql. Safe to re-run.
-- Then make yourself an admin (put your own sign-in email in place of the example, once):
--   insert into public.admins (user_id) select id from auth.users where email = 'you@example.com' on conflict do nothing;

create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);
alter table public.admins enable row level security;
revoke all on public.admins from anon, authenticated;

create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from admins where user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- Everything the dashboard shows, in one call. Raises for anyone who is not in public.admins.
-- A learner is a user id once signed in, otherwise the browser tab id (sid).
create or replace function public.admin_stats(days int default 30)
returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare
  since timestamptz := now() - make_interval(days => least(greatest(coalesce(days, 30), 1), 180));
  out jsonb;
begin
  if not exists (select 1 from admins where user_id = auth.uid()) then
    raise exception 'admins only';
  end if;
  with ev as (
    select created_at, created_at::date as day, name, props, coalesce(user_id::text, sid) as who
    from events where created_at >= since
  )
  select jsonb_build_object(
    'since', since,
    -- Funnel: anyone seen → tried a lesson → passed a task → signed up → came back on a later day
    'funnel', (select jsonb_build_object(
        'visitors', count(distinct who),
        'lesson_view', count(distinct who) filter (where name = 'view' and props->>'v' = 'lesson'),
        'task_pass', count(distinct who) filter (where name = 'exercise_pass'),
        'signup', count(distinct who) filter (where name = 'signup'),
        'returned', (select count(*) from (select who from ev group by who having count(distinct day) > 1) r)
      ) from ev),
    -- Activity per day: learners with any event, tasks passed, sign-ups
    'daily', coalesce((select jsonb_agg(d order by d->>'day') from (
        select jsonb_build_object('day', day, 'active', count(distinct who),
               'tasks', count(*) filter (where name = 'exercise_pass'),
               'signups', count(*) filter (where name = 'signup')) as d
        from ev group by day) x), '[]'::jsonb),
    -- Retention by first-seen day (all time, latest 30 cohorts)
    'retention', coalesce((select jsonb_agg(to_jsonb(r)) from (select * from retention_daily limit 30) r), '[]'::jsonb),
    -- Lessons: how many opened each and how many passed a task in it
    'lessons', coalesce((select jsonb_agg(l order by (l->>'opened')::int desc) from (
        select jsonb_build_object('mod', props->>'mod', 'li', (props->>'li'),
               'opened', count(distinct who)) as l
        from ev where name = 'view' and props->>'v' = 'lesson' group by props->>'mod', props->>'li'
        order by count(distinct who) desc limit 60) x), '[]'::jsonb),
    'passed', coalesce((select jsonb_object_agg(lesson, n) from (
        select split_part(props->>'ex', '#', 1) as lesson, count(distinct who) as n
        from ev where name = 'exercise_pass' group by 1) x), '{}'::jsonb),
    'errors', coalesce((select jsonb_agg(e) from (
        select jsonb_build_object('message', message, 'source', source, 'line', line, 'n', count(*), 'last', max(created_at)) as e
        from client_errors where created_at >= since group by message, source, line order by count(*) desc limit 20) x), '[]'::jsonb),
    'feedback', coalesce((select jsonb_agg(f order by f->>'created_at' desc) from (
        select jsonb_build_object('id', id, 'created_at', created_at, 'kind', kind, 'message', message, 'page', page, 'contact', contact, 'status', status) as f
        from feedback where created_at >= since order by created_at desc limit 50) x), '[]'::jsonb),
    'learners', (select jsonb_build_object('total', count(*), 'active7', count(*) filter (where updated_at > now() - interval '7 days')) from progress)
  ) into out;
  return out;
end $$;
revoke all on function public.admin_stats(int) from public, anon;
grant execute on function public.admin_stats(int) to authenticated;

-- Marks a feedback message seen or done from the dashboard.
create or replace function public.admin_feedback_status(fid bigint, st text)
returns void
language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from admins where user_id = auth.uid()) then raise exception 'admins only'; end if;
  if st not in ('new', 'seen', 'done') then raise exception 'bad status'; end if;
  update feedback set status = st where id = fid;
end $$;
revoke all on function public.admin_feedback_status(bigint, text) from public, anon;
grant execute on function public.admin_feedback_status(bigint, text) to authenticated;
