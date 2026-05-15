-- PawBook Supabase schema
-- Run in Supabase Dashboard → SQL Editor

-- Extensions
create extension if not exists "pgcrypto";

-- Profiles (linked to Supabase Auth users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  name text not null default '',
  phone text not null default '',
  role text not null check (role in ('client', 'provider', 'admin')) default 'client',
  created_at timestamptz not null default now()
);

-- Pets
create table if not exists public.pets (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  species text not null default '',
  breed text not null default '',
  age integer not null default 0,
  weight numeric not null default 0,
  medical_notes text not null default '',
  created_at timestamptz not null default now()
);

-- Services
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  duration integer not null,
  price integer not null,
  active boolean not null default true
);

-- Veterinarians
create table if not exists public.veterinarians (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles (id) on delete set null,
  name text not null,
  specialty text not null default 'General Practice'
);

-- Appointments
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  pet_id uuid not null references public.pets (id) on delete cascade,
  owner_id uuid not null references public.profiles (id) on delete cascade,
  service_id uuid not null references public.services (id) on delete restrict,
  veterinarian_id uuid not null references public.veterinarians (id) on delete restrict,
  date text not null,
  time text not null,
  status text not null check (status in ('upcoming', 'completed', 'cancelled', 'checked-in')) default 'upcoming',
  notes text,
  visit_notes text,
  created_at timestamptz not null default now()
);

-- Auto-create profile on sign-up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, phone, role)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'phone', ''),
    coalesce(new.raw_user_meta_data->>'role', 'client')
  )
  on conflict (id) do update set
    email = excluded.email,
    name = excluded.name,
    phone = excluded.phone,
    role = excluded.role;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Role helpers for RLS
create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.is_provider()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'provider'
  );
$$;

-- RLS
alter table public.profiles enable row level security;
alter table public.pets enable row level security;
alter table public.services enable row level security;
alter table public.veterinarians enable row level security;
alter table public.appointments enable row level security;

-- Profiles policies
create policy "profiles_insert_own"
  on public.profiles for insert
  to authenticated
  with check (id = auth.uid());

create policy "profiles_select_own_or_staff"
  on public.profiles for select
  to authenticated
  using (
    id = auth.uid()
    or public.is_admin()
    or public.is_provider()
  );

create policy "profiles_update_own_or_admin"
  on public.profiles for update
  to authenticated
  using (id = auth.uid() or public.is_admin());

create policy "profiles_delete_admin"
  on public.profiles for delete
  to authenticated
  using (public.is_admin());

-- Pets policies
create policy "pets_select"
  on public.pets for select
  to authenticated
  using (
    owner_id = auth.uid()
    or public.is_admin()
    or public.is_provider()
  );

create policy "pets_insert"
  on public.pets for insert
  to authenticated
  with check (owner_id = auth.uid() or public.is_admin());

create policy "pets_update"
  on public.pets for update
  to authenticated
  using (owner_id = auth.uid() or public.is_admin());

create policy "pets_delete"
  on public.pets for delete
  to authenticated
  using (owner_id = auth.uid() or public.is_admin());

-- Services policies
create policy "services_select_authenticated"
  on public.services for select
  to authenticated
  using (true);

create policy "services_admin_write"
  on public.services for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Veterinarians policies
create policy "veterinarians_select_authenticated"
  on public.veterinarians for select
  to authenticated
  using (true);

create policy "veterinarians_admin_write"
  on public.veterinarians for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Appointments policies
create policy "appointments_select"
  on public.appointments for select
  to authenticated
  using (
    owner_id = auth.uid()
    or public.is_admin()
    or public.is_provider()
  );

create policy "appointments_insert"
  on public.appointments for insert
  to authenticated
  with check (owner_id = auth.uid() or public.is_admin());

create policy "appointments_update"
  on public.appointments for update
  to authenticated
  using (
    owner_id = auth.uid()
    or public.is_admin()
    or public.is_provider()
  );

create policy "appointments_delete_admin"
  on public.appointments for delete
  to authenticated
  using (public.is_admin());

-- Seed services (only if table is empty)
insert into public.services (name, duration, price, active)
select * from (values
  ('Wellness Exam', 30, 2900, true),
  ('Vaccination', 20, 2030, true),
  ('Dental Cleaning', 60, 8700, true),
  ('Spay/Neuter Surgery', 90, 14500, true),
  ('Microchipping', 15, 2610, true),
  ('Flea & Tick Treatment', 20, 1740, true),
  ('Deworming', 15, 1450, true),
  ('Blood Work / Lab Tests', 30, 4930, true),
  ('X-Ray / Imaging', 45, 6960, true),
  ('Emergency Care', 60, 11600, true),
  ('Grooming', 45, 3190, true),
  ('Nail Trimming', 15, 1160, true),
  ('Ear Cleaning', 15, 1450, true),
  ('Allergy Testing', 30, 5510, true),
  ('Nutritional Counseling', 30, 2320, true)
) as s(name, duration, price, active)
where not exists (select 1 from public.services limit 1);

-- Seed veterinarians (no linked user until provider account is created)
insert into public.veterinarians (name, specialty)
select * from (values
  ('Dr. Sarah Mitchell', 'General Practice'),
  ('Dr. James Chen', 'Surgery & Emergency Care')
) as v(name, specialty)
where not exists (select 1 from public.veterinarians limit 1);
