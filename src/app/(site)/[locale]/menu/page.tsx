import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { MenuContent } from './menu-content'

// Prisma can only run on the server. The old version of this page was a
// 'use client' component that called supabase.from(...) inside a useEffect
// on mount — that pattern doesn't work with Prisma, since a Prisma client
// can't run in the browser at all. So the fetch moves here, to a server
// component, and only the interactive bits (category tabs, scroll arrows,
// the product modal) stay client-side, in menu-content.tsx.
export default async function MenuPage() {
    const [categories, productsRaw] = await Promise.all([
        prisma.category.findMany({ orderBy: { display_order: 'asc' } }),
        prisma.product.findMany({
            include: { category: true },
            orderBy: { display_order: 'asc' },
        }),
    ])

    // Decimal isn't serializable across the server -> client boundary,
    // and isn't a valid React child either — convert before handing off.
    const products = productsRaw.map(p => ({
        ...p,
        price_solo: p.price_solo === null ? null : Number(p.price_solo),
        price_menu: p.price_menu === null ? null : Number(p.price_menu),
    }))

    return (
        <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-orange-600" /></div>}>
            <MenuContent categories={categories} products={products} />
        </Suspense>
    )
}
