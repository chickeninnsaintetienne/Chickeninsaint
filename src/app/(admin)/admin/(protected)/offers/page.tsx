import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Tag } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import Image from 'next/image'
import { OfferListActions } from './offer-list-actions'

export default async function OffersPage() {
    const offersRaw = await prisma.offer.findMany({
        orderBy: { created_at: 'desc' },
    })
    // Decimal isn't a valid React child -> convert to number for display.
    const offers = offersRaw.map(o => ({ ...o, price: Number(o.price) }))

    const offerCount = offers.length

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="text-white">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Tag className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold">Special Offers</h1>
                                <p className="text-orange-100 mt-1">
                                    {offerCount} active offers
                                </p>
                            </div>
                        </div>
                    </div>
                    <Link href="/admin/offers/new">
                        <Button className="bg-white text-orange-600 hover:bg-orange-50 shadow-md">
                            <Plus className="mr-2 h-4 w-4" /> Add Offer
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="hidden md:block bg-white rounded-xl shadow-sm border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50/80 hover:bg-gray-50/80">
                            <TableHead className="w-[100px] font-semibold text-gray-600">Image</TableHead>
                            <TableHead className="font-semibold text-gray-600">Title (EN)</TableHead>
                            <TableHead className="font-semibold text-gray-600">Title (FR)</TableHead>
                            <TableHead className="font-semibold text-gray-600">Description</TableHead>
                            <TableHead className="font-semibold text-gray-600">Price</TableHead>
                            <TableHead className="text-right font-semibold text-gray-600">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {offers?.map((offer: any, index: number) => (
                            <TableRow
                                key={offer.id}
                                className={`hover:bg-orange-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                                    }`}
                            >
                                <TableCell>
                                    <div className="relative w-20 h-14 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                                        <Image
                                            src={offer.image_url}
                                            alt={offer.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="font-medium text-gray-900">{offer.title}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-gray-600">{offer.title_fr || '—'}</span>
                                </TableCell>
                                <TableCell>
                                    <p className="text-sm text-gray-600 max-w-[300px] truncate">
                                        {offer.description || '—'}
                                    </p>
                                </TableCell>
                                <TableCell>
                                    <span className="font-semibold text-orange-600">€{offer.price}</span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <OfferListActions id={offer.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                        {offers?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center">
                                    <div className="flex flex-col items-center gap-2 text-gray-500">
                                        <Tag className="h-8 w-8 text-gray-400" />
                                        <p>No offers found</p>
                                        <Link href="/admin/offers/new">
                                            <Button variant="outline" size="sm">
                                                Add your first offer
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
                {offers?.map((offer: any) => (
                    <div key={offer.id} className="bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-4">
                            <div className="flex items-start gap-4">
                                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg border shadow-sm">
                                    <Image
                                        src={offer.image_url}
                                        alt={offer.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                                            Special
                                        </span>
                                        <OfferListActions id={offer.id} />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mt-1">{offer.title}</h3>
                                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">{offer.description}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 mt-4 pt-3 border-t border-gray-100">
                                <div className="text-center bg-orange-50 rounded-lg py-2">
                                    <p className="text-xs text-orange-600 uppercase tracking-wide">Offer Price</p>
                                    <p className="text-lg font-bold text-orange-600">€{offer.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {offers?.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-xl border">
                        <Tag className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No offers found</p>
                        <Link href="/admin/offers/new" className="mt-4 inline-block">
                            <Button variant="outline" size="sm">
                                <Plus className="mr-2 h-4 w-4" /> Add Offer
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
