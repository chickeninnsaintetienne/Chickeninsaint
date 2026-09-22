'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingBag, Tag, QrCode, Settings, LogOut, Menu, Folder } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet'

const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/categories', label: 'Categories', icon: Folder },
    { href: '/admin/products', label: 'Products', icon: ShoppingBag },
    { href: '/admin/offers', label: 'Offers', icon: Tag },
    { href: '/admin/qr-codes', label: 'QR Generator', icon: QrCode },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export function MobileNav() {
    const pathname = usePathname()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
                <div className="flex flex-col h-full">
                    <div className="p-6 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-orange-600">Chicken Inn</h1>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Admin Panel</p>
                    </div>

                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center px-4 py-3 rounded-md transition-colors ${isActive
                                            ? 'bg-orange-100 text-orange-600 font-semibold'
                                            : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                                        }`}
                                >
                                    <Icon className="w-5 h-5 mr-3" />
                                    {item.label}
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="p-4 border-t border-gray-200">
                        <form action="/auth/signout" method="post">
                            <Button
                                type="submit"
                                variant="outline"
                                className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                                <LogOut className="w-5 h-5 mr-3" />
                                Sign Out
                            </Button>
                        </form>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
