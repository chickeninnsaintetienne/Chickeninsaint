import { getSettings } from '@/lib/get-settings'
import { MapPin, Phone, Clock, Navigation, Facebook, PhoneCall } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Tiktok from '@/components/icons/Tiktok'
import { getTranslations } from 'next-intl/server'

export default async function LocationsPage() {
    const settings = await getSettings()
    const t = await getTranslations('HomePage.Locations')

    const mapsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(settings?.address || '')}`
    const telHref = settings?.phone ? `tel:${settings.phone.replace(/\s+/g, '')}` : undefined

    const infoRows = [
        {
            icon: MapPin,
            label: t('addressLabel'),
            value: settings?.address || t('addressNotSet'),
            href: settings?.address ? mapsHref : undefined,
        },
        {
            icon: Phone,
            label: t('phoneLabel'),
            value: settings?.phone || t('phoneNotSet'),
            href: telHref,
        },
        {
            icon: Clock,
            label: t('hoursLabel'),
            value: settings?.hours || t('hoursNotSet'),
            multiline: true,
        },
    ]

    const socials = [
        { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/share/1GunfWv52R/?mibextid=wwXIfr' },
        { icon: Tiktok, label: 'TikTok', href: 'https://www.tiktok.com/@chickeninn.france?_r=1&_t=ZN-91x0L1MXafW' },
    ]

    return (
        <div className="relative overflow-hidden">
            {/* Ambient background accent */}
            <div className="absolute top-0 inset-x-0 h-[420px] bg-gradient-to-b from-orange-50 to-transparent -z-10" />
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-64 bg-orange-300/20 blur-3xl rounded-full -z-10" />

            <div className="container mx-auto px-4 py-16 space-y-14">
                <div className="text-center space-y-3 max-w-xl mx-auto">
                    <span className="inline-block text-xs font-bold tracking-[0.2em] text-orange-600 bg-orange-50 border border-orange-100 px-4 py-1.5 rounded-full uppercase">
                        {t('eyebrow')}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">{t('title')}</h1>
                    <p className="text-gray-500 text-lg">{t('subtitle')}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch">
                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col">
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">Chicken Inn France</h2>
                        <p className="text-sm text-gray-400 mb-6">Saint-Étienne</p>

                        <div className="flex-grow divide-y divide-gray-100">
                            {infoRows.map((row) => {
                                const Icon = row.icon
                                const content = (
                                    <div className="flex items-start gap-4 py-4 first:pt-0">
                                        <div className="w-11 h-11 rounded-2xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-0.5">{row.label}</p>
                                            <p className={`text-gray-800 font-medium ${row.multiline ? 'whitespace-pre-line' : ''}`}>
                                                {row.value}
                                            </p>
                                        </div>
                                    </div>
                                )
                                return row.href ? (
                                    <a key={row.label} href={row.href} target="_blank" rel="noopener noreferrer" className="block hover:bg-gray-50/80 -mx-2 px-2 rounded-xl transition-colors">
                                        {content}
                                    </a>
                                ) : (
                                    <div key={row.label}>{content}</div>
                                )
                            })}

                            <div className="flex items-center gap-3 py-4">
                                {socials.map((s) => {
                                    const Icon = s.icon
                                    return (
                                        <a
                                            key={s.label}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={s.label}
                                            className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-colors"
                                        >
                                            <Icon className="w-4 h-4" />
                                        </a>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="pt-6 mt-auto flex flex-col sm:flex-row gap-3">
                            <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="flex-1">
                                <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700 font-bold shadow-lg shadow-orange-600/20">
                                    <Navigation className="mr-2 h-5 w-5" /> {t('getDirections')}
                                </Button>
                            </a>
                            {telHref && (
                                <a href={telHref} className="flex-1">
                                    <Button size="lg" variant="outline" className="w-full font-bold border-gray-200 hover:bg-gray-50">
                                        <PhoneCall className="mr-2 h-5 w-5 text-orange-600" /> {t('callUs')}
                                    </Button>
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="w-full rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100 h-full min-h-[420px] md:min-h-[500px]">
                        <iframe
                            className="w-full h-full grayscale-[15%] contrast-[1.05]"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight={0}
                            marginWidth={0}
                            src={`https://maps.google.com/maps?width=600&height=400&hl=en&q=${encodeURIComponent(settings?.address || '88 Rue Du 11 Novembre 42100 Saint Etienne, France')}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                            allowFullScreen
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
