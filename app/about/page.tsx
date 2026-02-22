"use client";

import { MotionSection } from "@/components/shared/MotionSection";

export default function AboutPage() {
    return (
        <div className="w-full bg-light min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-5xl">
                <MotionSection>
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">Our Story</h1>
                        <p className="text-xl text-muted max-w-2xl mx-auto">
                            From a local "teenager club" to a global creative force.
                        </p>
                    </div>
                </MotionSection>

                <div className="space-y-24">
                    {/* Chapter 1 */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <MotionSection delay={0.2}>
                            <h2 className="text-3xl font-bold mb-6 text-primary">The Beginning</h2>
                            <p className="text-lg text-muted leading-relaxed mb-6">
                                It started with a group of teenagers and a dream. UrbanVista wasn't born in a corporate boardroom; it was born in a garage, fueled by caffeine and a relentless passion for creativity. We were just kids who loved cameras and code, experimenting with every new tool we could get our hands on.
                            </p>
                            <p className="text-lg text-muted leading-relaxed">
                                People called us a "club," but we knew we were building something bigger. We spent late nights perfecting edits, learning algorithms, and understanding what makes people click.
                            </p>
                        </MotionSection>
                        <MotionSection delay={0.3}>
                            <div className="aspect-video bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400 font-medium">
                                {/* Placeholder for early days image */}
                                Early Days Photo
                            </div>
                        </MotionSection>
                    </div>

                    {/* Chapter 2 */}
                    <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                        <MotionSection delay={0.4} className="md:order-2">
                            <h2 className="text-3xl font-bold mb-6 text-primary">Growing Pains & Gains</h2>
                            <p className="text-lg text-muted leading-relaxed mb-6">
                                As we grew, so did our ambition. We started helping local shops—barbers, cafes, gyms—transform their online presence. We saw firsthand how powerful high-quality visuals and smart strategy could be for small businesses.
                            </p>
                            <p className="text-lg text-muted leading-relaxed">
                                Hard work became our currency. We didn't just deliver projects; we built relationships. We learned that every business has a unique story, and our job was to tell it in the most compelling way possible.
                            </p>
                        </MotionSection>
                        <MotionSection delay={0.5} className="md:order-1">
                            <div className="aspect-video bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400 font-medium">
                                {/* Placeholder for growth image */}
                                Team Working
                            </div>
                        </MotionSection>
                    </div>

                    {/* Chapter 3 */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <MotionSection delay={0.6}>
                            <h2 className="text-3xl font-bold mb-6 text-primary">Local to Global</h2>
                            <p className="text-lg text-muted leading-relaxed mb-6">
                                Today, UrbanVista is more than just a local agency. We are a team of strategists, designers, and creators working with brands around the world. But we haven't forgotten our roots.
                            </p>
                            <p className="text-lg text-muted leading-relaxed">
                                Our mission remains simple: To take businesses, whether they are a corner shop or a tech startup, and give them the tools to reach a global audience. We visit, we click, we show—and the world watches.
                            </p>
                        </MotionSection>
                        <MotionSection delay={0.7}>
                            <div className="aspect-video bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400 font-medium">
                                {/* Placeholder for current state image */}
                                Global Reach
                            </div>
                        </MotionSection>
                    </div>
                </div>
            </div>
        </div>
    );
}
