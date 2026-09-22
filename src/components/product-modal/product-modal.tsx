'use client'

import {
    Dialog,
    DialogContent,
} from '@/components/ui/dialog'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import { useLocale } from 'next-intl'

interface ProductModalProps {
    product: any
    isOpen: boolean
    onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
    const locale = useLocale()
    
    if (!product) return null

    const name = locale === 'fr' ? (product.name_fr || product.name) : product.name
    const description = locale === 'fr' ? (product.description_fr || product.description) : product.description

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-white">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg transition-all hover:scale-110"
                >
                    <X className="h-5 w-5 text-gray-900" />
                </button>

                <div className="grid md:grid-cols-5 gap-0">
                    <div className="md:col-span-3 relative h-80 md:h-auto bg-gradient-to-br from-orange-50 to-orange-100">
                        {product.image_url ? (
                            <Image
                                src={product.image_url}
                                alt={name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="text-gray-300 text-9xl">🍔</div>
                            </div>
                        )}
                        
                        <div className="absolute top-4 left-4">
                            <Badge className="text-base font-black text-white bg-gray-900/80 backdrop-blur-sm px-4 py-2">
                                #{product.number}
                            </Badge>
                        </div>
                    </div>

                    <div className="md:col-span-2 p-8 space-y-6 flex flex-col">
                        <div className="space-y-3">
                            <div className="flex items-start justify-between gap-3">
                                <Badge variant="outline" className="text-sm font-semibold border-orange-600 text-orange-600">
                                    {product.category?.name || 'Item'}
                                </Badge>
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 leading-tight">{name}</h2>
                            {product.quantity && (
                                <p className="text-lg font-semibold text-gray-600">{product.quantity}</p>
                            )}
                        </div>

                        {description && (
                            <p className="text-gray-600 leading-relaxed text-base">
                                {description}
                            </p>
                        )}

                        {product.ingredients && product.ingredients.length > 0 && (
                            <div className="space-y-2">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                                    {locale === 'fr' ? 'Ingrédients' : 'Ingredients'}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.ingredients.map((ing: string, i: number) => (
                                        <span key={i} className="text-sm bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full font-medium border border-orange-100">
                                            {ing}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="pt-4 space-y-3 mt-auto">
                            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-xl">
                                <span className="font-bold text-gray-900 text-lg">{locale === 'fr' ? 'Prix Solo' : 'Solo Price'}</span>
                                <span className="font-black text-2xl text-orange-600">€{product.price_solo}</span>
                            </div>
                            
                            {product.price_menu && (
                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg">
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-white text-lg">{locale === 'fr' ? 'Prix Menu' : 'Menu Price'}</span>
                                        <div className="relative w-16 h-14">
                                            <Image 
                                                src="/drink_fries.png" 
                                                alt="Fries + Drink" 
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                    <span className="font-black text-2xl text-white">€{product.price_menu}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
