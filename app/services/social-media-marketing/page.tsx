import React from "react";
import { Metadata } from "next";
import { ServiceTemplate } from "@/components/ServiceTemplate";

export const metadata: Metadata = {
    title: "Instagram Marketing for Local Businesses | Social Media Agency",
    description: "UrbanVista provides premier social media management services and content creation. Specializing in Instagram marketing for local businesses to drive real growth.",
    alternates: {
        canonical: "/services/social-media-marketing",
    },
    openGraph: {
        title: "Instagram Marketing for Local Businesses | UrbanVista",
        description: "UrbanVista provides premier social media management services and content creation. Specializing in Instagram marketing for local businesses to drive real growth.",
        url: "/services/social-media-marketing",
        type: "website",
    },
};

export default function SocialMediaMarketingPage() {
    const pageContent = {
        title: "Social Media Marketing",
        subtitle: "Instagram Marketing for Local Businesses",
        heroDescription: "Transform your online presence with a dedicated content creation agency. We build engaged communities, accelerate brand awareness, and turn passive scrollers into paying customers through elite social media management services.",
        overviewTitle: "Why Local Businesses Need Elite Social Media Management",
        overviewContent: (
            <>
                <p>
                    In today's digital-first economy, an active and aesthetic social media presence is no longer optional for local businesses—it's the primary driver of credibility and customer acquisition. When potential customers hear about your business, the first thing they do is search for you on Instagram or TikTok. If your feed is outdated, low-quality, or inconsistent, you are actively losing revenue.
                </p>
                <p>
                    At UrbanVista, we specialize in high-impact <strong>Instagram marketing for local businesses</strong>. We don't just post for the sake of posting. As a premier <strong>content creation agency</strong>, we engineer complete social media management services that align with your revenue goals.
                </p>
                <p>
                    What sets us apart? We understand that likes and followers mean nothing if they don't translate into foot traffic and sales. We combine premium visual aesthetics with data-driven strategy to ensure your brand stands out in a crowded market, builds deep trust with your local audience, and consistently generates high-quality leads.
                </p>
            </>
        ),
        deliverables: [
            "Custom tailored social media strategy and content calendar",
            "High-end visual content creation (Photography, Reels, TikToks)",
            "Daily community management and audience engagement",
            "Data-driven hashtag and local geo-targeting strategies",
            "Monthly performance analytics and ROI reporting",
            "Profile optimization for maximum conversion"
        ],
        processSteps: [
            {
                title: "Discovery & Strategy",
                description: "We dive deep into your brand identity, target demographic, and local competitors to build a bespoke content strategy tailored to your specific business goals."
            },
            {
                title: "Content Production",
                description: "Our in-house creative team shoots and edits premium, scroll-stopping photos and short-form videos designed specifically for modern social media algorithms."
            },
            {
                title: "Publishing & Management",
                description: "We handle 100% of the scheduling, posting, and daily community engagement so you can focus entirely on running your day-to-day operations."
            },
            {
                title: "Optimization & Scaling",
                description: "Through rigorous monthly analytics reviews, we refine our targeting and double down on the content formats driving the highest conversion rates."
            }
        ],
        benefits: [
            {
                title: "Increased Local Foot Traffic",
                description: "By utilizing advanced local targeting and compelling visual storytelling, we directly drive more qualified local customers through your doors."
            },
            {
                title: "Instantly Establish Authority",
                description: "A premium, cohesive social feed immediately positions your brand as the premium choice in your local market over competitors."
            },
            {
                title: "Hands-Free Growth",
                description: "Reclaim your time completely. We operate entirely as your in-house marketing arm so you never have to worry about 'what to post today'."
            }
        ],
        faqs: [
            {
                question: "Do you specialize in Instagram marketing for local businesses?",
                answer: "Yes, our core expertise lies in scaling local brands using geo-targeted organic strategies, primarily via Instagram and TikTok integrations."
            },
            {
                question: "What is included in your social media management services?",
                answer: "Everything from strategy formulation, professional content creation (shooting and editing), copywriting, daily posting, community engagement, and monthly analytics reporting."
            },
            {
                question: "How is a content creation agency different from a normal marketing firm?",
                answer: "Unlike traditional firms that outsource or rely on stock imagery, we have an elite in-house creative team dedicated to producing authentic, viral-ready video and photo assets of your actual business."
            },
            {
                question: "How long does it take to see results?",
                answer: "While visual improvement is immediate upon our takeover, algorithm momentum and community growth typically show significant compounding results within the first 60 to 90 days."
            }
        ],
        otherServices: [
            { name: "Photography & Videography", path: "/services/photography-videography" },
            { name: "Viral Campaigns", path: "/services/viral-campaigns" },
            { name: "Global Outreach", path: "/services/global-outreach" }
        ]
    };

    return <ServiceTemplate {...pageContent} />;
}
