import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

// Prisma 7 moved the connection string out of schema.prisma and into this
// file. The Prisma CLI (migrate, db pull, studio, seed) always reads DIRECT_URL
// here — it needs a direct, non-pooled connection. The app itself doesn't use
// this file; at runtime it connects through the driver adapter in
// src/lib/prisma.ts, using the pooled DATABASE_URL. Both env vars come from
// Supabase's dashboard → Database → Connection string (pooled = port 6543
// with ?pgbouncer=true, direct = port 5432).
export default defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
        seed: 'tsx prisma/seed.ts',
    },
    datasource: {
        url: env('DIRECT_URL'),
    },
})
