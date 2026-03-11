import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

const ADMIN_EMAIL = 'hritikcsingh@gmail.com';

export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Missing token' }, { status: 401 });
        }

        const token = authHeader.split('Bearer ')[1];

        // 1. Verify token with Firebase Admin
        if (!adminAuth) {
            return NextResponse.json({ error: 'Firebase Auth not initialized' }, { status: 500 });
        }

        const decodedToken = await adminAuth.verifyIdToken(token);
        const { uid, email, name, picture } = decodedToken;

        if (!email) {
            return NextResponse.json({ error: 'Email missing from token' }, { status: 400 });
        }

        // 2. Determine Role
        const isAdmin = email === ADMIN_EMAIL;
        const role = isAdmin ? 'ADMIN' : 'USER';
        const emailVerified = isAdmin ? true : (decodedToken.email_verified || false);

        // 3. Sync User to Prisma (Upsert to create or update)
        const user = await prisma.user.upsert({
            where: { firebaseUid: uid },
            update: {
                email: email,
                name: name || email.split('@')[0],
                role: role, // Enforce admin here too
                emailVerified: emailVerified,
            },
            create: {
                firebaseUid: uid,
                email: email,
                name: name || email.split('@')[0],
                role: role,
                emailVerified: emailVerified,
            }
        });

        return NextResponse.json({ success: true, user });

    } catch (error: any) {
        console.error('[auth/sync] Error:', error?.message);
        return NextResponse.json(
            { error: error.message || 'Failed to sync user' },
            { status: 500 }
        );
    }
}
