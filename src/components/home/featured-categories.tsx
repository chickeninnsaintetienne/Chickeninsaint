'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'

const categories = [
    {
        id: 'chicken',
        image: '/assets/favs/chicken_bucket.png',
        href: '/menu?category=chickens'
    },
    {
        id: 'pizza',
        image: '/assets/favs/pizza.png',
        href: '/menu?category=pizza'
    },
    {
        id: 'burgers',
        image: '/assets/favs/burger.png',
        href: '/menu?category=burgers'
    },
    {
        id: 'family',
        image: '/assets/favs/family_menu.png',
        href: '/menu?category=family'
    }
]

export function FeaturedCategories() {
    const t = useTranslations('HomePage.Categories')

    return (
        <section className="py-20 md:py-24 bg-gray-50 flex items-center justify-center min-h-[90vh]">
            <div className="container mx-auto px-4 w-full">
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-20">
                    <div className="inline-block relative">
                        <h2 className="font-oswald text-5xl md:text-7xl font-black text-gray-900 mb-2 uppercase tracking-tighter">
                            {t('title')}
                        </h2>
                        {/* Mockup styled underline */}
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-1.5 md:h-2 bg-orange-500 rounded-full"
                        />
                    </div>
                </div>

                {/* Product Grid - 2x2 with Perfect Alignment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Link href={category.href} className="group block relative w-full aspect-square md:aspect-auto md:h-[420px]">
                                {/* White Square Card Base */}
                                <div className="absolute inset-0 bg-white rounded-[2.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-100 group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] transition-all duration-500 z-0" />

                                {/* The Floating Food Item Container */}
                                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8">
                                    {/* Food Image Wrapper */}
                                    <motion.div
                                        className="relative w-[85%] h-[65%] mb-8"
                                        whileHover={{
                                            y: -35,
                                            scale: 1.15,
                                            rotate: index % 2 === 0 ? 3 : -3,
                                            filter: 'drop-shadow(0 40px 40px rgba(0,0,0,0.2))'
                                        }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                    >
                                        <Image
                                            src={category.image}
                                            alt={t(`${category.id}.title`)}
                                            fill
                                            className="object-contain"
                                            priority={index < 2}
                                        />
                                    </motion.div>

                                    {/* Category Text - Positioned at bottom like mockup */}
                                    <div className="w-full flex justify-between items-center px-4 md:px-6">
                                        <div className="space-y-1">
                                            <h3 className="font-oswald text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter">
                                                {t(`${category.id}.title`)}
                                            </h3>
                                            <div className="h-1 w-12 bg-orange-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                        </div>

                                        {/* View Details Icon */}
                                        <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center transform group-hover:rotate-45 transition-all duration-300 shadow-lg group-hover:bg-gray-900">
                                            <motion.svg
                                                viewBox="0 0 24 24"
                                                className="w-6 h-6 stroke-2 fill-none stroke-current"
                                            >
                                                <path d="M5 12h14m-7-7 7 7-7 7" />
                                            </motion.svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

