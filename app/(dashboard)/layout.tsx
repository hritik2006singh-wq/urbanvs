"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, User, Shield, LogOut } from 'lucide-react';

const NAV_ITEMS = [
    { label: 'Overview', href: '/dashboard-preview/overview', icon: LayoutDashboard },
    { label: 'My Requests', href: '/dashboard-preview/requests', icon: FileText },
    { label: 'Profile', href: '/dashboard-preview/profile', icon: User },
    { label: 'Security', href: '/dashboard-preview/security', icon: Shield },
];

export default function DashboardPreviewLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen flex bg-global-gradient text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">

            {/* Sidebar */}
            <aside className="w-[260px] shrink-0 h-full backdrop-blur-xl bg-white/5 border-r border-white/10 flex flex-col">
                <div className="p-6 flex items-center justify-between h-[72px] border-b border-white/5 shrink-0">
                    <span className="text-2xl font-bold text-white tracking-tight">Urban<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Vista</span></span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group
                                    ${isActive
                                        ? 'bg-blue-500/20 text-blue-400 font-medium shadow-[0_0_15px_rgba(59,130,246,0.2)] border border-blue-500/30'
                                        : 'text-slate-400 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-transparent hover:border-white/10'
                                    }
                                `}
                            >
                                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'text-slate-500 group-hover:text-slate-300 group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]'}`} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5 shrink-0">
                    <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/10 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] border border-transparent transition-all duration-300 w-full text-left font-medium group cursor-pointer">
                        <LogOut className="w-5 h-5 text-slate-500 group-hover:text-red-400 transition-colors" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                <header className="h-[72px] flex items-center px-10 border-b border-white/5 shrink-0">
                    <span className="font-bold text-white text-lg tracking-tight md:hidden">Urban<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Vista</span></span>
                </header>

                {/* Wrap children in key to force transition on route change */}
                <main key={pathname} className="flex-1 px-10 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out fill-mode-both">
                    {children}
                </main>
            </div>
        </div>
    );
}
