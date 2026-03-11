"use client";

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomePopupProps {
    name: string;
    show: boolean;
    onComplete: () => void;
}

export default function WelcomePopup({ name, show, onComplete }: WelcomePopupProps) {
    const [timeLeft, setTimeLeft] = useState(5);

    useEffect(() => {
        if (show) {
            // Trigger confetti
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(function () {
                const timeLeftConfetti = animationEnd - Date.now();

                if (timeLeftConfetti <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeftConfetti / duration);
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);

            // Countdown timer
            const countdown = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(countdown);
                        onComplete();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => {
                clearInterval(interval);
                clearInterval(countdown);
            };
        }
    }, [show, onComplete]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="bg-white rounded-3xl p-10 sm:p-12 text-center max-w-md w-full mx-auto shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-50"></div>

                        <div className="text-6xl mb-6">🎉</div>

                        <h2 className="text-3xl font-bold text-slate-900 mb-2">
                            Welcome to UrbanVista, {name}!
                        </h2>

                        <p className="text-slate-600 mb-8 text-lg">
                            Your account is all set up and verified.
                        </p>

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
                        >
                            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </motion.div>

                        <button
                            onClick={onComplete}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-4 transition-colors text-lg flex items-center justify-center gap-2 group"
                        >
                            Let's Go
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>

                        <p className="text-slate-400 text-sm mt-4">
                            Redirecting to dashboard in {timeLeft}s...
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
