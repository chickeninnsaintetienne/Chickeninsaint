'use server'

import { prisma } from '@/lib/prisma'

// Used by ProductForm (src/components/admin/product-form.tsx), which used
// to fetch categories itself via a dynamically-imported browser Supabase
// client. Prisma can't run in the browser, so this replaces that fetch.
export async function listCategoriesForForm() {
    return prisma.category.findMany({ orderBy: { name: 'asc' } })
}

// Used by DownloadMenu (src/components/download-menu/download-menu.tsx),
// which used to fetch settings.menu_pdf_url itself via a browser Supabase
// client. Prisma can't run in the browser, so this replaces that fetch.
export async function getMenuPdfUrl() {
    const settings = await prisma.settings.findFirst({ select: { menu_pdf_url: true } })
    return settings?.menu_pdf_url ?? null
}
