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
import { deleteCategory } from '@/app/(admin)/admin/(protected)/categories/actions'
import { toast } from 'sonner'
import { useTransition } from 'react'

interface CategoryListActionsProps {
    category: any
}

export function CategoryListActions({ category }: CategoryListActionsProps) {
    const [isPending, startTransition] = useTransition()

    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete "${category.name}"? This cannot be undone.`)) {
            startTransition(async () => {
                try {
                    await deleteCategory(category.id)
                    toast.success('Category deleted successfully')
                } catch (error) {
                    toast.error('Failed to delete category')
                }
            })
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" disabled={isPending}>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <Link href={`/admin/categories/${category.id}/edit`}>
                    <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                    className="text-red-600"
                    onClick={handleDelete}
                >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

