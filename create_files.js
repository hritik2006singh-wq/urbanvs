const fs = require('fs');
const path = require('path');

const basePath = process.cwd();

const filesToCreate = {
    // --- 14-22: Dashboard Pages ---
    'app/dashboard/layout.tsx': `
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#f1f3f5]"><div className="flex h-screen overflow-hidden"><main className="flex-1 overflow-y-auto bg-[#f1f3f5] p-6">{children}</main></div></div>;
}
  `,
    'app/dashboard/page.tsx': `
export default function DashboardPage() {
  return <div><h1>Dashboard Overview</h1></div>;
}
  `,
    'app/dashboard/orders/page.tsx': `
export default function OrdersPage() {
  return <div><h1>Orders</h1></div>;
}
  `,
    'app/dashboard/profile/page.tsx': `
export default function ProfilePage() {
  return <div><h1>Profile</h1></div>;
}
  `,
    'app/dashboard/security/page.tsx': `
export default function SecurityPage() {
  return <div><h1>Security</h1></div>;
}
  `,
    'app/dashboard/admin/page.tsx': `
export default function AdminPage() {
  return <div><h1>Admin Dashboard</h1></div>;
}
  `,
    'app/dashboard/admin/users/page.tsx': `
export default function AdminUsersPage() {
  return <div><h1>Manage Users</h1></div>;
}
  `,
    'app/dashboard/admin/orders/page.tsx': `
export default function AdminOrdersPage() {
  return <div><h1>Manage Orders</h1></div>;
}
  `,
    'app/dashboard/admin/queries/page.tsx': `
export default function AdminQueriesPage() {
  return <div><h1>Manage Queries</h1></div>;
}
  `,

    // --- 23, 24: Components ---
    'components/dashboard/OrderModal.tsx': `
export default function OrderModal() { return null; }
  `,
    'components/ui/Toast.tsx': `
'use client'
import { createContext, useContext, useState } from 'react';
const ToastContext = createContext(null);
export function ToastProvider({ children }: any) { return <ToastContext.Provider value={null}>{children}</ToastContext.Provider>; }
export function useToast() { return { showToast: () => {} }; }
  `,

    // --- 25-31: Auth API ---
    'app/api/auth/sync-user/route.ts': `
export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) { return NextResponse.json({ success: true }); }
  `,
    'app/api/auth/send-otp/route.ts': `
export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) { return NextResponse.json({ success: true }); }
  `,
    'app/api/auth/verify-otp/route.ts': `
export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) { return NextResponse.json({ success: true }); }
  `,
    'app/api/auth/forgot-password/route.ts': `
export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) { return NextResponse.json({ success: true }); }
  `,
    'app/api/auth/reset-password/route.ts': `
export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) { return NextResponse.json({ success: true }); }
  `,

    // --- 4D explicitly given exact code: ---
    'app/api/auth/send-phone-otp/route.ts': \`export const runtime = 'nodejs'
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

    const formattedPhone = phone.startsWith('+')
      ? phone
      : \`+91\${phone.replace(/\\D/g, '')}\`

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpHash = await bcrypt.hash(otp, 10)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

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

    await prisma.oTPVerification.create({
      data: {
        userId: userId || null,
        phone: formattedPhone,
        otpHash,
        type: 'PHONE_VERIFY',
        expiresAt,
      }
    })

    await twilioClient.messages.create({
      body: \`Your UrbanVista verification code is: \${otp}. Valid for 10 minutes.\`,
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
}\`,

  'app/api/auth/verify-phone-otp/route.ts': \`export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { phone, otp, firebaseUid } = await request.json()

    const formattedPhone = phone.startsWith('+')
      ? phone
      : \`+91\${phone.replace(/\\D/g, '')}\`

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

    await prisma.oTPVerification.update({
      where: { id: otpRecord.id },
      data: { used: true }
    })

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
}\`,

  // --- PART 6 explicitly given exact code ---
  'app/api/orders/create/route.ts': \`export const runtime = 'nodejs'
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

    await resend.emails.send({
      from: 'UrbanVista <no-reply@urbanvistaservices.com>',
      replyTo: 'support@urbanvistaservices.com',
      to: user.email,
      subject: \`Order Received — \${serviceName}\`,
      html: \`
        <h2>Hi \${user.name},</h2>
        <p>We've received your order for <strong>\${serviceName}</strong>.</p>
        <p>Our team will review it and get back to you within 24 hours.</p>
        <p>You can track your order at: 
          <a href="\${process.env.NEXT_PUBLIC_APP_URL}/dashboard/orders">
            Your Dashboard
          </a>
        </p>
        <br/>
        <p>— The UrbanVista Team</p>
      \`,
    })

    await resend.emails.send({
      from: 'UrbanVista <no-reply@urbanvistaservices.com>',
      to: process.env.ADMIN_EMAIL!,
      subject: \`New Order: \${serviceName} from \${user.name}\`,
      html: \`
        <h2>New Order Received</h2>
        <p><strong>Client:</strong> \${user.name} (\${user.email})</p>
        <p><strong>Service:</strong> \${serviceName}</p>
        <p><strong>Budget:</strong> \${budget || 'Not specified'}</p>
        <p><strong>Timeline:</strong> \${timeline || 'Not specified'}</p>
        <p><strong>Description:</strong> \${description || 'None'}</p>
        <a href="\${process.env.NEXT_PUBLIC_APP_URL}/dashboard/admin/orders">
          View in Admin Panel
        </a>
      \`,
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
}\`,

  // --- PART 7 explicitly given exact code ---
  'app/api/user/stats/route.ts': \`export const runtime = 'nodejs'
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
}\`,

  // --- 33-34, 36-42: Other APIs ---
  'app/api/user/profile/route.ts': \`
export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) { return NextResponse.json({ user: {} }); }
  \`,
  'app/api/user/orders/route.ts': \`
export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) { return NextResponse.json({ orders: [] }); }
  \`,
  'app/api/admin/stats/route.ts': \`
export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) { return NextResponse.json({ stats: {} }); }
  \`,
  'app/api/admin/users/route.ts': \`
export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) { return NextResponse.json({ users: [] }); }
  \`,
  'app/api/admin/users/[id]/route.ts': \`
export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) { return NextResponse.json({ success: true }); }
  \`,
  'app/api/admin/orders/route.ts': \`
export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) { return NextResponse.json({ orders: [] }); }
  \`,
  'app/api/admin/orders/[id]/route.ts': \`
export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) { return NextResponse.json({ success: true }); }
  \`,
  'app/api/admin/queries/route.ts': \`
export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) { return NextResponse.json({ queries: [] }); }
  \`,
  'app/api/admin/queries/[id]/route.ts': \`
export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) { return NextResponse.json({ success: true }); }
  \`
};

Object.entries(filesToCreate).forEach(([relPath, content]) => {
  const fullPath = path.join(basePath, relPath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, content.trim(), 'utf8');
  console.log('Created:', relPath);
});
