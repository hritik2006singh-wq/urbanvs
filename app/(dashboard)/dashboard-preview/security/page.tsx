"use client";

import React from 'react';
import { MOCK_USER } from '../mockData';

export default function SecurityPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-white">Security & Access</h1>
                <p className="text-slate-400">Update your password and secure your account.</p>
            </header>

            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden p-6 md:p-8 space-y-8">

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Account Email</h3>
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 gap-4">
                        <div className="space-y-1">
                            <p className="text-white font-medium">{MOCK_USER.email}</p>
                            <p className="text-sm text-slate-500">This email is used for login and notifications.</p>
                        </div>
                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/20 self-start md:self-center">
                            Verified
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Password Settings</h3>
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 gap-4">
                        <div className="space-y-1">
                            <p className="text-white font-medium tracking-widest">••••••••••••</p>
                            <p className="text-sm text-slate-500">Last updated: {new Date(MOCK_USER.joined_at).toLocaleDateString()}</p>
                        </div>
                        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors border border-white/10 self-start md:self-center">
                            Change Password
                        </button>
                    </div>
                </div>

                <div className="pt-4 border-t border-white/[0.05] flex justify-between items-center text-sm text-slate-500">
                    <p>Last login: Today at 10:42 AM from Chrome / MacOS</p>
                </div>
            </div>
        </div>
    );
}
