'use server'

import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/require-admin'
import { productSchema, ProductFormValues } from '@/lib/validations/product'
import { revalidatePath } from 'next/cache'
import { deleteStorageImage, deleteStorageImageIfReplaced } from '@/lib/storage-actions'

export async function createProduct(data: ProductFormValues) {
    await requireAdmin()

    await prisma.product.create({
        data: {
            number: data.number,
            name: data.name,
            name_fr: data.name_fr,
            description: data.description,
            description_fr: data.description_fr,
            ingredients: data.ingredients ? data.ingredients.split(',').map(i => i.trim()) : [],
            category_id: data.category_id,
            price_solo: data.price_solo,
            price_menu: data.price_menu,
            quantity: data.quantity,
            display_order: data.display_order || 0,
            image_url: data.image_url || '',
        },
    })

    revalidatePath('/admin/products')
}

export async function updateProduct(id: string, data: ProductFormValues) {
    await requireAdmin()

    const existing = await prisma.product.findUnique({
        where: { id },
        select: { image_url: true },
    })

    await prisma.product.update({
        where: { id },
        data: {
            number: data.number,
            name: data.name,
            name_fr: data.name_fr,
            description: data.description,
            description_fr: data.description_fr,
            ingredients: data.ingredients ? data.ingredients.split(',').map(i => i.trim()) : [],
            category_id: data.category_id,
            price_solo: data.price_solo,
            price_menu: data.price_menu,
            quantity: data.quantity,
            display_order: data.display_order || 0,
            image_url: data.image_url,
        },
    })

    // Remove the old image from storage now that it's been replaced
    await deleteStorageImageIfReplaced(existing?.image_url, data.image_url)

    revalidatePath('/admin/products')
}

export async function deleteProduct(id: string) {
    await requireAdmin()

    const existing = await prisma.product.findUnique({
        where: { id },
        select: { image_url: true },
    })

    await prisma.product.delete({ where: { id } })

    await deleteStorageImage(existing?.image_url)

    revalidatePath('/admin/products')
}
