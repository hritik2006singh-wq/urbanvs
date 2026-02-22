"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    intensity?: 'low' | 'medium' | 'high' | 'none' | 'featured';
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className, intensity = 'none', ...props }) => {
    const intensityMap = {
        low: 'bg-white/40 backdrop-blur-md border border-white/50 shadow-sm',
        medium: 'bg-white/60 backdrop-blur-lg border border-white/60 shadow-md',
        high: 'bg-white/80 backdrop-blur-xl border border-white/70 shadow-lg',
        none: 'bg-white border border-slate-100 shadow-sm hover:shadow-md',
        featured: 'bg-white border border-blue-100 shadow-xl shadow-blue-900/5 scale-[1.01]',
    };

    return (
        <motion.div
            className={cn(
                'rounded-xl transition-all duration-300',
                intensityMap[intensity],
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};
