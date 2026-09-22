'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingBag, Tag, QrCode, Settings, Folder } from 'lucide-react'

const iconMap = {
    dashboard: LayoutDashboard,
    categories: Folder,
    products: ShoppingBag,
    offers: Tag,
    qrCodes: QrCode,
    settings: Settings,
}

interface NavLinkProps {
    href: string
    iconName: keyof typeof iconMap
    children: React.ReactNode
}

export function NavLink({ href, iconName, children }: NavLinkProps) {
    const pathname = usePathname()
    const isActive = pathname === href || pathname.startsWith(href + '/')
    const Icon = iconMap[iconName]

    return (
        <Link
            href={href}
            className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                isActive
                    ? 'bg-orange-100 text-orange-600 font-semibold'
                    : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
            }`}
        >
            <Icon className="w-5 h-5 mr-3" />
            {children}
        </Link>
    )
}

