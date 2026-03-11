"use client";

import AuthForm from './AuthForm';

export default function AuthCard() {
    return (
        <div className="bg-white/50 backdrop-blur-xl border border-white/30 rounded-3xl p-8 md:p-10 w-full max-w-md shadow-xl overflow-hidden relative">
            <AuthForm initialMode="signin" />
        </div>
    );
}
