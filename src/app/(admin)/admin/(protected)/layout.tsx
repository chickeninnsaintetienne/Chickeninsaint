import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MobileNav } from '@/components/admin/mobile-nav'
import { NavLink } from '@/components/admin/nav-link'

// These admin pages read the logged-in user's cookies on every request
// (via createClient() -> supabase.auth.getUser()), so they can never be
// statically prerendered. Forcing dynamic rendering stops Next.js from
// trying to prerender them at build time -- which is what was crashing
// the build when NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY
// aren't present in the build environment. Behavior at runtime is unchanged.
export const dynamic = 'force-dynamic'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/admin/login')
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-orange-600">Chicken Inn</h1>
                    <p className="text-xs text-gray-500">Admin Panel</p>
                </div>
                <MobileNav />
            </div>

            {/* Sidebar - Fixed position, full height */}
            <aside className="hidden md:flex md:flex-col fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-40">
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-orange-600">Chicken Inn</h1>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Admin Panel</p>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <NavLink href="/admin/dashboard" iconName="dashboard">
                        Dashboard
                    </NavLink>
                    <NavLink href="/admin/categories" iconName="categories">
                        Categories
                    </NavLink>
                    <NavLink href="/admin/products" iconName="products">
                        Products
                    </NavLink>
                    <NavLink href="/admin/offers" iconName="offers">
                        Offers
                    </NavLink>
                    <NavLink href="/admin/qr-codes" iconName="qrCodes">
                        QR Generator
                    </NavLink>
                    <NavLink href="/admin/settings" iconName="settings">
                        Settings
                    </NavLink>
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <form action="/auth/signout" method="post">
                        <Button type="submit" variant="outline" className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50">
                            <LogOut className="w-5 h-5 mr-3" />
                            Sign Out
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content - Offset by sidebar width on desktop */}
            <main className="md:ml-64 min-h-screen p-4 md:p-8 pt-20 md:pt-8">
                {children}
            </main>
        </div>
    )
}

