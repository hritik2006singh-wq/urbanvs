import {
    Html, Head, Preview, Body, Container, Section, Text, Heading, Hr
} from '@react-email/components'
import * as React from 'react'

interface Props {
    name: string
    email: string
    phone: string
    businessType: string
    businessDetails: string
}

export default function AdminNotification({ name, email, phone, businessType, businessDetails }: Props) {
    return (
        <Html>
            <Head />
            <Preview>🔔 New Query from {name}</Preview>
            <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f9fafb', padding: '40px 0' }}>
                <Container style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <Heading style={{ color: '#ef4444', fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>
                        New Inquiry Received
                    </Heading>
                    <Section style={{ marginBottom: '24px' }}>
                        <Text style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>Name</Text>
                        <Text style={{ fontSize: '16px', color: '#111827', fontWeight: 'bold', margin: '4px 0 16px' }}>{name}</Text>

                        <Text style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>Email</Text>
                        <Text style={{ fontSize: '16px', color: '#111827', fontWeight: 'bold', margin: '4px 0 16px' }}>{email}</Text>

                        <Text style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>Phone</Text>
                        <Text style={{ fontSize: '16px', color: '#111827', fontWeight: 'bold', margin: '4px 0 16px' }}>{phone || 'Not provided'}</Text>

                        <Text style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>Business Type</Text>
                        <Text style={{ fontSize: '16px', color: '#111827', fontWeight: 'bold', margin: '4px 0 16px' }}>{businessType}</Text>

                        <Text style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>Details</Text>
                        <Text style={{ fontSize: '16px', color: '#111827', backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '6px', margin: '4px 0' }}>
                            {businessDetails}
                        </Text>
                    </Section>
                    <Hr style={{ borderTop: '1px solid #e5e7eb', margin: '24px 0' }} />
                    <Text style={{ color: '#9ca3af', fontSize: '12px', textAlign: 'center' }}>
                        System Notification — UrbanVista Dashboard
                    </Text>
                </Container>
            </Body>
        </Html>
    )
}
