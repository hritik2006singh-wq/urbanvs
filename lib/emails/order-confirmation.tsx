import {
    Html, Head, Preview, Body, Container, Section, Text, Heading, Hr, Button
} from '@react-email/components'
import * as React from 'react'

interface Props {
    userName: string
    serviceName: string
}

export default function OrderConfirmationEmail({ userName, serviceName }: Props) {
    return (
        <Html>
            <Head />
            <Preview>Your order has been placed!</Preview>
            <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f9fafb', padding: '40px 0' }}>
                <Container style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <Heading style={{ color: '#111827', fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
                        Hi {userName},
                    </Heading>
                    <Text style={{ color: '#374151', fontSize: '16px', lineHeight: '24px', marginBottom: '24px' }}>
                        Thank you for choosing UrbanVista. We've successfully received your order for <strong>{serviceName}</strong>.
                    </Text>
                    <Section style={{ backgroundColor: '#f3f4f6', padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                        <Text style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>Service Ordered</Text>
                        <Text style={{ fontSize: '18px', color: '#111827', fontWeight: 'bold', margin: '4px 0' }}>{serviceName}</Text>
                    </Section>
                    <Text style={{ color: '#374151', fontSize: '16px', lineHeight: '24px', marginBottom: '32px' }}>
                        Our strategy team will review your requirements and reach out within 24 hours to schedule your onboarding call.
                    </Text>
                    <Section style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <Button
                            href="https://urbanvistaservices.com/dashboard/orders"
                            style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none' }}
                        >
                            Track Your Order
                        </Button>
                    </Section>
                    <Hr style={{ borderTop: '1px solid #e5e7eb', margin: '24px 0' }} />
                    <Text style={{ color: '#9ca3af', fontSize: '12px', textAlign: 'center' }}>
                        UrbanVista — Scaling brands globally period
                    </Text>
                </Container>
            </Body>
        </Html>
    )
}
