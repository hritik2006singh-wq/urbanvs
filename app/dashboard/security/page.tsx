"use client";

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function SecurityPage() {
    return (
        <GlassCard className="p-8">
            <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
            <form className="space-y-6 max-w-xl">
                <div className="space-y-2">
                    <label className="text-sm text-white/60">Current Password</label>
                    <Input type="password" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-white/60">New Password</label>
                    <Input type="password" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-white/60">Confirm New Password</label>
                    <Input type="password" />
                </div>

                <Button>Change Password</Button>
            </form>
        </GlassCard>
    );
}
