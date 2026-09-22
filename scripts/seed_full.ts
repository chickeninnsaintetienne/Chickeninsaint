import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.error('Error: Missing Supabase URL in .env.local')
    process.exit(1)
}

const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!serviceKey) {
    console.error('Error: Missing Supabase service role key or anon key in .env.local')
    process.exit(1)
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    serviceKey,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
)

const CATEGORIES = [
    {
        name: 'Menus Burgers',
        name_fr: 'Menus Burgers',
        slug: 'burgers',
        display_order: 1,
        image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Baguettes & Wraps',
        name_fr: 'Baguettes & Wraps',
        slug: 'baguettes-wraps',
        display_order: 2,
        image_url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Menus Chickens',
        name_fr: 'Menus Chickens',
        slug: 'chickens',
        display_order: 3,
        image_url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Tacos',
        name_fr: 'Tacos',
        slug: 'tacos',
        display_order: 4,
        image_url: 'https://images.unsplash.com/photo-1599974579688-8dbdd33f8eb5?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Salads',
        name_fr: 'Salades',
        slug: 'salads',
        display_order: 5,
        image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Fries',
        name_fr: 'Frits',
        slug: 'fries',
        display_order: 6,
        image_url: 'https://images.unsplash.com/photo-1585238341710-f37f3661ae8e?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Family Menus',
        name_fr: 'Menus Famille',
        slug: 'family',
        display_order: 7,
        image_url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Chicken Only',
        name_fr: 'Chicken seul',
        slug: 'chicken-only',
        display_order: 8,
        image_url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Pizza',
        name_fr: 'Pizza Inn',
        slug: 'pizza',
        display_order: 9,
        image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80'
    }
]

