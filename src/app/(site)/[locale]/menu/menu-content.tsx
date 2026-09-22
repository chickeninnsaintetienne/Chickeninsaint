'use client'

import { useState, useEffect, useRef } from 'react'
import { ProductCard } from '@/components/product-card/product-card'
import { ProductModal } from '@/components/product-modal/product-modal'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Category } from '@/lib/types'
import { useLocale, useTranslations } from 'next-intl'

// This used to be the whole page component (MenuContent) — it also owned
// the data fetch. Now it just renders what the server component already
// fetched via Prisma; the `products` and `categories` arrays come in as
// props instead of being loaded in a useEffect.
interface MenuContentProps {
    categories: Category[]
    products: any[]
}

export function MenuContent({ categories, products }: MenuContentProps) {
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null)
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const [showRightArrow, setShowRightArrow] = useState(true)
    const [needsScroll, setNeedsScroll] = useState(false)
    const searchParams = useSearchParams()
    const locale = useLocale()
    const t = useTranslations('HomePage.Menu')
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const initialCategorySlug =
        searchParams.get('category') ||
        (categories.length > 0 ? categories[0].slug : 'burgers')
    const [activeCategorySlug, setActiveCategorySlug] = useState(initialCategorySlug)

    const checkScrollButtons = () => {
        const container = scrollContainerRef.current
        if (container) {
            const hasOverflow = container.scrollWidth > container.clientWidth
            setNeedsScroll(hasOverflow)

            if (hasOverflow) {
                const canScrollLeft = container.scrollLeft > 5
                const canScrollRight = container.scrollLeft < container.scrollWidth - container.clientWidth - 5
                setShowLeftArrow(canScrollLeft)
                setShowRightArrow(canScrollRight)
            } else {
                setShowLeftArrow(false)
                setShowRightArrow(false)
            }
        }
    }

    const scrollLeft = () => {
        const container = scrollContainerRef.current
        if (container) {
            const newScrollLeft = Math.max(0, container.scrollLeft - 250)
            container.scrollTo({ left: newScrollLeft, behavior: 'smooth' })
        }
    }

    const scrollRight = () => {
        const container = scrollContainerRef.current
        if (container) {
            const maxScroll = container.scrollWidth - container.clientWidth
            const newScrollLeft = Math.min(maxScroll, container.scrollLeft + 250)
            container.scrollTo({ left: newScrollLeft, behavior: 'smooth' })
        }
    }

    useEffect(() => {
        setTimeout(() => {
            checkScrollButtons()
        }, 100)

        const handleResize = () => {
            checkScrollButtons()
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [categories])

    useEffect(() => {
        const cat = searchParams.get('category')
        if (cat) setActiveCategorySlug(cat)
    }, [searchParams])

    useEffect(() => {
        const productId = searchParams.get('product')
        if (productId && products.length > 0) {
            const product = products.find(p => p.id === productId)
            if (product) setSelectedProduct(product)
        }
    }, [searchParams, products])

    const filteredProducts = products.filter(p => p.category?.slug === activeCategorySlug)

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white pb-6">
                <div className="container mx-auto px-4 pt-10 pb-6">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-black tracking-tight">{t('title')}</h1>
                        <p className="text-gray-500">{t('subtitle')}</p>
                    </div>
                </div>
            </div>

            <div className="sticky top-[72px] z-40 bg-white border-b border-gray-200 shadow-md">
                <div className="container mx-auto px-4">
                    <div className="relative flex items-center py-5">
                        {needsScroll && (
                            <button
                                onClick={scrollLeft}
                                type="button"
                                className={`flex-shrink-0 w-10 h-10 rounded-full border-2 border-orange-600 bg-white flex items-center justify-center text-orange-600 hover:bg-orange-600 hover:text-white transition-all shadow-md mr-3 ${!showLeftArrow ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                                disabled={!showLeftArrow}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                        )}

                        <div
                            ref={scrollContainerRef}
                            className={`flex-1 overflow-x-scroll scrollbar-hide ${!needsScroll ? 'flex justify-center' : ''}`}
                            onScroll={checkScrollButtons}
                        >
                            <div className={`flex items-center gap-3 ${needsScroll ? 'w-max' : ''}`}>
                                {categories.map((cat) => {
                                    const name = locale === 'fr' ? (cat.name_fr || cat.name) : cat.name;
                                    const isActive = activeCategorySlug === cat.slug;
                                    return (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => setActiveCategorySlug(cat.slug)}
                                            className={`px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
                                                isActive
                                                    ? 'bg-orange-600 text-white shadow-lg'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {name}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {needsScroll && (
                            <button
                                onClick={scrollRight}
                                type="button"
                                className={`flex-shrink-0 w-10 h-10 rounded-full border-2 border-orange-600 bg-white flex items-center justify-center text-orange-600 hover:bg-orange-600 hover:text-white transition-all shadow-md ml-3 ${!showRightArrow ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                                disabled={!showRightArrow}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10">
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    <AnimatePresence>
                        {filteredProducts.map((product) => {
                            const name = locale === 'fr' ? (product.name_fr || product.name) : product.name;
                            const description = locale === 'fr' ? (product.description_fr || product.description) : product.description;
                            return (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ProductCard
                                        product={{ ...product, name, description }}
                                        onClick={() => setSelectedProduct(product)}
                                    />
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </motion.div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        {locale === 'fr' ? 'Aucun produit trouvé dans cette catégorie.' : 'No products found in this category.'}
                    </div>
                )}
            </div>

            <ProductModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </div>
    )
}
