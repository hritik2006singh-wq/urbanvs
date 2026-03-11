import {
    Html, Head, Preview, Body, Container, Section, Text, Heading, Hr
} from '@react-email/components'
import * as React from 'react'

interface Props {
    name: string
}

export default function ContactConfirmation({ name }: Props) {
    return (
        <Html>
            <Head />
            <Preview>We received your message!</Preview>
            <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f9fafb', padding: '40px 0' }}>
                <Container style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <Heading style={{ color: '#111827', fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
                        Hi {name},
                    </Heading>
                    <Text style={{ color: '#374151', fontSize: '16px', lineHeight: '24px', marginBottom: '24px' }}>
                        Thank you for reaching out to UrbanVista! We've received your inquiry and our team is already reviewing it.
                    </Text>
                    <Text style={{ color: '#374151', fontSize: '16px', lineHeight: '24px', marginBottom: '24px' }}>
                        A dedicated project manager will get back to you within 24-48 hours with more details.
                    </Text>
                    <Hr style={{ borderTop: '1px solid #e5e7eb', margin: '24px 0' }} />
                    <Text style={{ color: '#9ca3af', fontSize: '12px', textAlign: 'center' }}>
                        UrbanVista — Providing premium digital solutions period
                    </Text>
                </Container>
            </Body>
        </Html>
    )
}
