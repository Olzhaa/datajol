-- Lets a learner delete their own account and everything stored for it (Profile → "Delete account").
-- Run in the Supabase SQL editor after schema.sql. Safe to re-run.
-- Deleting the auth user removes the progress row (on delete cascade); feedback, events and
-- client_errors keep their rows with user_id set to null, so nothing points to the person any more.
create or replace function public.delete_me()
returns void
language plpgsql security definer set search_path = public, auth as $$
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  delete from auth.users where id = auth.uid();
end $$;

revoke all on function public.delete_me() from public, anon;
grant execute on function public.delete_me() to authenticated;
