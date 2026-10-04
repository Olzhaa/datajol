-- DataJol cloud progress. Run once in the Supabase SQL editor.
-- One row per learner; the whole progress object (XP, done tasks, lessons, badges, streak) is stored as JSON.
create table if not exists public.progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  name text,
  data jsonb not null default '{}'::jsonb,
  xp integer generated always as (coalesce((data->>'xp')::integer, 0)) stored,
  updated_at timestamptz not null default now()
);

alter table public.progress enable row level security;

-- Each learner reads and writes only their own row.
create policy "read own progress" on public.progress for select using (auth.uid() = user_id);
create policy "insert own progress" on public.progress for insert with check (auth.uid() = user_id);
create policy "update own progress" on public.progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
