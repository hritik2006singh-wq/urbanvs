import React from "react";
import { Metadata } from "next";
import { ServiceTemplate } from "@/components/ServiceTemplate";

export const metadata: Metadata = {
    title: "Commercial Video Production & Business Photography | UrbanVista",
    description: "Elite business photography services and commercial video production. We craft premium branding visuals for small business looking to dominate their market.",
    alternates: {
        canonical: "/services/photography-videography",
    },
    openGraph: {
        title: "Commercial Video Production | UrbanVista",
        description: "Elite business photography services and commercial video production. We craft premium branding visuals for small business looking to dominate their market.",
        url: "/services/photography-videography",
        type: "website",
    },
};

export default function PhotographyVideographyPage() {
    const pageContent = {
        title: "Photography & Videography",
        subtitle: "Premium Visual Storytelling",
        heroDescription: "Elevate your brand perception with high-end commercial video production and professional business photography services. We create magnetic branding visuals for small businesses that convert viewers into loyal customers.",
        overviewTitle: "The Power of Premium Branding Visuals for Small Business",
        overviewContent: (
            <>
                <p>
                    You have seconds to make a first impression. In a saturated digital landscape characterized by endless scrolling, mediocre imagery immediately diminishes the perceived value of your product or service. Consumers equate the quality of your content directly with the quality of your business.
                </p>
                <p>
                    At UrbanVista, we provide industry-leading <strong>business photography services</strong> designed to make your local brand look like a Fortune 500 company. We go beyond simple documentation; we utilize advanced lighting, strategic set design, and cinematic composition to craft <strong>branding visuals for small business</strong> that tell a compelling narrative.
                </p>
                <p>
                    Whether you need a full-scale <strong>commercial video production</strong> to highlight a new product launch, a cinematic brand documentary for your homepage, or a massive library of high-resolution lifestyle assets for an upcoming ad campaign, our production team handles everything from creative ideation to final color grading. We don't just make things look pretty—we architect visuals engineered to drive specific psychological responses and conversions.
                </p>
            </>
        ),
        deliverables: [
            "4K Cinematic Commercial Video Production",
            "High-Resolution Product & Lifestyle Photography",
            "Dynamic Short-Form Video Assets for Reels/TikTok",
            "Corporate Headshots and Team Culture Photography",
            "Professional Drone and Aerial Videography",
            "Advanced Color Grading and Audio Mixing"
        ],
        processSteps: [
            {
                title: "Creative Briefing & Pre-Production",
                description: "We collaborate closely to define the visual direction, storyboard the narrative, scout locations, cast talent, and build a comprehensive shot list aligned with your goals."
            },
            {
                title: "Production & Principle Photography",
                description: "Our crew arrives on set with cinema-grade equipment. We manage the lighting, audio, direction, and flow to ensure we capture maximum value in minimal time."
            },
            {
                title: "Post-Production",
                description: "This is where the magic happens. We handle all editing, cutting, professional color grading, sound design, and motion graphics to deliver a polished final asset."
            },
            {
                title: "Asset Delivery",
                description: "We provide your finalized media in various optimized formats specifically tailored for web, broadcast, and social media specifications."
            }
        ],
        benefits: [
            {
                title: "Immediate Perceived Value Increase",
                description: "Premium visuals subconsciously communicate quality, allowing you to easily justify higher price points and premium positioning in your market."
            },
            {
                title: "Higher Conversion Rates",
                description: "Websites and ad campaigns utilizing custom, professional media convert significantly higher than those relying on stock footage or smartphone pictures."
            },
            {
                title: "Multi-Channel Versatility",
                description: "One strategic production day yields an expansive library of assets you can deploy across your website, social media, print, and email campaigns for months."
            }
        ],
        faqs: [
            {
                question: "Do you offer localized business photography services?",
                answer: "Yes, we frequently partner with local businesses including restaurants, real estate, fitness centers, and medical clinics to capture their day-to-day operations and team."
            },
            {
                question: "What is the typical turnaround time for a commercial video production?",
                answer: "Depending on the scope of the project, a standard brand video takes approximately 2 to 3 weeks from the day of the shoot to the final edited delivery."
            },
            {
                question: "Do you provide branding visuals for small business startups?",
                answer: "Absolutely. We offer tailored 'launch packages' specifically designed to give new businesses the premium aesthetic assets they need to enter the market strongly."
            },
            {
                question: "Do we own the rights to the photos and videos?",
                answer: "Yes, upon final payment, you retain complete commercial usage rights in perpetuity across all global platforms."
            }
        ],
        otherServices: [
            { name: "Social Media Marketing", path: "/services/social-media-marketing" },
            { name: "Global Outreach", path: "/services/global-outreach" },
            { name: "Viral Campaigns", path: "/services/viral-campaigns" }
        ]
    };

    return <ServiceTemplate {...pageContent} />;
}
