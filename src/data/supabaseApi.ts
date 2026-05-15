import { supabase } from '../lib/supabase';
import {
  mapAppointment,
  mapPet,
  mapProfile,
  mapService,
  mapVeterinarian
} from '../lib/mappers';
import type {
  Appointment,
  AppointmentStatus,
  CreateProviderInput,
  Pet,
  Service,
  SignUpInput,
  User,
  Veterinarian
} from './types';

export async function fetchProfile(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    console.error('fetchProfile error:', error.message);
    return null;
  }
  return data ? mapProfile(data) : null;
}

export async function fetchAllProfiles(): Promise<User[]> {
  const { data, error } = await supabase.from('profiles').select('*');
  if (error) throw error;
  return (data ?? []).map(mapProfile);
}

export async function fetchPets(): Promise<Pet[]> {
  const { data, error } = await supabase.from('pets').select('*');
  if (error) throw error;
  return (data ?? []).map(mapPet);
}

export async function fetchServices(): Promise<Service[]> {
  const { data, error } = await supabase.from('services').select('*');
  if (error) throw error;
  return (data ?? []).map(mapService);
}

export async function fetchVeterinarians(): Promise<Veterinarian[]> {
  const { data, error } = await supabase.from('veterinarians').select('*');
  if (error) throw error;
  return (data ?? []).map(mapVeterinarian);
}

export async function fetchAppointments(): Promise<Appointment[]> {
  const { data, error } = await supabase.from('appointments').select('*');
  if (error) throw error;
  return (data ?? []).map(mapAppointment);
}

async function ensureProfileForAuthUser(
  userId: string,
  email: string,
  metadata: Record<string, unknown> = {}
): Promise<User | null> {
  const existing = await fetchProfile(userId);
  if (existing) return existing;

  const name = String(metadata.name ?? '');
  const phone = String(metadata.phone ?? '');
  const role = (metadata.role as User['role']) ?? 'client';

  const { data, error } = await supabase
    .from('profiles')
    .upsert({ id: userId, email, name, phone, role })
    .select()
    .single();

  if (error) {
    console.error('ensureProfileForAuthUser error:', error.message);
    return null;
  }
  return mapProfile(data);
}

async function ensureProfileWithRetry(
  userId: string,
  email: string,
  metadata: Record<string, unknown>,
  attempts = 5
): Promise<User | null> {
  for (let i = 0; i < attempts; i++) {
    const profile = await ensureProfileForAuthUser(userId, email, metadata);
    if (profile) return profile;
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
  return null;
}

function formatAuthError(error: { message?: string; status?: number }): string {
  const msg = error.message ?? 'Authentication failed';
  const lower = msg.toLowerCase();

  if (lower.includes('rate limit') || lower.includes('too many')) {
    return [
      'Supabase email rate limit reached (too many sign-up attempts).',
      '',
      '1. Supabase Dashboard → Authentication → Providers → Email',
      '2. Turn OFF "Confirm email" → Save',
      '3. Wait about 1 hour, then try again — or use Sign in if you already registered.'
    ].join('\n');
  }
  if (
    lower.includes('already registered') ||
    lower.includes('already been registered') ||
    lower.includes('user already exists')
  ) {
    return 'This email is already registered. Please sign in instead.';
  }
  if (lower.includes('invalid') && lower.includes('email')) {
    return 'Invalid email address. Use a format like name@example.com';
  }
  if (lower.includes('password')) {
    return msg;
  }
  return msg;
}

function withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(message)), ms)
    )
  ]);
}

export async function signInWithEmail(
  email: string,
  password: string
): Promise<User | null> {
  const { data, error } = await withTimeout(
    supabase.auth.signInWithPassword({ email, password }),
    15000,
    'Sign in timed out. Check your internet and Supabase URL in .env'
  );

  if (error) {
    console.error('signInWithPassword:', error.message);
    return null;
  }
  if (!data.user) return null;

  return ensureProfileForAuthUser(
    data.user.id,
    data.user.email ?? email,
    data.user.user_metadata ?? {}
  );
}

export async function signUpWithEmail(input: SignUpInput): Promise<User> {
  const email = input.email.trim().toLowerCase();

  const { data, error } = await withTimeout(
    supabase.auth.signUp({
      email,
      password: input.password,
      options: {
        data: {
          name: input.name,
          phone: input.phone,
          role: input.role
        }
      }
    }),
    15000,
    'Sign up timed out. Check your connection and try again.'
  );

  if (error) {
    throw new Error(formatAuthError(error));
  }
  if (!data.user) {
    throw new Error('Sign up failed. Please try again.');
  }

  if (data.user.identities && data.user.identities.length === 0) {
    throw new Error('This email is already registered. Please sign in instead.');
  }

  if (!data.session) {
    throw new Error(
      'Account created but email confirmation is required. Check your inbox, or disable "Confirm email" under Supabase → Authentication → Email.'
    );
  }

  const profile = await ensureProfileWithRetry(data.user.id, email, {
    name: input.name,
    phone: input.phone,
    role: input.role
  });

  if (!profile) {
    throw new Error(
      'Account was created but the profile could not be set up. In Supabase SQL Editor, run supabase/fix-missing-profiles.sql, then try signing in.'
    );
  }

  return profile;
}

