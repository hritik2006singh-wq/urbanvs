# Supabase Database Setup

Run the following SQL commands in your Supabase SQL Editor to prepare your database for the enterprise client portal upgrade.

## 0. Enable Custom OTP Auth (NEW)
Adds support for our custom numeric 6-digit OTP email verification flow.

```sql
-- Add email_verified to profiles
DO $$ 
BEGIN
    BEGIN
        ALTER TABLE public.profiles ADD COLUMN email_verified BOOLEAN DEFAULT FALSE;
    EXCEPTION WHEN duplicate_column THEN END;
END $$;

-- Create email_otps table
CREATE TABLE IF NOT EXISTS public.email_otps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    otp TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    attempt_count INTEGER DEFAULT 0,
    resend_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS for email_otps (Security: Only the service role / our server API should be managing this directly)
ALTER TABLE public.email_otps ENABLE ROW LEVEL SECURITY;

-- Note: All frontend interactions with email_otps will now route through strict Server API endpoints 
-- to safely support unauthenticated users who were bounced from the login screen. No public RLS policies are exposed.
```

## 1. Update Profiles Table
We need to add columns to store the user's avatar, phone number, and date of birth.

```sql
-- Add new columns if they don't already exist
DO $$ 
BEGIN
    BEGIN
        ALTER TABLE public.profiles ADD COLUMN avatar_url TEXT;
    EXCEPTION WHEN duplicate_column THEN END;
    
    BEGIN
        ALTER TABLE public.profiles ADD COLUMN phone TEXT;
    EXCEPTION WHEN duplicate_column THEN END;

    BEGIN
        ALTER TABLE public.profiles ADD COLUMN date_of_birth DATE;
    EXCEPTION WHEN duplicate_column THEN END;
END $$;
```

## 2. Create Dashboard Metrics Table
A single-row table to store global dashboard metrics displayed to clients.

```sql
-- Create the table
CREATE TABLE IF NOT EXISTS public.dashboard_metrics (
    id SERIAL PRIMARY KEY,
    active_requests INT DEFAULT 0,
    monthly_requests INT DEFAULT 0,
    satisfaction_score INT DEFAULT 100,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.dashboard_metrics ENABLE ROW LEVEL SECURITY;

-- Allow read access to authenticated users
CREATE POLICY "Allow read access for authenticated users to metrics" ON public.dashboard_metrics
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow update access only to admins (using profiles.role check)
CREATE POLICY "Allow update access for admin role" ON public.dashboard_metrics
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- Insert a default row if empty
INSERT INTO public.dashboard_metrics (id, active_requests, monthly_requests, satisfaction_score)
VALUES (1, 3, 12, 98)
ON CONFLICT (id) DO NOTHING;
```

## 3. Create Service Requests Table
Table to store service requests for clients.

```sql
-- Create the table
CREATE TABLE IF NOT EXISTS public.service_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    service_name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Progress', 'Completed')),
    date DATE DEFAULT CURRENT_DATE
);

-- Enable RLS
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

-- Allow clients to read their own requests
CREATE POLICY "Users can view their own service requests" ON public.service_requests
    FOR SELECT USING (auth.uid() = user_id);

-- Allow admins to read all requests
CREATE POLICY "Admins can view all service requests" ON public.service_requests
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- Allow admins to update all requests
CREATE POLICY "Admins can update all service requests" ON public.service_requests
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- Allow admins to insert requests
CREATE POLICY "Admins can insert service requests" ON public.service_requests
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );
```

## 4. Setup Avatar Storage
Create a storage bucket to hold the user avatars.

```sql
-- Insert a new bucket for avatars
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload avatars (to their own folder structure)
CREATE POLICY "Users can upload their own avatars" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'avatars' 
        AND auth.role() = 'authenticated'
        -- Ensure they upload to a folder named after their distinct user ID
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- Allow users to update their own avatars
CREATE POLICY "Users can update their own avatars" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'avatars' 
        AND auth.role() = 'authenticated'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- Allow public read access to avatars
CREATE POLICY "Avatars are publicly accessible" ON storage.objects
    FOR SELECT USING (bucket_id = 'avatars');
```
