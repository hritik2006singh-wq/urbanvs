"use client";

import { MotionSection } from "@/components/shared/MotionSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BlogPage() {
    const posts = [
        {
            id: 1,
            title: "How to Build a Viral Campaign in 2024",
            excerpt: "Discover the secrets behind content that spreads like wildfire. We break down the algorithms, the psychology, and the creative strategies.",
            date: "October 10, 2024",
            category: "Marketing",
            slug: "build-viral-campaign-2024"
        },
        {
            id: 2,
            title: "The Power of High-Fidelity Visuals for Local Business",
            excerpt: "Why professional photography and videography are non-negotiable for modern brick-and-mortar stores.",
            date: "September 28, 2024",
            category: "Branding",
            slug: "power-high-fidelity-visuals"
        },
        {
            id: 3,
            title: "From Local Shop to Global Brand: A Roadmap",
            excerpt: "Scaling isn't just about money; it's about mindset. Learn the steps to take your local business to the international stage.",
            date: "September 15, 2024",
            category: "Strategy",
            slug: "local-to-global-roadmap"
        },
    ];

    return (
        <div className="w-full bg-light min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <MotionSection>
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">Insights</h1>
                        <p className="text-xl text-muted max-w-2xl mx-auto">
                            Strategies, stories, and tips for dominating your market.
                        </p>
                    </div>
                </MotionSection>

                <div className="space-y-8">
                    {posts.map((post, index) => (
                        <MotionSection key={post.id} delay={index * 0.1}>
                            <article className="bg-white/50 backdrop-blur-xl rounded-2xl p-8 border border-white/40 shadow-sm transition-all hover:shadow-lg hover:bg-white/70 group cursor-pointer">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit">
                                        {post.category}
                                    </span>
                                    <span className="text-sm text-slate-400">{post.date}</span>
                                </div>
                                <h2 className="text-2xl font-bold mb-3 text-primary group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-muted leading-relaxed mb-6">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center text-blue-600 font-medium group/link">
                                    Read Article <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" />
                                </div>
                            </article>
                        </MotionSection>
                    ))}
                </div>
            </div>
        </div>
    );
}
