export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'
import { prisma } from '@/lib/prisma'

async function verifyAdmin(request: NextRequest) {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
        throw new Error('Missing or malformed Authorization header')
    }
    const token = authHeader.split('Bearer ')[1]
    const decodedToken = await adminAuth.verifyIdToken(token)

    const dbUser = await prisma.user.findUnique({
        where: { firebaseUid: decodedToken.uid }
    })

    if (!dbUser || dbUser.role !== 'ADMIN') {
        throw new Error('Forbidden')
    }
    return dbUser
}

export async function GET(request: NextRequest) {
    try {
        await verifyAdmin(request)

        const [
            totalUsers,
            totalOrders,
            newQueries,
            revenueResult,
            recentUsers,
            recentOrders,
            recentQueries
        ] = await Promise.all([
            prisma.user.count(),
            prisma.order.count(),
            prisma.contactQuery.count({ where: { status: 'NEW' } }),
            prisma.order.aggregate({ _sum: { amount: true } }),
            prisma.user.findMany({
                orderBy: { createdAt: 'desc' },
                take: 5
            }),
            prisma.order.findMany({
                orderBy: { createdAt: 'desc' },
                take: 5,
                include: { user: { select: { name: true, email: true } } }
            }),
            prisma.contactQuery.findMany({
                orderBy: { createdAt: 'desc' },
                take: 5
            })
        ])

        return NextResponse.json({
            stats: {
                totalUsers,
                totalOrders,
                newQueries,
                totalRevenue: revenueResult._sum.amount || 0,
                recentUsers,
                recentOrders,
                recentQueries
            }
        })
    } catch (error: unknown) {
        console.error('[admin/stats] GET error:', error)
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal server error' },
            { status: 500 }
        )
    }
}
