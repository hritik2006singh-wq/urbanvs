import { Hero } from "@/components/hero/Hero";
import { MotionSection } from "@/components/shared/MotionSection";
import { ValueProp } from "@/components/sections/ValueProp";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const data = {
    title: "Transform Your Business",
    subtitle: "Futuristic digital solutions for your business.",
    portfolio: [
      { id: "1", title: "Project Alpha", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
      { id: "2", title: "Global Campaign", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
      { id: "3", title: "Brand Identity", imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" },
      { id: "4", title: "Social Impact", imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800" },
    ]
  };

  return (
    <div className="flex flex-col w-full bg-light">
      {/* SECTION 1: HERO */}
      <Hero
        title={data.title}
        subtitle={data.subtitle}
      />

      {/* SECTION 2: ADVERTISING / VALUE PROP */}
      <ValueProp />

      {/* SECTION 3: SERVICES PREVIEW */}
      <section className="w-full py-24 md:py-32">
        <div className="container mx-auto px-6">
          <MotionSection>
            <div className="mb-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Expertise</h2>
              <p className="text-muted text-lg">Strategies designed to dominate your market.</p>
            </div>
          </MotionSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <MotionSection delay={0.2}>
              <Link href="/services/social-media-marketing" className="group block h-full">
                <div className="rounded-2xl p-8 bg-white/40 backdrop-blur-xl border border-white/30 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col">
                  <div className="mb-4 text-blue-500 font-semibold uppercase tracking-wider text-sm flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      <span className="text-xl">C</span>
                    </div>
                    Create
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">
                    Social Media Marketing
                  </h3>
                  <p className="text-muted leading-relaxed flex-grow">
                    Instagram management, campaign strategy, content creation and brand growth for local businesses.
                  </p>
                </div>
              </Link>
            </MotionSection>

            <MotionSection delay={0.4}>
              <Link href="/services/photography-videography" className="group block h-full">
                <div className="rounded-2xl p-8 bg-white/40 backdrop-blur-xl border border-white/30 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col">
                  <div className="mb-4 text-orange-500 font-semibold uppercase tracking-wider text-sm flex items-center gap-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                      <span className="text-xl">P</span>
                    </div>
                    Produce
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">
                    Photography & Videography
                  </h3>
                  <p className="text-muted leading-relaxed flex-grow">
                    Premium business photography services, commercial video production, and branding visuals for small business.
                  </p>
                </div>
              </Link>
            </MotionSection>

            <MotionSection delay={0.6}>
              <Link href="/services/website-development" className="group block h-full">
                <div className="rounded-2xl p-8 bg-white/40 backdrop-blur-xl border border-white/30 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col">
                  <div className="mb-4 text-indigo-500 font-semibold uppercase tracking-wider text-sm flex items-center gap-2">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                      <span className="text-xl">W</span>
                    </div>
                    Build
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">
                    Website Development
                  </h3>
                  <p className="text-muted leading-relaxed flex-grow">
                    Custom high-performance websites built for branding, growth, and conversions.
                  </p>
                </div>
              </Link>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* SECTION 4: PORTFOLIO PREVIEW */}
      <section className="w-full py-24 md:py-32 bg-slate-50/50">
        <div className="container mx-auto px-6">
          <MotionSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-primary tracking-tight">
              <span className="text-accent">Masterpiece</span> Gallery
            </h2>
          </MotionSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.portfolio.map((item, i) => (
              <MotionSection key={item.id} delay={i * 0.1}>
                <Link href={`/portfolio/${item.id}`} className="block w-full h-full">
                  <div className="rounded-2xl bg-white/35 backdrop-blur-xl border border-white/25 shadow-[0_15px_40px_rgba(0,0,0,0.07)] p-6 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] aspect-square flex flex-col items-center justify-center overflow-hidden relative group">
                    <img src={item.imageUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                </Link>
              </MotionSection>
            ))}
          </div>

          <MotionSection delay={0.5}>
            <div className="text-center mt-12">
              <Link href="/work">
                <Button size="lg" variant="secondary" className="px-6 py-3 rounded-xl bg-white/50 backdrop-blur-md border border-white/40 shadow-md hover:scale-105 transition-all duration-300 min-w-[200px]">View All Work</Button>
              </Link>
            </div>
          </MotionSection>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="w-full py-24">
        <div className="container mx-auto px-6">
          <MotionSection>
            <div className="rounded-2xl bg-white/40 backdrop-blur-xl border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-12 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-8">Ready to Scale Your Brand?</h2>
              <p className="text-muted text-xl mb-10 max-w-2xl mx-auto">
                Join hundreds of businesses growing with UrbanVista.
              </p>
              <Link href="/contact">
                <Button size="lg" variant="primary" className="shadow-lg shadow-blue-500/20 group">
                  Get Started Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </MotionSection>
        </div>
      </section>
    </div>
  );
}