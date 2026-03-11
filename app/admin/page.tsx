"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Users, Activity, Loader2, Save, Plus } from "lucide-react";

export default function AdminDashboardPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [metrics, setMetrics] = useState<any>({
        active_requests: 0,
        monthly_requests: 0,
        satisfaction_score: 100
    });
    const [requests, setRequests] = useState<any[]>([]);
    const [profiles, setProfiles] = useState<any[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    // New request state
    const [newUserId, setNewUserId] = useState('');
    const [newServiceName, setNewServiceName] = useState('');
    const [newDesc, setNewDesc] = useState('');

    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        async function loadData() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/auth');
                return;
            }

            // Fetch profile
            const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            if (profile?.role !== 'admin') {
                router.push('/dashboard');
                return;
            }

            // Load metrics
            const { data: metricsData } = await supabase.from('dashboard_metrics').select('*').eq('id', 1).single();
            if (metricsData) setMetrics(metricsData);

            // Load requests
            const { data: reqData } = await supabase.from('service_requests').select('*').order('created_at', { ascending: false });
            if (reqData) setRequests(reqData);

            // Load all clients for dropdown
            const { data: profData } = await supabase.from('profiles').select('id, full_name, email').eq('role', 'client');
            if (profData) {
                setProfiles(profData);
                if (profData.length > 0) setNewUserId(profData[0].id);
            }

            setIsLoading(false);
        }
        loadData();
    }, [supabase, router]);

    const handleSaveMetrics = async () => {
        setIsSaving(true);
        const { error } = await supabase.from('dashboard_metrics').update({
            active_requests: parseInt(metrics.active_requests),
            monthly_requests: parseInt(metrics.monthly_requests),
            satisfaction_score: parseInt(metrics.satisfaction_score)
        }).eq('id', 1);
        setIsSaving(false);
        if (!error) alert('Metrics updated!');
        else alert('Error: ' + error.message);
    };

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        const { error } = await supabase.from('service_requests').update({ status: newStatus }).eq('id', id);
        if (!error) {
            setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
        }
    };

    const handleInsertRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data, error } = await supabase.from('service_requests').insert([{
            user_id: newUserId,
            service_name: newServiceName,
            description: newDesc,
            status: 'Pending',
            date: new Date().toISOString().split('T')[0]
        }]).select();

        if (!error && data) {
            setRequests([data[0], ...requests]);
            setNewServiceName('');
            setNewDesc('');
            alert('Request created!');
        } else {
            alert('Error creating request: ' + error?.message);
        }
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-slate-900"><Loader2 className="w-8 h-8 animate-spin text-red-500" /></div>;

    return (
        <div className="min-h-screen bg-slate-900 pt-32 pb-24 px-6 md:px-12 font-sans text-slate-200">
            <div className="max-w-6xl mx-auto space-y-8">
                <header className="mb-12 border-b border-red-500/20 pb-8 flex items-center gap-4">
                    <ShieldAlert className="w-10 h-10 text-red-500" />
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                            Admin <span className="text-red-500">Control Center</span>
                        </h1>
                        <p className="text-slate-400">
                            Superuser dashboard. Manage global metrics and client requests.
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Metrics Update & Insert Request */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Metrics Card */}
                        <div className="p-6 md:p-8 rounded-[24px] bg-slate-800/50 border border-slate-700 shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-red-400" /> Global Metrics
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Active Requests</label>
                                    <input type="number" value={metrics.active_requests} onChange={e => setMetrics({ ...metrics, active_requests: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-red-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Monthly Requests</label>
                                    <input type="number" value={metrics.monthly_requests} onChange={e => setMetrics({ ...metrics, monthly_requests: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-red-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Satisfaction Score (%)</label>
                                    <input type="number" value={metrics.satisfaction_score} onChange={e => setMetrics({ ...metrics, satisfaction_score: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-red-500 outline-none" />
                                </div>
                                <button onClick={handleSaveMetrics} disabled={isSaving} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mt-4">
                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Metrics
                                </button>
                            </div>
                        </div>

                        {/* Insert Request Card */}
                        <div className="p-6 md:p-8 rounded-[24px] bg-slate-800/50 border border-slate-700 shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Plus className="w-5 h-5 text-red-400" /> Create Request
                            </h3>
                            <form onSubmit={handleInsertRequest} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Client</label>
                                    <select value={newUserId} onChange={e => setNewUserId(e.target.value)} required className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-red-500 outline-none appearance-none">
                                        <option value="" disabled>Select a client...</option>
                                        {profiles.map(p => (
                                            <option key={p.id} value={p.id}>{p.full_name || p.email}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Service Name</label>
                                    <input type="text" value={newServiceName} onChange={e => setNewServiceName(e.target.value)} required placeholder="e.g. SEO Campaign" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-red-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                                    <textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} rows={3} placeholder="Details about the service..." className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-red-500 outline-none"></textarea>
                                </div>
                                <button type="submit" className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl transition-colors mt-4">
                                    Submit Request
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Manage Requests */}
                    <div className="lg:col-span-2">
                        <div className="p-6 md:p-8 rounded-[24px] bg-slate-800/50 border border-slate-700 shadow-xl h-full">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Users className="w-5 h-5 text-red-400" /> Manage Client Requests
                            </h3>

                            <div className="space-y-4 overflow-y-auto max-h-[800px] pr-2 custom-scrollbar">
                                {requests.length === 0 ? (
                                    <p className="text-slate-500">No requests found in database.</p>
                                ) : (
                                    requests.map(req => {
                                        const client = profiles.find(p => p.id === req.user_id);
                                        return (
                                            <div key={req.id} className="p-5 rounded-xl border border-slate-700 bg-slate-900/50 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className="font-bold text-white">{req.service_name}</h4>
                                                    </div>
                                                    <p className="text-sm text-slate-400 mb-2">{req.description}</p>
                                                    <p className="text-xs text-slate-500">Client: {client ? (client.full_name || client.email) : 'Unknown User'} &bull; Date: {req.date}</p>
                                                </div>
                                                <div className="shrink-0 flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
                                                    <select
                                                        value={req.status}
                                                        onChange={(e) => handleUpdateStatus(req.id, e.target.value)}
                                                        className={`bg-slate-800 border-none rounded-lg px-3 py-1.5 text-sm font-semibold outline-none cursor-pointer ${req.status === 'Completed' ? 'text-emerald-400' :
                                                                req.status === 'In Progress' ? 'text-blue-400' : 'text-amber-400'
                                                            }`}
                                                    >
                                                        <option value="Pending" className="text-amber-400">Pending</option>
                                                        <option value="In Progress" className="text-blue-400">In Progress</option>
                                                        <option value="Completed" className="text-emerald-400">Completed</option>
                                                    </select>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(15, 23, 42, 0.5); 
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(239, 68, 68, 0.2); 
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(239, 68, 68, 0.5); 
                }
            `}</style>
        </div>
    );
}
