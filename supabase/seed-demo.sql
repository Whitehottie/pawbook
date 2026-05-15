-- Optional SQL fallback: set roles AFTER you manually create users in
-- Authentication → Users. Replace emails if you used different ones.

-- update public.profiles set role = 'admin' where email = 'admin@pawbook.com';
-- update public.profiles set role = 'admin' where email = 'clinic.manager@pawbook.com';
-- update public.profiles set role = 'provider' where email = 'vet@pawbook.com';

-- Link provider to veterinarian row (run after vet user exists):
-- update public.veterinarians
-- set user_id = (select id from public.profiles where email = 'vet@pawbook.com')
-- where name = 'Dr. Sarah Mitchell';
