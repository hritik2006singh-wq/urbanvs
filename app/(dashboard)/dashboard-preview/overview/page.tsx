"use client";

import React, { useState, useEffect } from 'react';
import { MOCK_USER, MOCK_REQUESTS, MOCK_TRAFFIC_DATA } from '../mockData';
import {
    LayoutDashboard,
    CheckCircle2,
    Clock,
    Activity,
    ChevronRight
} from 'lucide-react';
import { RequestDrawer } from '../components/RequestDrawer';
import { TrafficChart } from '../components/TrafficChart';

export default function OverviewPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<any>(null);

    useEffect(() => { setIsMounted(true); }, []);

    const activeProjects = MOCK_REQUESTS.filter(r => r.status === 'In Progress').length;
    const completedProjects = MOCK_REQUESTS.filter(r => r.status === 'Completed').length;
    const pendingProjects = MOCK_REQUESTS.filter(r => r.status === 'Pending').length;
    const recentRequests = MOCK_REQUESTS.slice(0, 3);

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
        <div className="max-w-6xl mx-auto space-y-10">
            <header className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
                    <Activity className="w-4 h-4" />
                    <span>Preview Mode Active</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                    Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{MOCK_USER.full_name.split(' ')[0]}</span>
                </h1>
                <p className="text-slate-400 text-lg">
                    Here’s an overview of your active services and project timelines.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: "Active Projects", count: activeProjects, icon: LayoutDashboard, color: "text-blue-500", groupHover: "hover:border-blue-500/30 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)]", delay: "delay-100" },
                    { title: "Completed Projects", count: completedProjects, icon: CheckCircle2, color: "text-emerald-500", groupHover: "hover:border-emerald-500/30 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]", delay: "delay-200" },
                    { title: "Pending Requests", count: pendingProjects, icon: Clock, color: "text-amber-500", groupHover: "hover:border-amber-500/30 hover:shadow-[0_8px_30px_rgba(245,158,11,0.15)]", delay: "delay-300" }
                ].map((stat, i) => (
                    <div key={i} className={`bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-1 ${stat.groupHover} transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 ${stat.delay} fill-mode-both`}>
                        <div className={`absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ${stat.color}`}>
                            <stat.icon className="w-12 h-12" />
                        </div>
                        <div className="relative z-10 space-y-4">
                            <p className="text-slate-400 font-medium">{stat.title}</p>
                            <h2 className="text-5xl font-bold text-white">{stat.count}</h2>
                        </div>
                    </div>
                ))}
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-10 delay-400 fill-mode-both">
                <TrafficChart data={MOCK_TRAFFIC_DATA} />
            </div>

            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-12 delay-500 fill-mode-both">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">Recent Service Requests</h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {recentRequests.map(request => (
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
                                <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
                                    Submitted on {new Date(request.submitted_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    <span className="text-slate-700">•</span>
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
                                            style={{ width: isMounted ? `${request.progress}%` : '0%' }}
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
            </div>

            <RequestDrawer
                isOpen={!!selectedRequest}
                requestData={selectedRequest}
                onClose={() => setSelectedRequest(null)}
            />
        </div>
    );
}
