'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { useImageUpload } from '@/hooks/use-image-upload'
import { createCategory, updateCategory, CategoryFormValues } from '@/app/(admin)/admin/(protected)/categories/actions'
import { toast } from 'sonner'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'

interface CategoryFormProps {
    category?: any
}

export function CategoryForm({ category }: CategoryFormProps) {
    const [loading, setLoading] = useState(false)
    const { uploadImage, uploading: imageUploading } = useImageUpload('categories')
    const isEdit = !!category

    const defaultValues: Partial<CategoryFormValues> = category
        ? {
            name: category.name || '',
            name_fr: category.name_fr || '',
            slug: category.slug || '',
            image_url: category.image_url || '',
            display_order: category.display_order || 0,
        }
        : {
            name: '',
            name_fr: '',
            slug: '',
            image_url: '',
            display_order: 0,
        }

    const form = useForm<CategoryFormValues>({
        defaultValues,
    })

    const imageUrl = form.watch('image_url')

    const handleImageUpload = async (file: File) => {
        const url = await uploadImage(file)
        if (url) {
            form.setValue('image_url', url)
        }
    }

    async function onSubmit(data: CategoryFormValues) {
        setLoading(true)
        try {
            if (isEdit) {
                await updateCategory(category.id, data)
                toast.success('Category updated successfully')
            } else {
                await createCategory(data)
                toast.success('Category created successfully')
            }
        } catch (error) {
            toast.error(isEdit ? 'Failed to update category' : 'Failed to create category')
        } finally {
            setLoading(false)
        }
    }

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
    }

    const handleNameChange = (name: string) => {
        form.setValue('name', name)
        if (!isEdit || !category.slug) {
            const slug = generateSlug(name)
            form.setValue('slug', slug)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg border">
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name (English)</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="e.g., Burgers" 
                                        {...field}
                                        onChange={(e) => handleNameChange(e.target.value)}
                                    />
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
                                <FormLabel>Name (French)</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Burgers" {...field} />
                                </FormControl>
                                <FormDescription>French translation of the category name</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Slug</FormLabel>
                                <FormControl>
                                    <Input placeholder="burgers" {...field} />
                                </FormControl>
                                <FormDescription>URL-friendly identifier (auto-generated from name)</FormDescription>
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
                                        placeholder="0" 
                                        {...field}
                                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
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
                            <FormLabel>Category Image</FormLabel>
                            <FormControl>
                                <div className="space-y-4">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            if (file) handleImageUpload(file)
                                        }}
                                        disabled={imageUploading}
                                    />
                                    <Input
                                        placeholder="Or paste image URL"
                                        {...field}
                                    />
                                    {imageUrl && (
                                        <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                                            <Image
                                                src={imageUrl}
                                                alt="Category preview"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            </FormControl>
                            <FormDescription>Upload or paste a URL for the category image</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-4">
                    <Button type="submit" disabled={loading || imageUploading}>
                        {(loading || imageUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isEdit ? 'Update' : 'Create'} Category
                    </Button>
                    <Button type="button" variant="outline" onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                </div>
            </form>
        </Form>
    )
}

