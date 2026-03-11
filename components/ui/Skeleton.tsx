"use client";

import React from 'react';

interface SkeletonProps {
    className?: string;
}

export const Skeleton = ({ className = "" }: SkeletonProps) => {
    return (
        <div className={`animate-pulse bg-slate-200 rounded ${className}`} />
    );
};

export const SkeletonCard = () => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-1/4" />
            </div>
        </div>
    );
};

export const SkeletonTable = ({ rows = 5 }: { rows?: number }) => {
    return (
        <div className="space-y-3">
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-4 py-3 bg-white rounded-xl border border-slate-100">
                    <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-3 w-1/4 opacity-60" />
                    </div>
                    <Skeleton className="h-6 w-20 rounded-full" />
                </div>
            ))}
        </div>
    );
};
