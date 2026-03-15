export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { verifyOTP, updateUser } from '@/lib/firestore'
import { adminAuth } from '@/lib/firebase-admin'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request)
    const rl = rateLimit(`verify-otp:${ip}`, { limit: 10, windowSec: 300 }) // 10 per 5 min
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Too many verification attempts. Please wait.' },
        { status: 429 }
      )
    }

    const { email, otp, type, uid } = await request.json()
    if (!email || !otp || !type) {
      return NextResponse.json(
        { error: 'Missing fields' }, { status: 400 }
      )
    }

    const result = await verifyOTP({ 
      email, type, plainOtp: otp 
    })
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error }, { status: 400 }
      )
    }

    if (type === 'EMAIL_VERIFY' && uid) {
      await adminAuth.updateUser(uid, { emailVerified: true })
      await updateUser(uid, { emailVerified: true })
    }

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('[verify-otp]', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error' },
      { status: 500 }
    )
  }
}
