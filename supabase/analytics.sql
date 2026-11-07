-- Product analytics and browser errors: the site adds rows, only the project owner reads them
-- (Supabase dashboard → SQL editor or Table Editor). No names or emails are stored: a random id per
-- browser tab (sid) and, for signed-in learners, their user id. Safe to run more than once.

create table if not exists public.events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  user_id uuid default auth.uid() references auth.users (id) on delete set null,
  sid text not null check (char_length(sid) <= 40),
  name text not null check (name ~ '^[a-z_]{2,40}$'),
  props jsonb not null default '{}' check (pg_column_size(props) < 2000),
  lang text check (char_length(lang) <= 5)
);
create index if not exists events_name_time on public.events (name, created_at);

create table if not exists public.client_errors (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  user_id uuid default auth.uid() references auth.users (id) on delete set null,
  sid text not null check (char_length(sid) <= 40),
  message text not null check (char_length(message) <= 500),
  source text check (char_length(source) <= 300),
  line int,
  page text check (char_length(page) <= 300),
  ua text check (char_length(ua) <= 300),
  version text check (char_length(version) <= 20)
);

alter table public.events enable row level security;
alter table public.client_errors enable row level security;

-- Insert only, and only as yourself (or anonymously).
drop policy if exists events_insert on public.events;
create policy events_insert on public.events for insert to anon, authenticated
  with check (user_id is null or user_id = auth.uid());
drop policy if exists client_errors_insert on public.client_errors;
create policy client_errors_insert on public.client_errors for insert to anon, authenticated
  with check (user_id is null or user_id = auth.uid());

revoke all on public.events, public.client_errors from anon, authenticated;
grant insert (sid, name, props, lang) on public.events to anon, authenticated;
grant insert (sid, message, source, line, page, ua, version) on public.client_errors to anon, authenticated;

-- Old rows are not needed for long: keep 180 days of events and 60 days of errors.
-- Run by hand now and then, or schedule with pg_cron:
--   delete from public.events where created_at < now() - interval '180 days';
--   delete from public.client_errors where created_at < now() - interval '60 days';

-- Useful queries:
--   select name, count(*) from public.events where created_at > now() - interval '7 days' group by 1 order by 2 desc;
--   -- funnel: guests who start, pass a task, then sign up
--   select count(distinct sid) filter (where name = 'guest_start') as guests,
--          count(distinct sid) filter (where name = 'exercise_pass') as solved,
--          count(distinct sid) filter (where name = 'signup') as signed_up
--     from public.events where created_at > now() - interval '30 days';
--   select message, source, line, count(*) from public.client_errors group by 1, 2, 3 order by 4 desc limit 20;
