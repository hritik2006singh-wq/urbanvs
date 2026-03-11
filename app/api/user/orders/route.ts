export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'
import { prisma } from '@/lib/prisma'

async function verifyRequest(request: NextRequest) {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
        throw new Error('Missing or malformed Authorization header')
    }
    const token = authHeader.split('Bearer ')[1]
    const decodedToken = await adminAuth.verifyIdToken(token)

    let dbUser = await prisma.user.findUnique({
        where: { firebaseUid: decodedToken.uid }
    })

    if (!dbUser) {
        throw new Error('User not found in Neon database')
    }
    return { decodedToken, user: dbUser }
}

export async function GET(request: NextRequest) {
    try {
        const { user } = await verifyRequest(request)
        const orders = await prisma.order.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json({ orders })
    } catch (error: unknown) {
        console.error('[user/orders] GET error:', error)
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal server error' },
            { status: 500 }
        )
    }
}
