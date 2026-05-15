export type UserRole = 'client' | 'provider' | 'admin';

export type AppointmentStatus =
  | 'upcoming'
  | 'completed'
  | 'cancelled'
  | 'checked-in';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          phone: string;
          role: UserRole;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          phone?: string;
          role: UserRole;
        };
        Update: {
          email?: string;
          name?: string;
          phone?: string;
          role?: UserRole;
        };
      };
      pets: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          species: string;
          breed: string;
          age: number;
          weight: number;
          medical_notes: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          species: string;
          breed: string;
          age: number;
          weight: number;
          medical_notes?: string;
        };
        Update: {
          name?: string;
          species?: string;
          breed?: string;
          age?: number;
          weight?: number;
          medical_notes?: string;
        };
      };
      services: {
        Row: {
          id: string;
          name: string;
          duration: number;
          price: number;
          active: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          duration: number;
          price: number;
          active?: boolean;
        };
        Update: {
          name?: string;
          duration?: number;
          price?: number;
          active?: boolean;
        };
      };
      veterinarians: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          specialty: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name: string;
          specialty: string;
        };
        Update: {
          user_id?: string | null;
          name?: string;
          specialty?: string;
        };
      };
      appointments: {
        Row: {
          id: string;
          pet_id: string;
          owner_id: string;
          service_id: string;
          veterinarian_id: string;
          date: string;
          time: string;
          status: AppointmentStatus;
          notes: string | null;
          visit_notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          pet_id: string;
          owner_id: string;
          service_id: string;
          veterinarian_id: string;
          date: string;
          time: string;
          status?: AppointmentStatus;
          notes?: string | null;
          visit_notes?: string | null;
        };
        Update: {
          pet_id?: string;
          service_id?: string;
          veterinarian_id?: string;
          date?: string;
          time?: string;
          status?: AppointmentStatus;
          notes?: string | null;
          visit_notes?: string | null;
        };
      };
    };
  };
}
