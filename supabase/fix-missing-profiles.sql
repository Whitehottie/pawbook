-- Run this in Supabase SQL Editor if sign-in works in Auth but app shows
-- "Invalid email or password" or stays on Loading.

-- 1. Let users insert their own profile row (backup if trigger was late)
drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  to authenticated
  with check (id = auth.uid());

-- 2. Backfill profiles for auth users missing a row
insert into public.profiles (id, email, name, phone, role)
select
  u.id,
  coalesce(u.email, ''),
  coalesce(u.raw_user_meta_data->>'name', ''),
  coalesce(u.raw_user_meta_data->>'phone', ''),
  coalesce(u.raw_user_meta_data->>'role', 'client')
from auth.users u
where not exists (select 1 from public.profiles p where p.id = u.id);
