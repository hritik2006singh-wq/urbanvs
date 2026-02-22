"use client";

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { User, Package, Shield, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const menuItems = [
        { icon: User, label: 'Profile', href: '/dashboard/profile' },
        { icon: Package, label: 'Orders', href: '/dashboard/orders' },
        { icon: Shield, label: 'Security', href: '/dashboard/security' },
        // { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
    ];

    return (
        <div className="min-h-screen py-20 px-6 container mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="md:col-span-1">
                    <GlassCard className="p-6 space-y-2 sticky top-24">
                        <div className="flex items-center gap-4 mb-8 px-2">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center font-bold text-xl">
                                U
                            </div>
                            <div>
                                <h3 className="font-bold">User Name</h3>
                                <p className="text-xs text-white/60">user@example.com</p>
                            </div>
                        </div>

                        {menuItems.map((item) => (
                            <Link key={item.label} href={item.href}>
                                <Button variant="ghost" className="w-full justify-start gap-3 mb-1">
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                </Button>
                            </Link>
                        ))}

                        <div className="pt-4 border-t border-white/10 mt-4">
                            <Button variant="ghost" className="w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-900/20">
                                <LogOut className="w-5 h-5" />
                                Sign Out
                            </Button>
                        </div>
                    </GlassCard>
                </div>

                {/* Content Area */}
                <div className="md:col-span-3">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {children}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
