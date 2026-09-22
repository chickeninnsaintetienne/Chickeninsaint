'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useUIStore } from '@/hooks/use-ui-store'
import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import { searchProducts } from '@/lib/search-actions'
import Link from 'next/link'
import Image from 'next/image'

export function SearchModal() {
    const { isSearchOpen, closeSearch } = useUIStore()
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const runSearch = async () => {
            if (query.length < 2) {
                setResults([])
                return
            }
            setLoading(true)
            const data = await searchProducts(query)
            setResults(data)
            setLoading(false)
        }

        const timeout = setTimeout(runSearch, 300)
        return () => clearTimeout(timeout)
    }, [query])

    return (
        <Dialog open={isSearchOpen} onOpenChange={closeSearch}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Search Menu</DialogTitle>
                </DialogHeader>
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search for burgers, tacos..."
                        className="pl-9"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div className="mt-4 space-y-2">
                    {loading && <p className="text-sm text-center text-gray-500">Searching...</p>}
                    {!loading && results.length === 0 && query.length >= 2 && (
                        <p className="text-sm text-center text-gray-500">No results found.</p>
                    )}
                    {results.map((product) => (
                        <Link
                            key={product.id}
                            href={`/menu?product=${product.id}`}
                            onClick={closeSearch}
                            className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-md transition-colors"
                        >
                            <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                {product.image_url && <Image src={product.image_url} alt={product.name} fill className="object-cover" />}
                            </div>
                            <div>
                                <h4 className="font-medium text-sm">{product.name}</h4>
                                <p className="text-xs text-orange-600 font-bold">€{product.price_solo}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}
