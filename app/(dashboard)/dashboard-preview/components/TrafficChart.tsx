"use client";

import React, { useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';
import { Activity } from 'lucide-react';

interface TrafficData {
    date: string;
    visitors: number;
    pageViews: number;
}

interface TrafficChartProps {
    data: TrafficData[];
}

export function TrafficChart({ data }: TrafficChartProps) {
    const [viewMetric, setViewMetric] = useState<'visitors' | 'pageViews'>('visitors');

    if (!data || data.length === 0) {
        return (
            <div className="w-full h-[300px] flex flex-col items-center justify-center bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <Activity className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-lg font-medium text-white">No Traffic Data</h3>
                <p className="text-sm text-slate-400 mt-1 text-center">There is no website traffic data recorded for this time period.</p>
            </div>
        );
    }

    return (
        <div className="w-full bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 shadow-lg shadow-black/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div>
                    <h3 className="text-xl font-semibold text-white">Website Traffic</h3>
                    <p className="text-sm text-slate-400 mt-1">Activity over the last 7 days</p>
                </div>
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                    <button
                        onClick={() => setViewMetric('visitors')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${viewMetric === 'visitors' ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20' : 'text-slate-400 hover:text-white'}`}
                    >
                        Visitors
                    </button>
                    <button
                        onClick={() => setViewMetric('pageViews')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${viewMetric === 'pageViews' ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20' : 'text-slate-400 hover:text-white'}`}
                    >
                        Page Views
                    </button>
                </div>
            </div>

            <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="date"
                            stroke="rgba(255,255,255,0.3)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="rgba(255,255,255,0.3)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                backdropFilter: 'blur(8px)',
                                borderColor: 'rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                color: '#fff'
                            }}
                            itemStyle={{ color: '#bae6fd' }}
                        />
                        <Area
                            type="monotone"
                            dataKey={viewMetric}
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorMetric)"
                            activeDot={{ r: 6, fill: '#3b82f6', stroke: '#0f172a', strokeWidth: 2 }}
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
