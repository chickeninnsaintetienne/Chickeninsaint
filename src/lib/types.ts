export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Category {
    id: string
    name: string
    name_fr?: string | null
    slug: string
    image_url?: string | null
    display_order: number
    created_at: Date
}

export interface Product {
    id: string
    number: string
    name: string
    name_fr?: string | null
    description: string | null
    description_fr?: string | null
    ingredients: string[] | null
    category_id: string
    category?: Category
    price_solo: number | null
    price_menu: number | null
    quantity?: string | null
    display_order?: number
    image_url: string | null
    created_at: Date
}

export interface Database {
    public: {
        Tables: {
            categories: {
                Row: Category
                Insert: Omit<Category, 'id' | 'created_at'> & { id?: string; created_at?: string }
                Update: Partial<Omit<Category, 'id' | 'created_at'>> & { id?: string; created_at?: string }
            }
            products: {
                name?: string
                description?: string | null
                ingredients?: string[] | null
                category?: string
                price_solo?: number
                price_menu?: number | null
                image_url?: string
                created_at?: string
            }
            offers: {
                Row: {
                    id: string
                    title: string
                    title_fr?: string | null
                    description: string | null
                    description_fr?: string | null
                    image_url: string
                    price: number
                    redirect_url: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    title_fr?: string | null
                    description?: string | null
                    description_fr?: string | null
                    image_url: string
                    price: number
                    redirect_url?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    title_fr?: string | null
                    description?: string | null
                    description_fr?: string | null
                    image_url?: string
                    price?: number
                    redirect_url?: string | null
                    created_at?: string
                }
            }
            settings: {
                Row: {
                    id: string
                    phone: string | null
                    hours: string | null
                    address: string | null
                    uber_eats_url: string | null
                    deliveroo_url: string | null
                    social_facebook: string | null
                    social_instagram: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    phone?: string | null
                    hours?: string | null
                    address?: string | null
                    uber_eats_url?: string | null
                    deliveroo_url?: string | null
                    social_facebook?: string | null
                    social_instagram?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    phone?: string | null
                    hours?: string | null
                    address?: string | null
                    uber_eats_url?: string | null
                    deliveroo_url?: string | null
                    social_facebook?: string | null
                    social_instagram?: string | null
                    created_at?: string
                }
            }
        }
    }
}
