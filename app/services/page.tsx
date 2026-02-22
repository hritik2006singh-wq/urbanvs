import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, Camera, Globe2, Zap } from "lucide-react";

export const metadata: Metadata = {
    title: "Digital Growth Services for Local Businesses | UrbanVista",
    description: "UrbanVista provides premium local business marketing services, branding, and digital growth strategies for small businesses looking to scale.",
    alternates: {
        canonical: "/services",
    },
    openGraph: {
        title: "Digital Growth Services for Local Businesses | UrbanVista",
        description: "UrbanVista provides premium local business marketing services, branding, and digital growth strategies for small businesses looking to scale.",
        url: "/services",
        type: "website",
    },
};

const services = [
    {
        title: "Social Media Marketing",
        description: "Data-driven Instagram marketing for local businesses and comprehensive social media management services.",
        icon: BarChart3,
        href: "/services/social-media-marketing",
        color: "text-blue-600",
        bg: "bg-blue-50",
    },
    {
        title: "Photography & Videography",
        description: "Premium business photography services, commercial video production, and branding visuals for small business.",
        icon: Camera,
        href: "/services/photography-videography",
        color: "text-purple-600",
        bg: "bg-purple-50",
    },
    {
        title: "Global Outreach",
        description: "Transform your local brand into a worldwide phenomenon with our international brand expansion strategies.",
        icon: Globe2,
        href: "/services/global-outreach",
        color: "text-emerald-600",
        bg: "bg-emerald-50",
    },
    {
        title: "Viral Campaigns",
        description: "Custom viral marketing campaigns and high engagement content strategy to rapidly grow brand awareness.",
        icon: Zap,
        href: "/services/viral-campaigns",
        color: "text-amber-600",
        bg: "bg-amber-50",
    },
];

export default function ServicesOverviewPage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-24 px-6 md:pt-40 selection:bg-blue-200">
            <div className="max-w-[1200px] mx-auto">

                {/* Header Section */}
                <header className="text-center max-w-[800px] mx-auto mb-20 md:mb-32">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-bold tracking-wide uppercase mb-6">
                        Our Expertise
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
                        Digital Growth Services for Local Businesses
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6">
                        As a dedicated branding and growth agency, we specialize in delivering premium digital marketing for small businesses. We bridge the gap between aesthetic branding and measurable financial return.
                    </p>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Whether you need hands-on local business marketing services or global scaling strategies, our tailored approach ensures your brand connects with the right audience, builds trust, and converts attention into revenue. Explore our core services below to see how we build market leaders.
                    </p>
                </header>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    {services.map((service, index) => (
                        <Link
                            key={index}
                            href={service.href}
                            className="group relative bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 hover:border-blue-300 transition-all duration-300 flex flex-col h-full overflow-hidden flex-1 cursor-pointer"
                        >
                            <div className="relative z-10 flex flex-col h-full">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${service.bg} ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <service.icon className="w-8 h-8" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 transition-colors group-hover:text-blue-600">
                                    {service.title}
                                </h2>
                                <p className="text-lg text-slate-600 leading-relaxed mb-10 flex-grow">
                                    {service.description}
                                </p>
                                <div className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all mt-auto pt-4">
                                    Explore Service
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </main>
    );
}
