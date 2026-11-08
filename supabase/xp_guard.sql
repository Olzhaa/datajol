-- Server-side XP check. The browser writes the whole progress row, so a learner could type any XP into it.
-- This trigger recomputes XP from the tasks the row says are done, using the XP each exercise really gives
-- (public.xp_catalog, filled by xp_catalog.sql, which the site build generates), and lowers a larger claim.
-- Run in the Supabase SQL editor after schema.sql, then run xp_catalog.sql. Safe to re-run.

create table if not exists public.xp_catalog (id text primary key, xp integer not null);
alter table public.xp_catalog enable row level security;
revoke all on public.xp_catalog from anon, authenticated;

-- Most XP one entry of progress.done may give: a task up to its catalog XP (half when a hint was used and the
-- entry has no own number), a daily chest 20, the daily challenge 15, anything else 0.
create or replace function public.allowed_xp(k text, e jsonb)
returns integer
language sql stable set search_path = public as $$
  select case
    when k ~ '^chest:\d{4}-\d{2}-\d{2}$' then least(coalesce(case when e->>'xp' ~ '^\d{1,4}$' then (e->>'xp')::int end, 20), 20)
    when k ~ '^daily:\d{4}-\d{2}-\d{2}$' then least(coalesce(case when e->>'xp' ~ '^\d{1,4}$' then (e->>'xp')::int end, 15), 15)
    else coalesce((select least(coalesce(case when e->>'xp' ~ '^\d{1,4}$' then (e->>'xp')::int end,
                                          case when (e->>'hint') = 'true' then ceil(c.xp / 2.0)::int else c.xp end), c.xp)
                   from xp_catalog c where c.id = k), 0)
  end;
$$;

create or replace function public.progress_xp_guard()
returns trigger
language plpgsql security definer set search_path = public as $$
declare allowed integer; logv jsonb;
begin
  -- Until xp_catalog.sql has been run there is nothing to check against: leave rows alone.
  if not exists (select 1 from xp_catalog) then return new; end if;
  select coalesce(sum(allowed_xp(d.key, d.value)), 0) into allowed
  from jsonb_each(case when jsonb_typeof(new.data->'done') = 'object' then new.data->'done' else '{}'::jsonb end) d;
  if coalesce(case when new.data->>'xp' ~ '^\d{1,9}$' then (new.data->>'xp')::bigint end, 0) > allowed then
    new.data := jsonb_set(new.data, '{xp}', to_jsonb(allowed));
  end if;
  -- The weekly board sums xpLog: keep only entries that a done task can account for.
  if jsonb_typeof(new.data->'xpLog') = 'array' then
    select coalesce(jsonb_agg(e), '[]'::jsonb) into logv
    from jsonb_array_elements(new.data->'xpLog') e
    where jsonb_typeof(e) = 'object' and e->>'xp' ~ '^\d{1,4}$'
      and (e->>'xp')::int <= allowed_xp(coalesce(e->>'id', ''), coalesce(new.data->'done'->(e->>'id'), '{}'::jsonb))
      and new.data->'done' ? coalesce(e->>'id', '');
    new.data := jsonb_set(new.data, '{xpLog}', logv);
  end if;
  return new;
end $$;

drop trigger if exists progress_xp_guard on public.progress;
create trigger progress_xp_guard before insert or update on public.progress
  for each row execute function public.progress_xp_guard();
