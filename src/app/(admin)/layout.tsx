import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Chicken Inn Admin',
    description: 'Admin Dashboard',
    icons: {
        icon: '/assets/logo.png',
        apple: '/assets/logo.png',
    },
}

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                {children}
                <Toaster />
            </body>
        </html>
    )
}
