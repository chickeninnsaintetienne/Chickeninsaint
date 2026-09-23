import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

const BUCKET_NAME = 'chicken_inn_bucket'

type FolderType = 'products' | 'offers' | 'qr-codes' | 'categories'

export function useImageUpload(folder: FolderType) {
    const [uploading, setUploading] = useState(false)

    const convertToWebP = async (file: File): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => {
                const canvas = document.createElement('canvas')
                canvas.width = img.width
                canvas.height = img.height
                const ctx = canvas.getContext('2d')
                if (!ctx) {
                    reject(new Error('Canvas context not available'))
                    return
                }
                ctx.drawImage(img, 0, 0)
                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob)
                    } else {
                        reject(new Error('Conversion to WebP failed'))
                    }
                }, 'image/webp', 0.8) // 0.8 quality
            }
            img.onerror = (e) => reject(e)
            img.src = URL.createObjectURL(file)
        })
    }

    /**
     * Upload an image to Supabase Storage
     * @param file - The file to upload
     * @param entityId - Optional entity ID (product ID, offer ID, etc.) for naming
     */
    const uploadImage = async (file: File, entityId?: string): Promise<string | null> => {
        try {
            setUploading(true)

            const supabase = createClient()

            // Convert to WebP
            const webpBlob = await convertToWebP(file)

            // Generate filename with optional entityId prefix
            const timestamp = Date.now()
            const baseName = file.name.split('.')[0].replace(/[^a-zA-Z0-9]/g, '-')
            const fileName = entityId
                ? `${entityId}-${timestamp}.webp`
                : `${baseName}-${timestamp}.webp`

            // Upload to folder path within bucket
            const filePath = `${folder}/${fileName}`

            // Upload to Supabase
            const { error: uploadError } = await supabase.storage
                .from(BUCKET_NAME)
                .upload(filePath, webpBlob, {
                    contentType: 'image/webp',
                    upsert: true // Allow overwriting if same name
                })

            if (uploadError) {
                throw uploadError
            }

            // Get Public URL
            const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath)
            return data.publicUrl

        } catch (error: any) {
            toast.error('Image upload failed: ' + error.message)
            return null
        } finally {
            setUploading(false)
        }
    }

    /**
     * Delete an image from Supabase Storage
     * @param imageUrl - The public URL of the image to delete
     */
    const deleteImage = async (imageUrl: string): Promise<boolean> => {
        try {
            const supabase = createClient()

            // Extract path from URL
            const url = new URL(imageUrl)
            const pathParts = url.pathname.split(`${BUCKET_NAME}/`)
            if (pathParts.length < 2) return false

            const filePath = pathParts[1]

            const { error } = await supabase.storage
                .from(BUCKET_NAME)
                .remove([filePath])

            if (error) throw error
            return true
        } catch (error: any) {
            console.error('Image deletion failed:', error.message)
            return false
        }
    }

    return { uploadImage, deleteImage, uploading }
}