const PRODUCTS = [
    {
        number: '1',
        name: 'Cheese Burger',
        name_fr: 'Cheese Burger',
        description: 'Sandwich with steak minced beef, cheese and salad',
        description_fr: 'Sandwich avec steak haché de boeuf, fromage et salade',
        ingredients: ['Beef Patty', 'Cheese', 'Lettuce', 'Salad'],
        category: 'burgers',
        price_solo: 4.50,
        price_menu: 6.50,
        display_order: 1
    },
    {
        number: '2',
        name: 'Double Cheese Burger',
        name_fr: 'Double Cheese Burger',
        description: 'Sandwich with double beef burger, double cheese, tomato and salad',
        description_fr: 'Sandwich avec double hamburger de boeuf, double fromage, tomates et salade',
        ingredients: ['Double Beef', 'Double Cheese', 'Tomato', 'Salad'],
        category: 'burgers',
        price_solo: 5.50,
        price_menu: 7.50,
        display_order: 2
    },
    {
        number: '3',
        name: 'Triple Cheese Burger',
        name_fr: 'Triple Cheese Burger',
        description: 'Sandwich with triple beef burger, triple cheese, tomato and salad',
        description_fr: 'Sandwich avec triple hamburger de boeuf, triple fromage, tomates et salade',
        ingredients: ['Triple Beef', 'Triple Cheese', 'Tomato', 'Salad'],
        category: 'burgers',
        price_solo: 6.50,
        price_menu: 8.50,
        display_order: 3
    },
    {
        number: '4',
        name: 'Chicken Royal',
        name_fr: 'Chicken Royal',
        description: 'Sandwich with chicken breast, cheese and delicious homemade sauce',
        description_fr: 'Sandwich avec blanc de poulet pané, fromage et une délicieuse sauce de pomme de terre',
        ingredients: ['Chicken Breast', 'Cheese', 'Special Sauce'],
        category: 'burgers',
        price_solo: 7.00,
        price_menu: 9.00,
        display_order: 4
    },
    {
        number: '5',
        name: 'Chicken Spécial',
        name_fr: 'Chicken Spécial',
        description: 'Sandwich with breaded chicken, cheese and delicious sauce',
        description_fr: 'Sandwich avec blanc de poulet pané et fromage',
        ingredients: ['Breaded Chicken', 'Cheese', 'Special Sauce'],
        category: 'burgers',
        price_solo: 6.00,
        price_menu: 8.00,
        display_order: 5
    },
    {
        number: '6',
        name: 'Filet O Fish',
        name_fr: 'Filet O Fish',
        description: 'Sandwich with breaded fish fillet, cheese and salad',
        description_fr: 'Sandwich avec filet de poisson pané, fromage et salade',
        ingredients: ['Fish Fillet', 'Cheese', 'Salad'],
        category: 'burgers',
        price_solo: 6.50,
        price_menu: 8.50,
        display_order: 6
    },
    {
        number: '7',
        name: 'Big Chicken',
        name_fr: 'Big Chicken',
        description: 'Sandwich with chicken breast marinated in lemon and grilled, tomato and salad',
        description_fr: 'Sandwich avec blanc de poulet mariné au citron et grillé, tomates et salade',
        ingredients: ['Grilled Chicken', 'Lemon', 'Tomato', 'Salad'],
        category: 'burgers',
        price_solo: 7.00,
        price_menu: 9.00,
        display_order: 7
    },
    {
        number: '8',
        name: 'Grand Beef',
        name_fr: 'Grand Beef',
        description: 'Large sandwich with generous minced steak 110 gr, cheese, tomato and salad',
        description_fr: 'Gros sandwich avec un généreux steack haché 110 gr, fromage, tomates et salade',
        ingredients: ['110g Beef', 'Cheese', 'Tomato', 'Salad'],
        category: 'burgers',
        price_solo: 6.50,
        price_menu: 8.50,
        display_order: 8
    },
    {
        number: '9',
        name: 'Tikka Burger',
        name_fr: 'Tikka Burger',
        description: 'Sandwich with chicken breast grilled and marinated in tandoori sauce, cheese, salad',
        description_fr: 'Sandwich avec blanc de poulet grillé et mariné à la sauce tandoori, fromage, salade',
        ingredients: ['Tikka Chicken', 'Tandoori', 'Cheese', 'Salad'],
        category: 'burgers',
        price_solo: 7.00,
        price_menu: 9.00,
        display_order: 9
    },
    {
        number: '10',
        name: 'Mega Beef Parmesan',
        name_fr: 'Mega Beef Parmesan',
        description: 'Sandwich with beef slice, parmesan, tomatoes, salad and bell peppers',
        description_fr: 'Sandwich avec blanc de boeuf tranche de parmesan, tomates, salade et poivrons piquants',
        ingredients: ['Beef', 'Parmesan', 'Tomato', 'Peppers'],
        category: 'burgers',
        price_solo: 7.50,
        price_menu: 9.50,
        display_order: 10
    },
    {
        number: '11',
        name: 'Mega Chicken Parmesan',
        name_fr: 'Mega Chicken Parmesan',
        description: 'Sandwich with grilled chicken breast, parmesan, tomatoes, salad and bell peppers',
        description_fr: 'Sandwich avec blanc de poulet grillé tranche de parmesan, tomates, salade et poivrons piquants',
        ingredients: ['Grilled Chicken', 'Parmesan', 'Tomato', 'Peppers'],
        category: 'burgers',
        price_solo: 7.50,
        price_menu: 9.50,
        display_order: 11
    },
    {
        number: '12',
        name: 'Veggie Lovers',
        name_fr: 'Veggie Lovers',
        description: 'Delicious vegetable burger with crispy salad',
        description_fr: 'Délicieux burger aux légumes accompagné de sa salade croquante',
        ingredients: ['Vegetables', 'Crispy Salad'],
        category: 'burgers',
        price_solo: 6.00,
        price_menu: 8.00,
        display_order: 12
    },
    {
        number: '13',
        name: 'Chicken Baguette',
        name_fr: 'Chicken Baguette',
        description: 'Baguette with chicken breast breaded and salad',
        description_fr: 'Baguette avec blanc de poulet pané et salade',
        ingredients: ['Breaded Chicken', 'Salad'],
        category: 'baguettes-wraps',
        price_solo: 7.00,
        price_menu: 9.00,
        display_order: 13
    },
    {
        number: '14',
        name: 'Tikka Baguette',
        name_fr: 'Tikka Baguette',
        description: 'Baguette with chicken breast marinated in tandoori sauce, tomato and salad',
        description_fr: 'Baguette avec blanc de poulet mariné et grillé à la sauce tandoori, tomates et salade',
        ingredients: ['Tikka Chicken', 'Tandoori', 'Tomato', 'Salad'],
        category: 'baguettes-wraps',
        price_solo: 7.50,
        price_menu: 9.50,
        display_order: 14
    },
    {
        number: '15',
        name: 'Naan Grill Tikka',
        name_fr: 'Naan Grill Tikka',
        description: 'Naan bread with chicken breast marinated in tandoori sauce, grilled onions, tomato and salad',
        description_fr: 'Pain naan avec blanc de poulet mariné et grillé à la sauce tandoori, oignons grillés, tomates et salade',
        ingredients: ['Tikka Chicken', 'Tandoori', 'Grilled Onion', 'Tomato'],
        category: 'baguettes-wraps',
        price_solo: 8.00,
        price_menu: 10.00,
        display_order: 15
    },
    {
        number: '16',
        name: 'Chicken Wrap',
        name_fr: 'Chicken Wrap',
        description: 'Wrap with chicken, tomato and salad',
        description_fr: 'Galette au poulet, tomates et salade',
        ingredients: ['Chicken', 'Tomato', 'Salad'],
        category: 'baguettes-wraps',
        price_solo: 7.00,
        price_menu: 9.00,
        display_order: 16
    },
    {
        number: '17',
        name: 'Tikka Wrap',
        name_fr: 'Tikka Wrap',
        description: 'Wrap with tikka chicken, tomato and salad',
        description_fr: 'Galette au poulet tikka, tomates et salade',
        ingredients: ['Tikka Chicken', 'Tomato', 'Salad'],
        category: 'baguettes-wraps',
        price_solo: 7.50,
        price_menu: 9.50,
        display_order: 17
    },
    {
        number: '18',
        name: 'Seekh Kebab Wrap',
        name_fr: 'Seekh Kebab Wrap',
        description: 'Wrap with seekh kebab, tomato and salad',
        description_fr: 'Galette avec seekh kebab poulet, tomates et salade',
        ingredients: ['Seekh Kebab', 'Tomato', 'Salad'],
        category: 'baguettes-wraps',
        price_solo: 7.00,
        price_menu: 9.00,
        display_order: 18
    },
    {
        number: '19',
        name: 'Chicken Mix',
        name_fr: 'Chicken Mix',
        description: '2 large pieces of chicken + 3 spicy chicken wings',
        description_fr: '2 grands morceaux de poulet + 3 Ailes de poulet épicées',
        ingredients: ['Chicken', 'Spicy Wings'],
        category: 'chickens',
        price_solo: 7.00,
        price_menu: 9.00,
        display_order: 19
    },
    {
        number: '20',
        name: '3X Chicken',
        name_fr: '3X Chicken',
        description: '3 large pieces of grilled chicken',
        description_fr: '3 grands morceaux de poulet grillés',
        ingredients: ['Grilled Chicken'],
        category: 'chickens',
        price_solo: 6.50,
        price_menu: 8.50,
        display_order: 20
    },
    {
        number: '21',
        name: 'Hot Spicy Wings',
        name_fr: 'Hot Spicy Wings',
        description: 'Spicy breaded chicken wings',
        description_fr: 'Ailes de poulet pané, épicées',
        ingredients: ['Spicy Wings'],
        category: 'chickens',
        quantity: '3 Ailes',
        price_solo: 3.00,
        price_menu: null,
        display_order: 21
    },
    {
        number: '21-6',
        name: 'Hot Spicy Wings',
        name_fr: 'Hot Spicy Wings',
        description: 'Spicy breaded chicken wings',
        description_fr: 'Ailes de poulet pané, épicées',
        ingredients: ['Spicy Wings'],
        category: 'chickens',
        quantity: '6 Ailes',
        price_solo: 5.00,
        price_menu: 6.00,
        display_order: 21
    },
    {
        number: '21-10',
        name: 'Hot Spicy Wings',
        name_fr: 'Hot Spicy Wings',
        description: 'Spicy breaded chicken wings',
        description_fr: 'Ailes de poulet pané, épicées',
        ingredients: ['Spicy Wings'],
        category: 'chickens',
        quantity: '10 Ailes',
        price_solo: 8.00,
        price_menu: 10.00,
        display_order: 21
    },
    {
        number: '22',
        name: 'Chicken Strips',
        name_fr: 'Chicken Strips',
        description: '5 slices of breaded chicken (tenders)',
        description_fr: '5 petites tranches de poulet pané (TENDERS)',
        ingredients: ['Chicken Tenders'],
        category: 'chickens',
        price_solo: 6.00,
        price_menu: 8.00,
        display_order: 22
    },
    {
        number: '23',
        name: 'Chicken Nuggets',
        name_fr: 'Chicken Nuggets',
        description: 'Crispy chicken nuggets',
        description_fr: 'Croquettes de poulet pané',
        ingredients: ['Chicken Nuggets'],
        category: 'chickens',
        quantity: '6 Pieces',
        price_solo: 5.00,
        price_menu: 7.00,
        display_order: 23
    },
    {
        number: '23-9',
        name: 'Chicken Nuggets',
        name_fr: 'Chicken Nuggets',
        description: 'Crispy chicken nuggets',
        description_fr: 'Croquettes de poulet pané',
        ingredients: ['Chicken Nuggets'],
        category: 'chickens',
        quantity: '9 Pieces',
        price_solo: 6.50,
        price_menu: 8.50,
        display_order: 23
    },
    {
        number: '24',
        name: 'Chicken Pop corn',
        name_fr: 'Chicken Pop corn',
        description: 'Chicken popcorn',
        description_fr: 'Pop corn de poulet',
        ingredients: ['Popcorn Chicken'],
        category: 'chickens',
        quantity: '12 Pieces',
        price_solo: 5.90,
        price_menu: 7.90,
        display_order: 24
    },
    {
        number: '24-18',
        name: 'Chicken Pop corn',
        name_fr: 'Chicken Pop corn',
        description: 'Chicken popcorn',
        description_fr: 'Pop corn de poulet',
        ingredients: ['Popcorn Chicken'],
        category: 'chickens',
        quantity: '18 Pieces',
        price_solo: 7.90,
        price_menu: 9.90,
        display_order: 24
    },
    {
        number: '25',
        name: 'Chicken Tikka',
        name_fr: 'Chicken Tikka',
        description: '5 pieces of chicken breast grilled and marinated in tandoori sauce',
        description_fr: '5 morceaux de blanc poulet grillés et marinés à la sauce tandoori',
        ingredients: ['Tikka Chicken', 'Tandoori'],
        category: 'chickens',
        price_solo: 7.90,
        price_menu: 9.90,
        display_order: 25
    },
    {
        number: '26',
        name: 'Samosas',
        name_fr: 'Samosas',
        description: 'Vegetables, chicken',
        description_fr: 'Légumes, poulet',
        ingredients: ['Vegetables', 'Chicken'],
        category: 'chickens',
        price_solo: 6.00,
        price_menu: 8.00,
        display_order: 26
    },
    {
        number: '27',
        name: 'Tacos',
        name_fr: 'Tacos',
        description: 'Chicken tacos with TIKKA, grilled CHICKEN or minced STEAK or KEBAB',
        description_fr: 'Tacos avec poulet TIKKA ou Escalope de poulet NATURE ou STEAK HACHÉE ou KEBAB',
        ingredients: ['Chicken', 'Tikka', 'Steak', 'Kebab'],
        category: 'tacos',
        price_solo: 7.50,
        price_menu: 9.50,
        display_order: 27
    },
    {
        number: '28',
        name: 'Tacos with tenders',
        name_fr: 'Tacos avec tenders',
        description: 'Small chicken slices breaded',
        description_fr: 'Petites tranches de poulet pané',
        ingredients: ['Chicken Tenders'],
        category: 'tacos',
        price_solo: 7.00,
        price_menu: 9.00,
        display_order: 28
    },
    {
        number: '29',
        name: 'Chicken Salad',
        name_fr: 'Salade de poulet',
        description: 'Mixed salad, 2 pieces of breaded chicken, mozzarella',
        description_fr: 'Salade mixte, 2 morceaux de poulet pané, mozzarella',
        ingredients: ['Salad', 'Chicken', 'Mozzarella'],
        category: 'salads',
        price_solo: 6.50,
        price_menu: null,
        display_order: 29
    },
    {
        number: '30',
        name: 'Tikka Chicken Salad',
        name_fr: 'Salade de poulet Tikka',
        description: 'Mixed salad, 2 pieces of grilled tikka chicken, mozzarella',
        description_fr: 'Salade mixte, 2 morceaux de poulet tikka grillé, mozzarella',
        ingredients: ['Salad', 'Tikka Chicken', 'Mozzarella'],
        category: 'salads',
        price_solo: 7.50,
        price_menu: null,
        display_order: 30
    },
    {
        number: '31',
        name: 'Potato Wedge',
        name_fr: 'Potato Wedge',
        description: 'Potato wedges',
        description_fr: 'Potato Wedge',
        ingredients: ['Potato'],
        category: 'fries',
        price_solo: 4.00,
        price_menu: null,
        display_order: 31
    },
    {
        number: '32',
        name: 'Frites Spirales',
        name_fr: 'Frites Spirales',
        description: 'Spiral fries',
        description_fr: 'Frites Spirales',
        ingredients: ['Spiral Fries'],
        category: 'fries',
        price_solo: 4.00,
        price_menu: null,
        display_order: 32
    },
    {
        number: '33',
        name: 'Onion Rings',
        name_fr: 'Onion Rings',
        description: 'Crispy onion rings',
        description_fr: 'Onion Rings',
        ingredients: ['Onion'],
        category: 'fries',
        price_solo: 4.00,
        price_menu: null,
        display_order: 33
    },
    {
        number: '34',
        name: 'Mozza stick',
        name_fr: 'Mozza stick',
        description: 'Mozzarella sticks',
        description_fr: 'Mozza stick',
        ingredients: ['Mozzarella'],
        category: 'fries',
        price_solo: 4.00,
        price_menu: null,
        display_order: 34
    },
    {
        number: '35',
        name: 'Red hot jalapeños 6 pic',
        name_fr: 'Red hot jalapeños 6 pic',
        description: 'Red hot jalapeños',
        description_fr: 'Red hot jalapeños 6 pic',
        ingredients: ['Jalapeños'],
        category: 'fries',
        price_solo: 6.00,
        price_menu: null,
        display_order: 35
    },
    {
        number: '36',
        name: 'Frites',
        name_fr: 'Frites',
        description: 'French fries',
        description_fr: 'Frites',
        ingredients: ['Fries'],
        category: 'fries',
        quantity: '1.50 €',
        price_solo: 1.50,
        price_menu: null,
        display_order: 36
    },
    {
        number: '36-l',
        name: 'Frites',
        name_fr: 'Frites',
        description: 'French fries',
        description_fr: 'Frites',
        ingredients: ['Fries'],
        category: 'fries',
        quantity: '3.00 €',
        price_solo: 3.00,
        price_menu: null,
        display_order: 36
    },
    {
        number: '37',
        name: '25 Spicy Chicken Wings',
        name_fr: '25 Ailes de Poulet Épicées',
        description: '25 spicy chicken wings',
        description_fr: '25 Ailes de poulet Épicées',
        ingredients: ['Spicy Wings'],
        category: 'family',
        price_solo: 27.00,
        price_menu: null,
        display_order: 37
    },
    {
        number: '38',
        name: '6 Chicken Pieces + 12 Spicy Wings',
        name_fr: '6 Morceaux de Poulet + 12 Ailes de poulet Épicées',
        description: '6 chicken pieces and 12 spicy wings',
        description_fr: '6 Morceaux de Poulet + 12 Ailes de poulet Épicées',
        ingredients: ['Chicken', 'Spicy Wings'],
        category: 'family',
        price_solo: 27.00,
        price_menu: null,
        display_order: 38
    },
    {
        number: '39',
        name: '10 Chicken Pieces',
        name_fr: '10 Morceaux de Poulet',
        description: '10 chicken pieces',
        description_fr: '10 Morceaux de Poulet',
        ingredients: ['Chicken'],
        category: 'family',
        price_solo: 27.00,
        price_menu: null,
        display_order: 39
    },
    {
        number: '40',
        name: '20 Spicy Wings + 10 Tenders',
        name_fr: '20 Ailes de poulet Épicées + 10 Filets de poulet (Tenders)',
        description: '20 spicy wings and 10 chicken tenders',
        description_fr: '20 Ailes de poulet Épicées + 10 Filets de poulet (Tenders)',
        ingredients: ['Spicy Wings', 'Tenders'],
        category: 'family',
        price_solo: 33.00,
        price_menu: null,
        display_order: 40
    },
    {
        number: '41',
        name: '20 Tenders',
        name_fr: '20 Filets de Poulet (TENDERS)',
        description: '20 chicken tenders',
        description_fr: '20 Filets de Poulet (TENDERS)',
        ingredients: ['Tenders'],
        category: 'family',
        price_solo: 30.00,
        price_menu: null,
        display_order: 41
    },
    {
        number: '42',
        name: '25 Spicy Wings',
        name_fr: '25 Ailes de poulet Épicees',
        description: '25 spicy chicken wings',
        description_fr: '25 Ailes de poulet Épicees',
        ingredients: ['Spicy Wings'],
        category: 'chicken-only',
        price_solo: 22.00,
        price_menu: null,
        display_order: 42
    },
    {
        number: '43',
        name: '33 Spicy Wings',
        name_fr: '33 Ailes de poulet Épicees',
        description: '33 spicy chicken wings',
        description_fr: '33 Ailes de poulet Épicees',
        ingredients: ['Spicy Wings'],
        category: 'chicken-only',
        price_solo: 27.00,
        price_menu: null,
        display_order: 43
    },
    {
        number: '44',
        name: '6 Chicken Pieces + 12 Spicy Wings',
        name_fr: '6 Morceaux de Poulet + 12 Ailes de poulet Épicees',
        description: '6 chicken pieces and 12 spicy wings',
        description_fr: '6 Morceaux de Poulet + 12 Ailes de poulet Épicees',
        ingredients: ['Chicken', 'Spicy Wings'],
        category: 'chicken-only',
        price_solo: 23.00,
        price_menu: null,
        display_order: 44
    },
    {
        number: '45',
        name: '6 Large Chicken + 10 Spicy Wings + 10 Strips',
        name_fr: '6 Gran Morceaux de poulet + 10 Ailes de poulet Épicees + 10 Strips(Tanders)',
        description: '6 large chicken pieces, 10 spicy wings and 10 strips',
        description_fr: '6 Gran Morceaux de poulet + 10 Ailes de poulet Épicees + 10 Strips(Tanders)',
        ingredients: ['Chicken', 'Spicy Wings', 'Strips'],
        category: 'chicken-only',
        price_solo: 28.00,
        price_menu: null,
        display_order: 45
    },
    {
        number: '46',
        name: '20 Spicy Wings + 10 Strips',
        name_fr: '20 Ailes de poulet Épicees + 10 Strips(Tanders)',
        description: '20 spicy wings and 10 strips',
        description_fr: '20 Ailes de poulet Épicees + 10 Strips(Tanders)',
        ingredients: ['Spicy Wings', 'Strips'],
        category: 'chicken-only',
        price_solo: 33.00,
        price_menu: null,
        display_order: 46
    },
    {
        number: 'p1',
        name: 'Italiana',
        name_fr: 'Italiana',
        description: 'Tomatoes, mozzarella, fresh tomato, basil',
        description_fr: 'Tomates, mozzarella, tomate fraîche, basilic',
        ingredients: ['Tomato', 'Mozzarella', 'Basil'],
        category: 'pizza',
        price_solo: 8.00,
        price_menu: null,
        display_order: 1
    },
    {
        number: 'p2',
        name: 'Margarita',
        name_fr: 'Margarita',
        description: 'Tomatoes, mozzarella',
        description_fr: 'Tomates, mozzarella',
        ingredients: ['Tomato', 'Mozzarella'],
        category: 'pizza',
        price_solo: 7.50,
        price_menu: null,
        display_order: 2
    },
    {
        number: 'p3',
        name: 'Tandoori',
        name_fr: 'Tandoori',
        description: 'Tomatoes, mozzarella, chicken, tandoori, peppers, olives',
        description_fr: 'Tomates, mozzarella, poulet, tandoori, poivrons, olives',
        ingredients: ['Tomato', 'Mozzarella', 'Chicken', 'Tandoori', 'Peppers'],
        category: 'pizza',
        price_solo: 10.00,
        price_menu: null,
        display_order: 3
    },
    {
        number: 'p4',
        name: 'Boisée',
        name_fr: 'Boisée',
        description: 'Cream, chicken, bell peppers, mushrooms, peppers, gruyère',
        description_fr: 'Crème fraîche, poulet, poivrons,oignons, sauce gruyère',
        ingredients: ['Cream', 'Chicken', 'Peppers', 'Mushroom', 'Gruyère'],
        category: 'pizza',
        price_solo: 10.00,
        price_menu: null,
        display_order: 4
    },
    {
        number: 'p5',
        name: 'Thori',
        name_fr: 'Thori',
        description: 'Tomatoes, mozzarella, tuna, onions, olives',
        description_fr: 'Tomates, mozzarella, thon, oignons, olives',
        ingredients: ['Tomato', 'Mozzarella', 'Tuna', 'Onions', 'Olives'],
        category: 'pizza',
        price_solo: 10.00,
        price_menu: null,
        display_order: 5
    },
    {
        number: 'p6',
        name: 'Végétarienne',
        name_fr: 'Végétarienne',
        description: 'Tomatoes, mozzarella, peppers, bell peppers, olives',
        description_fr: 'Tomates, mozzarella, poivrons, aubergines, poivrons, olives',
        ingredients: ['Tomato', 'Mozzarella', 'Peppers', 'Vegetables'],
        category: 'pizza',
        price_solo: 8.50,
        price_menu: null,
        display_order: 6
    },
    {
        number: 'p7',
        name: 'Reine',
        name_fr: 'Reine',
        description: 'Tomatoes, mozzarella, ham, mushrooms',
        description_fr: 'Tomates, mozzarella, jambon, champignons',
        ingredients: ['Tomato', 'Mozzarella', 'Ham', 'Mushroom'],
        category: 'pizza',
        price_solo: 9.50,
        price_menu: null,
        display_order: 7
    },
    {
        number: 'p8',
        name: 'Orientale',
        name_fr: 'Orientale',
        description: 'Tomatoes, mozzarella, merguez, bell peppers, onions',
        description_fr: 'Tomates, mozzarella, merguez, poivrons, oignons',
        ingredients: ['Tomato', 'Mozzarella', 'Merguez', 'Peppers', 'Onions'],
        category: 'pizza',
        price_solo: 10.00,
        price_menu: null,
        display_order: 8
    },
    {
        number: 'p9',
        name: '4 Fromages',
        name_fr: '4 Fromages',
        description: 'Tomatoes, 4 cheeses',
        description_fr: 'Tomates, 4 fromages',
        ingredients: ['Tomato', 'Cheeses'],
        category: 'pizza',
        price_solo: 9.50,
        price_menu: null,
        display_order: 9
    },
    {
        number: 'p10',
        name: 'Napolitaine',
        name_fr: 'Napolitaine',
        description: 'Tomatoes, mozzarella, anchovies, olives, capers',
        description_fr: 'Tomates, mozzarella, anchois, olives, câpres, olives',
        ingredients: ['Tomato', 'Mozzarella', 'Anchovies', 'Olives', 'Capers'],
        category: 'pizza',
        price_solo: 9.50,
        price_menu: null,
        display_order: 10
    },
    {
        number: 'p11',
        name: '4 Saisons',
        name_fr: '4 Saisons',
        description: 'Tomatoes, mozzarella, ham, mushrooms, anchovies, olives',
        description_fr: 'Tomates, mozzarella, jambon, champignons, anchois, olives',
        ingredients: ['Tomato', 'Mozzarella', 'Ham', 'Mushroom', 'Anchovies'],
        category: 'pizza',
        price_solo: 10.00,
        price_menu: null,
        display_order: 11
    },
    {
        number: 'p12',
        name: 'Bismark',
        name_fr: 'Bismark',
        description: 'Tomatoes, mozzarella, ham, egg',
        description_fr: 'Tomates, mozzarella, jambon, oeuf',
        ingredients: ['Tomato', 'Mozzarella', 'Ham', 'Egg'],
        category: 'pizza',
        price_solo: 9.50,
        price_menu: null,
        display_order: 12
    },
    {
        number: 'p13',
        name: 'Américaine',
        name_fr: 'Américaine',
        description: 'Tomatoes, mozzarella, sausage, fries',
        description_fr: 'Tomates, mozzarella, saucisse, frites',
        ingredients: ['Tomato', 'Mozzarella', 'Sausage', 'Fries'],
        category: 'pizza',
        price_solo: 10.00,
        price_menu: null,
        display_order: 13
    },
    {
        number: 'p14',
        name: 'Diavola',
        name_fr: 'Diavola',
        description: 'Tomatoes, mozzarella, spicy salami, piquant, olives',
        description_fr: 'Tomates, mozzarella, salami piquant, olives',
        ingredients: ['Tomato', 'Mozzarella', 'Spicy Salami', 'Olives'],
        category: 'pizza',
        price_solo: 9.50,
        price_menu: null,
        display_order: 14
    },
    {
        number: 'p15',
        name: 'Parmigiana',
        name_fr: 'Parmigiana',
        description: 'Tomatoes, mozzarella, aubergines, parmesan',
        description_fr: 'Tomates, mozzarella, aubergines, parmesan',
        ingredients: ['Tomato', 'Mozzarella', 'Aubergines', 'Parmesan'],
        category: 'pizza',
        price_solo: 9.50,
        price_menu: null,
        display_order: 15
    },
    {
        number: 'p16',
        name: 'Calzone',
        name_fr: 'Calzone',
        description: 'Tomatoes, mozzarella, ham',
        description_fr: 'Tomates, mozzarella, jambon',
        ingredients: ['Tomato', 'Mozzarella', 'Ham'],
        category: 'pizza',
        price_solo: 8.50,
        price_menu: null,
        display_order: 16
    }
]

