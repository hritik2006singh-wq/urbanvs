"use client";

import React from 'react';
import { MOCK_USER } from '../mockData';

export default function ProfilePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-white">Profile Settings</h1>
                <p className="text-slate-400">Manage your personal information and preferences.</p>
            </header>

            <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 md:p-8 space-y-8">
                <div className="flex items-center gap-6 pb-8 border-b border-white/[0.05]">
                    <div className="w-20 h-20 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-3xl font-bold border border-blue-500/30">
                        {MOCK_USER.full_name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">{MOCK_USER.full_name}</h2>
                        <p className="text-slate-400">Member since {new Date(MOCK_USER.joined_at).getFullYear()}</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Full Name</label>
                        <input
                            disabled
                            type="text"
                            defaultValue={MOCK_USER.full_name}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white disabled:opacity-50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Email Address</label>
                        <input
                            disabled
                            type="email"
                            defaultValue={MOCK_USER.email}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white disabled:opacity-50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Phone Number</label>
                        <input
                            disabled
                            type="tel"
                            defaultValue="+1 (555) 000-0000"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white disabled:opacity-50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Joined Date</label>
                        <input
                            disabled
                            type="text"
                            defaultValue={new Date(MOCK_USER.joined_at).toLocaleDateString()}
                            className="w-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl px-4 py-3 text-slate-500 disabled:opacity-80"
                        />
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
}
