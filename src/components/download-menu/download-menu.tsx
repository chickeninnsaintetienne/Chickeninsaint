'use client'

import { useTranslations } from 'next-intl'
import { ChevronLeft, ChevronRight, Download } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog'

// Menu pages live in /public/menu as 1.webp, 2.webp, 3.webp, ...
// Change MENU_PAGE_COUNT to match the number of images you put there.
const MENU_PAGE_COUNT = 4
const MENU_IMAGES = Array.from(
    { length: MENU_PAGE_COUNT },
    (_, i) => `/menu/${i + 1}.webp`
)

export function DownloadMenu() {
    const t = useTranslations('DownloadMenu')
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState(0)

    const total = MENU_IMAGES.length
    const goPrev = useCallback(() => setPage((p) => Math.max(p - 1, 0)), [])
    const goNext = useCallback(
        () => setPage((p) => Math.min(p + 1, total - 1)),
        [total]
    )

    const handleOpenChange = (value: boolean) => {
        setOpen(value)
        if (value) setPage(0)
    }

    useEffect(() => {
        if (!open) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') goPrev()
            if (e.key === 'ArrowRight') goNext()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [open, goPrev, goNext])

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

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleOpenChange(true)}
                        className="flex items-center gap-3 px-8 py-4 bg-white text-red-600 font-bold text-lg uppercase rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-white hover:bg-red-50"
                    >
                        <Download className="w-6 h-6" />
                        {t('button')}
                    </motion.button>
                </motion.div>
            </div>

            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent className="sm:max-w-3xl max-h-[95vh] p-2 sm:p-4 bg-black border-none gap-2 [&>button]:text-white">
                    <DialogTitle className="sr-only">{t('title')}</DialogTitle>
                    <DialogDescription className="sr-only">
                        {t('subtitle')}
                    </DialogDescription>

                    <div className="relative flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            key={page}
                            src={MENU_IMAGES[page]}
                            alt={`${t('title')} - ${page + 1}/${total}`}
                            className="max-h-[80vh] w-auto max-w-full object-contain rounded"
                        />

                        {/* Preload the next page */}
                        {page < total - 1 && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={MENU_IMAGES[page + 1]} alt="" className="hidden" />
                        )}
                    </div>

                    <div className="flex items-center justify-between text-white">
                        <button
                            onClick={goPrev}
                            disabled={page === 0}
                            aria-label="Previous"
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <span className="text-sm font-medium">
                            {page + 1} / {total}
                        </span>
                        <button
                            onClick={goNext}
                            disabled={page === total - 1}
                            aria-label="Next"
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    )
}
