import * as admin from 'firebase-admin'
import { NextRequest } from 'next/server'

if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
        })
    } catch (error) {
        console.error('Firebase Admin init error:', error)
    }
}

export const adminAuth = admin.auth()

export async function verifyAndGetUser(request: NextRequest) {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
        throw new Error('Missing or invalid Authorization header (Bearer token)')
    }
    const token = authHeader.split('Bearer ')[1]
    try {
        const decodedToken = await adminAuth.verifyIdToken(token)
        return decodedToken
    } catch (error) {
        throw new Error('Unauthorized or invalid token')
    }
}
