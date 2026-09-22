import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ExternalLink, ArrowLeft } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface OfferPageProps {
    params: Promise<{ id: string; locale: string }>
}

export default async function OfferPage({ params }: OfferPageProps) {
    const resolvedParams = await params
    const { id, locale } = resolvedParams

    const offerRaw = await prisma.offer.findUnique({ where: { id } })

    if (!offerRaw) {
        notFound()
    }

    // Decimal isn't a valid React child -> convert to number for display.
    const offer = { ...offerRaw, price: Number(offerRaw.price) }

    const title = locale === 'fr' ? (offer.title_fr || offer.title) : offer.title
    const description = locale === 'fr' ? (offer.description_fr || offer.description) : offer.description

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <Link href="/offers" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-8 font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" /> {locale === 'fr' ? 'Retour aux offres' : 'Back to Offers'}
            </Link>

            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                    <div className="relative h-96 bg-gray-100">
                        <Image
                            src={offer.image_url}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute top-8 right-8 bg-red-600 text-white px-8 py-4 rounded-full font-black text-3xl shadow-xl">
                            €{offer.price}
                        </div>
                    </div>

                    <div className="p-12 space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-5xl font-black text-gray-900 tracking-tight">{title}</h1>
                            <p className="text-xl text-gray-600 leading-relaxed">{description}</p>
                        </div>

                        {offer.redirect_url && (
                            <div className="pt-6">
                                <a href={offer.redirect_url} target="_blank" rel="noopener noreferrer">
                                    <Button size="lg" className="w-full text-xl font-bold bg-orange-600 hover:bg-orange-700 h-16">
                                        {locale === 'fr' ? 'Commander cette offre' : 'Order This Deal'} <ExternalLink className="ml-2 h-6 w-6" />
                                    </Button>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

