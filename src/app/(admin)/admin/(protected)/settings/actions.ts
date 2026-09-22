'use server'

import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/require-admin'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateSettings(formData: FormData) {
    await requireAdmin()

    const data: Record<string, any> = {
        phone: formData.get('phone') as string,
        hours: formData.get('hours') as string,
        address: formData.get('address') as string,
        uber_eats_url: formData.get('uber_eats_url') as string,
        deliveroo_url: formData.get('deliveroo_url') as string,
        social_facebook: formData.get('social_facebook') as string,
        social_instagram: formData.get('social_instagram') as string,
    }

    // Fetch existing settings (now via Prisma) to get the old PDF URL for deletion
    const existing = await prisma.settings.findFirst()

    let menuPdfUrl: string | undefined = undefined
    const menuPdfFile = formData.get('menu_pdf') as File | null

    if (menuPdfFile && menuPdfFile.size > 0) {
        // File storage stays on Supabase Storage — Prisma has no equivalent.
        const supabase = await createClient()

        const fileExt = menuPdfFile.name.split('.').pop()
        const fileName = `menu_${Date.now()}.${fileExt}`
        const filePath = `menu/${fileName}`

        const { error: uploadError } = await supabase.storage
            .from('chicken_inn_bucket')
            .upload(filePath, menuPdfFile)

        if (uploadError) {
            throw new Error(`Failed to upload menu: ${uploadError.message}`)
        }

        const { data: publicUrlData } = supabase.storage
            .from('chicken_inn_bucket')
            .getPublicUrl(filePath)

        menuPdfUrl = publicUrlData.publicUrl

        if (existing?.menu_pdf_url && existing.menu_pdf_url.includes('chicken_inn_bucket')) {
            try {
                const urlParts = existing.menu_pdf_url.split('/chicken_inn_bucket/')
                if (urlParts.length === 2) {
                    const oldFilePath = urlParts[1]
                    await supabase.storage.from('chicken_inn_bucket').remove([oldFilePath])
                }
            } catch (delErr) {
                console.error('Failed to delete old menu PDF:', delErr)
            }
        }
    }

    if (menuPdfUrl) {
        data.menu_pdf_url = menuPdfUrl
    }

    if (!existing) {
        await prisma.settings.create({ data })
    } else {
        await prisma.settings.update({ where: { id: existing.id }, data })
    }

    revalidatePath('/admin/settings')
    revalidatePath('/')
}
