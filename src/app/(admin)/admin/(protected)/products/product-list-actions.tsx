'use client'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Pencil, Trash } from 'lucide-react'
import Link from 'next/link'
import { deleteProduct } from '@/app/(admin)/admin/(protected)/products/actions'
import { toast } from 'sonner'
import { useTransition } from 'react'

export function ProductListActions({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition()

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this product?')) {
            startTransition(async () => {
                try {
                    await deleteProduct(id)
                    toast.success('Product deleted')
                } catch (error: any) {
                    toast.error('Error deleting product: ' + error.message)
                }
            })
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <Link href={`/admin/products/${id}/edit`}>
                    <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
