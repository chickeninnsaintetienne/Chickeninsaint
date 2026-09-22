import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('Error: Missing Supabase environment variables in .env.local')
    process.exit(1)
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const PRODUCTS = [
    {
        number: '1',
        name: 'Classic Burger',
        description: 'Juicy beef patty with lettuce, tomato, and secret sauce.',
        ingredients: ['Beef', 'Lettuce', 'Tomato', 'Sauce'],
        category: 'Burgers',
        price_solo: 5.50,
        price_menu: 8.50,
        image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
    },
    {
        number: '2',
        name: 'Cheese Lover',
        description: 'Double beef patty with extra cheddar cheese.',
        ingredients: ['Double Beef', 'Cheddar', 'Onion'],
        category: 'Burgers',
        price_solo: 6.50,
        price_menu: 9.50,
        image_url: 'https://images.unsplash.com/photo-1586190848861-99c8a3bd79ea?auto=format&fit=crop&w=800&q=80'
    },
    {
        number: '10',
        name: 'Chicken Tacos',
        description: 'Grilled chicken with peppers and spicy sauce in a taco.',
        ingredients: ['Chicken', 'Peppers', 'Spicy Sauce'],
        category: 'Tacos',
        price_solo: 6.00,
        price_menu: 9.00,
        image_url: 'https://images.unsplash.com/photo-1599974579688-8dbdd33f8eb5?auto=format&fit=crop&w=800&q=80'
    },
    {
        number: '20',
        name: 'Family Feast',
        description: '10 pieces of chicken, 4 fries, and a large drink.',
        ingredients: ['Chicken', 'Fries', 'Drink'],
        category: 'Menus Famille',
        price_solo: 25.00,
        price_menu: null,
        image_url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80'
    },
    {
        number: '30',
        name: 'Coca Cola',
        description: 'Refreshing cola drink.',
        ingredients: [],
        category: 'Drinks',
        price_solo: 2.00,
        price_menu: null,
        image_url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80'
    }
]

const OFFERS = [
    {
        title: 'Lunch Special',
        description: 'Get a free drink with any burger purchase between 12PM and 2PM.',
        price: 5.50,
        image_url: 'https://images.unsplash.com/photo-1549488352-84b67534d42f?auto=format&fit=crop&w=800&q=80',
        redirect_url: ''
    },
    {
        title: 'Family Weekend',
        description: '20% off all Menu Famille orders this weekend!',
        price: 20.00,
        image_url: 'https://images.unsplash.com/photo-1561758033-d8f19662cb23?auto=format&fit=crop&w=800&q=80',
        redirect_url: ''
    }
]

const SETTINGS = {
    phone: '+33 1 23 45 67 89',
    hours: 'Mon - Sun: 11:00 - 23:00',
    address: '123 Avenue des Champs-Élysées, 75008 Paris',
    uber_eats_url: 'https://ubereats.com',
    deliveroo_url: 'https://deliveroo.fr'
}

async function seed() {
    console.log('🌱 Starting seed...')

    // Seed Products
    console.log('Inserting products...')
    const { error: prodError } = await supabase.from('products').upsert(PRODUCTS, { onConflict: 'number' }) // Using number as pseudo-unique for seed consistency if constraints allowed, but ID is UUID. So this will just insert duplicates if run multiple times without cleanup. Ideally we clean first.

    if (prodError) console.error('Error inserting products:', prodError.message)
    else console.log('Products inserted.')

    // Seed Offers
    console.log('Inserting offers...')
    const { error: offerError } = await supabase.from('offers').insert(OFFERS)
    if (offerError) console.error('Error inserting offers:', offerError.message)
    else console.log('Offers inserted.')

    // Seed Settings
    console.log('Inserting settings...')
    // Clean existing settings first to ensure only one row
    const { error: cleanSettingsErr } = await supabase.from('settings').delete().neq('id', '00000000-0000-0000-0000-000000000000') // delete all
    if (cleanSettingsErr) console.log('Note on settings clean:', cleanSettingsErr.message)

    const { error: settingsError } = await supabase.from('settings').insert(SETTINGS)
    if (settingsError) console.error('Error inserting settings:', settingsError.message)
    else console.log('Settings inserted.')

    console.log('✅ Seed completed.')
}

seed()
