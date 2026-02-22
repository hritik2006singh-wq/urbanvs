import { MotionSection } from "@/components/shared/MotionSection";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const staticServices = [
    {
        id: "1",
        name: "Social Media Marketing",
        description: "Engaging content that drives organic reach and conversions across all platforms.",
        icon: "TrendingUp"
    },
    {
        id: "2",
        name: "Photography & Videography",
        description: "High-end visual production tailored to fit your brand identity.",
        icon: "Camera"
    },
    {
        id: "3",
        name: "Global Outreach",
        description: "Scaling local businesses to reach international audiences with precision targeting.",
        icon: "Globe"
    },
    {
        id: "4",
        name: "Viral Campaigns",
        description: "Strategies designed specifically to maximize shares and engagement.",
        icon: "Share2"
    }
];

export default function ServicesPage() {
    const services = staticServices;

    return (
        <div className="w-full bg-light min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-6">
                <MotionSection>
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">Our Expertise</h1>
                        <p className="text-xl text-muted max-w-2xl mx-auto">
                            We specialize in taking your business from local to global through high-impact visuals and strategies.
                        </p>
                    </div>
                </MotionSection>

                <div className="grid md:grid-cols-2 gap-12">
                    {services.length > 0 ? (
                        services.map((service, index) => (
                            <MotionSection key={service.id} delay={index * 0.1}>
                                <div className="bg-white/50 backdrop-blur-xl rounded-2xl p-8 border border-white/40 shadow-lg hover:shadow-xl transition-all h-full">
                                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-3xl ${index % 4 === 0 ? 'bg-blue-100 text-blue-600' :
                                        index % 4 === 1 ? 'bg-purple-100 text-purple-600' :
                                            index % 4 === 2 ? 'bg-orange-100 text-orange-600' :
                                                'bg-green-100 text-green-600'
                                        }`}>
                                        {/* Simple icon mapping or fallback */}
                                        {service.icon === 'Camera' ? '📸' :
                                            service.icon === 'Share2' ? '📱' :
                                                service.icon === 'TrendingUp' ? '🚀' :
                                                    service.icon === 'Globe' ? '🌍' : '✨'}
                                    </div>
                                    <h2 className="text-2xl font-bold mb-4 text-primary">{service.name}</h2>
                                    <p className="text-muted leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            </MotionSection>
                        ))
                    ) : (
                        <div className="col-span-2 text-center text-slate-500">No services found.</div>
                    )}
                </div>

                <MotionSection delay={0.6}>
                    <div className="mt-20 text-center">
                        <h3 className="text-2xl font-bold mb-6">Ready to elevate your brand?</h3>
                        <Link href="/contact">
                            <Button size="lg" className="px-8 py-6 text-lg shadow-xl shadow-blue-500/20">
                                Start Your Journey
                            </Button>
                        </Link>
                    </div>
                </MotionSection>
            </div>
        </div>
    );
}
