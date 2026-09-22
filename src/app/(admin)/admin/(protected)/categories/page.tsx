import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Plus, Folder } from 'lucide-react'
import Link from 'next/link'
import { CategoryListActions } from './category-list-actions'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import Image from 'next/image'

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany({
        orderBy: { display_order: 'asc' },
    })

    const categoryCount = categories.length

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="text-white">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Folder className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold">Categories</h1>
                                <p className="text-orange-100 mt-1">
                                    {categoryCount} categories
                                </p>
                            </div>
                        </div>
                    </div>
                    <Link href="/admin/categories/new">
                        <Button className="bg-white text-orange-600 hover:bg-orange-50 shadow-md">
                            <Plus className="mr-2 h-4 w-4" /> Add Category
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="hidden md:block bg-white rounded-xl shadow-sm border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50/80 hover:bg-gray-50/80">
                            <TableHead className="w-[70px] font-semibold text-gray-600">Image</TableHead>
                            <TableHead className="w-[80px] font-semibold text-gray-600">Order</TableHead>
                            <TableHead className="font-semibold text-gray-600">Name (EN)</TableHead>
                            <TableHead className="font-semibold text-gray-600">Name (FR)</TableHead>
                            <TableHead className="font-semibold text-gray-600">Slug</TableHead>
                            <TableHead className="text-right font-semibold text-gray-600">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories?.map((category: any, index: number) => (
                            <TableRow
                                key={category.id}
                                className={`hover:bg-orange-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                                    }`}
                            >
                                <TableCell>
                                    {category.image_url ? (
                                        <div className="relative w-12 h-12 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                                            <Image
                                                src={category.image_url}
                                                alt={category.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                                            <Folder className="w-5 h-5 text-gray-400" />
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-semibold text-sm">
                                        {category.display_order}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className="font-medium text-gray-900">{category.name}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-gray-600">{category.name_fr || '—'}</span>
                                </TableCell>
                                <TableCell>
                                    <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-gray-700">
                                        {category.slug}
                                    </code>
                                </TableCell>
                                <TableCell className="text-right">
                                    <CategoryListActions category={category} />
                                </TableCell>
                            </TableRow>
                        ))}
                        {categories?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center">
                                    <div className="flex flex-col items-center gap-2 text-gray-500">
                                        <Folder className="h-8 w-8 text-gray-400" />
                                        <p>No categories found</p>
                                        <Link href="/admin/categories/new">
                                            <Button variant="outline" size="sm">
                                                Add your first category
                                            </Button>
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="md:hidden space-y-3">
                {categories?.map((category: any) => (
                    <div key={category.id} className="bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-4">
                            <div className="flex items-start gap-4">
                                {category.image_url ? (
                                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg border shadow-sm">
                                        <Image
                                            src={category.image_url}
                                            alt={category.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-20 h-20 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                                        <Folder className="w-8 h-8 text-gray-400" />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-100 text-orange-700 font-bold text-xs">
                                            {category.display_order}
                                        </span>
                                        <CategoryListActions category={category} />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mt-1">{category.name}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{category.name_fr || '—'}</p>
                                    <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-gray-600 inline-block mt-2">
                                        {category.slug}
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {categories?.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-xl border">
                        <Folder className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No categories found</p>
                        <Link href="/admin/categories/new" className="mt-4 inline-block">
                            <Button variant="outline" size="sm">
                                <Plus className="mr-2 h-4 w-4" /> Add Category
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

