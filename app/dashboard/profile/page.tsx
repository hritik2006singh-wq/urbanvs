"use client";

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ProfilePage() {
    return (
        <GlassCard className="p-8">
            <h2 className="text-2xl font-bold mb-6">My Profile</h2>
            <form className="space-y-6 max-w-xl">
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm text-white/60">Full Name</label>
                        <Input defaultValue="User Name" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-white/60">Phone</label>
                        <Input defaultValue="+91 9876543210" disabled className="opacity-50" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-white/60">Email</label>
                    <Input defaultValue="user@example.com" disabled className="opacity-50" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-white/60">Date of Birth</label>
                    <Input type="date" />
                </div>

                <Button>Update Profile</Button>
            </form>
        </GlassCard>
    );
}
