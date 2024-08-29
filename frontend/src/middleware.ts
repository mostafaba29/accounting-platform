import createIntlMiddleware from 'next-intl/middleware';
import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

const locales = ['en','ar'];
const publicPages = ['/','/auth/login','/auth/signup'];

const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale:'en',
    localePrefix:'always',
    localeDetection:false,
});

export function middleware(request:NextRequest){
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('jwt')?.value || '';
    const isAdminProtectedRoute = path.startsWith('/admin/dashboard');
    const isUserProtectedRoute = path.startsWith('/user');

    if(isAdminProtectedRoute && !token){
        return NextResponse.redirect(new URL('/admin/login',request.url));
    }

    if(isUserProtectedRoute && !token){
        return NextResponse.redirect(new URL('/auth/login',request.url));
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};