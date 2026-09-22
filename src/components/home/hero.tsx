'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { motion } from 'framer-motion'

export function Hero() {
    const t = useTranslations('HomePage.Hero')

    return (
        <section className="relative h-screen w-full flex items-center overflow-hidden bg-zinc-900">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/hero-bg-v2-edited.png"
                    alt="Chicken Inn - Fried Chicken and Pizza"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>

            <div className="container relative z-10 px-8 lg:px-16">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl"
                >
                    <h1 className="font-oswald text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-tight uppercase">
                        {t('title')}
                    </h1>
                </motion.div>
            </div>
        </section>
    )
}
