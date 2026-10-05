-- DataJol leaderboard, certificate checks and progress limits. Run in the Supabase SQL editor, after schema.sql.
-- Safe to re-run: functions are replaced and constraints are dropped and added again.
-- Both functions run as the table owner, so they can read other learners' rows,
-- but they return only a display name, XP and completed lessons, never emails.

-- Limits on what a learner can store in their own row (they write it directly with the anon key).
-- XP cap: the whole curriculum gives 10 005 XP (569 exercises in content/*.js), so 15 000 is about 1.5x that.
-- Raise it here, in leaderboard() below and in schema.sql if the curriculum grows past that.
alter table public.progress drop constraint if exists progress_name_len;
alter table public.progress drop constraint if exists progress_data_size;
alter table public.progress drop constraint if exists progress_xp_range;
alter table public.progress add constraint progress_name_len check (name is null or char_length(name) <= 40) not valid;
alter table public.progress add constraint progress_data_size check (pg_column_size(data) < 300000) not valid;
alter table public.progress add constraint progress_xp_range
  check (data->>'xp' is null or (data->>'xp' ~ '^\d{1,6}$' and (data->>'xp')::integer <= 15000)) not valid;
-- New writes are always checked. Existing rows are validated here; an old row that breaks a limit only gives a notice.
do $$
declare c text;
begin
  foreach c in array array['progress_name_len', 'progress_data_size', 'progress_xp_range'] loop
    begin
      execute format('alter table public.progress validate constraint %I', c);
    exception when check_violation then
      raise notice 'constraint % not validated: some existing rows break it', c;
    end;
  end loop;
end $$;

-- Top learners by XP, for all time or the last 7 days. Learners who turned the leaderboard off are left out.
-- Every value is read defensively, so one learner's odd data cannot break the board for everyone.
create or replace function public.leaderboard(period text default 'all', lim int default 50)
returns table (pos bigint, name text, xp integer, is_me boolean)
language sql stable security definer set search_path = public as $$
  with s as (
    select p.user_id,
           coalesce(nullif(trim(p.name), ''), 'Оқушы') as name,
           case when period = 'week' then (
             select least(coalesce(sum(case when e->>'xp' ~ '^\d{1,4}$' then (e->>'xp')::bigint end), 0), 15000)::integer
             from jsonb_array_elements(case when jsonb_typeof(p.data->'xpLog') = 'array' then p.data->'xpLog' else '[]'::jsonb end) e
             -- d is the learner's local day: from 6 days ago up to the latest "today" anywhere (UTC+14), never later
             where jsonb_typeof(e) = 'object'
               and e->>'d' between to_char(current_date - 6, 'YYYY-MM-DD')
                               and to_char(now() at time zone 'UTC' + interval '14 hours', 'YYYY-MM-DD'))
           else least(p.xp, 15000) end as xp
    from progress p
    where (p.data->'prefs'->>'hideLb') is distinct from 'true'
  )
  select rank() over (order by s.xp desc), s.name, s.xp, s.user_id = auth.uid()
  from s where s.xp > 0 order by s.xp desc limit least(greatest(coalesce(lim, 50), 1), 100);
$$;
-- Signed-in learners only (Postgres lets everyone execute a function unless this is revoked).
revoke execute on function public.leaderboard(text, integer) from public, anon;
grant execute on function public.leaderboard(text, integer) to authenticated;

-- Public certificate check: only the name and completed lessons for one learner id (the id is in the certificate link).
create or replace function public.cert_info(uid uuid)
returns table (name text, lessons jsonb)
language sql stable security definer set search_path = public as $$
  select coalesce(nullif(trim(p.name), ''), 'Оқушы'),
         case when jsonb_typeof(p.data->'lessons') = 'object' then p.data->'lessons' else '{}'::jsonb end
  from progress p where p.user_id = uid;
$$;
grant execute on function public.cert_info(uuid) to anon, authenticated;
