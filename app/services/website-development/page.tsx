import React from "react";
import { Metadata } from "next";
import { ServiceTemplate } from "@/components/ServiceTemplate";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Website Development Services | UrbanVista",
    description: "Custom business websites designed for performance, SEO, and conversions.",
    alternates: {
        canonical: "/services/website-development",
    },
    openGraph: {
        title: "Website Development Services | UrbanVista",
        description: "Custom business websites designed for performance, SEO, and conversions.",
        url: "/services/website-development",
        type: "website",
    },
};

export default function WebsiteDevelopmentPage() {
    const pageContent = {
        title: "Website Development",
        subtitle: "High-Performance Business Websites",
        heroDescription: "Your website is your 24/7 digital storefront. We build custom, blazing-fast, and highly secure web platforms engineered specifically for modern business growth and maximum conversion rates.",
        overviewTitle: "Website Development for Modern Businesses",
        overviewContent: (
            <>
                <p>
                    In an era where consumer attention spans are shorter than ever, a slow, outdated, or confusing website is the fastest way to lose a potential client to your competitor. A website should not just be a static digital brochure—it must be an active revenue-generating asset that builds trust, clearly communicates your value proposition, and seamlessly captures leads.
                </p>
                <p>
                    At UrbanVista, our <strong>Website Development</strong> team specializes in architecting modern digital experiences that do exactly that. We don't rely on bloated, generic visual builders. Instead, we utilize cutting-edge modern development frameworks like Next.js and React to deploy platforms that are incredibly fast, inherently secure, and mathematically optimized for search engines (SEO).
                </p>
                <p>
                    Beyond just writing code, we focus heavily on the psychology of User Experience (UX) and User Interface (UI) design. Every color choice, button placement, and typography selection is strategically executed to guide your visitors effortlessly toward making a purchase or booking a consultation. By bridging the gap between premium aesthetic branding and uncompromising technical performance, we build websites that don't just look incredible—they actively grow your business.
                </p>

                {/* ADDED EXTERNAL PORTFOLIO LINK HERE */}
                <div className="mt-12 pt-8 border-t border-slate-200">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">View Our Developer's Portfolio</h3>
                    <p className="text-slate-600 mb-6">
                        See live examples of our high-speed, scalable web frameworks and interactive front-end applications.
                    </p>
                    <a
                        href="https://hritikdev.site"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    >
                        View Developer Portfolio
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </>
        ),
        deliverables: [
            "Custom UI/UX Design & Wireframing",
            "Next.js / React Frontend Development",
            "Headless CMS Integration for Easy Content Management",
            "Advanced Technical SEO Optimization & Schema Markup",
            "Mobile-First Responsive Layout Architecture",
            "Secure Hosting, SSL, and Performance Tuning"
        ],
        processSteps: [
            {
                title: "Discovery & Architecture",
                description: "We begin by mapping out your business goals, target audience, and required functionalities to create a comprehensive sitemap and technical architecture."
            },
            {
                title: "UI/UX Design Phase",
                description: "Our design team crafts high-fidelity mockups of your new website, allowing you to visualize the user journey and styling before a single line of code is written."
            },
            {
                title: "Development & Integration",
                description: "We build the platform using modern, lightning-fast frameworks, ensuring flawless responsive behavior across all device types and screen sizes."
            },
            {
                title: "Testing & Deployment",
                description: "After rigorous QA testing for cross-browser compatibility, speed, and security, we launch the site and integrate all necessary analytics and tracking pixels."
            }
        ],
        benefits: [
            {
                title: "Lightning Fast Load Times",
                description: "Modern frameworks ensure your site loads near-instantly, drastically reducing bounce rates and simultaneously improving your Google search rankings."
            },
            {
                title: "Higher Conversion Rates",
                description: "By implementing strategic UX/UI principles, we minimize friction in the buying journey, turning a higher percentage of passive traffic into actual leads."
            },
            {
                title: "Future-Proof Scalability",
                description: "We write clean, modular code. As your business operations expand, your website can easily scale to integrate new features without requiring a total rebuild."
            }
        ],
        faqs: [
            {
                question: "How long does a custom website development project take?",
                answer: "A standard informational business website typically takes 4 to 6 weeks from the initial discovery call to final deployment. Complex e-commerce or custom web applications may take 8 to 12 weeks."
            },
            {
                question: "Will I be able to update the website content myself?",
                answer: "Yes! We integrate user-friendly Headless Content Management Systems (CMS) that allow you or your team to easily edit text, swap images, and publish blog posts without needing to know any code."
            },
            {
                question: "Is SEO included in the website build?",
                answer: "Absolutely. On-page and technical SEO are built into the foundation of our code. We ensure perfect semantic HTML, rapid load speeds, optimized metadata, and clean URL structures right out of the box."
            },
            {
                question: "Do you also provide website hosting and maintenance?",
                answer: "Yes, we offer premium dedicated hosting, daily global backups, advanced security monitoring, and routine platform updates through our ongoing maintenance packages."
            }
        ],
        otherServices: [
            { name: "Social Media Marketing", path: "/services/social-media-marketing" },
            { name: "Global Outreach", path: "/services/global-outreach" },
            { name: "Photography & Videography", path: "/services/photography-videography" }
        ]
    };

    return <ServiceTemplate {...pageContent} />;
}
