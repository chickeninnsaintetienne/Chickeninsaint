import Link from 'next/link'
import { Facebook } from 'lucide-react'
import Tiktok from '../icons/Tiktok'
import { getSettings } from '@/lib/get-settings'
import { getTranslations } from 'next-intl/server'

export async function Footer() {
    const settings = await getSettings()
    const t = await getTranslations('HomePage.Footer')

    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-black text-orange-500">CHICKEN INN</h3>
                        <p className="text-gray-400 text-sm">{t('taste')}</p>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-lg">{t('quickLinks')}</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link href="/menu" className="hover:text-white transition-colors">Menu</Link></li>
                            <li><Link href="/offers" className="hover:text-white transition-colors">Offers</Link></li>
                            <li><Link href="/locations" className="hover:text-white transition-colors">Location</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-lg">{t('contactUs')}</h4>
                        <ul className="space-y-2 text-gray-400">
                            {settings?.address && (
                                <li>{settings.address}</li>
                            )}
                            {settings?.phone && (
                                <li>{settings.phone}</li>
                            )}
                            {settings?.hours && (
                                <li>{settings.hours}</li>
                            )}
                        </ul>
                    </div>

                    {/* Social */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-lg">{t('followUs')}</h4>
                        <div className="flex gap-4">
                            {settings?.social_facebook && (
                                <a href={settings.social_facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 transition-colors">
                                    <Facebook className="w-5 h-5" />
                                </a>
                            )}
                            <a href="https://www.tiktok.com/@chickeninn.france?_r=1&_t=ZN-91x0L1MXafW" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 transition-colors">
                                <Tiktok className="w-5 h-5 text-white" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Chicken Inn. {t('rights')}</p>
                </div>
            </div>
        </footer>
    )
}
