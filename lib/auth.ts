import { NextRequest } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { getUser, updateUser } from '@/lib/firestore';

const ADMIN_EMAIL = 'hritikcsingh@gmail.com';

export async function verifyAndGetFullUser(request: NextRequest | Request) {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader?.startsWith('Bearer ')) {
        throw new Error('Missing or malformed Authorization header');
    }

    if (!adminAuth) {
        throw new Error('Firebase Admin SDK not initialized');
    }

    const token = authHeader.split('Bearer ')[1];

    try {
        const decodedToken = await adminAuth.verifyIdToken(token);
        let dbUser = await getUser(decodedToken.uid);

        if (!dbUser) {
            throw new Error('User not found in Firestore database');
        }

        if (decodedToken.email === ADMIN_EMAIL && dbUser.role !== 'ADMIN') {
            await updateUser(decodedToken.uid, { role: 'ADMIN' });
            dbUser = await getUser(decodedToken.uid);
        }

        return { decodedToken, user: dbUser };

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Authentication failed';
        console.error('[verifyAndGetFullUser] error:', message);
        throw new Error(message);
    }
}
