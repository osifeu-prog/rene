# rene-improved

Improved scaffold of the original project:
- Next.js app
- Supabase for auth + Postgres DB
- TailwindCSS
- Tasks API with persistent storage
- Protected dashboard and simple UI

## Quick setup

1. Create a Supabase project and get the **SUPABASE_URL** and **SUPABASE_ANON_KEY**.
2. Create a table `tasks` with:
   - id: bigint (primary key, identity)
   - title: text
   - description: text
   - completed: boolean default false
   - created_at: timestamptz default now()
   - user_id: uuid

Alternatively the app will use row-level security; set RLS policies to allow authenticated users to CRUD their own tasks.

3. Create `.env.local` with the following:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key (optional, for server-side admin)
   ```

4. Install and run:
   ```
   npm install
   npm run dev
   ```

## What is included
- pages/index.jsx (landing + login)
- pages/dashboard.jsx (protected)
- pages/api/tasks.js (server-side task CRUD using Supabase service key)
- lib/supabaseClient.js (browser) and lib/supabaseServer.js (server)
- components/TaskCard.jsx, ProgressBar.jsx
- middleware.js protecting /dashboard
- Tailwind config + global CSS

---

If you'd like, I can:
- add registration + magic-link UI,
- add GitHub Actions for deployment,
- convert to App Router,
- or implement offline-sync/local-first behavior.
