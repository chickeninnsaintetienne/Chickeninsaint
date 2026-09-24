import { Button } from '@/components/ui/button'
import { getSettings } from '@/lib/get-settings'
import { ArrowRight, ChevronRight, Star, Phone } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { prisma } from '@/lib/prisma'
import { Hero } from '@/components/home/hero'
import { Story } from '@/components/home/story'
import { FeaturedCategories } from '@/components/home/featured-categories'

const UBER_EATS_URL = 'https://www.ubereats.com/fr-en/store/chicken-inn/1y9oUnWyQ1eDe857zd3SUg'
// Deliveroo is hidden for now. Set to true to show it again.
const SHOW_DELIVEROO = false

async function getFeaturedOffers() {
  const offers = await prisma.offer.findMany({ take: 3 })
  // Decimal isn't a valid React child -> convert to number for display.
  return offers.map(o => ({ ...o, price: Number(o.price) }))
}

export default async function Home(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'HomePage' })
  const settings = await getSettings()
  const offers = await getFeaturedOffers()

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Story />
      <FeaturedCategories />

      {/* Special Offers */}
      {offers && offers.length > 0 && (
        <section className="bg-white py-20">
          <div className="container mx-auto px-4 space-y-12">
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <h2 className="text-4xl font-black tracking-tight text-gray-900 uppercase">{t('Offers.title')}</h2>
                <p className="text-gray-500 font-medium">{t('Offers.subtitle')}</p>
              </div>
              <Link href="/offers" className="hidden md:flex items-center font-bold text-orange-600 hover:text-orange-700">
                {t('Offers.viewAll')} <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {offers.map((offer) => {
                const title = locale === 'fr' ? (offer as any).title_fr || offer.title : offer.title
                const description = locale === 'fr' ? (offer as any).description_fr || offer.description : offer.description

                return (
                  <Link key={offer.id} href={`/offers/${offer.id}`} className="block">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl text-gray-900 transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 h-full">
                      <div className="relative h-64 bg-gray-100">
                        <Image
                          src={offer.image_url}
                          alt={title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-orange-600 text-white px-4 py-2 rounded-full font-black text-lg shadow-lg">
                          €{offer.price}
                        </div>
                      </div>
                      <div className="p-6 space-y-3">
                        <h3 className="font-bold text-2xl tracking-tight">{title}</h3>
                        <p className="text-gray-500 line-clamp-2 leading-relaxed">{description}</p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            <div className="md:hidden text-center pt-8">
              <Link href="/offers" className="inline-flex items-center font-bold text-orange-600">
                {t('Offers.viewAll')} <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA / Delivery */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gray-900 rounded-[2.5rem] p-8 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-orange-600 opacity-10 pattern-dots" />

          <div className="relative z-10 space-y-10">
            <h2 className="font-oswald text-4xl md:text-6xl font-black tracking-tighter uppercase">{t('Delivery.title')}</h2>
            <p className="text-gray-300 max-w-xl mx-auto text-xl leading-relaxed">
              {t('Delivery.subtitle')}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {UBER_EATS_URL && (
                <a href={UBER_EATS_URL} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                  <Button size="lg" className="font-oswald bg-black hover:bg-zinc-900 text-white font-black h-11 px-6 rounded-xl w-full text-sm shadow-[0_6px_16px_-8px_rgba(0,0,0,0.5)] transition-all hover:scale-105 hover:-translate-y-0.5">
                    <Image src="/uber_eats.svg" alt="Uber Eats" width={90} height={22} className="h-5 w-auto brightness-0 invert" />
                  </Button>
                </a>
              )}
              {SHOW_DELIVEROO && settings?.deliveroo_url && (
                <a href={settings.deliveroo_url} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                  <Button size="lg" className="font-oswald bg-[#00CCBC] hover:bg-[#00a89b] text-white font-black h-11 px-6 rounded-xl w-full text-sm shadow-[0_6px_16px_-8px_rgba(0,204,188,0.5)] transition-all hover:scale-105 hover:-translate-y-0.5 flex items-center gap-2">
                    <Image src="/deliveroo.svg" alt="Deliveroo" width={22} height={22} className="h-5 w-auto brightness-0 invert" />
                    DELIVEROO
                  </Button>
                </a>
              )}
              <a href={`tel:${settings?.phone}`} className="w-full md:w-auto">
                <Button size="lg" className="font-oswald bg-orange-600 hover:bg-orange-700 text-white h-11 px-6 rounded-xl w-full text-sm font-black shadow-[0_6px_16px_-8px_rgba(234,88,12,0.5)] transition-all hover:scale-105 hover:-translate-y-0.5 flex items-center justify-center">
                  <Phone className="mr-2 h-4 w-4" /> {t('Delivery.callUs')}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
