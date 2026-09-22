import { prisma } from '@/lib/prisma'
import { cache } from 'react'

export const getSettings = cache(async () => {
    const settings = await prisma.settings.findFirst()
    return settings
})
