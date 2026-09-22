'use client'

import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface ProductCardProps {
    product: any
    onClick: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <Card
                className="overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-orange-600 bg-white shadow-md h-full flex flex-col"
                onClick={onClick}
            >
                <div className="relative h-52 w-full bg-gradient-to-br from-gray-50 to-gray-100">
                    {product.image_url ? (
                        <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-gray-300 text-5xl">🍔</div>
                        </div>
                    )}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-black text-gray-900 shadow-md">
                        #{product.number}
                    </div>
                </div>

                <div className="p-5 flex-grow flex flex-col">
                    <div className="mb-3">
                        <h3 className="font-bold text-xl text-gray-900 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
                            {product.name}
                        </h3>
                        {product.quantity && (
                            <p className="text-xs text-gray-500 font-medium mt-1">{product.quantity}</p>
                        )}
                        {product.description && (
                            <p className="text-xs text-gray-400 line-clamp-2 mt-1.5 leading-relaxed">{product.description}</p>
                        )}
                    </div>

                    <div className="mt-auto">
                        <div className="flex items-center gap-2.5 p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg">
                            <div className="flex-1">
                                <div className="text-[10px] text-white/80 font-medium mb-0.5">Solo</div>
                                <div className="font-black text-xl text-white">€{product.price_solo}</div>
                            </div>
                            
                            {product.price_menu && (
                                <>
                                    <div className="w-px h-10 bg-white/30"></div>
                                    <div className="flex-1">
                                        <div className="text-[10px] text-white/80 font-medium mb-0.5 flex items-center gap-1.5">
                                            Menu
                                            <div className="relative w-10 h-8">
                                                <Image 
                                                    src="/drink_fries.png" 
                                                    alt="Fries + Drink" 
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>
                                        <div className="font-black text-xl text-white">€{product.price_menu}</div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    )
}
