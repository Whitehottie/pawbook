import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

/** Strip whitespace and accidental quotes from Vercel / .env paste mistakes. */
function readEnv(value: string | undefined): string {
  let v = (value ?? '').trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1).trim();
  }
  return v;
}

function isValidSupabaseUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === 'https:' && parsed.hostname.endsWith('.supabase.co')
    );
  } catch {
    return false;
  }
}

const supabaseUrl = readEnv(import.meta.env.VITE_SUPABASE_URL);
const supabaseAnonKey = readEnv(import.meta.env.VITE_SUPABASE_ANON_KEY);

export const isSupabaseConfigured =
  Boolean(supabaseUrl && supabaseAnonKey) && isValidSupabaseUrl(supabaseUrl);

// createClient throws when URL is empty — breaks the whole app (white screen on Vercel
// if VITE_* vars were missing at build time). Use placeholders when not configured.
const clientUrl = isSupabaseConfigured
  ? supabaseUrl
  : 'https://placeholder.supabase.co';
const clientKey = isSupabaseConfigured
  ? supabaseAnonKey
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYwMDAwMDAsImV4cCI6MTk2MTU3NjAwMH0.placeholder';

export const supabase = createClient<Database>(clientUrl, clientKey);
