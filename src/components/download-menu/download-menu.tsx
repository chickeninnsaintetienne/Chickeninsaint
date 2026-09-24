'use client'

import { useTranslations } from 'next-intl'
import { Download } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'

export function DownloadMenu() {
    const t = useTranslations('DownloadMenu')

    return (
        <section className="w-full bg-gradient-to-r from-red-600 to-red-700 py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-oswald font-black text-white uppercase tracking-tight">
                            {t('title')}
                        </h2>
                        <p className="text-white/90 text-lg mt-2 font-medium">
                            {t('subtitle')}
                        </p>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            href="/full-menu"
                            className="flex items-center gap-3 px-8 py-4 bg-white text-red-600 font-bold text-lg uppercase rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-white hover:bg-red-50"
                        >
                            <Download className="w-6 h-6" />
                            {t('button')}
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
