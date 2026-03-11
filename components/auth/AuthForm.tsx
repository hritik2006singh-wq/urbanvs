"use client";

import React, { useState } from 'react';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User as FirebaseUser } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Loader2, KeyRound, ChevronLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import OTPInput from './OTPInput';
import WelcomePopup from './WelcomePopup';

type Screen = 'signin' | 'signup' | 'verify-otp' | 'forgot-email' | 'forgot-otp' | 'new-password' | 'success';

interface AuthFormProps {
    initialMode: 'signin' | 'signup';
}

export default function AuthForm({ initialMode }: AuthFormProps) {
    const [screen, setScreen] = useState<Screen>(initialMode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showWelcome, setShowWelcome] = useState(false);
    const [otpEmail, setOtpEmail] = useState('');

    const router = useRouter();
    const ADMIN_EMAIL = 'hritikcsingh@gmail.com';

    const clearMessages = () => {
        setError('');
        setSuccess('');
    };

    const setAuthCookie = (token: string) => {
        document.cookie = `urbanvista-token=${token}; path=/; max-age=3600; SameSite=Strict; Secure`;
    };

    const syncUserToDatabase = async (firebaseUser: FirebaseUser, userName?: string) => {
        const token = await firebaseUser.getIdToken(true);
        setAuthCookie(token);

        const isAdmin = firebaseUser.email === ADMIN_EMAIL;
        const res = await fetch('/api/auth/sync-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: userName || firebaseUser.displayName || 'User',
                email: firebaseUser.email,
                emailVerified: isAdmin ? true : firebaseUser.emailVerified
            })
        });

        if (!res.ok) {
            const text = await res.text();
            console.error('Sync failed:', text);
            throw new Error('Failed to connect to database');
        }
        return await res.json();
    };

    const handleSignin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const { signInWithEmailAndPassword } = await import('firebase/auth');
            const credential = await signInWithEmailAndPassword(auth, email.trim(), password);

            const firebaseUser = credential.user;
            const ADMIN_EMAIL = 'hritikcsingh@gmail.com';
            const isAdmin = firebaseUser.email === ADMIN_EMAIL;

            // Admin completely bypasses email verification
            if (!isAdmin && !firebaseUser.emailVerified) {
                setError('Please verify your email first. Check your inbox.');
                setLoading(false);
                return;
            }

            const token = await firebaseUser.getIdToken(true);

            // Set auth cookie for middleware
            document.cookie = [
                `urbanvista-token=${token}`,
                'path=/',
                'max-age=3600',
                'SameSite=Strict'
            ].join('; ');

            // Sync to Prisma
            const syncRes = await fetch('/api/auth/sync-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: firebaseUser.displayName || 'User',
                    email: firebaseUser.email,
                    emailVerified: isAdmin ? true : firebaseUser.emailVerified,
                }),
            });

            if (!syncRes.ok) {
                const errText = await syncRes.text();
                console.error('Sync failed:', errText);
                throw new Error('Failed to sync account. Try again.');
            }

            await syncRes.json();

            // Redirect based on role
            if (isAdmin) {
                window.location.href = '/dashboard/admin';
            } else {
                window.location.href = '/dashboard';
            }

        } catch (error: unknown) {
            const { FirebaseError } = await import('firebase/app');

            if (error instanceof FirebaseError) {
                const messages: Record<string, string> = {
                    'auth/invalid-credential': 'Wrong email or password',
                    'auth/user-not-found': 'No account with this email',
                    'auth/wrong-password': 'Wrong password',
                    'auth/too-many-requests': 'Too many attempts. Wait a moment.',
                    'auth/invalid-email': 'Invalid email format',
                    'auth/invalid-api-key': 'System error. Contact support.',
                };
                setError(messages[error.code] || error.message);
            } else {
                setError(error instanceof Error ? error.message : 'Something went wrong. Try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        clearMessages();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;

            await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, type: 'EMAIL_VERIFY', name })
            });

            setOtpEmail(email);
            setScreen('verify-otp');
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Registration failed';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (otp: string) => {
        clearMessages();
        setLoading(true);
        try {
            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: otpEmail, otp, type: 'EMAIL_VERIFY' })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Invalid OTP');
            }

            if (auth.currentUser) {
                await auth.currentUser.reload();
                await syncUserToDatabase(auth.currentUser, name);
            }

            setShowWelcome(true);
            setTimeout(() => {
                router.push('/dashboard');
            }, 2000);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearMessages();
        setLoading(true);
        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: otpEmail })
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error);
            }
            setScreen('forgot-otp');
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotOTPVerify = async (otp: string) => {
        sessionStorage.setItem('reset_otp', otp);
        setScreen('new-password');
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        clearMessages();
        const storedOtp = sessionStorage.getItem('reset_otp');
        if (!storedOtp) {
            setError("Session expired. Please try again.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: otpEmail, otp: storedOtp, newPassword })
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error);
            }
            sessionStorage.removeItem('reset_otp');
            setScreen('success');
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    const slideVariants = {
        enter: { x: 20, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -20, opacity: 0 }
    };

    return (
        <div className="w-full relative min-h-[400px] flex flex-col justify-center p-1">
            {showWelcome && (
                <WelcomePopup
                    name={name || otpEmail.split('@')[0]}
                    show={showWelcome}
                    onComplete={() => router.push('/dashboard')}
                />
            )}

            {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    {success}
                </div>
            )}

            <AnimatePresence mode="wait">
                {screen === 'signin' && (
                    <motion.form
                        key="signin"
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        onSubmit={handleSignin}
                        className="space-y-5"
                    >
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-slate-900 mb-1">Welcome Back</h2>
                            <p className="text-sm text-slate-500">Sign in to your account</p>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full bg-white/60 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full bg-white/60 border border-slate-200 rounded-xl py-3 pl-11 pr-10 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="••••••••"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                <span className="text-sm text-slate-600 font-medium">Remember me</span>
                            </label>
                            <button type="button" onClick={() => { setOtpEmail(email); setScreen('forgot-email'); clearMessages(); }} className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-3.5 transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Secure Sign In'}
                        </button>

                        <p className="text-center text-sm text-slate-600 mt-6 font-medium">
                            Don't have an account? <button type="button" onClick={() => { setScreen('signup'); clearMessages(); }} className="text-blue-600 hover:text-blue-700 font-bold">Sign up</button>
                        </p>
                    </motion.form>
                )}

                {screen === 'signup' && (
                    <motion.form
                        key="signup"
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        onSubmit={handleSignup}
                        className="space-y-4"
                    >
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-slate-900 mb-1">Create Account</h2>
                            <p className="text-sm text-slate-500">Join UrbanVista today</p>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="w-full bg-white/60 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Hritik Singh"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full bg-white/60 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="you@company.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    minLength={6}
                                    className="w-full bg-white/60 border border-slate-200 rounded-xl py-3 pl-11 pr-10 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Minimum 6 characters"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    minLength={6}
                                    className="w-full bg-white/60 border border-slate-200 rounded-xl py-3 pl-11 pr-10 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Repeat password"
                                />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-3.5 transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
                        </button>

                        <p className="text-center text-sm text-slate-600 mt-6 font-medium">
                            Already have an account? <button type="button" onClick={() => { setScreen('signin'); clearMessages(); }} className="text-blue-600 hover:text-blue-700 font-bold">Sign in</button>
                        </p>
                    </motion.form>
                )}

                {(screen === 'verify-otp' || screen === 'forgot-otp') && (
                    <motion.div
                        key="verify-otp"
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="text-center relative pt-8"
                    >
                        <button onClick={() => { setScreen(screen === 'verify-otp' ? 'signup' : 'forgot-email'); clearMessages(); }} className="absolute -top-4 left-0 text-slate-500 flex items-center gap-1 hover:text-slate-800 transition-colors text-sm font-semibold">
                            <ChevronLeft className="w-4 h-4" /> Back
                        </button>

                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Mail className="w-8 h-8 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Check your email</h2>
                        <p className="text-slate-600 text-sm mb-8 max-w-xs mx-auto">
                            We've sent a 6-digit code to <span className="text-slate-900 font-bold">{otpEmail || email}</span>
                        </p>

                        <OTPInput
                            length={6}
                            onComplete={screen === 'verify-otp' ? handleVerifyOTP : handleForgotOTPVerify}
                            error={!!error}
                            expiresIn={600}
                            onResend={() => fetch('/api/auth/send-otp', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email: otpEmail, type: screen === 'verify-otp' ? 'EMAIL_VERIFY' : 'PASSWORD_RESET', name })
                            })}
                        />

                        {loading && <Loader2 className="w-6 h-6 animate-spin text-blue-500 mx-auto mt-6" />}
                    </motion.div>
                )}

                {screen === 'forgot-email' && (
                    <motion.form
                        key="forgot-email"
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        onSubmit={handleForgotEmailSubmit}
                        className="relative pt-8"
                    >
                        <button type="button" onClick={() => { setScreen('signin'); clearMessages(); }} className="absolute -top-4 left-0 text-slate-500 flex items-center gap-1 hover:text-slate-800 text-sm font-semibold font-semibold">
                            <ChevronLeft className="w-4 h-4" /> Back
                        </button>

                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <KeyRound className="w-8 h-8 text-purple-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Reset Password</h2>
                        <p className="text-slate-600 text-sm mb-8 max-w-xs mx-auto text-center">
                            Enter your email and we'll send you an OTP to reset your password.
                        </p>

                        <div className="space-y-1.5 mb-6">
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    required
                                    value={otpEmail}
                                    onChange={e => setOtpEmail(e.target.value)}
                                    className="w-full bg-white/60 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !otpEmail}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-3.5 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send OTP'}
                        </button>
                    </motion.form>
                )}

                {screen === 'new-password' && (
                    <motion.form
                        key="new-password"
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        onSubmit={handleResetPassword}
                        className="pt-4"
                    >
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Lock className="w-8 h-8 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">New Password</h2>
                        <p className="text-slate-600 text-sm mb-8 text-center">
                            OTP verified. Please enter your new password below.
                        </p>

                        <div className="space-y-1.5 mb-6">
                            <label className="text-sm font-semibold text-slate-700">New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    required
                                    minLength={6}
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                    className="w-full bg-white/60 border border-slate-200 rounded-xl py-3 pl-11 pr-10 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Minimum 6 characters"
                                />
                                <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-3.5 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Set New Password'}
                        </button>
                    </motion.form>
                )}

                {screen === 'success' && (
                    <motion.div
                        key="success"
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="text-center py-8"
                    >
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Password Updated!</h2>
                        <p className="text-slate-600 mb-8 max-w-[280px] mx-auto">
                            Your password has been changed successfully. You can now log in.
                        </p>
                        <button
                            onClick={() => { setScreen('signin'); clearMessages(); }}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-3.5 transition-colors"
                        >
                            Return to Sign In
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
