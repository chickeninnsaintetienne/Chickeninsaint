import type { Metadata } from 'next'
import { Inter, Oswald } from 'next/font/google'
import '../../globals.css'
import { Navbar } from '@/components/navbar/navbar'
import { Footer } from '@/components/footer/footer'
import { Toaster } from '@/components/ui/sonner'
import { SearchComponent } from '@/components/core/search'
import { headers } from 'next/headers'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { NavbarSpacer } from '@/components/navbar/navbar-spacer'
import { DownloadMenu } from '@/components/download-menu/download-menu'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' })

export const metadata: Metadata = {
  title: 'Chicken Inn - Original Taste',
  description: 'Best chicken burgers and meals in France.',
  icons: {
    icon: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || headersList.get('x-invoke-path') || ''

  // Check if we're on an admin page - hide public navbar/footer
  const isAdminPage = pathname.startsWith('/admin')

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} ${oswald.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {!isAdminPage && <Navbar />}
          {!isAdminPage && <NavbarSpacer />}
          <main className={!isAdminPage ? "min-h-screen bg-white" : ""}>
            {children}
          </main>
          {!isAdminPage && <DownloadMenu />}
          {!isAdminPage && <Footer />}
          {!isAdminPage && <SearchComponent />}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

