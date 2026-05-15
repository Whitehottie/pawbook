# PawBook — Supabase setup guide

## Part 1: Create your Supabase project

1. Go to [https://supabase.com](https://supabase.com) and sign in (or create an account).
2. Click **New project**.
3. Fill in:
   - **Name**: `pawbook` (or any name)
   - **Database password**: choose a strong password and save it somewhere safe
   - **Region**: pick the closest region to you
4. Click **Create new project** and wait ~2 minutes for provisioning.

## Part 2: Run the database schema

1. In your project, open **SQL Editor** (left sidebar).
2. Click **New query**.
3. Open `supabase/schema.sql` from this repo, copy **all** of it, paste into the editor.
4. Click **Run** (or Ctrl+Enter).
5. You should see **Success** — tables, RLS policies, and sample services/vets are created.

## Part 3: Configure authentication (required)

1. Go to **Authentication** → **Providers** → **Email**.
2. Turn **OFF** **“Confirm email”** (stops confirmation emails on every sign-up).
3. Click **Save**.

This prevents **“email rate limit exceeded”** while testing. Supabase free tier only allows a few auth emails per hour.

Optional: **Authentication** → **Rate Limits** — review limits (upgrade plan to raise them).

## Part 4: Connect the React app

1. In the project folder, copy the env template:

   ```bash
   copy .env.example .env
   ```

2. In Supabase: **Project Settings** → **API**.
3. Copy into `.env`:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (only for seed script — never commit or use in frontend)

4. Install and run:

   ```bash
   npm install
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173).

## Part 5: Seed demo accounts (recommended)

From `pawbookV2_lataest_april-19`:

```bash
npm run seed:demo
```

This creates:

| Role     | Email                      | Password    |
|----------|----------------------------|-------------|
| Admin    | admin@pawbook.com          | admin123    |
| Admin    | clinic.manager@pawbook.com | manager123  |
| Provider | vet@pawbook.com            | vet123      |

Then sign in at `/signin`.

## Manual alternative (no seed script)

1. **Authentication** → **Users** → **Add user** → create `admin@pawbook.com` with a password.
2. **SQL Editor**:

   ```sql
   update public.profiles set role = 'admin' where email = 'admin@pawbook.com';
   ```

Repeat for other accounts, or use `npm run seed:demo` instead.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Yellow “Supabase not configured” banner | Add `.env` with URL + anon key, restart `npm run dev` |
| “Invalid email or password” | Run `npm run seed:demo` or check user exists under Authentication → Users |
| Sign-up does nothing | Disable “Confirm email” in Auth settings |
| **email rate limit exceeded** | Turn OFF “Confirm email” (Part 3), wait ~1 hour, then try again or use **Sign in** |
| RLS / permission errors | Re-run `supabase/schema.sql` in SQL Editor |
| Seed script fails | Ensure `SUPABASE_SERVICE_ROLE_KEY` is in `.env` (not the anon key) |

## Security note

- **anon key** → safe in the React app (with RLS).
- **service_role key** → server/seed only; bypasses RLS. Never put it in `VITE_*` variables or commit `.env`.
