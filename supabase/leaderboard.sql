-- DataJol leaderboard and certificate checks. Run once in the Supabase SQL editor, after schema.sql.
-- Both functions run as the table owner, so they can read other learners' rows,
-- but they return only a display name, XP and completed lessons, never emails.

-- Top learners by XP, for all time or the last 7 days. Learners who turned the leaderboard off are left out.
create or replace function public.leaderboard(period text default 'all', lim int default 50)
returns table (pos bigint, name text, xp integer, is_me boolean)
language sql stable security definer set search_path = public as $$
  with s as (
    select p.user_id,
           coalesce(nullif(trim(p.name), ''), 'Оқушы') as name,
           case when period = 'week' then coalesce((
             select sum((e->>'xp')::integer) from jsonb_array_elements(coalesce(p.data->'xpLog', '[]'::jsonb)) e
             where e->>'d' >= to_char(now() - interval '6 days', 'YYYY-MM-DD')), 0)::integer
           else p.xp end as xp
    from progress p
    where coalesce((p.data->'prefs'->>'hideLb')::boolean, false) = false
  )
  select rank() over (order by s.xp desc), s.name, s.xp, s.user_id = auth.uid()
  from s where s.xp > 0 order by s.xp desc limit least(lim, 100);
$$;
grant execute on function public.leaderboard(text, integer) to authenticated;

-- Public certificate check: name and completed lessons for one learner id (the id is in the certificate link).
create or replace function public.cert_info(uid uuid)
returns table (name text, lessons jsonb)
language sql stable security definer set search_path = public as $$
  select coalesce(nullif(trim(p.name), ''), 'Оқушы'), coalesce(p.data->'lessons', '{}'::jsonb)
  from progress p where p.user_id = uid;
$$;
grant execute on function public.cert_info(uuid) to anon, authenticated;