const OFFERS = [
    {
        title: 'Offer 1',
        title_fr: 'Offre Spéciale 1',
        description: 'Burger, Large Fries, 3 hot spicy wings or 2 tenders + Drink',
        description_fr: 'Burger, Grande Frite, 3 hot spicy wings ou 2 tenders + Boisson',
        price: 9.99,
        image_url: 'https://images.unsplash.com/photo-1549488352-84b67534d42f?auto=format&fit=crop&w=800&q=80',
        redirect_url: null
    },
    {
        title: 'Offer 2',
        title_fr: 'Offre Spéciale 2',
        description: '1 mini wrap, Large Fries, 3 Hot spicy wings or 2 tenders + Drink',
        description_fr: '1 mini wrap, Grande Frite, 3 Hot spicy wings ou 2 tenders + Boisson',
        price: 9.99,
        image_url: 'https://images.unsplash.com/photo-1561758033-d8f19662cb23?auto=format&fit=crop&w=800&q=80',
        redirect_url: null
    },
    {
        title: 'Offer 3',
        title_fr: 'Offre Spéciale 3',
        description: '5 Strips(Tenders), Large Fries, 4 Spicy Chicken Wings, Coca + Bread',
        description_fr: '5 Strips(Tenders), Grande Frites, 4 Ailes de poulet Épicées, Coca + Pain',
        price: 14.99,
        image_url: 'https://images.unsplash.com/photo-1549488352-84b67534d42f?auto=format&fit=crop&w=800&q=80',
        redirect_url: null
    },
    {
        title: 'Chicken Bowl',
        title_fr: 'Chicken Bowl',
        description: 'Bowl with 3 choices: 1 chicken tikka, 2 kebab and 3 chicken tenders, with sauce of your choice, Large Fries + Drink',
        description_fr: 'Bol Avec 3 choix possibles: 1 chicken tikka, 2 kebab et 3 chicken tenders, avec la sauce de votre choix, Grande Frite + Boisson',
        price: 8.50,
        image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
        redirect_url: null
    }
]

