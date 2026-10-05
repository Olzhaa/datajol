-- DataJol cloud progress. Run once in the Supabase SQL editor, then run leaderboard.sql.
-- One row per learner; the whole progress object (XP, done tasks, lessons, badges, streak) is stored as JSON.
create table if not exists public.progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  name text,
  data jsonb not null default '{}'::jsonb,
  xp integer generated always as (coalesce((data->>'xp')::integer, 0)) stored,
  updated_at timestamptz not null default now(),
  -- Same limits as leaderboard.sql (which re-adds them on databases created before they existed).
  -- XP cap: the curriculum gives 10 005 XP in total, so 15 000 is about 1.5x that.
  constraint progress_name_len check (name is null or char_length(name) <= 40),
  constraint progress_data_size check (pg_column_size(data) < 300000),
  constraint progress_xp_range check (data->>'xp' is null or (data->>'xp' ~ '^\d{1,6}$' and (data->>'xp')::integer <= 15000))
);

alter table public.progress enable row level security;

-- Each learner reads and writes only their own row.
drop policy if exists "read own progress" on public.progress;
drop policy if exists "insert own progress" on public.progress;
drop policy if exists "update own progress" on public.progress;
create policy "read own progress" on public.progress for select using (auth.uid() = user_id);
create policy "insert own progress" on public.progress for insert with check (auth.uid() = user_id);
create policy "update own progress" on public.progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
