'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export function Story() {
    const t = useTranslations('HomePage.Story')

    return (
        <section id="story" className="relative py-32 bg-[#F5F2EA] overflow-hidden">
            {/* Decorative 'Paper' texture */}
            <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* LEFT: Text Content - Magazine Style */}
                    <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-1 w-20 bg-orange-600"></div>
                                <span className="font-oswald text-xl font-bold tracking-[0.2em] uppercase text-zinc-500">
                                    {t('label')}
                                </span>
                            </div>

                            <h2 className="font-oswald text-6xl md:text-8xl font-black text-zinc-900 leading-[0.85] uppercase mb-8">
                                The <br />
                                <span className="text-orange-600">Original</span> <br />
                                Recipe
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="prose prose-lg prose-zinc font-medium text-zinc-600"
                        >
                            <p className="text-xl leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:text-orange-600 first-letter:mr-2 float-left">
                                {t('description1')}
                            </p>
                            <p className="clear-both pt-4">
                                {t('description2')}
                            </p>
                        </motion.div>

                        {/* Signature / Badge Area */}
                        <div className="pt-8 flex gap-8 items-center border-t border-zinc-300">
                            <div className="text-center">
                                <span className="block font-oswald text-4xl font-black text-zinc-900">100%</span>
                                <span className="block text-xs uppercase tracking-widest text-zinc-500 font-bold">Halal</span>
                            </div>
                            <div className="w-px h-12 bg-zinc-300"></div>
                            <div className="text-center">
                                <span className="block font-oswald text-4xl font-black text-zinc-900">14+</span>
                                <span className="block text-xs uppercase tracking-widest text-zinc-500 font-bold">Years</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Collage Image Layout */}
                    <div className="lg:col-span-7 relative order-1 lg:order-2 flex flex-col md:flex-row gap-6 items-center justify-center py-10">
                        {/* Background Blobs/Shapes */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-100/50 rounded-full blur-3xl -z-10"></div>

                        {/* Image 1: Main Large */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative w-full md:w-1/2 h-[300px] md:h-[400px] z-10 shadow-2xl rotate-2"
                        >
                            <div className="relative w-full h-full border-[8px] border-white bg-gray-200">
                                <Image src="/assets/shop_image_1.jpeg" alt="Shop" fill className="object-cover" />
                            </div>
                        </motion.div>

                        {/* Image 2: Secondary */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative w-full md:w-1/2 h-[300px] md:h-[400px] z-20 shadow-2xl -rotate-2 mt-8 md:mt-0"
                        >
                            <div className="relative w-full h-full border-[8px] border-white bg-gray-200">
                                <Image src="/assets/shop_image_2.jpeg" alt="Food" fill className="object-cover" />
                            </div>
                            {/* Sticker */}
                            <div className="absolute -top-6 -right-6 bg-black text-white p-4 rounded-full font-oswald font-bold text-center transform rotate-12 shadow-xl z-30">
                                <span className="block text-xl">EST.</span>
                                <span className="block text-3xl text-orange-500">10</span>
                            </div>
                        </motion.div>

                        {/* Text Texture Elements */}
                        <div className="absolute top-0 left-0 -z-10">
                            <span className="text-[200px] font-black text-white/40 font-oswald leading-none select-none">FRESH</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
