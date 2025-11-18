import { NextResponse } from 'next/server'

export function middleware(request) {
  // הגנה על נתיבים קריטיים
  const criticalPaths = ['/api/admin', '/api/database']
  
  if (criticalPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/admin/:path*',
    '/api/database/:path*',
  ]
}
