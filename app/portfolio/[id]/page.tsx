"use client";

import { useParams } from 'next/navigation';
import { MotionSection } from "@/components/shared/MotionSection";
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export default function PortfolioDetailsPage() {
    const params = useParams();
    const id = params?.id;

    // Simulate fetching data based on ID
    // In a real app, you'd fetch this from a CMS or API
    const project = {
        title: `Project Details ${id}`,
        client: "Client Name",
        service: "Viral Marketing & Branding",
        description: "This project involved a complete overhaul of the client's digital presence. We focused on creating high-impact visuals that resonated with their target audience, resulting in a 200% increase in engagement.",
        stats: [
            { label: "Views", value: "1.2M+" },
            { label: "Engagement", value: "15%" },
            { label: "Sales Conversion", value: "3.5x" }
        ]
    };

    return (
        <div className="w-full bg-light min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-6">
                <MotionSection>
                    <div className="mb-8">
                        <Link href="/gallery">
                            <Button variant="ghost" size="sm" className="pl-0 hover:bg-transparent hover:text-blue-600">
                                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Gallery
                            </Button>
                        </Link>
                    </div>
                </MotionSection>

                <div className="grid lg:grid-cols-2 gap-12">
                    <MotionSection delay={0.1}>
                        {/* Visual Placeholder */}
                        <div className="aspect-[4/5] bg-slate-200 rounded-3xl flex items-center justify-center text-slate-400 font-medium text-lg">
                            Project Visual {id}
                        </div>
                    </MotionSection>

                    <div className="flex flex-col justify-center">
                        <MotionSection delay={0.2}>
                            <span className="text-blue-600 font-medium mb-2 block">{project.service}</span>
                            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">{project.title}</h1>
                            <p className="text-xl text-muted leading-relaxed mb-8">
                                {project.description}
                            </p>
                        </MotionSection>

                        <MotionSection delay={0.3}>
                            <div className="grid grid-cols-3 gap-6 mb-12">
                                {project.stats.map((stat, i) => (
                                    <div key={i} className="bg-white/50 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-sm text-center">
                                        <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                                        <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </MotionSection>

                        <MotionSection delay={0.4}>
                            <div className="p-8 bg-blue-600 rounded-3xl text-white shadow-xl shadow-blue-600/20">
                                <h3 className="text-2xl font-bold mb-2">Want results like this?</h3>
                                <p className="mb-6 text-blue-100">Let's discuss how we can scale your brand.</p>
                                <Link href="/contact">
                                    <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                                        Start Your Project
                                    </Button>
                                </Link>
                            </div>
                        </MotionSection>
                    </div>
                </div>
            </div>
        </div>
    );
}
