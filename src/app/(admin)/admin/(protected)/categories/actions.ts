'use server'

import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/require-admin'
import { revalidatePath } from 'next/cache'
import { deleteStorageImage, deleteStorageImageIfReplaced } from '@/lib/storage-actions'

export interface CategoryFormValues {
    name: string
    name_fr?: string
    slug: string
    image_url?: string
    display_order: number
}

export async function createCategory(data: CategoryFormValues) {
    await requireAdmin()

    await prisma.category.create({
        data: {
            name: data.name,
            name_fr: data.name_fr,
            slug: data.slug,
            image_url: data.image_url || '',
            display_order: data.display_order || 0,
        },
    })

    revalidatePath('/admin/categories')
}

export async function updateCategory(id: string, data: CategoryFormValues) {
    await requireAdmin()

    const existing = await prisma.category.findUnique({
        where: { id },
        select: { image_url: true },
    })

    await prisma.category.update({
        where: { id },
        data: {
            name: data.name,
            name_fr: data.name_fr,
            slug: data.slug,
            image_url: data.image_url,
            display_order: data.display_order,
        },
    })

    await deleteStorageImageIfReplaced(existing?.image_url, data.image_url)

    revalidatePath('/admin/categories')
}

export async function deleteCategory(id: string) {
    await requireAdmin()

    const existing = await prisma.category.findUnique({
        where: { id },
        select: { image_url: true },
    })

    await prisma.category.delete({ where: { id } })

    await deleteStorageImage(existing?.image_url)

    revalidatePath('/admin/categories')
}
