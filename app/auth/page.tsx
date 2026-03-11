'use client'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import AuthForm from '@/components/auth/AuthForm'

function AuthContent() {
    const params = useSearchParams()
    const mode = params.get('mode') || 'signin'
    return <AuthForm initialMode={mode as 'signin' | 'signup'} />
}

export default function AuthPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <AuthContent />
        </Suspense>
    )
}
