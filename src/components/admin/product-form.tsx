'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema, ProductFormValues } from '@/lib/validations/product'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useImageUpload } from '@/hooks/use-image-upload'
import { listCategoriesForForm } from '@/lib/catalog-actions'
import { createProduct, updateProduct } from '@/app/(admin)/admin/(protected)/products/actions'
import { toast } from 'sonner'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'

interface ProductFormProps {
    initialData?: any // DB type
    isEdit?: boolean
}

export function ProductForm({ initialData, isEdit = false }: ProductFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState<any[]>([])
    const { uploadImage, uploading: imageUploading } = useImageUpload('products')

    // Fetch categories on mount
    useEffect(() => {
        listCategoriesForForm().then(setCategories)
    }, [])

    const defaultValues: Partial<ProductFormValues> = initialData
        ? {
            number: initialData.number || '',
            name: initialData.name || '',
            name_fr: initialData.name_fr || '',
            description: initialData.description || '',
            description_fr: initialData.description_fr || '',
            ingredients: (initialData.ingredients && Array.isArray(initialData.ingredients))
                ? initialData.ingredients.join(', ')
                : (typeof initialData.ingredients === 'string' ? initialData.ingredients : ''),
            category_id: initialData.category_id || '',
            price_solo: Number(initialData.price_solo) || 0,
            price_menu: initialData.price_menu ? Number(initialData.price_menu) : undefined,
            quantity: initialData.quantity || '',
            display_order: initialData.display_order || 0,
            image_url: initialData.image_url || '',
        }
        : {
            number: '',
            name: '',
            name_fr: '',
            description: '',
            description_fr: '',
            ingredients: '',
            price_solo: 0,
            category_id: '',
            quantity: '',
            display_order: 0,
        }

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues,
    })

    // Watch image url for preview
    const imageUrl = form.watch('image_url')

    const onSubmit = async (data: ProductFormValues) => {
        try {
            setLoading(true)
            if (isEdit && initialData?.id) {
                await updateProduct(initialData.id, data)
                toast.success('Product updated successfully')
            } else {
                await createProduct(data)
                toast.success('Product created successfully')
            }
            router.push('/admin/products')
        } catch (error: any) {
            toast.error('Error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = await uploadImage(file)
            if (url) {
                form.setValue('image_url', url)
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="1" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Name (English)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Delicious Burger" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="name_fr"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Name (French)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Délicieux Burger" {...field} />
                                </FormControl>
                                <FormDescription>French translation</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description (English)</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Tasty beef burger with cheese..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description_fr"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description (French)</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Délicieux burger de bœuf avec fromage..." {...field} />
                                </FormControl>
                                <FormDescription>French translation</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="ingredients"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ingredients (comma separated)</FormLabel>
                            <FormControl>
                                <Input placeholder="Beef, Cheese, Lettuce, Tomato" {...field} />
                            </FormControl>
                            <FormDescription>Comma separated list of ingredients</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="price_solo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price Solo (€)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        {...field}
                                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price_menu"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price Menu (€)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        {...field}
                                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                                        value={field.value ?? ''}
                                    />
                                </FormControl>
                                <FormDescription>Optional (fries + drink)</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quantity</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., 6 pieces" {...field} />
                                </FormControl>
                                <FormDescription>Optional (e.g., "6 pieces", "12 oz")</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="display_order"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Display Order</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                        value={field.value ?? 0}
                                    />
                                </FormControl>
                                <FormDescription>Lower numbers appear first</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Image</FormLabel>
                            <div className="flex flex-col gap-4">
                                {imageUrl && (
                                    <div className="relative w-40 h-40 border rounded-md overflow-hidden">
                                        <Image src={imageUrl} alt="Preview" fill className="object-cover" />
                                    </div>
                                )}
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        disabled={imageUploading}
                                    />
                                </FormControl>
                                {imageUploading && <p className="text-sm text-muted-foreground">Converting and uploading...</p>}
                                <p className="text-xs text-gray-500">Image will be automatically converted to WEBP</p>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={loading || imageUploading}>
                    {(loading || imageUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isEdit ? 'Update Product' : 'Create Product'}
                </Button>
            </form>
        </Form>
    )
}
