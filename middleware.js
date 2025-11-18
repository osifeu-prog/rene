import { NextResponse } from 'next/server'

export function middleware(req) {
  const { pathname } = req.nextUrl
  // Protect /dashboard and /api/private (example)
  if (pathname.startsWith('/dashboard')) {
    const token = req.cookies['sb-access-token'] || req.cookies['sb-session']
    if (!token) {
      const url = req.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next()
}

export const config = { matcher: ['/dashboard/:path*'] }
