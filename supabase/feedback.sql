-- Learner feedback: anyone on the site can send a message; only the project owner reads them
-- (Supabase dashboard → Table Editor → feedback). Safe to run more than once.

create table if not exists public.feedback (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  user_id uuid default auth.uid() references auth.users (id) on delete set null,
  kind text not null check (kind in ('bug', 'idea', 'unclear', 'other')),
  message text not null check (char_length(message) between 3 and 2000),
  page text check (char_length(page) <= 300),
  contact text check (char_length(contact) <= 200),
  status text not null default 'new' check (status in ('new', 'seen', 'done'))
);

alter table public.feedback enable row level security;

-- Learners may only add rows (no reading, editing or deleting), and only as themselves.
drop policy if exists feedback_insert on public.feedback;
create policy feedback_insert on public.feedback for insert to anon, authenticated
  with check (status = 'new' and (user_id is null or user_id = auth.uid()));

revoke all on public.feedback from anon, authenticated;
grant insert (kind, message, page, contact) on public.feedback to anon, authenticated;
