-- Public portfolio pages and teacher classes. Run in the Supabase SQL editor after schema.sql. Safe to re-run.
-- Every function runs as the table owner and returns only names, XP and lesson progress, never emails.

-- ---------- public portfolio (#u/<user id>) ----------
-- Shown only when the learner turned it on (Profile → "Public portfolio page").
create or replace function public.public_profile(uid uuid)
returns table (name text, xp integer, best integer, badges jsonb, lessons jsonb)
language sql stable security definer set search_path = public as $$
  select coalesce(nullif(trim(p.name), ''), 'Оқушы'),
         least(p.xp, 100000),
         case when p.data->>'best' ~ '^\d{1,5}$' then (p.data->>'best')::integer else 0 end,
         case when jsonb_typeof(p.data->'badges') = 'object' then p.data->'badges' else '{}'::jsonb end,
         case when jsonb_typeof(p.data->'lessons') = 'object' then p.data->'lessons' else '{}'::jsonb end
  from progress p
  where p.user_id = uid and (p.data->'prefs'->>'publicProfile') = 'true';
$$;
grant execute on function public.public_profile(uuid) to anon, authenticated;

-- ---------- teacher classes ----------
-- A teacher makes a class and shares its 6-letter code (or the #join/<code> link); learners join with it.
-- The teacher sees each member's name, XP, streak, last activity and finished lessons.
create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references auth.users (id) on delete cascade,
  name text not null check (char_length(name) between 2 and 60),
  code text not null unique check (code ~ '^[A-Z2-9]{6}$'),
  created_at timestamptz not null default now()
);
create table if not exists public.class_members (
  class_id uuid not null references public.classes (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (class_id, user_id)
);
alter table public.classes enable row level security;
alter table public.class_members enable row level security;
revoke all on public.classes, public.class_members from anon, authenticated;   -- only through the functions below

create or replace function public.create_class(cname text)
returns table (id uuid, name text, code text)
language plpgsql security definer set search_path = public as $$
declare c text; tries int := 0;
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  if (select count(*) from classes where owner = auth.uid()) >= 20 then raise exception 'too many classes'; end if;
  cname := trim(coalesce(cname, ''));
  if char_length(cname) < 2 or char_length(cname) > 60 then raise exception 'bad class name'; end if;
  loop
    -- no 0/O/1/I so the code is easy to read out loud
    c := (select string_agg(substr('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 1 + floor(random() * 32)::int, 1), '') from generate_series(1, 6));
    exit when not exists (select 1 from classes where classes.code = c);
    tries := tries + 1; if tries > 20 then raise exception 'could not make a code'; end if;
  end loop;
  return query insert into classes (owner, name, code) values (auth.uid(), cname, c) returning classes.id, classes.name, classes.code;
end $$;

create or replace function public.my_classes()
returns table (id uuid, name text, code text, members bigint, created_at timestamptz)
language sql stable security definer set search_path = public as $$
  select c.id, c.name, c.code, (select count(*) from class_members m where m.class_id = c.id), c.created_at
  from classes c where c.owner = auth.uid() order by c.created_at;
$$;

create or replace function public.delete_class(cid uuid)
returns void
language sql security definer set search_path = public as $$
  delete from classes where id = cid and owner = auth.uid();
$$;

create or replace function public.join_class(ccode text)
returns table (id uuid, name text)
language plpgsql security definer set search_path = public as $$
declare c classes;
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  select * into c from classes where classes.code = upper(trim(coalesce(ccode, '')));
  if c.id is null then raise exception 'class not found'; end if;
  if (select count(*) from class_members where user_id = auth.uid()) >= 20 then raise exception 'too many classes'; end if;
  insert into class_members (class_id, user_id) values (c.id, auth.uid()) on conflict do nothing;
  return query select c.id, c.name;
end $$;

create or replace function public.my_memberships()
returns table (id uuid, name text, joined_at timestamptz)
language sql stable security definer set search_path = public as $$
  select c.id, c.name, m.joined_at from class_members m join classes c on c.id = m.class_id
  where m.user_id = auth.uid() order by m.joined_at;
$$;

create or replace function public.leave_class(cid uuid)
returns void
language sql security definer set search_path = public as $$
  delete from class_members where class_id = cid and user_id = auth.uid();
$$;

-- The class owner only: one row per member with what the report needs.
create or replace function public.class_report(cid uuid)
returns table (name text, xp integer, streak integer, last_day text, updated_at timestamptz, lessons jsonb, joined_at timestamptz)
language plpgsql stable security definer set search_path = public as $$
begin
  if not exists (select 1 from classes where id = cid and owner = auth.uid()) then raise exception 'not your class'; end if;
  return query
  select coalesce(nullif(trim(p.name), ''), 'Оқушы'),
         coalesce(least(p.xp, 100000), 0),
         case when p.data->>'streak' ~ '^\d{1,5}$' then (p.data->>'streak')::integer else 0 end,
         p.data->>'lastDay',
         p.updated_at,
         case when jsonb_typeof(p.data->'lessons') = 'object' then p.data->'lessons' else '{}'::jsonb end,
         m.joined_at
  from class_members m left join progress p on p.user_id = m.user_id
  where m.class_id = cid
  order by coalesce(p.xp, 0) desc;
end $$;

do $$
declare f text;
begin
  foreach f in array array['create_class(text)', 'my_classes()', 'delete_class(uuid)', 'join_class(text)', 'my_memberships()', 'leave_class(uuid)', 'class_report(uuid)'] loop
    execute format('revoke all on function public.%s from public, anon', f);
    execute format('grant execute on function public.%s to authenticated', f);
  end loop;
end $$;
