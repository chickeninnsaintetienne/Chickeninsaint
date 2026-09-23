import Link from 'next/link'
import { Facebook, MapPin, Phone, Clock, ChevronRight } from 'lucide-react'
import Tiktok from '../icons/Tiktok'
import { getSettings } from '@/lib/get-settings'
import { getTranslations } from 'next-intl/server'

export async function Footer() {
    const settings = await getSettings()
    const t = await getTranslations('HomePage.Footer')

    const links = [
        { href: '/menu', label: 'Menu' },
        { href: '/offers', label: 'Offers' },
        { href: '/locations', label: 'Location' },
    ]

    return (
        <footer className="relative bg-gray-900 text-white pt-16 pb-8 overflow-hidden">
            {/* Accent glow */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/70 to-transparent" />
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-orange-600/10 blur-3xl rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-black text-orange-500 tracking-tight">CHICKEN INN</h3>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">{t('taste')}</p>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-lg relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-orange-500">
                            {t('quickLinks')}
                        </h4>
                        <ul className="space-y-2.5 text-gray-400 pt-2">
                            {links.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="group inline-flex items-center gap-1 hover:text-orange-400 transition-colors"
                                    >
                                        <ChevronRight className="w-3.5 h-3.5 text-orange-500/0 -ml-4 group-hover:ml-0 group-hover:text-orange-500/100 transition-all" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-lg relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-orange-500">
                            {t('contactUs')}
                        </h4>
                        <ul className="space-y-3 text-gray-400 pt-2 text-sm">
                            {settings?.address && (
                                <li className="flex items-start gap-2.5">
                                    <MapPin className="w-4 h-4 mt-0.5 text-orange-500 shrink-0" />
                                    <span>{settings.address}</span>
                                </li>
                            )}
                            {settings?.phone && (
                                <li className="flex items-center gap-2.5">
                                    <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                                    <span>{settings.phone}</span>
                                </li>
                            )}
                            {settings?.hours && (
                                <li className="flex items-start gap-2.5">
                                    <Clock className="w-4 h-4 mt-0.5 text-orange-500 shrink-0" />
                                    <span>{settings.hours}</span>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Social */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-lg relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-orange-500">
                            {t('followUs')}
                        </h4>
                        <div className="flex gap-3 pt-2">
                            {settings?.social_facebook && (
                                <a
                                    href={settings.social_facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                    className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center hover:bg-orange-600 hover:border-orange-600 hover:scale-105 transition-all"
                                >
                                    <Facebook className="w-4 h-4" />
                                </a>
                            )}
                            <a
                                href="https://www.tiktok.com/@chickeninn.france?_r=1&_t=ZN-91x0L1MXafW"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="TikTok"
                                className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center hover:bg-orange-600 hover:border-orange-600 hover:scale-105 transition-all"
                            >
                                <Tiktok className="w-4 h-4 text-white" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Chicken Inn. {t('rights')}</p>
                    <p className="text-gray-600">Saint-Étienne, France</p>
                </div>
            </div>
        </footer>
    )
}
