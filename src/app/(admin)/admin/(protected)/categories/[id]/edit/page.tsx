import { prisma } from '@/lib/prisma'
import { CategoryForm } from '@/components/admin/category-form'
import { notFound } from 'next/navigation'

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params
    const category = await prisma.category.findUnique({ where: { id: resolvedParams.id } })

    if (!category) {
        notFound()
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Category</h1>
            <CategoryForm category={category} />
        </div>
    )
}

