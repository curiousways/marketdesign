import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // @ts-ignore
  const token = request.cookies.get('access_token')?.value;
  const res = await fetch(new URL('/api/auth/validate', request.url), {
    method: 'POST',
    body: JSON.stringify({ token }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status === 401) {
    const url = new URL('/auth', request.url);

    url.searchParams.set('redirect', new URL(request.url).pathname);

    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets|auth).*)'],
};
