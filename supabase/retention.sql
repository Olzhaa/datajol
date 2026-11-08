-- Deletes old rows on the schedule the privacy policy promises (legal/src/privacy.*.html, section 5):
-- statistics 180 days, error reports 60 days, feedback 2 years. Run once in the Supabase SQL editor
-- after analytics.sql and feedback.sql. Needs the pg_cron extension (Database → Extensions → pg_cron). Safe to re-run.
create extension if not exists pg_cron;

create or replace function public.purge_old_rows()
returns void
language sql security definer set search_path = public as $$
  delete from public.events where created_at < now() - interval '180 days';
  delete from public.client_errors where created_at < now() - interval '60 days';
  delete from public.feedback where created_at < now() - interval '2 years';
$$;
revoke all on function public.purge_old_rows() from public, anon, authenticated;

-- Every night at 03:00 UTC. cron.schedule with the same name replaces the old job.
select cron.schedule('tolqyn-purge-old-rows', '0 3 * * *', 'select public.purge_old_rows()');
