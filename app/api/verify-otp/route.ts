import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseKey) {
            return NextResponse.json({ error: 'Server authentication keys are missing configurations.' }, { status: 500 });
        }

        const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

        const { email, otp } = await request.json();

        if (!email || !otp) {
            return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
        }

        // 1. Fetch OTP row by email
        const { data: otps, error: fetchError } = await supabaseAdmin
            .from('email_otps')
            .select('*')
            .eq('email', email)
            .order('created_at', { ascending: false })
            .limit(1);

        if (fetchError) throw fetchError;

        const latestOtp = otps?.[0];

        if (!latestOtp) {
            return NextResponse.json({ error: 'No verification code found. Please request a new one.' }, { status: 400 });
        }

        // 2. Check Expiration
        if (new Date(latestOtp.expires_at) < new Date()) {
            return NextResponse.json({ error: 'This code has expired. Please request a new one.' }, { status: 400 });
        }

        // 3. Check Attempt Count
        if (latestOtp.attempt_count >= 5) {
            return NextResponse.json({ error: 'Too many failed attempts. Please request a new code.' }, { status: 400 });
        }

        // 4. Verify Code
        if (latestOtp.otp !== otp) {
            await supabaseAdmin
                .from('email_otps')
                .update({ attempt_count: latestOtp.attempt_count + 1 })
                .eq('id', latestOtp.id);
            return NextResponse.json({ error: 'Incorrect verification code.' }, { status: 400 });
        }

        // 5. Valid Code: Find User ID from Admin Auth to Update Profiles map
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.listUsers();
        if (authError) throw authError;

        const targetUser = authData.users.find(u => u.email === email);

        if (targetUser) {
            // Update associated profile
            await supabaseAdmin
                .from('profiles')
                .update({ email_verified: true })
                .eq('id', targetUser.id);
        } else {
            return NextResponse.json({ error: 'Target user identity missing during verification linkage.' }, { status: 404 });
        }

        // 6. Cleanup successful OTP trace strictly as directed
        await supabaseAdmin.from('email_otps').delete().eq('email', email);

        return NextResponse.json({ success: true, message: 'Verified Successfully' });

    } catch (error: any) {
        console.error('Verify OTP Error:', error?.message, error);
        return NextResponse.json({ error: error.message || 'Verification Error' }, { status: 500 });
    }
}
