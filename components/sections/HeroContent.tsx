"use client";

import React, { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HeroContent = () => {
    const contentRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Entrance Animation
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(textRef.current,
            { x: -50, opacity: 0 }, // Slide in from left
            { x: 0, opacity: 1, duration: 1.2, delay: 0.2 }
        );

        tl.fromTo(".hero-btn",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
            "-=0.8"
        );

        // Scroll Interactions
        if (contentRef.current) {
            gsap.to(contentRef.current, {
                scrollTrigger: {
                    trigger: "#hero-section", // Target the parent section by ID
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
                y: -50, // Subtle parallax
                opacity: 0
            });
        }

    }, { scope: contentRef }); // Scope to contentRef

    return (
        <div
            ref={contentRef}
            className="relative z-20 h-full w-full container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 items-center"
        >
            {/* Text Content - Left Aligned */}
            <div className="flex flex-col justify-center items-start text-left max-w-2xl">

                <div ref={textRef}>
                    <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-slate-900 leading-[1.05]">
                        Local to <br />
                        <span className="text-accent">
                            Global
                        </span>
                    </h1>

                    {/* Subtext */}
                    <p className="mt-8 text-lg sm:text-xl text-slate-600 font-medium tracking-wide max-w-lg leading-relaxed">
                        We Visit. We Click. We Show. <br />
                        Premium digital experiences for modern brands.
                    </p>
                </div>

                {/* Button Container */}
                <div className="flex flex-col sm:flex-row gap-5 pt-10 w-full sm:w-auto">
                    <Button
                        size="lg"
                        className="hero-btn px-8 py-6 text-lg bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-xl shadow-slate-900/20 transition-all duration-300"
                    >
                        Get Started
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="hero-btn px-8 py-6 text-lg border-2 border-slate-300 text-slate-700 hover:border-slate-800 hover:text-slate-900 hover:bg-transparent rounded-lg transition-all duration-300"
                    >
                        View Portfolio
                    </Button>
                </div>
            </div>

            {/* Right Column - Spacer for Orb Visibility */}
            <div className="hidden lg:block h-full w-full pointer-events-none" />

        </div>
    );
};
