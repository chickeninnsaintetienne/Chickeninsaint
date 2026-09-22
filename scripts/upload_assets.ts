
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('Error: Missing Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY)')
    process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

const BUCKET_NAME = 'chicken_inn_bucket'
const ASSETS_DIR = path.resolve(process.cwd(), 'scripts/assets')

async function uploadAssets() {
    console.log('🚀 Starting asset upload...')

    // 1. Check/Create Bucket (Optional, as user should have created it)
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets()
    if (bucketError) {
        console.error('Error listing buckets:', bucketError.message)
        // Proceeding anyway, maybe it exists but listing failed
    }

    const bucketExists = buckets?.find(b => b.name === BUCKET_NAME)
    if (!bucketExists) {
        console.log(`Bucket ${BUCKET_NAME} not found (or not visible). Attempting upload might fail if it doesn't exist.`)
    } else {
        console.log(`Bucket ${BUCKET_NAME} found.`)
    }

    const files = fs.readdirSync(ASSETS_DIR)
    const fileMap: Record<string, string> = {} // Filename -> Public URL

    for (const file of files) {
        if (!file.endsWith('.png') && !file.endsWith('.jpg') && !file.endsWith('.jpeg')) continue

        console.log(`Uploading ${file}...`)
        const filePath = path.join(ASSETS_DIR, file)
        const fileBuffer = fs.readFileSync(filePath)
        const fileMime = file.endsWith('.png') ? 'image/png' : 'image/jpeg'

        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(file, fileBuffer, {
                contentType: fileMime,
                upsert: true
            })

        if (error) {
            console.error(`Failed to upload ${file}:`, error.message)
            continue
        }

        const { data: publicUrlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(file)

        console.log(`✅ Uploaded ${file} -> ${publicUrlData.publicUrl}`)
        fileMap[file] = publicUrlData.publicUrl
    }

    return fileMap
}

async function updateDatabase(fileMap: Record<string, string>) {
    console.log('🔄 Updating database records...')

    // 1. Update Categories
    const categories = [
        { slug: 'burgers', file: 'burgers.png' },
        { slug: 'tacos', file: 'tacos.png' },
        { slug: 'wraps', file: 'wraps.png' },
        { slug: 'family', file: 'family.png' },
        { slug: 'buckets', file: 'buckets.png' },
        { slug: 'tex-mex', file: 'tex-mex.png' },
        { slug: 'salads', file: 'salads.png' },
        { slug: 'desserts', file: 'desserts.png' },
        { slug: 'drinks', file: 'drinks.png' },
    ]

    for (const cat of categories) {
        if (fileMap[cat.file]) {
            const { error } = await supabase
                .from('categories')
                .update({ image_url: fileMap[cat.file] })
                .eq('slug', cat.slug)

            if (error) console.error(`Error updating category ${cat.slug}:`, error.message)
            else console.log(`Updated category ${cat.slug}`)
        }
    }

    // 2. Update Products (Bulk update with placeholder for now)
    // In a real scenario, we'd map specific product IDs to specific images.
    // Here we will set all products to use the generic placeholder, 
    // AND then seemingly "smartly" map signatures if we had them.

    if (fileMap['product_placeholder.png']) {
        const { error } = await supabase
            .from('products')
            .update({ image_url: fileMap['product_placeholder.png'] })
            // We update all products that currently have the placehold.co domain or are empty
            .or('image_url.ilike.%placehold.co%,image_url.is.null')

        if (error) console.error('Error updating products:', error.message)
        else console.log('Updated products with placeholder image.')
    }

    console.log('✅ Database update complete.')
}

async function main() {
    try {
        const fileMap = await uploadAssets()
        await updateDatabase(fileMap)
    } catch (err) {
        console.error('Script failed:', err)
    }
}

main()
