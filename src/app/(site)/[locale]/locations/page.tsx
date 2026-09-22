import { getSettings } from '@/lib/get-settings'
import { MapPin, Phone, Clock, Navigation, Facebook } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Tiktok from '@/components/icons/Tiktok'

export default async function LocationsPage() {
    const settings = await getSettings()

    return (
        <div className="container mx-auto px-4 py-12 space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-black tracking-tight">FIND US</h1>
                <p className="text-gray-500">Visit us for the best experience</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-stretch">
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Chicken Inn France</h2>
                    <div className="space-y-4 flex-grow">
                        <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                            <p className="text-lg text-gray-700">{settings?.address || 'Address not set'}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Phone className="w-6 h-6 text-orange-600 flex-shrink-0" />
                            <p className="text-lg text-gray-700">{settings?.phone || 'Phone not set'}</p>
                        </div>
                        <div className="flex items-start gap-4">
                            <Clock className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                            <p className="text-lg text-gray-700 whitespace-pre-line">{settings?.hours || 'Hours not set'}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Facebook className="w-6 h-6 text-orange-600 flex-shrink-0" />
                            <a href="https://www.facebook.com/share/1GunfWv52R/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-lg text-gray-700 hover:text-orange-600 transition-colors">
                                Facebook
                            </a>
                        </div>
                        <div className="flex items-center gap-4">
                            <Tiktok className="w-6 h-6 text-orange-600 flex-shrink-0" />
                            <a href="https://www.tiktok.com/@chickeninn.france?_r=1&_t=ZN-91x0L1MXafW" target="_blank" rel="noopener noreferrer" className="text-lg text-gray-700 hover:text-orange-600 transition-colors">
                                TikTok
                            </a>
                        </div>
                    </div>

                    <div className="pt-6 mt-auto">
                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(settings?.address || '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700 font-bold">
                                <Navigation className="mr-2 h-5 w-5" /> Get Directions
                            </Button>
                        </a>
                    </div>
                </div>

                <div className="w-full rounded-3xl overflow-hidden shadow-lg h-full min-h-[500px]">
                    <iframe
                        className="w-full h-full"
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
    )
}
