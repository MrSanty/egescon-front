// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/login'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  const isPublicRoute = publicRoutes.includes(pathname);

  if (accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!accessToken && !isPublicRoute) {
    if (refreshToken) {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

        const refreshResponse = await fetch(`${backendUrl}/auth/refresh`, {
          method: 'GET',
          headers: {
            Cookie: `refresh_token=${refreshToken}`,
          },
        });

        if (refreshResponse.ok) {
          const response = NextResponse.next();
          const setCookieHeaders = refreshResponse.headers.getSetCookie();
          setCookieHeaders.forEach(cookie => {
            response.headers.append('Set-Cookie', cookie);
          });

          return response;
        }
      } catch (error) {
        console.error('Middleware: Fallo al intentar refrescar el token.', error);
      }
    }

    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
