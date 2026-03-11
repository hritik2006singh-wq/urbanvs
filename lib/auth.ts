import { NextRequest } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { prisma } from '@/lib/prisma';

const ADMIN_EMAIL = 'hritikcsingh@gmail.com';

/**
 * Verifies the Firebase ID token and fetches the corresponding Prisma user.
 * Automatically enforces the ADMIN role for the hardcoded admin email.
 */
export async function verifyAndGetUser(request: NextRequest | Request) {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader?.startsWith('Bearer ')) {
        throw new Error('Missing or malformed Authorization header');
    }

    if (!adminAuth) {
        throw new Error('Firebase Admin SDK not initialized');
    }

    const token = authHeader.split('Bearer ')[1];

    try {
        // 1. Verify Firebase token
        const decodedToken = await adminAuth.verifyIdToken(token);

        // 2. Fetch User from Prisma
        let dbUser = await prisma.user.findUnique({
            where: { firebaseUid: decodedToken.uid }
        });

        if (!dbUser) {
            throw new Error('User not found in Neon database');
        }

        // 3. Auto-assign ADMIN role if email matches
        if (decodedToken.email === ADMIN_EMAIL && dbUser.role !== 'ADMIN') {
            dbUser = await prisma.user.update({
                where: { id: dbUser.id },
                data: { role: 'ADMIN' }
            });
        }

        return { decodedToken, user: dbUser };

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Authentication failed';
        console.error('[verifyAndGetUser] error:', message);
        throw new Error(message);
    }
}
