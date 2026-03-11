import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Never touch API routes
    if (pathname.startsWith('/api')) {
        return NextResponse.next()
    }

    const token = request.cookies.get('urbanvista-token')?.value

    if (pathname.startsWith('/dashboard') && !token) {
        const loginUrl = new URL('/auth', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
    ]
}
