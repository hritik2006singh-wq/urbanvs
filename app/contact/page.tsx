import { MotionSection } from "@/components/shared/MotionSection";
import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
    return (
        <div className="w-full bg-light min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <MotionSection>
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">Get in Touch</h1>
                        <p className="text-xl text-muted">Ready to scale? Let's discuss your vision.</p>
                    </div>
                </MotionSection>

                <MotionSection delay={0.2}>
                    <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/40 shadow-xl">
                        <ContactForm />
                    </div>
                </MotionSection>
            </div>
        </div>
    );
}
