"use client";

import React, { useState, useEffect } from 'react';
import { MOCK_REQUESTS } from '../mockData';
import { ChevronRight } from 'lucide-react';
import { RequestDrawer } from '../components/RequestDrawer';

export default function RequestsPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<any>(null);

    useEffect(() => { setIsMounted(true); }, []);

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Completed': return 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10';
            case 'In Progress': return 'text-blue-400 border-blue-400/20 bg-blue-400/10';
            case 'Pending': return 'text-amber-400 border-amber-400/20 bg-amber-400/10';
            default: return 'text-slate-400 border-slate-400/20 bg-slate-400/10';
        }
    };

    const getProgressColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
            case 'In Progress': return 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]';
            case 'Pending': return 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]';
            default: return 'bg-slate-500';
        }
    };

    if (!isMounted) return null;

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-white">My Requests</h1>
                <p className="text-slate-400">Track and manage all your purchased services.</p>
            </header>

            <div className="grid grid-cols-1 gap-4">
                {MOCK_REQUESTS.map(request => (
                    <div
                        key={request.id}
                        onClick={() => setSelectedRequest(request)}
                        className="bg-white/[0.02] hover:bg-white/[0.05] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] border border-white/[0.05] hover:border-white/10 p-6 rounded-2xl transition-all duration-300 group flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
                    >
                        <div className="space-y-3 flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                                <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">{request.service}</h3>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(request.status)}`}>{request.status}</span>
                            </div>
                            <p className="text-sm text-slate-500 font-medium">
                                Submitted on {new Date(request.submitted_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                <span className="mx-2 text-slate-700">•</span>
                                ID: {request.id}
                            </p>
                        </div>

                        <div className="flex items-center gap-8 w-full md:w-auto">
                            <div className="w-full md:w-48 space-y-2">
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="text-slate-400">Progress</span>
                                    <span className="text-white">{request.progress}%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ease-out ${getProgressColor(request.status)}`}
                                        style={{ width: `${request.progress}%` }}
                                    />
                                </div>
                            </div>
                            <button className="hidden md:flex items-center justify-center p-2.5 rounded-xl bg-white/5 group-hover:bg-blue-500 group-hover:text-white text-slate-400 transition-all duration-300">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                        <button className="md:hidden w-full py-3 rounded-xl bg-white/5 group-hover:bg-blue-500 group-hover:text-white text-slate-400 text-sm font-medium transition-colors flex justify-center items-center gap-2 mt-4 md:mt-0">
                            View Details <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>

            <RequestDrawer
                isOpen={!!selectedRequest}
                requestData={selectedRequest}
                onClose={() => setSelectedRequest(null)}
            />
        </div>
    );
}
