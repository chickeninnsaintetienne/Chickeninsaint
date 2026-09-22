import { z } from 'zod'

export const productSchema = z.object({
    number: z.string().min(1, 'Number is required'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    name_fr: z.string().optional(),
    description: z.string().optional(),
    description_fr: z.string().optional(),
    ingredients: z.string().optional(),
    category_id: z.string().uuid('Category is required'),
    price_solo: z.number().min(0, 'Price must be positive'),
    price_menu: z.number().min(0).optional(),
    quantity: z.string().optional(),
    display_order: z.number().optional(),
    image_url: z.string().optional(),
})

export type ProductFormValues = z.infer<typeof productSchema>