export async function createProviderAccount(
  input: CreateProviderInput
): Promise<User> {
  const {
    data: { session: adminSession }
  } = await supabase.auth.getSession();

  const user = await signUpWithEmail({
    name: input.name,
    email: input.email,
    password: input.password,
    phone: input.phone,
    role: 'provider'
  });

  const { error: vetError } = await supabase.from('veterinarians').insert({
    user_id: user.id,
    name: input.name,
    specialty: input.specialty || 'General Practice'
  });
  if (vetError) throw vetError;

  if (adminSession) {
    await supabase.auth.setSession({
      access_token: adminSession.access_token,
      refresh_token: adminSession.refresh_token
    });
  }

  return user;
}

export async function signOutUser(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function insertPet(pet: Omit<Pet, 'id'>): Promise<Pet> {
  const { data, error } = await supabase
    .from('pets')
    .insert({
      owner_id: pet.ownerId,
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      age: pet.age,
      weight: pet.weight,
      medical_notes: pet.medicalNotes
    })
    .select()
    .single();
  if (error) throw error;
  return mapPet(data);
}

export async function updatePetInDb(
  id: string,
  pet: Partial<Pet>
): Promise<void> {
  const { error } = await supabase
    .from('pets')
    .update({
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      age: pet.age,
      weight: pet.weight,
      medical_notes: pet.medicalNotes
    })
    .eq('id', id);
  if (error) throw error;
}

export async function deletePetFromDb(id: string): Promise<void> {
  const { error } = await supabase.from('pets').delete().eq('id', id);
  if (error) throw error;
}

export async function insertAppointment(
  appointment: Omit<Appointment, 'id'>
): Promise<Appointment> {
  const { data, error } = await supabase
    .from('appointments')
    .insert({
      pet_id: appointment.petId,
      owner_id: appointment.ownerId,
      service_id: appointment.serviceId,
      veterinarian_id: appointment.veterinarianId,
      date: appointment.date,
      time: appointment.time,
      status: appointment.status,
      notes: appointment.notes ?? null,
      visit_notes: appointment.visitNotes ?? null
    })
    .select()
    .single();
  if (error) throw error;
  return mapAppointment(data);
}

export async function updateAppointmentInDb(
  id: string,
  appointment: Partial<Appointment>
): Promise<void> {
  const { error } = await supabase
    .from('appointments')
    .update({
      pet_id: appointment.petId,
      service_id: appointment.serviceId,
      veterinarian_id: appointment.veterinarianId,
      date: appointment.date,
      time: appointment.time,
      status: appointment.status,
      notes: appointment.notes ?? null,
      visit_notes: appointment.visitNotes ?? null
    })
    .eq('id', id);
  if (error) throw error;
}

export async function cancelAppointmentInDb(id: string): Promise<void> {
  await updateAppointmentInDb(id, { status: 'cancelled' as AppointmentStatus });
}

export async function updateProfileInDb(
  id: string,
  user: Partial<User>
): Promise<void> {
  const { error } = await supabase
    .from('profiles')
    .update({
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role
    })
    .eq('id', id);
  if (error) throw error;
}

export async function deleteProfileFromDb(id: string): Promise<void> {
  const { error } = await supabase.from('profiles').delete().eq('id', id);
  if (error) throw error;
}

export async function insertService(
  service: Omit<Service, 'id'>
): Promise<Service> {
  const { data, error } = await supabase
    .from('services')
    .insert({
      name: service.name,
      duration: service.duration,
      price: service.price,
      active: service.active
    })
    .select()
    .single();
  if (error) throw error;
  return mapService(data);
}

export async function updateServiceInDb(
  id: string,
  service: Partial<Service>
): Promise<void> {
  const { error } = await supabase
    .from('services')
    .update({
      name: service.name,
      duration: service.duration,
      price: service.price,
      active: service.active
    })
    .eq('id', id);
  if (error) throw error;
}

export async function deleteServiceFromDb(id: string): Promise<void> {
  const { error } = await supabase.from('services').delete().eq('id', id);
  if (error) throw error;
}

export async function insertVeterinarian(
  vet: Omit<Veterinarian, 'id'>
): Promise<Veterinarian> {
  const { data, error } = await supabase
    .from('veterinarians')
    .insert({
      name: vet.name,
      specialty: vet.specialty
    })
    .select()
    .single();
  if (error) throw error;
  return mapVeterinarian(data);
}

export async function deleteVeterinarianFromDb(id: string): Promise<void> {
  const { error } = await supabase.from('veterinarians').delete().eq('id', id);
  if (error) throw error;
}