const SETTINGS = {
    phone: '09 86 54 63 79',
    hours: 'Lun - Dim: 11:00 - 23:00',
    address: '88 RUE DU 11 NOVEMBRE, 42100 SAINT ETIENNE',
    uber_eats_url: 'https://ubereats.com',
    deliveroo_url: 'https://deliveroo.fr',
    social_facebook: 'https://facebook.com/chickeninn',
    social_instagram: 'https://instagram.com/chickeninn'
}

async function seed() {
    console.log('🌱 Starting comprehensive seed...')

    console.log('🗑️  Cleaning old data...')
    await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('offers').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('categories').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('settings').delete().neq('id', '00000000-0000-0000-0000-000000000000')

    console.log('📁 Inserting categories...')
    const { data: insertedCategories, error: catError } = await supabase
            .from('categories')
        .insert(CATEGORIES)
        .select()

    if (catError) {
        console.error('Error inserting categories:', catError.message)
        return
    }
    console.log(`✅ ${insertedCategories?.length} categories inserted.`)

    const categoryMap = new Map()
    insertedCategories?.forEach(cat => {
        categoryMap.set(cat.slug, cat.id)
    })

    console.log('🍔 Inserting products...')
    const productsWithCategoryIds = PRODUCTS.map(product => {
        const { category, ...rest } = product
        return {
            ...rest,
            category_id: categoryMap.get(category)
        }
    })

    const { data: insertedProducts, error: prodError } = await supabase
        .from('products')
        .insert(productsWithCategoryIds)
        .select()

    if (prodError) {
        console.error('Error inserting products:', prodError.message)
        return
    }
    console.log(`✅ ${insertedProducts?.length} products inserted.`)

    console.log('🎁 Inserting offers...')
    const { data: insertedOffers, error: offerError } = await supabase
        .from('offers')
        .insert(OFFERS)
        .select()

    if (offerError) {
        console.error('Error inserting offers:', offerError.message)
        return
    }
    console.log(`✅ ${insertedOffers?.length} offers inserted.`)

    console.log('⚙️  Inserting settings...')
    const { error: settingsError } = await supabase.from('settings').insert(SETTINGS)
    if (settingsError) {
        console.error('Error inserting settings:', settingsError.message)
        return
    }
    console.log('✅ Settings inserted.')

    console.log('🎉 Seed completed successfully!')
}

seed()
