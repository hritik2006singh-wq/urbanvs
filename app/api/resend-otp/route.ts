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

        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is mapping requirement' }, { status: 400 });
        }

        // 1. Fetch latest OTP parameters
        const { data: otps, error: fetchError } = await supabaseAdmin
            .from('email_otps')
            .select('*')
            .eq('email', email)
            .order('created_at', { ascending: false })
            .limit(1);

        if (fetchError) throw fetchError;
        const latestOtp = otps?.[0];

        // 2. Prevent Spamming
        if (latestOtp && latestOtp.resend_count >= 3) {
            return NextResponse.json({ error: 'Too many resend attempts. Please register again later.' }, { status: 429 });
        }

        // 3. Generate Replacements
        const resendCount = latestOtp ? latestOtp.resend_count + 1 : 1;
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

        // Scrub old parameters actively
        await supabaseAdmin.from('email_otps').delete().eq('email', email);

        // 4. Deposit New Parameters
        const { error: insertError } = await supabaseAdmin.from('email_otps').insert({
            email,
            otp: newOtp,
            expires_at: expiresAt,
            attempt_count: 0,
            resend_count: resendCount
        });

        if (insertError) throw insertError;

        // 5. Interface with Mail pipeline
        // Notice we utilize absolute path via origin fetch directly for proxying internal structure 
        // Or we can just import the logic. To keep things DRY, we'll fetch the sibling endpoint.
        const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

        try {
            const emailRes = await fetch(`${origin}/api/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp: newOtp })
            });
            if (!emailRes.ok) {
                console.error("Sibling Dispatch Delivery failure from resend-otp route");
            }
        } catch (networkErr: any) {
            console.error("Localhop fetch error:", networkErr?.message, networkErr);
        }

        return NextResponse.json({ success: true, message: 'Resended actively' });

    } catch (error: any) {
        console.error('Resend OTP Engine Error:', error?.message, error);
        return NextResponse.json({ error: error.message || 'Resend Engine Crash' }, { status: 500 });
    }
}
