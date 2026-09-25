/**
 * One-time cleanup for images left behind in Supabase Storage before the
 * admin panel started deleting old images automatically on replace/delete.
 *
 * Compares every file in chicken_inn_bucket/{products,categories,offers}
 * against the image_url values currently stored in the products, categories
 * and offers tables. Any bucket file with no matching row is "orphaned".
 *
 * SAFE BY DEFAULT: running with no flags only PRINTS what would be deleted.
 * Nothing is removed until you pass --confirm.
 *
 * Usage:
 *   npx tsx scripts/cleanup_orphan_images.ts            (dry run, no changes)
 *   npx tsx scripts/cleanup_orphan_images.ts --confirm   (actually deletes)
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

// Load whichever env file exists — prefer .env.local (Next.js convention),
// fall back to plain .env if that's what the project has.
for (const envFile of ['.env.local', '.env']) {
    const envPath = path.resolve(process.cwd(), envFile)
    if (fs.existsSync(envPath)) {
        dotenv.config({ path: envPath })
    }
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error('Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
    console.error('(The service role key is required here — listing/deleting arbitrary storage files needs it, the anon key is not enough.)')
    process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
})

const BUCKET_NAME = 'chicken_inn_bucket'
const FOLDERS = ['products', 'categories', 'offers'] as const

const CONFIRM = process.argv.includes('--confirm')

function extractPathFromUrl(imageUrl: string | null): string | null {
    if (!imageUrl) return null
    try {
        const url = new URL(imageUrl)
        const parts = url.pathname.split(`${BUCKET_NAME}/`)
        if (parts.length < 2) return null
        return decodeURIComponent(parts[1])
    } catch {
        return null
    }
}

async function getReferencedPaths(): Promise<Set<string>> {
    const referenced = new Set<string>()

    const tables = ['products', 'categories', 'offers'] as const
    for (const table of tables) {
        const { data, error } = await supabase.from(table).select('image_url')
        if (error) {
            console.error(`Error reading ${table}:`, error.message)
            continue
        }
        for (const row of data ?? []) {
            const p = extractPathFromUrl((row as any).image_url)
            if (p) referenced.add(p)
        }
    }

    return referenced
}

async function listBucketFiles(folder: string): Promise<string[]> {
    const { data, error } = await supabase.storage.from(BUCKET_NAME).list(folder, {
        limit: 1000,
    })
    if (error) {
        console.error(`Error listing ${folder}/:`, error.message)
        return []
    }
    return (data ?? [])
        .filter((f) => f.name && !f.name.endsWith('/')) // skip sub-"folders"
        .map((f) => `${folder}/${f.name}`)
}

async function main() {
    console.log(`🔍 Scanning bucket "${BUCKET_NAME}" for orphaned images...`)
    console.log(CONFIRM ? '⚠️  --confirm passed: matching files WILL be deleted.\n' : 'ℹ️  Dry run (default): nothing will be deleted. Pass --confirm to actually delete.\n')

    const referenced = await getReferencedPaths()
    console.log(`Found ${referenced.size} image(s) referenced in the database.\n`)

    let allBucketFiles: string[] = []
    for (const folder of FOLDERS) {
        const files = await listBucketFiles(folder)
        allBucketFiles = allBucketFiles.concat(files)
    }
    console.log(`Found ${allBucketFiles.length} file(s) in storage across ${FOLDERS.join(', ')}.\n`)

    const orphans = allBucketFiles.filter((path) => !referenced.has(path))

    if (orphans.length === 0) {
        console.log('✅ No orphaned images found. Nothing to do.')
        return
    }

    console.log(`Found ${orphans.length} orphaned file(s):`)
    for (const path of orphans) {
        console.log(`  - ${path}`)
    }
    console.log('')

    if (!CONFIRM) {
        console.log('Dry run complete. Re-run with --confirm to delete the files listed above.')
        return
    }

    const { data, error } = await supabase.storage.from(BUCKET_NAME).remove(orphans)
    if (error) {
        console.error('❌ Deletion failed:', error.message)
        process.exit(1)
    }

    console.log(`🗑️  Deleted ${data?.length ?? orphans.length} file(s).`)
}

main().catch((err) => {
    console.error('Unexpected error:', err)
    process.exit(1)
})
