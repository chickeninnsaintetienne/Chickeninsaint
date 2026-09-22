# Chicken Inn

Chicken Inn is a Next.js 16 application for the public menu and its admin area. The frontend is rendered by Next.js; the backend is Supabase for authentication, database, and storage. There is no separate local API server to run.

## Local setup

### Prerequisites

- Node.js 20 or later
- npm
- A Supabase project

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Create your local environment file and add your Supabase project values:

   ```bash
   cp .env.example .env.local
   ```

   `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are required to run the app. Keep `SUPABASE_SERVICE_ROLE_KEY` private; it is only needed by administrative scripts that write to Supabase.

3. Start the frontend:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Backend (Supabase)

Create a Supabase project, then run [`supabase_schema.sql`](./supabase_schema.sql) in its SQL editor to create the required tables and policies. Use the project URL and anon key in `.env.local`. The app's server actions and authentication use those same variables.

## Useful commands

```bash
npm run dev    # start local development
npm run build  # create a production build
npm run start  # serve the production build
npm run lint   # run ESLint
```

## Deployment

Deployment documentation is in [`docs/deployment`](./docs/deployment/). For the local-build deployment script, see [`LOCAL_BUILD_DEPLOY.md`](./docs/deployment/LOCAL_BUILD_DEPLOY.md).
