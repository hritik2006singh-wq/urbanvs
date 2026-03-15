import { NextRequest, NextResponse } from 'next/server'

// Routes that require authentication
const PROTECTED_ROUTES = ['/dashboard']
// Routes only accessible to admins
const ADMIN_ROUTES = ['/dashboard/admin']
// Auth page — redirect to dashboard if already logged in
const AUTH_ROUTES = ['/auth']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next()

  // ── 1. Block all direct access to .env files ──────────────────────────────
  if (/\.(env|local|example|pem|key|cert)/.test(pathname)) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // ── 2. Block common attack/scan paths ────────────────────────────────────
  const blockedPaths = [
    '/wp-admin', '/wp-login', '/xmlrpc', '/.git',
    '/admin.php', '/phpmyadmin', '/shell', '/eval',
    '/config.php', '/.htaccess', '/web.config',
  ]
  if (blockedPaths.some(p => pathname.toLowerCase().startsWith(p))) {
    return new NextResponse('Not Found', { status: 404 })
  }

  // ── 3. API rate limiting headers (actual limiting done per-route) ─────────
  if (pathname.startsWith('/api')) {
    response.headers.set('X-RateLimit-Policy', 'per-route')
    return response
  }

  const token = request.cookies.get('urbanvista-token')?.value

  // ── 4. Protect dashboard routes ───────────────────────────────────────────
  const isProtected = PROTECTED_ROUTES.some(r => pathname.startsWith(r))
  if (isProtected && !token) {
    const loginUrl = new URL('/auth', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // ── 5. Redirect logged-in users away from /auth ───────────────────────────
  const isAuthPage = AUTH_ROUTES.some(r => pathname.startsWith(r))
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ]
}
