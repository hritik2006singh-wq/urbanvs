import {
    Html, Head, Preview, Body, Container, Section, Text, Heading, Hr, Button
} from '@react-email/components'
import * as React from 'react'

interface Props {
    name: string
}

export default function WelcomeEmail({ name }: Props) {
    return (
        <Html>
            <Head />
            <Preview>Welcome to UrbanVista!</Preview>
            <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f9fafb', padding: '40px 0' }}>
                <Container style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <Heading style={{ color: '#111827', fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
                        Hi {name},
                    </Heading>
                    <Text style={{ color: '#374151', fontSize: '16px', lineHeight: '24px', marginBottom: '24px' }}>
                        Welcome to the UrbanVista family! We're excited to help you scale your brand from local to global.
                    </Text>
                    <Section style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <Button
                            href="https://urbanvistaservices.com/dashboard"
                            style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none' }}
                        >
                            Go to Your Dashboard
                        </Button>
                    </Section>
                    <Text style={{ color: '#374151', fontSize: '16px', lineHeight: '24px', marginBottom: '16px' }}>
                        In your dashboard, you can:
                    </Text>
                    <ul style={{ color: '#374151', fontSize: '16px', lineHeight: '24px', marginBottom: '24px' }}>
                        <li>Track your active orders in real time</li>
                        <li>Manage your business profile</li>
                        <li>Get direct support from our team</li>
                    </ul>
                    <Hr style={{ borderTop: '1px solid #e5e7eb', margin: '24px 0' }} />
                    <Text style={{ color: '#9ca3af', fontSize: '12px', textAlign: 'center' }}>
                        UrbanVista — urbanvistaservices.com
                    </Text>
                </Container>
            </Body>
        </Html>
    )
}
