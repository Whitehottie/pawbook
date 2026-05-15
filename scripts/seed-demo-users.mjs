/**
 * Creates demo admin + provider accounts in Supabase.
 *
 * Requires in .env:
 *   VITE_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY  (Project Settings → API → service_role — keep secret!)
 *
 * Run: npm run seed:demo
 */
import { createClient } from '@supabase/supabase-js';
import { loadEnv } from './load-env.mjs';

loadEnv();

const url = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error(`
Missing environment variables.

Add to pawbookV2_lataest_april-19/.env:

  VITE_SUPABASE_URL=https://xxxx.supabase.co
  VITE_SUPABASE_ANON_KEY=your-anon-key
  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

Get keys from: Supabase Dashboard → Project Settings → API
`);
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const DEMO_USERS = [
  {
    email: 'admin@pawbook.com',
    password: 'admin123',
    name: 'System Administrator',
    phone: '555-0001',
    role: 'admin'
  },
  {
    email: 'clinic.manager@pawbook.com',
    password: 'manager123',
    name: 'Clinic Manager',
    phone: '555-0002',
    role: 'admin'
  },
  {
    email: 'vet@pawbook.com',
    password: 'vet123',
    name: 'Dr. Sarah Mitchell',
    phone: '555-0003',
    role: 'provider',
    specialty: 'General Practice'
  }
];

async function findUserByEmail(email) {
  let page = 1;
  const perPage = 200;
  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    const match = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
    if (match) return match;
    if (data.users.length < perPage) return null;
    page += 1;
  }
}

async function ensureUser({ email, password, name, phone, role }) {
  let user = await findUserByEmail(email);

  if (!user) {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name, phone, role }
    });
    if (error) throw new Error(`Create ${email}: ${error.message}`);
    user = data.user;
    console.log(`  Created auth user: ${email}`);
  } else {
    const { error } = await supabase.auth.admin.updateUserById(user.id, {
      password,
      user_metadata: { name, phone, role }
    });
    if (error) throw new Error(`Update ${email}: ${error.message}`);
    console.log(`  Updated existing user: ${email}`);
  }

  const { error: profileError } = await supabase.from('profiles').upsert(
    {
      id: user.id,
      email,
      name,
      phone,
      role
    },
    { onConflict: 'id' }
  );
  if (profileError) throw new Error(`Profile ${email}: ${profileError.message}`);

  return user.id;
}

async function linkProviderVet(userId, name, specialty) {
  const { data: existing } = await supabase
    .from('veterinarians')
    .select('id')
    .eq('name', name)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from('veterinarians')
      .update({ user_id: userId, specialty })
      .eq('id', existing.id);
    if (error) throw error;
    console.log(`  Linked veterinarian profile: ${name}`);
    return;
  }

  const { error } = await supabase.from('veterinarians').insert({
    user_id: userId,
    name,
    specialty
  });
  if (error) throw error;
  console.log(`  Created veterinarian profile: ${name}`);
}

async function main() {
  console.log('\nPawBook — seeding demo accounts\n');

  for (const demo of DEMO_USERS) {
    console.log(`→ ${demo.email} (${demo.role})`);
    const userId = await ensureUser(demo);
    if (demo.role === 'provider' && demo.specialty) {
      await linkProviderVet(userId, demo.name, demo.specialty);
    }
  }

  console.log(`
Done! Demo logins:

  Admin     admin@pawbook.com          / admin123
  Admin     clinic.manager@pawbook.com / manager123
  Provider  vet@pawbook.com            / vet123

Start the app: npm run dev
`);
}

main().catch((err) => {
  console.error('\nSeed failed:', err.message);
  process.exit(1);
});
