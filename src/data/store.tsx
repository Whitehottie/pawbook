import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useCallback
} from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import * as api from './supabaseApi';
import type {
  Appointment,
  CreateProviderInput,
  Pet,
  Service,
  SignUpInput,
  User,
  UserRole,
  Veterinarian
} from './types';

export type {
  UserRole,
  User,
  Pet,
  Service,
  Veterinarian,
  AppointmentStatus,
  Appointment,
  SignUpInput,
  CreateProviderInput
} from './types';

interface AppState {
  currentUser: User | null;
  users: User[];
  pets: Pet[];
  services: Service[];
  veterinarians: Veterinarian[];
  appointments: Appointment[];
  loading: boolean;
  authReady: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<User | null>;
  signUp: (input: SignUpInput) => Promise<User>;
  signOut: () => Promise<void>;
  createProvider: (input: CreateProviderInput) => Promise<User>;
  addPet: (pet: Omit<Pet, 'id'>) => Promise<Pet>;
  updatePet: (id: string, pet: Partial<Pet>) => Promise<void>;
  deletePet: (id: string) => Promise<void>;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => Promise<Appointment>;
  updateAppointment: (
    id: string,
    appointment: Partial<Appointment>
  ) => Promise<void>;
  cancelAppointment: (id: string) => Promise<void>;
  addUser: (input: SignUpInput) => Promise<User>;
  updateUser: (id: string, user: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  updateService: (id: string, service: Partial<Service>) => Promise<void>;
  addService: (service: Omit<Service, 'id'>) => Promise<Service>;
  deleteService: (id: string) => Promise<void>;
  addVeterinarian: (vet: Omit<Veterinarian, 'id'>) => Promise<Veterinarian>;
  deleteVeterinarian: (id: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [veterinarians, setVeterinarians] = useState<Veterinarian[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  const refreshData = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    setLoading(true);
    try {
      const [profiles, petsData, servicesData, vetsData, appointmentsData] =
        await Promise.all([
          api.fetchAllProfiles(),
          api.fetchPets(),
          api.fetchServices(),
          api.fetchVeterinarians(),
          api.fetchAppointments()
        ]);
      setUsers(profiles);
      setPets(petsData);
      setServices(servicesData);
      setVeterinarians(vetsData);
      setAppointments(appointmentsData);
    } catch (err) {
      console.error('Failed to load app data from Supabase:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setAuthReady(true);
      return;
    }

    let mounted = true;

    const initAuth = async () => {
      try {
        const {
          data: { session }
        } = await supabase.auth.getSession();

        if (session?.user && mounted) {
          try {
            const profile = await api.fetchProfile(session.user.id);
            setCurrentUser(profile);
            if (profile) void refreshData();
          } catch (err) {
            console.error('Failed to load profile on init:', err);
          }
        }
      } catch (err) {
        console.error('Failed to restore auth session:', err);
      } finally {
        if (mounted) setAuthReady(true);
      }
    };

    initAuth();

    // Do NOT await Supabase calls directly in this callback — it deadlocks
    // signInWithPassword / signUp. Defer work to the next tick.
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (event === 'INITIAL_SESSION') return;

      setTimeout(() => {
        if (!mounted) return;

        if (session?.user) {
          void (async () => {
            try {
              const profile = await api.fetchProfile(session.user!.id);
              if (!mounted) return;
              setCurrentUser(profile);
              if (profile) void refreshData();
            } catch (err) {
              console.error('Failed to load profile after auth change:', err);
            }
          })();
        } else {
          setCurrentUser(null);
          setUsers([]);
          setPets([]);
          setServices([]);
          setVeterinarians([]);
          setAppointments([]);
        }
      }, 0);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [refreshData]);

  const signIn = async (email: string, password: string): Promise<User | null> => {
    const user = await api.signInWithEmail(email, password);
    if (user) {
      setCurrentUser(user);
      void refreshData();
    }
    return user;
  };

  const signUp = async (input: SignUpInput): Promise<User> => {
    const user = await api.signUpWithEmail(input);
    setCurrentUser(user);
    void refreshData();
    return user;
  };

  const signOut = async () => {
    await api.signOutUser();
    setCurrentUser(null);
    setUsers([]);
    setPets([]);
    setServices([]);
    setVeterinarians([]);
    setAppointments([]);
  };

  const createProvider = async (input: CreateProviderInput): Promise<User> => {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    const user = await api.createProviderAccount(input);
    if (session?.user) {
      const adminProfile = await api.fetchProfile(session.user.id);
      setCurrentUser(adminProfile);
    }
    await refreshData();
    return user;
  };

  const addPet = async (petData: Omit<Pet, 'id'>): Promise<Pet> => {
    const newPet = await api.insertPet(petData);
    setPets((prev) => [...prev, newPet]);
    return newPet;
  };

  const updatePet = async (id: string, petData: Partial<Pet>) => {
    await api.updatePetInDb(id, petData);
    setPets((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...petData } : p))
    );
  };

  const deletePet = async (id: string) => {
    await api.deletePetFromDb(id);
    setPets((prev) => prev.filter((p) => p.id !== id));
  };

  const addAppointment = async (
    appointmentData: Omit<Appointment, 'id'>
  ): Promise<Appointment> => {
    const newAppointment = await api.insertAppointment(appointmentData);
    setAppointments((prev) => [...prev, newAppointment]);
    return newAppointment;
  };

  const updateAppointment = async (
    id: string,
    appointmentData: Partial<Appointment>
  ) => {
    await api.updateAppointmentInDb(id, appointmentData);
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...appointmentData } : a))
    );
  };

  const cancelAppointment = async (id: string) => {
    await api.cancelAppointmentInDb(id);
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: 'cancelled' as const } : a
      )
    );
  };

  const addUser = async (input: SignUpInput): Promise<User> => {
    const user = await api.signUpWithEmail(input);
    setUsers((prev) => [...prev, user]);
    return user;
  };

  const updateUser = async (id: string, userData: Partial<User>) => {
    await api.updateProfileInDb(id, userData);
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...userData } : u))
    );
    if (currentUser?.id === id) {
      setCurrentUser((prev) => (prev ? { ...prev, ...userData } : prev));
    }
  };

  const deleteUser = async (id: string) => {
    await api.deleteProfileFromDb(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const updateService = async (id: string, serviceData: Partial<Service>) => {
    await api.updateServiceInDb(id, serviceData);
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...serviceData } : s))
    );
  };

  const addService = async (serviceData: Omit<Service, 'id'>): Promise<Service> => {
    const newService = await api.insertService(serviceData);
    setServices((prev) => [...prev, newService]);
    return newService;
  };

  const deleteService = async (id: string) => {
    await api.deleteServiceFromDb(id);
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const addVeterinarian = async (
    vetData: Omit<Veterinarian, 'id'>
  ): Promise<Veterinarian> => {
    const newVet = await api.insertVeterinarian(vetData);
    setVeterinarians((prev) => [...prev, newVet]);
    return newVet;
  };

  const deleteVeterinarian = async (id: string) => {
    await api.deleteVeterinarianFromDb(id);
    setVeterinarians((prev) => prev.filter((v) => v.id !== id));
  };

  const contextValue: AppState = {
    currentUser,
    users,
    pets,
    services,
    veterinarians,
    appointments,
    loading,
    authReady,
    isConfigured: isSupabaseConfigured,
    signIn,
    signUp,
    signOut,
    createProvider,
    addPet,
    updatePet,
    deletePet,
    addAppointment,
    updateAppointment,
    cancelAppointment,
    addUser,
    updateUser,
    deleteUser,
    updateService,
    addService,
    deleteService,
    addVeterinarian,
    deleteVeterinarian,
    refreshData
  };

  return (
    <AppContext.Provider value={contextValue}>
      {!isSupabaseConfigured && <SupabaseConfigBanner />}
      {children}
    </AppContext.Provider>
  );
}

function SupabaseConfigBanner() {
  return (
    <div className="bg-amber-100 border-b border-amber-300 px-4 py-3 text-center text-sm text-amber-900">
      Supabase is not configured. Copy <code className="font-mono">.env.example</code> to{' '}
      <code className="font-mono">.env</code> and add your project URL and anon key, then run{' '}
      <code className="font-mono">supabase/schema.sql</code> in the Supabase SQL Editor.
    </div>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
