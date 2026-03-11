export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { verifyAndGetUser } from '@/lib/firebase-admin'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const decoded = await verifyAndGetUser(request)

        const user = await prisma.user.findUnique({
            where: { firebaseUid: decoded.uid },
            include: {
                orders: true
            }
        })

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        const activeOrders = user.orders.filter(
            o => o.status === 'PENDING' || o.status === 'IN_PROGRESS'
        ).length

        const completedOrders = user.orders.filter(
            o => o.status === 'COMPLETED'
        ).length

        return NextResponse.json({
            activeOrders,
            completedOrders,
            totalOrders: user.orders.length,
            emailVerified: user.emailVerified,
            phoneVerified: user.phoneVerified,
            memberSince: user.createdAt,
            recentOrders: user.orders
                .sort((a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .slice(0, 3)
        })

    } catch (error: unknown) {
        return NextResponse.json(
            { error: 'Failed to fetch stats' },
            { status: 500 }
        )
    }
}
