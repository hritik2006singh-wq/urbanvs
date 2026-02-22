"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    className,
    variant = 'primary',
    size = 'md',
    children,
    ...props
}) => {
    const variants = {
        primary: 'bg-[#2563EB] text-white hover:bg-blue-600 shadow-lg hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] border border-transparent',
        secondary: 'bg-white text-[#0F172A] border border-slate-200 hover:bg-slate-50 hover:border-blue-200',
        outline: 'border border-[#2563EB] text-[#2563EB] hover:bg-blue-50',
        ghost: 'hover:bg-slate-100 text-[#64748B]',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                'rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
};
