export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
    try {
        const { phone, otp, firebaseUid } = await request.json()

        const formattedPhone = phone.startsWith('+')
            ? phone
            : `+91${phone.replace(/\D/g, '')}`

        const otpRecord = await prisma.oTPVerification.findFirst({
            where: {
                phone: formattedPhone,
                type: 'PHONE_VERIFY',
                used: false,
                expiresAt: { gt: new Date() }
            },
            orderBy: { createdAt: 'desc' }
        })

        if (!otpRecord) {
            return NextResponse.json(
                { error: 'OTP expired or not found. Request a new one.' },
                { status: 400 }
            )
        }

        if (otpRecord.attempts >= 5) {
            await prisma.oTPVerification.update({
                where: { id: otpRecord.id },
                data: { used: true }
            })
            return NextResponse.json(
                { error: 'Too many wrong attempts. Request a new OTP.' },
                { status: 400 }
            )
        }

        const isValid = await bcrypt.compare(otp, otpRecord.otpHash)

        if (!isValid) {
            await prisma.oTPVerification.update({
                where: { id: otpRecord.id },
                data: { attempts: { increment: 1 } }
            })
            return NextResponse.json(
                { error: 'Incorrect OTP. Try again.' },
                { status: 400 }
            )
        }

        // Mark OTP used
        await prisma.oTPVerification.update({
            where: { id: otpRecord.id },
            data: { used: true }
        })

        // Update user phoneVerified in Prisma
        if (firebaseUid) {
            await prisma.user.update({
                where: { firebaseUid },
                data: { phone: formattedPhone, phoneVerified: true }
            })
        }

        return NextResponse.json({
            success: true,
            message: 'Phone verified successfully'
        })

    } catch (error: unknown) {
        console.error('Verify phone OTP error:', error)
        return NextResponse.json(
            {
                error: error instanceof Error
                    ? error.message
                    : 'Verification failed'
            },
            { status: 500 }
        )
    }
}
