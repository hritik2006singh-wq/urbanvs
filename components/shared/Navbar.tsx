'use client'
import { useAuth } from '@/lib/AuthContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const { user, loading, signOut } = useAuth()
    const pathname = usePathname()

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50
      w-[95%] max-w-6xl bg-white/80 backdrop-blur-xl
      border border-white/40 rounded-[28px] shadow-lg
      px-6 py-3 flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-900 rounded-lg
          flex items-center justify-center">
                    <span className="text-white text-xs font-bold">UV</span>
                </div>
                <span className="font-bold text-slate-900 text-lg">
                    UrbanVista
                </span>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-6">
                {['/', '/services', '/work', '/about', '/contact'].map(
                    (href, i) => {
                        const labels = ['Home', 'Services', 'Our Work', 'About', 'Contact']
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`text-sm font-medium transition-colors
                  ${pathname === href
                                        ? 'text-blue-600'
                                        : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                {labels[i]}
                            </Link>
                        )
                    }
                )}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
                {loading ? (
                    <div className="w-24 h-9 bg-slate-100 rounded-full
            animate-pulse" />
                ) : user ? (
                    // Logged in — show Dashboard button
                    <Link
                        href={user.role === 'ADMIN'
                            ? '/dashboard/admin'
                            : '/dashboard'
                        }
                        className="flex items-center gap-2 bg-slate-900
              text-white text-sm font-medium px-4 py-2
              rounded-full hover:bg-slate-700 transition-colors"
                    >
                        Dashboard
                    </Link>
                ) : (
                    // Logged out — show Sign In + Sign Up
                    <>
                        <Link
                            href="/auth?mode=signin"
                            className="text-sm font-medium text-slate-700
                hover:text-slate-900 transition-colors px-3 py-2"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/auth?mode=signup"
                            className="text-sm font-medium bg-blue-600
                text-white px-4 py-2 rounded-full
                hover:bg-blue-700 transition-colors"
                        >
                            Get Started
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}
