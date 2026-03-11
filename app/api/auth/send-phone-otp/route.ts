export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { twilioClient, TWILIO_PHONE } from '@/lib/twilio'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
    try {
        const { phone, userId } = await request.json()

        if (!phone) {
            return NextResponse.json(
                { error: 'Phone number required' },
                { status: 400 }
            )
        }

        // Format phone with country code
        const formattedPhone = phone.startsWith('+')
            ? phone
            : `+91${phone.replace(/\D/g, '')}`

        // Generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const otpHash = await bcrypt.hash(otp, 10)
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

        // Check rate limit — max 3 per hour
        const recentOTPs = await prisma.oTPVerification.count({
            where: {
                phone: formattedPhone,
                type: 'PHONE_VERIFY',
                createdAt: { gte: new Date(Date.now() - 60 * 60 * 1000) }
            }
        })

        if (recentOTPs >= 3) {
            return NextResponse.json(
                { error: 'Too many OTP requests. Try again in 1 hour.' },
                { status: 429 }
            )
        }

        // Save OTP
        await prisma.oTPVerification.create({
            data: {
                userId: userId || null,
                phone: formattedPhone,
                otpHash,
                type: 'PHONE_VERIFY',
                expiresAt,
            }
        })

        // Send SMS via Twilio
        await twilioClient.messages.create({
            body: `Your UrbanVista verification code is: ${otp}. Valid for 10 minutes.`,
            from: TWILIO_PHONE,
            to: formattedPhone,
        })

        return NextResponse.json({
            success: true,
            message: 'OTP sent to your phone'
        })

    } catch (error: unknown) {
        console.error('Send phone OTP error:', error)
        return NextResponse.json(
            {
                error: error instanceof Error
                    ? error.message
                    : 'Failed to send OTP'
            },
            { status: 500 }
        )
    }
}
