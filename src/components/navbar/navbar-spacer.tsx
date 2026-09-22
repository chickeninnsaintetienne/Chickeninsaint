'use client'

import { usePathname } from '@/i18n/routing'
import { useLocale } from 'next-intl'

export function NavbarSpacer() {
    const pathname = usePathname()
    const locale = useLocale()

    // Determine if we are on the home page (root or just locale)
    const isHomePage = pathname === '/' || pathname === `/${locale}` || pathname === ''

    if (isHomePage) return null

    return <div className="h-20 w-full" />
}
