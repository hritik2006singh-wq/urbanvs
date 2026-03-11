"use client";

import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, Circle, Clock, FileText, Download } from 'lucide-react';

interface RequestDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    requestData: any;
}

export function RequestDrawer({ isOpen, onClose, requestData }: RequestDrawerProps) {
    const [show, setShow] = useState(false);
    const [mount, setMount] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setMount(true);
            document.body.style.overflow = 'hidden';
            setTimeout(() => setShow(true), 10);
        } else {
            document.body.style.overflow = '';
            setShow(false);
            const timer = setTimeout(() => setMount(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!mount) return null;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
            case 'In Progress': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            case 'Pending': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
            default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`relative h-[100dvh] w-full md:w-[500px] bg-gradient-to-br from-[#0f172a] to-[#0a1624] border-l border-white/10 shadow-[auto_0_40px_rgba(0,0,0,0.5)] transform transition-transform duration-300 ease-in-out flex flex-col ${show ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white tracking-tight">Request Details</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {requestData && (
                    <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-12">
                        {/* Header Details */}
                        <div className="space-y-4">
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="text-2xl font-bold text-white">{requestData.service}</h3>
                                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap ${getStatusColor(requestData.status)}`}>
                                    {requestData.status}
                                </span>
                            </div>
                            <p className="text-sm text-slate-400">
                                Submitted on <span className="text-slate-200">{new Date(requestData.submitted_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span> • ID: <span className="font-mono text-slate-200">{requestData.id}</span>
                            </p>
                            <p className="text-slate-300 leading-relaxed bg-white/5 p-5 rounded-2xl border border-white/10 shadow-inner mt-4">
                                This is a mock description detailing the full scope of the <strong className="text-white">{requestData.service}</strong> request. It outlines key deliverables, target milestones, and the overall objective to ensure complete alignment with project goals.
                            </p>
                        </div>

                        {/* Progress */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm font-medium">
                                <span className="text-slate-300 font-semibold uppercase tracking-wider text-xs">Project Progress</span>
                                <span className="text-blue-400 text-base">{requestData.progress}%</span>
                            </div>
                            <div className="h-3 w-full bg-[#0a1020] rounded-full overflow-hidden border border-white/5 shadow-inner">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out relative shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                                    style={{ width: `${show ? requestData.progress : 0}%` }}
                                >
                                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="space-y-6">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Timeline</h4>
                            <div className="space-y-0 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">

                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group py-3">
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-emerald-500 bg-[#0f172a] text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)] z-10 shrink-0 mx-0 md:mx-auto">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors ml-4 md:ml-0 md:mr-4">
                                        <h5 className="font-semibold text-slate-200">Requirements Gathered</h5>
                                        <span className="text-xs text-slate-400">Completed on Jan 25, 2026</span>
                                    </div>
                                </div>

                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group py-3">
                                    <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 bg-[#0f172a] z-10 shrink-0 mx-0 md:mx-auto ${requestData.progress >= 50 ? 'border-blue-500 text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]' : 'border-slate-600 text-slate-600'}`}>
                                        {requestData.progress >= 50 ? <Clock className="w-3.5 h-3.5" /> : <Circle className="w-3 h-3" />}
                                    </div>
                                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors ml-4 md:ml-0 md:mr-4">
                                        <h5 className="font-semibold text-slate-200">Execution Phase</h5>
                                        <span className="text-xs text-slate-400">{requestData.progress >= 50 ? 'In Progress' : 'Pending'}</span>
                                    </div>
                                </div>

                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group py-3">
                                    <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 bg-[#0f172a] z-10 shrink-0 mx-0 md:mx-auto ${requestData.progress === 100 ? 'border-emerald-500 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'border-slate-600 text-slate-600'}`}>
                                        {requestData.progress === 100 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3 h-3" />}
                                    </div>
                                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors ml-4 md:ml-0 md:mr-4">
                                        <h5 className="font-semibold text-slate-200">Final Delivery</h5>
                                        <span className="text-xs text-slate-400">{requestData.progress === 100 ? 'Completed' : 'Awaiting Delivery'}</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Mock Files */}
                        <div className="space-y-4 pt-4 border-t border-white/10">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attachments</h4>
                            <div className="grid gap-3">
                                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-200 group-hover:text-blue-400 transition-colors">Project_Brief_v2.pdf</p>
                                            <p className="text-xs text-slate-500 mt-0.5">2.4 MB</p>
                                        </div>
                                    </div>
                                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-blue-500 group-hover:text-white text-slate-400 transition-all mr-1">
                                        <Download className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
