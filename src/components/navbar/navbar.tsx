'use client'

import { Link, usePathname, useRouter } from '@/i18n/routing'
import { motion } from 'framer-motion'
import { Menu, X, Search, MapPin } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTranslations, useLocale } from 'next-intl'
import { useUIStore } from '@/hooks/use-ui-store'

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const pathname = usePathname()
    const t = useTranslations('HomePage.Nav')
    const locale = useLocale()
    const router = useRouter()
    const { openSearch } = useUIStore()

    const navLinks = [
        { href: '/', label: t('home') },
        { href: '/menu', label: t('menu') },
        { href: '/offers', label: t('offers') }
    ]

    const onLanguageChange = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale })
    }

    // Determine if we are on the home page
    const isHomePage = pathname === '' || pathname === '/' || pathname === `/${locale}`

    // Handle scroll for sticky navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const shouldShowSolidNavbar = isScrolled || !isHomePage

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            shouldShowSolidNavbar
                ? "bg-white shadow-md"
                : "bg-transparent"
        )}>
            <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <img
                        src="/assets/logo.png"
                        alt="Chicken Inn"
                        className="h-12 w-auto mix-blend-multiply"
                    />
                    <span className={cn(
                        "text-xl font-oswald font-bold tracking-tight uppercase hidden sm:block transition-colors",
                        shouldShowSolidNavbar ? "text-orange-600" : "text-white"
                    )}>
                        Chicken Inn
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative group"
                            >
                                <span className={cn(
                                    "text-base font-oswald font-bold transition-colors",
                                    shouldShowSolidNavbar
                                        ? (isActive ? "text-orange-600" : "text-gray-900 hover:text-orange-600")
                                        : (isActive ? "text-orange-500" : "text-white hover:text-orange-500")
                                )}>
                                    {link.label}
                                </span>
                                {/* Active indicator underline */}
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className={cn(
                                            "absolute -bottom-1 left-0 right-0 h-0.5",
                                            shouldShowSolidNavbar ? "bg-orange-600" : "bg-orange-500"
                                        )}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </Link>
                        )
                    })}
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-3">
                    {/* Search Icon */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={openSearch}
                        className={cn(
                            "transition-colors",
                            shouldShowSolidNavbar
                                ? "text-gray-900 hover:text-orange-600"
                                : "text-white hover:text-orange-500"
                        )}
                    >
                        <Search className="w-5 h-5" />
                    </Button>

                    {/* Location Icon */}
                    <Link href="/locations">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "transition-colors",
                                shouldShowSolidNavbar
                                    ? "text-gray-900 hover:text-orange-600"
                                    : "text-white hover:text-orange-500"
                            )}
                        >
                            <MapPin className="w-5 h-5" />
                        </Button>
                    </Link>

                    {/* Language Selector */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onLanguageChange('en')}
                            className={cn(
                                "px-3 py-1 text-sm font-bold uppercase transition-colors",
                                locale === 'en'
                                    ? 'text-orange-500'
                                    : shouldShowSolidNavbar
                                        ? 'text-gray-900 hover:text-orange-600'
                                        : 'text-white hover:text-orange-500'
                            )}
                        >
                            En
                        </button>
                        <span className={shouldShowSolidNavbar ? "text-gray-300" : "text-white/30"}>|</span>
                        <button
                            onClick={() => onLanguageChange('fr')}
                            className={cn(
                                "px-3 py-1 text-sm font-bold uppercase transition-colors",
                                locale === 'fr'
                                    ? 'text-orange-500'
                                    : shouldShowSolidNavbar
                                        ? 'text-gray-900 hover:text-orange-600'
                                        : 'text-white hover:text-orange-500'
                            )}
                        >
                            Fr
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={shouldShowSolidNavbar ? "text-gray-900" : "text-white"}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-white border-t border-gray-200"
                >
                    <div className="flex flex-col p-4 space-y-4">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "text-lg font-bold py-3 border-b border-gray-100",
                                        isActive ? "text-orange-600" : "text-gray-900"
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                        <div className="flex items-center justify-between py-2">
                            <span className="font-bold text-gray-500">Language</span>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant={locale === 'en' ? 'default' : 'outline'}
                                    onClick={() => onLanguageChange('en')}
                                >
                                    EN
                                </Button>
                                <Button
                                    size="sm"
                                    variant={locale === 'fr' ? 'default' : 'outline'}
                                    onClick={() => onLanguageChange('fr')}
                                >
                                    FR
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </nav>
    )
}
