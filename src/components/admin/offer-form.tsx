'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { offerSchema, OfferFormValues } from '@/lib/validations/offer'
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
import { useImageUpload } from '@/hooks/use-image-upload'
import { createOffer, updateOffer } from '@/app/(admin)/admin/(protected)/offers/actions'
import { toast } from 'sonner'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'

interface OfferFormProps {
    initialData?: any
    isEdit?: boolean
}

export function OfferForm({ initialData, isEdit = false }: OfferFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const { uploadImage, uploading: imageUploading } = useImageUpload('offers')

    const defaultValues: Partial<OfferFormValues> = initialData
        ? {
            title: initialData.title,
            title_fr: initialData.title_fr || '',
            description: initialData.description || '',
            description_fr: initialData.description_fr || '',
            price: initialData.price,
            image_url: initialData.image_url,
            redirect_url: initialData.redirect_url || '',
        }
        : {
            title: '',
            title_fr: '',
            description: '',
            description_fr: '',
            price: 0,
            redirect_url: '',
        }

    const form = useForm<OfferFormValues>({
        resolver: zodResolver(offerSchema),
        defaultValues,
    })

    const imageUrl = form.watch('image_url')

    const onSubmit = async (data: OfferFormValues) => {
        try {
            setLoading(true)
            if (isEdit && initialData?.id) {
                await updateOffer(initialData.id, data)
                toast.success('Offer updated successfully')
            } else {
                await createOffer(data)
                toast.success('Offer created successfully')
            }
            router.push('/admin/offers')
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Offer Title (English)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Mega Deal 50% Off" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="title_fr"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Offer Title (French)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Méga Offre 50% de Réduction" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description (English)</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Get 50% off on all burgers..." {...field} />
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
                                    <Textarea placeholder="Obtenez 50% de réduction sur tous les burgers..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Promotional Price (€)</FormLabel>
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
                        name="redirect_url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Redirect URL (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://ubereats.com/..." {...field} />
                                </FormControl>
                                <FormDescription>External link to UberEats/Deliveroo</FormDescription>
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
                            <FormLabel>Offer Image (Required)</FormLabel>
                            <div className="flex flex-col gap-4">
                                {imageUrl && (
                                    <div className="relative w-full h-48 border rounded-md overflow-hidden">
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
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={loading || imageUploading}>
                    {(loading || imageUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isEdit ? 'Update Offer' : 'Create Offer'}
                </Button>
            </form>
        </Form>
    )
}
