'use server'

import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/require-admin'
import { offerSchema, OfferFormValues } from '@/lib/validations/offer'
import { revalidatePath } from 'next/cache'
import { deleteStorageImage, deleteStorageImageIfReplaced } from '@/lib/storage-actions'

export async function createOffer(data: OfferFormValues) {
    await requireAdmin()

    await prisma.offer.create({
        data: {
            title: data.title,
            title_fr: data.title_fr,
            description: data.description,
            description_fr: data.description_fr,
            price: data.price,
            image_url: data.image_url,
            redirect_url: data.redirect_url || null,
        },
    })

    revalidatePath('/admin/offers')
}

export async function updateOffer(id: string, data: OfferFormValues) {
    await requireAdmin()

    const existing = await prisma.offer.findUnique({
        where: { id },
        select: { image_url: true },
    })

    await prisma.offer.update({
        where: { id },
        data: {
            title: data.title,
            title_fr: data.title_fr,
            description: data.description,
            description_fr: data.description_fr,
            price: data.price,
            image_url: data.image_url,
            redirect_url: data.redirect_url || null,
        },
    })

    await deleteStorageImageIfReplaced(existing?.image_url, data.image_url)

    revalidatePath('/admin/offers')
}

export async function deleteOffer(id: string) {
    await requireAdmin()

    const existing = await prisma.offer.findUnique({
        where: { id },
        select: { image_url: true },
    })

    await prisma.offer.delete({ where: { id } })

    await deleteStorageImage(existing?.image_url)

    revalidatePath('/admin/offers')
}
