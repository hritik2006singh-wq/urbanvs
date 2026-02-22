"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface FloatingSectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export function FloatingSection({ children, className, id }: FloatingSectionProps) {
    return (
        <section id={id} className="relative flex justify-center py-24">
            <div
                className={cn(
                    "relative w-[88%] max-w-6xl rounded-3xl",
                    "bg-white/60 backdrop-blur-xl border border-white/40",
                    "shadow-[0_30px_70px_rgba(0,0,0,0.08)]",
                    "overflow-hidden navigate-card", // Added class for potential hooks
                    "animate-[floatCard_6s_ease-in-out_infinite]", // Floating animation
                    className
                )}
            >
                {/* Apple Liquid Glass Side Effect (Left) */}
                <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white/70 via-white/40 to-transparent backdrop-blur-2xl pointer-events-none z-10" />

                {/* Apple Liquid Glass Side Effect (Right) */}
                <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white/70 via-white/40 to-transparent backdrop-blur-2xl pointer-events-none z-10" />

                {/* Content Wrapper */}
                <div className="relative px-8 md:px-16 py-16 z-20">
                    {children}
                </div>
            </div>
        </section>
    );
}
