export type UserRole = 'client' | 'provider' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
}

export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  medicalNotes: string;
}

export interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  active: boolean;
}

export interface Veterinarian {
  id: string;
  name: string;
  specialty: string;
}

export type AppointmentStatus =
  | 'upcoming'
  | 'completed'
  | 'cancelled'
  | 'checked-in';

export interface Appointment {
  id: string;
  petId: string;
  ownerId: string;
  serviceId: string;
  veterinarianId: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes?: string;
  visitNotes?: string;
}

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
}

export interface CreateProviderInput extends SignUpInput {
  specialty: string;
}
