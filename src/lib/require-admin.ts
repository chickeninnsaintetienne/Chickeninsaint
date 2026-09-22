import { createClient } from '@/lib/supabase/server'

/**
 * Every admin server action must call this before touching Prisma.
 *
 * Today, RLS policies (`to authenticated with check (true)`) are the only
 * thing stopping an anonymous request from writing to products/categories/
 * offers/settings — the server actions themselves never check who's calling.
 * Prisma connects with a privileged database role and does not know about
 * RLS, so once actions call `prisma.x.create/update/delete` directly, that
 * protection disappears unless each action checks auth itself.
 *
 * Supabase Auth (the login page, cookies, `@supabase/ssr`) stays exactly as
 * it is — only the *data* layer is moving to Prisma. This helper just asks
 * Supabase Auth "is there a valid session?" before letting a Prisma write
 * through.
 */
export async function requireAdmin() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Unauthorized')
    }

    return user
}
