'use server'

import { prisma } from '@/lib/prisma'

// Prisma can't run in the browser, so the two client-side product-search
// components (src/components/core/search.tsx and
// src/components/search-modal/search-modal.tsx) can no longer call
// supabase.from('products').select(...).ilike(...) directly. They now call
// this server action instead. Decimal price fields are converted to plain
// numbers here, for the same reason as elsewhere: Decimal isn't a valid
// React child and doesn't serialize across the server -> client boundary.
export async function searchProducts(query: string) {
    if (query.length < 2) return []

    const products = await prisma.product.findMany({
        where: {
            name: { contains: query, mode: 'insensitive' },
        },
        take: 5,
    })

    return products.map(p => ({
        ...p,
        price_solo: p.price_solo === null ? null : Number(p.price_solo),
        price_menu: p.price_menu === null ? null : Number(p.price_menu),
    }))
}
