import { prisma } from '@/lib/prisma'
import { ProductForm } from '@/components/admin/product-form'
import { notFound } from 'next/navigation'

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: PageProps) {
    const { id } = await params
    const product = await prisma.product.findUnique({ where: { id } })

    if (!product) {
        notFound()
    }

    // Same Decimal -> number conversion as the offer edit page, for the same reason.
    const productForForm = {
        ...product,
        price_solo: product.price_solo === null ? null : Number(product.price_solo),
        price_menu: product.price_menu === null ? null : Number(product.price_menu),
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
            <ProductForm initialData={productForForm} isEdit />
        </div>
    )
}
