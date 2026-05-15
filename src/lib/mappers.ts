import type { Database } from './database.types';
import type {
  Appointment,
  Pet,
  Service,
  User,
  Veterinarian
} from '../data/types';

type ProfileRow = Database['public']['Tables']['profiles']['Row'];
type PetRow = Database['public']['Tables']['pets']['Row'];
type ServiceRow = Database['public']['Tables']['services']['Row'];
type VeterinarianRow = Database['public']['Tables']['veterinarians']['Row'];
type AppointmentRow = Database['public']['Tables']['appointments']['Row'];

export function mapProfile(row: ProfileRow): User {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    phone: row.phone ?? '',
    role: row.role
  };
}

export function mapPet(row: PetRow): Pet {
  return {
    id: row.id,
    ownerId: row.owner_id,
    name: row.name,
    species: row.species,
    breed: row.breed,
    age: row.age,
    weight: row.weight,
    medicalNotes: row.medical_notes ?? ''
  };
}

export function mapService(row: ServiceRow): Service {
  return {
    id: row.id,
    name: row.name,
    duration: row.duration,
    price: row.price,
    active: row.active
  };
}

export function mapVeterinarian(row: VeterinarianRow): Veterinarian {
  return {
    id: row.id,
    name: row.name,
    specialty: row.specialty
  };
}

export function mapAppointment(row: AppointmentRow): Appointment {
  return {
    id: row.id,
    petId: row.pet_id,
    ownerId: row.owner_id,
    serviceId: row.service_id,
    veterinarianId: row.veterinarian_id,
    date: row.date,
    time: row.time,
    status: row.status,
    notes: row.notes ?? undefined,
    visitNotes: row.visit_notes ?? undefined
  };
}
