import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingBag, Tag, Eye } from 'lucide-react'
import { prisma } from '@/lib/prisma'

export default async function DashboardPage() {
    // Was: two supabase.from(...).select('*', { count: 'exact', head: true }) calls
    const [totalProducts, totalOffers] = await Promise.all([
        prisma.product.count(),
        prisma.offer.count(),
    ])

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 pt-2">Overview</h1>

            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between p-6 pb-3">
                        <CardTitle className="text-sm font-medium text-gray-600">Total Products</CardTitle>
                        <ShoppingBag className="h-5 w-5 text-orange-600" />
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                        <div className="text-3xl font-bold text-gray-900">{totalProducts}</div>
                        <p className="text-sm text-gray-500 mt-1">Active menu items</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between p-6 pb-3">
                        <CardTitle className="text-sm font-medium text-gray-600">Active Offers</CardTitle>
                        <Tag className="h-5 w-5 text-orange-600" />
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                        <div className="text-3xl font-bold text-gray-900">{totalOffers}</div>
                        <p className="text-sm text-gray-500 mt-1">Current promotions</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between p-6 pb-3">
                        <CardTitle className="text-sm font-medium text-gray-600">Page Views</CardTitle>
                        <Eye className="h-5 w-5 text-orange-600" />
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                        <div className="text-3xl font-bold text-gray-900">--</div>
                        <p className="text-sm text-gray-500 mt-1">Analytics coming soon</p>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
                <p className="text-gray-500">Select a module from the sidebar to start managing your restaurant content.</p>
            </div>
        </div>
    )
}
