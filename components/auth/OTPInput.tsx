"use client";

import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react';

interface OTPInputProps {
    length?: number;
    onComplete: (otp: string) => void;
    error?: boolean;
    expiresIn?: number;
    onResend?: () => void;
}

export default function OTPInput({
    length = 6,
    onComplete,
    error = false,
    expiresIn = 600,
    onResend
}: OTPInputProps) {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
    const [timeLeft, setTimeLeft] = useState(expiresIn);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timerId = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timerId);
    }, [timeLeft]);

    useEffect(() => {
        if (error) {
            setOtp(new Array(length).fill(""));
            if (inputRefs.current[0]) {
                inputRefs.current[0].focus();
            }
        }
    }, [error, length]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handleChange = (index: number, value: string) => {
        if (!/^[0-9]*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        if (newOtp.every(v => v !== "")) {
            onComplete(newOtp.join(""));
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            if (!otp[index] && index > 0) {
                inputRefs.current[index - 1]?.focus();
                const newOtp = [...otp];
                newOtp[index - 1] = '';
                setOtp(newOtp);
            }
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').slice(0, length);
        if (!/^[0-9]+$/.test(pastedData)) return;

        const newOtp = [...otp];
        for (let i = 0; i < pastedData.length; i++) {
            newOtp[i] = pastedData[i];
        }
        setOtp(newOtp);

        if (pastedData.length === length) {
            inputRefs.current[length - 1]?.focus();
            onComplete(newOtp.join(""));
        } else {
            inputRefs.current[pastedData.length]?.focus();
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className={`flex gap-3 justify-center mb-6 w-full ${error ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        // @ts-ignore
                        ref={el => inputRefs.current[index] = el}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={e => handleChange(index, e.target.value)}
                        onKeyDown={e => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className={`w-12 h-14 text-center text-2xl font-bold bg-white/60 border-2 rounded-xl text-slate-900 transition-all ${error
                                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                                : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                            }`}
                        autoComplete="one-time-code"
                    />
                ))}
            </div>

            <div className="text-sm font-medium flex flex-col items-center gap-2">
                {timeLeft > 0 ? (
                    <p className="text-slate-600">
                        OTP expires in <span className="font-bold text-slate-800">{formatTime(timeLeft)}</span>
                    </p>
                ) : (
                    <p className="text-red-500 font-bold">OTP has expired</p>
                )}

                {(timeLeft <= 540 || timeLeft === 0) && ( // Allow resend after 60 seconds
                    <button
                        type="button"
                        onClick={() => {
                            if (onResend) {
                                setTimeLeft(expiresIn);
                                setOtp(new Array(length).fill(""));
                                onResend();
                            }
                        }}
                        className="text-blue-600 hover:text-blue-700 transition-colors underline"
                    >
                        Resend OTP
                    </button>
                )}
            </div>

            <style jsx global>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
                    20%, 40%, 60%, 80% { transform: translateX(4px); }
                }
            `}</style>
        </div>
    );
}
