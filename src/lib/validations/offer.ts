import { z } from 'zod'

export const offerSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    title_fr: z.string().optional(),
    description: z.string().optional(),
    description_fr: z.string().optional(),
    price: z.number().min(0, 'Price must be positive'),
    image_url: z.string().min(1, 'Image is required'),
    redirect_url: z.string().url('Invalid URL').optional().or(z.literal('')),
})

export type OfferFormValues = z.infer<typeof offerSchema>
