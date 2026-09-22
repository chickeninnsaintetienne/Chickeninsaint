import { prisma } from '@/lib/prisma'
import { OfferForm } from '@/components/admin/offer-form'
import { notFound } from 'next/navigation'

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function EditOfferPage({ params }: PageProps) {
    const { id } = await params
    const offer = await prisma.offer.findUnique({ where: { id } })

    if (!offer) {
        notFound()
    }

    // Prisma's Decimal type can't cross the server -> client component boundary
    // as-is; convert to a plain number before handing it to the client form.
    const offerForForm = { ...offer, price: Number(offer.price) }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Edit Offer</h1>
            <OfferForm initialData={offerForForm} isEdit />
        </div>
    )
}
