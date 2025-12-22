import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Block admin routes in production
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow in development
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.next();
    }
    
    // In production, redirect to home page
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};

