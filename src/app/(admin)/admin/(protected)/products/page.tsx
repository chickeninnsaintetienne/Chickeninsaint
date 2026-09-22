import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Package, Search } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import Image from 'next/image'
import { ProductListActions } from './product-list-actions'

// Category color mapping for badges
const categoryColors: Record<string, string> = {
    'Menus Burgers': 'bg-orange-100 text-orange-700 border-orange-200',
    'Baguettes & Wraps': 'bg-amber-100 text-amber-700 border-amber-200',
    'Tacos': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Tex Mex': 'bg-red-100 text-red-700 border-red-200',
    'Salads': 'bg-green-100 text-green-700 border-green-200',
    'Desserts': 'bg-pink-100 text-pink-700 border-pink-200',
    'Drinks': 'bg-blue-100 text-blue-700 border-blue-200',
    'Buckets': 'bg-purple-100 text-purple-700 border-purple-200',
    'Family Packs': 'bg-indigo-100 text-indigo-700 border-indigo-200',
}

function getCategoryColor(categoryName: string) {
    return categoryColors[categoryName] || 'bg-gray-100 text-gray-700 border-gray-200'
}

export default async function ProductsPage() {
    const productsRaw = await prisma.product.findMany({
        include: { category: { select: { name: true } } },
        orderBy: { number: 'asc' },
    })
    // Decimal isn't a valid React child -> convert to number for display.
    const products = productsRaw.map(p => ({
        ...p,
        price_solo: p.price_solo === null ? null : Number(p.price_solo),
        price_menu: p.price_menu === null ? null : Number(p.price_menu),
    }))

    const productCount = products.length

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header Section with Gradient */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="text-white">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Package className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold">Products</h1>
                                <p className="text-orange-100 mt-1">
                                    {productCount} menu items
                                </p>
                            </div>
                        </div>
                    </div>
                    <Link href="/admin/products/new">
                        <Button className="bg-white text-orange-600 hover:bg-orange-50 shadow-md">
                            <Plus className="mr-2 h-4 w-4" /> Add Product
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50/80 hover:bg-gray-50/80">
                            <TableHead className="w-[70px] font-semibold text-gray-600">Image</TableHead>
                            <TableHead className="w-[60px] font-semibold text-gray-600">#</TableHead>
                            <TableHead className="font-semibold text-gray-600">Product Name</TableHead>
                            <TableHead className="font-semibold text-gray-600">Description</TableHead>
                            <TableHead className="font-semibold text-gray-600">Category</TableHead>
                            <TableHead className="font-semibold text-gray-600">Solo</TableHead>
                            <TableHead className="font-semibold text-gray-600">Menu</TableHead>
                            <TableHead className="text-right font-semibold text-gray-600">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products?.map((product: any, index: number) => (
                            <TableRow
                                key={product.id}
                                className={`hover:bg-orange-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                                    }`}
                            >
                                <TableCell>
                                    {product.image_url ? (
                                        <div className="relative w-12 h-12 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                                            <Image
                                                src={product.image_url}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                                            <Package className="w-5 h-5 text-gray-400" />
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-semibold text-sm">
                                        {product.number}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className="font-medium text-gray-900">{product.name}</span>
                                </TableCell>
                                <TableCell>
                                    <p className="text-sm text-gray-600 max-w-[250px] truncate">
                                        {product.description || '—'}
                                    </p>
                                </TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColor(product.category?.name || '')}`}>
                                        {product.category?.name || 'Uncategorized'}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className="font-semibold text-gray-900">€{product.price_solo}</span>
                                </TableCell>
                                <TableCell>
                                    {product.price_menu ? (
                                        <span className="font-semibold text-orange-600">€{product.price_menu}</span>
                                    ) : (
                                        <span className="text-gray-400">—</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <ProductListActions id={product.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                        {products?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={8} className="h-32 text-center">
                                    <div className="flex flex-col items-center gap-2 text-gray-500">
                                        <Package className="h-8 w-8 text-gray-400" />
                                        <p>No products found</p>
                                        <Link href="/admin/products/new">
                                            <Button variant="outline" size="sm">
                                                Add your first product
                                            </Button>
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
                {products?.map((product: any) => (
                    <div key={product.id} className="bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-4">
                            <div className="flex items-start gap-4">
                                {product.image_url ? (
                                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg border shadow-sm">
                                        <Image
                                            src={product.image_url}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-20 h-20 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                                        <Package className="w-8 h-8 text-gray-400" />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-100 text-orange-700 font-bold text-xs">
                                            {product.number}
                                        </span>
                                        <ProductListActions id={product.id} />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mt-1 truncate">{product.name}</h3>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border mt-1 ${getCategoryColor(product.category?.name || '')}`}>
                                        {product.category?.name || 'Uncategorized'}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4 pt-3 border-t border-gray-100">
                                <div className="text-center bg-gray-50 rounded-lg py-2">
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Solo</p>
                                    <p className="text-lg font-bold text-gray-900">€{product.price_solo}</p>
                                </div>
                                <div className="text-center bg-orange-50 rounded-lg py-2">
                                    <p className="text-xs text-orange-600 uppercase tracking-wide">Menu</p>
                                    <p className="text-lg font-bold text-orange-600">
                                        {product.price_menu ? `€${product.price_menu}` : '—'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {products?.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-xl border">
                        <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No products found</p>
                        <Link href="/admin/products/new" className="mt-4 inline-block">
                            <Button variant="outline" size="sm">
                                <Plus className="mr-2 h-4 w-4" /> Add Product
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

