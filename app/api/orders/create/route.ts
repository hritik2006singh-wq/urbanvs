export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { verifyAndGetUser } from '@/lib/firebase-admin'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(request: NextRequest) {
    try {
        const decoded = await verifyAndGetUser(request)
        const body = await request.json()
        const { serviceName, description, budget, timeline } = body

        const user = await prisma.user.findUnique({
            where: { firebaseUid: decoded.uid }
        })

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        const order = await prisma.order.create({
            data: {
                userId: user.id,
                serviceName,
                description,
                budget,
                timeline,
                status: 'PENDING'
            }
        })

        // Send confirmation email to user
        await resend.emails.send({
            from: 'UrbanVista <no-reply@urbanvistaservices.com>',
            replyTo: 'support@urbanvistaservices.com',
            to: user.email,
            subject: `Order Received — ${serviceName}`,
            html: `
        <h2>Hi ${user.name},</h2>
        <p>We've received your order for <strong>${serviceName}</strong>.</p>
        <p>Our team will review it and get back to you within 24 hours.</p>
        <p>You can track your order at: 
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/orders">
            Your Dashboard
          </a>
        </p>
        <br/>
        <p>— The UrbanVista Team</p>
      `,
        })

        // Notify admin
        await resend.emails.send({
            from: 'UrbanVista <no-reply@urbanvistaservices.com>',
            to: process.env.ADMIN_EMAIL!,
            subject: `New Order: ${serviceName} from ${user.name}`,
            html: `
        <h2>New Order Received</h2>
        <p><strong>Client:</strong> ${user.name} (${user.email})</p>
        <p><strong>Service:</strong> ${serviceName}</p>
        <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
        <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
        <p><strong>Description:</strong> ${description || 'None'}</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/admin/orders">
          View in Admin Panel
        </a>
      `,
        })

        return NextResponse.json({ success: true, order })

    } catch (error: unknown) {
        console.error('Create order error:', error)
        return NextResponse.json(
            {
                error: error instanceof Error
                    ? error.message
                    : 'Failed to create order'
            },
            { status: 500 }
        )
    }
}
