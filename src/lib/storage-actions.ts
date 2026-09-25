import { createClient } from '@/lib/supabase/server'

const BUCKET_NAME = 'chicken_inn_bucket'

/**
 * Deletes an image from Supabase Storage given its public URL.
 * Safe to call with undefined/null/external URLs (e.g. Unsplash, placehold.co) —
 * it silently no-ops if the URL doesn't belong to our bucket.
 */
export async function deleteStorageImage(imageUrl?: string | null): Promise<void> {
    if (!imageUrl) return

    try {
        const url = new URL(imageUrl)
        const pathParts = url.pathname.split(`${BUCKET_NAME}/`)
        if (pathParts.length < 2) return // not one of our bucket URLs, nothing to do

        const filePath = pathParts[1]
        const supabase = await createClient()

        const { error } = await supabase.storage.from(BUCKET_NAME).remove([filePath])
        if (error) {
            console.error('Failed to delete old image from storage:', error.message)
        }
    } catch (err) {
        // Malformed URL or unexpected shape — don't block the calling action over it
        console.error('deleteStorageImage error:', err)
    }
}

/**
 * Deletes the old image only if it's actually being replaced (URLs differ).
 */
export async function deleteStorageImageIfReplaced(oldUrl?: string | null, newUrl?: string | null): Promise<void> {
    if (!oldUrl) return
    if (oldUrl === newUrl) return
    await deleteStorageImage(oldUrl)
}
