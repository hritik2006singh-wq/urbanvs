"use client";

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';

export default function OrdersPage() {
    const orders = [
        { id: 1, service: 'Get Better - Platinum', status: 'In Progress', date: '2023-10-25' },
        { id: 2, service: 'Extra Photo', status: 'Completed', date: '2023-10-20' },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">My Orders</h2>
            <div className="grid gap-4">
                {orders.map((order) => (
                    <GlassCard key={order.id} className="p-6 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold">{order.service}</h3>
                            <p className="text-sm text-white/60">Ordered on {order.date}</p>
                        </div>
                        <div className="text-right">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-primary/20 text-primary'
                                }`}>
                                {order.status}
                            </span>
                            <div className="mt-2">
                                <Button size="sm" variant="outline">View Details</Button>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
}
