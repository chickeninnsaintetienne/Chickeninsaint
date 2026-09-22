import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from './lib/auth-middleware';

const handleI18n = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/fr/admin') || pathname.startsWith('/en/admin')) {
        const cleanPath = pathname.replace(/^\/(fr|en)/, '');
        return NextResponse.redirect(new URL(cleanPath, request.url));
    }

    if (pathname.startsWith('/fr/auth') || pathname.startsWith('/en/auth')) {
        const cleanPath = pathname.replace(/^\/(fr|en)/, '');
        return NextResponse.redirect(new URL(cleanPath, request.url));
    }

    if (pathname.startsWith('/admin')) {
        const { supabaseResponse, user } = await updateSession(request);

        if (user && (pathname === '/admin/login' || pathname === '/admin')) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
        if (!user && pathname !== '/admin/login') {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
        return supabaseResponse;
    }

    if (pathname.startsWith('/auth')) {
        return NextResponse.next();
    }

    const response = handleI18n(request);
    response.headers.set('x-pathname', pathname);

    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next|_vercel|admin|auth|.*\\..*).*)',
        '/',
        '/(fr|en)/:path*',
        '/admin/:path*',
        '/auth/:path*'
    ]
};
