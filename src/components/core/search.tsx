'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useUIStore } from '@/hooks/use-ui-store'
import { useDebounce } from '@/hooks/use-debounce'
import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import { searchProducts } from '@/lib/search-actions'
import Link from 'next/link'
import Image from 'next/image'

export function SearchComponent() {
    const { isSearchOpen, closeSearch } = useUIStore()
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const debouncedQuery = useDebounce(query, 300)

    useEffect(() => {
        const runSearch = async () => {
            if (debouncedQuery.length < 2) {
                setResults([])
                return
            }

            setLoading(true)
            const data = await searchProducts(debouncedQuery)
            setResults(data)
            setLoading(false)
        }

        runSearch()
    }, [debouncedQuery])

    // Reset query when modal closes
    useEffect(() => {
        if (!isSearchOpen) {
            setQuery('')
            setResults([])
        }
    }, [isSearchOpen])

    return (
        <Dialog open={isSearchOpen} onOpenChange={closeSearch}>
            <DialogContent className="sm:max-w-[600px] p-0" showCloseButton={false}>
                <DialogTitle className="sr-only">Search</DialogTitle>
                <div className="p-6 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            placeholder="Search for burgers, tacos..."
                            className="pl-10 h-12 text-base"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className="max-h-[400px] overflow-y-auto space-y-2">
                        {loading && (
                            <p className="text-sm text-center text-gray-500 py-4">Searching...</p>
                        )}
                        {!loading && results.length === 0 && debouncedQuery.length >= 2 && (
                            <p className="text-sm text-center text-gray-500 py-4">No results found.</p>
                        )}
                        {!loading && debouncedQuery.length < 2 && (
                            <p className="text-sm text-center text-gray-500 py-4">Type at least 2 characters to search...</p>
                        )}
                        {results.map((product) => (
                            <Link
                                key={product.id}
                                href={`/menu?product=${product.id}`}
                                onClick={closeSearch}
                                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-200"
                            >
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                    {product.image_url && (
                                        <Image
                                            src={product.image_url}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-base truncate">{product.name}</h4>
                                    <p className="text-sm text-orange-600 font-bold">€{product.price_solo}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

