import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL ?? '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? '').trim();

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// createClient throws when URL is empty — breaks the whole app (white screen on Vercel
// if VITE_* vars were missing at build time). Use placeholders when not configured.
const clientUrl = isSupabaseConfigured
  ? supabaseUrl
  : 'https://placeholder.supabase.co';
const clientKey = isSupabaseConfigured
  ? supabaseAnonKey
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYwMDAwMDAsImV4cCI6MTk2MTU3NjAwMH0.placeholder';

export const supabase = createClient<Database>(clientUrl, clientKey);
