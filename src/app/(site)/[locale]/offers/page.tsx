import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { ExternalLink, Tag } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'

export const dynamic = 'force-dynamic'

interface OffersPageProps {
    params: Promise<{ locale: string }>
}

export default async function OffersPage({ params }: OffersPageProps) {
    const resolvedParams = await params
    const { locale } = resolvedParams

    const offersRaw = await prisma.offer.findMany({ orderBy: { created_at: 'desc' } })
    // Decimal isn't a valid React child -> convert to number for display.
    const offers = offersRaw.map(o => ({ ...o, price: Number(o.price) }))

    const t = await getTranslations('HomePage.Offers')

    return (
        <div className="container mx-auto px-4 py-12 space-y-12 min-h-screen">
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-black text-gray-900 tracking-tight">{t('title')}</h1>
                <p className="text-xl text-gray-500">{t('subtitle')}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {offers.map((offer) => {
                    const title = locale === 'fr' ? (offer.title_fr || offer.title) : offer.title
                    const description = locale === 'fr' ? (offer.description_fr || offer.description) : offer.description
                    
                    return (
                        <Link key={offer.id} href={`/offers/${offer.id}`}>
                            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-600 flex flex-col h-full cursor-pointer">
                                <div className="relative h-72 w-full bg-gradient-to-br from-orange-50 to-orange-100 overflow-hidden">
                                    <Image
                                        src={offer.image_url}
                                        alt={title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-full font-black text-2xl shadow-xl">
                                        €{offer.price}
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow space-y-4">
                                    <div className="flex-grow space-y-3">
                                        <h2 className="text-3xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{title}</h2>
                                        <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
                                    </div>
                                    {offer.redirect_url && (
                                        <div className="flex items-center text-orange-600 font-bold group-hover:text-orange-700">
                                            <span className="mr-2">{t('orderDeal')}</span>
                                            <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    )
                })}

                {offers.length === 0 && (
                    <div className="col-span-2 flex flex-col items-center justify-center py-24 text-center">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 rounded-full bg-orange-100 animate-ping opacity-75" />
                            <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-orange-50 border-2 border-orange-100 animate-bounce [animation-duration:2s]">
                                <Tag className="h-9 w-9 text-orange-400" strokeWidth={1.75} />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-700">{t('noOffersTitle')}</h2>
                        <p className="text-gray-400 mt-2">{t('noOffersSubtitle')}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
