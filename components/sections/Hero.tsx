"use client";

import React from 'react';
import { Scene } from '@/components/3d/Scene';
import { HeroContent } from '@/components/sections/HeroContent';

export const Hero = () => {
    return (
        <section
            id="hero-section"
            className="relative h-screen w-full overflow-hidden bg-[#f3f4f7] m-0 p-0 text-slate-900"
        >
            {/* --- Layer 0: Background Texture (Vertical Panels) --- */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: "repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 100px)"
                }}
            />

            {/* --- Layer 1: Soft Ambient Blur (Left Side) --- */}
            <div className="absolute top-0 left-0 w-2/3 h-full bg-gradient-to-r from-gray-200/50 to-transparent pointer-events-none z-0 blur-3xl opacity-60" />

            {/* --- Layer 2: 3D Scene (Orb) --- */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <Scene />
            </div>

            {/* --- Layer 3: Content Layer --- */}
            <div className="hero-wrapper h-full w-full">
                <HeroContent />
            </div>
        </section>
    );
};
