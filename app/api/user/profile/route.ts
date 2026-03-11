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
        return NextResponse.json({ user })
    } catch (error: unknown) {
        console.error('[user/profile] GET error:', error)
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const { user: currentUser } = await verifyRequest(request)
        const body = await request.json()
        const { name, phone, businessType } = body

        const user = await prisma.user.update({
            where: { id: currentUser.id },
            data: { name, phone, businessType }
        })

        if (name) {
            await adminAuth.updateUser(currentUser.firebaseUid, { displayName: name })
        }

        return NextResponse.json({ user })
    } catch (error: unknown) {
        console.error('[user/profile] PATCH error:', error)
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal server error' },
            { status: 500 }
        )
    }
}
