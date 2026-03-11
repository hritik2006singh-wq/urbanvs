import {
    Html, Head, Preview, Body, Container, Section, Text, Heading, Hr, Link
} from '@react-email/components'
import * as React from 'react'

interface Props {
    name: string
    otp: string
}

export default function OTPVerificationEmail({ name, otp }: Props) {
    return (
        <Html>
            <Head />
            <Preview>Your UrbanVista verification code</Preview>
            <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f9fafb', padding: '40px 0' }}>
                <Container style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <Heading style={{ color: '#111827', fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
                        Hi {name},
                    </Heading>
                    <Text style={{ color: '#374151', fontSize: '16px', lineHeight: '24px', marginBottom: '24px' }}>
                        To complete your sign-up, please use the following verification code:
                    </Text>
                    <Section style={{ backgroundColor: '#f3f4f6', padding: '24px', borderRadius: '8px', textAlign: 'center', marginBottom: '24px' }}>
                        <Text style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb', letterSpacing: '4px', margin: '0' }}>
                            {otp}
                        </Text>
                    </Section>
                    <Text style={{ color: '#6b7280', fontSize: '14px', marginBottom: '24px' }}>
                        This code will expire in 10 minutes. If you did not request this code, please ignore this email.
                    </Text>
                    <Hr style={{ borderTop: '1px solid #e5e7eb', margin: '24px 0' }} />
                    <Text style={{ color: '#9ca3af', fontSize: '12px', textAlign: 'center' }}>
                        UrbanVista — urbanvistaservices.com
                    </Text>
                </Container>
            </Body>
        </Html>
    )
}
