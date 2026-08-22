import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Static files, uploaded assets, and internal Next.js assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/uploads') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET || 'globetrotter-hackathon-secret-key-super-secure-2026',
  });

  // Root path routing: authenticated -> /dashboard, unauthenticated -> /login
  if (pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Allow API routes to perform their own token / ownership checks and return JSON
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Public unauthenticated page routes
  const publicPagePrefixes = [
    '/login',
    '/register',
    '/signup',
    '/forgot-password',
    '/reset-password',
    '/share',
  ];

  const isPublic = publicPagePrefixes.some((prefix) => pathname.startsWith(prefix));

  // If authenticated user visits login/register, redirect to dashboard
  if (token && (pathname === '/login' || pathname === '/register' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If unauthenticated user tries to access protected page, redirect to /login
  if (!token && !isPublic) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    const redirectResponse = NextResponse.redirect(loginUrl);
    // Prevent browser back-button caching of protected pages
    redirectResponse.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    redirectResponse.headers.set('Pragma', 'no-cache');
    redirectResponse.headers.set('Expires', '0');
    return redirectResponse;
  }

  // Admin route protection: only ADMIN role can view /admin
  if (pathname.startsWith('/admin') && token?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  const response = NextResponse.next();
  // Set cache prevention headers on protected responses so back-button re-checks middleware
  if (!isPublic) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
