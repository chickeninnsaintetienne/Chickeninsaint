import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// Prisma 7 dropped the Rust query engine in favor of JS driver adapters, so
// the client now needs one explicitly — it can no longer just read a
// connection string off the datasource block. This uses the pooled
// DATABASE_URL at runtime; the Prisma CLI uses the direct DIRECT_URL instead,
// configured separately in prisma.config.ts.
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

function createPrismaClient() {
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) {
        throw new Error('DATABASE_URL is not set')
    }
    const adapter = new PrismaPg({ connectionString })
    return new PrismaClient({ adapter })
}

// Next.js dev mode reloads modules on every request. Without this cache,
// each reload would create a new PrismaClient (and a new connection pool)
// instead of reusing one, and you'd exhaust Postgres connections within a
// few minutes of editing code.
export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}
