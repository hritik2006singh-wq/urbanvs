"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

function VerifyOtpContent() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [countdown, setCountdown] = useState(60);

    const searchParams = useSearchParams();
    const emailParam = searchParams.get('email');
    const [userEmail, setUserEmail] = useState(emailParam || '');

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (!userEmail) {
            router.push('/auth');
        }
    }, [userEmail, router]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(c => c - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleChange = (index: number, value: string) => {
        if (!/^[0-9]*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        const fullOtp = otp.join('');
        if (fullOtp.length !== 6) return;

        setIsLoading(true);
        setErrorMsg('');

        try {
            const res = await fetch('/api/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail, otp: fullOtp })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Verification failed");
            }

            setSuccessMsg("Email verified successfully! Diverting to Dashboard...");
            setTimeout(() => {
                router.push('/dashboard');
            }, 1200);

        } catch (err: any) {
            console.error('Verify error:', err?.message, err);
            setErrorMsg(err.message);
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (countdown > 0) return;
        setIsLoading(true);
        setErrorMsg('');

        try {
            const res = await fetch('/api/resend-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to resend code");
            }

            setCountdown(60);
            setSuccessMsg("A fresh 6-digit code has been dispatched!");
            setOtp(['', '', '', '', '', '']);
            setTimeout(() => setSuccessMsg(''), 3000);

        } catch (err: any) {
            console.error('Resend error:', err?.message, err);
            setErrorMsg(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_100%)] pointer-events-none" />
            <motion.div
                className="absolute w-[600px] h-[600px] bg-[#3B82F6]/20 rounded-full blur-[120px] mix-blend-screen opacity-30 pointer-events-none"
                animate={{ scale: [1, 1.1, 1], x: [0, 50, 0], y: [0, -50, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-md bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl"
            >
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-[#3B82F6]/10 rounded-full flex items-center justify-center border border-[#3B82F6]/20 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                        <ShieldCheck className="w-8 h-8 text-[#3B82F6]" />
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-2">Verify Your Email</h2>
                    <p className="text-[rgba(255,255,255,0.6)] text-sm">
                        For security, we've dispatched a 6-digit code strictly to<br />
                        <span className="text-white font-medium">{userEmail || '...'}</span>
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {errorMsg && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                            className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm overflow-hidden"
                        >
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p>{errorMsg}</p>
                        </motion.div>
                    )}

                    {successMsg && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                            className="p-3 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center gap-3 text-[#E6EDF7] text-sm overflow-hidden"
                        >
                            <ShieldCheck className="w-5 h-5 flex-shrink-0 text-[#3B82F6]" />
                            <p>{successMsg}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleVerify} className="space-y-8">
                    <div className="flex justify-between gap-2">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el; }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                disabled={isLoading || !!successMsg}
                                className="w-12 h-14 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl text-center text-xl font-semibold text-white focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/50 transition-all duration-300 disabled:opacity-50"
                            />
                        ))}
                    </div>

                    <div className="flex flex-col gap-4">
                        <button
                            type="submit"
                            disabled={isLoading || otp.join('').length !== 6 || !!successMsg}
                            className="w-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white py-3.5 rounded-xl font-medium transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Verify Auth Code
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={countdown > 0 || isLoading || !!successMsg}
                            className="text-sm text-[rgba(255,255,255,0.6)] hover:text-white transition-colors disabled:hover:text-[rgba(255,255,255,0.6)] mx-auto font-medium"
                        >
                            {countdown > 0 ? `Resend safe code in ${countdown}s` : 'Didn\'t receive a code? Resend via Email'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

export default function VerifyOtp() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#3B82F6]" /></div>}>
            <VerifyOtpContent />
        </Suspense>
    );
}
