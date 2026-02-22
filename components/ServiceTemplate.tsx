import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ChevronRight, MessageCircle } from "lucide-react";

export interface ServiceTemplateProps {
    title: string;
    subtitle: string;
    heroDescription: string;
    overviewTitle: string;
    overviewContent: React.ReactNode;
    deliverables: string[];
    processSteps: { title: string; description: string }[];
    benefits: { title: string; description: string }[];
    faqs: { question: string; answer: string }[];
    otherServices: { name: string; path: string }[];
}

export function ServiceTemplate({
    title,
    subtitle,
    heroDescription,
    overviewTitle,
    overviewContent,
    deliverables,
    processSteps,
    benefits,
    faqs,
    otherServices,
}: ServiceTemplateProps) {
    return (
        <article className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-200 overflow-hidden">
            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 px-6 md:pt-40 md:pb-32 bg-white border-b border-slate-200">
                <div className="max-w-[1000px] mx-auto text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold tracking-wide uppercase mb-6">
                        {subtitle}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
                        {title}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-[700px] mx-auto leading-relaxed">
                        {heroDescription}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium text-lg transition-colors w-full sm:w-auto"
                        >
                            Get a Proposal
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-8 py-4 rounded-xl font-medium text-lg transition-colors w-full sm:w-auto"
                        >
                            View All Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* OVERVIEW SECTION */}
            <section className="py-20 px-6 max-w-[1000px] mx-auto">
                <div className="bg-white rounded-[32px] p-8 md:p-16 shadow-sm border border-slate-100">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900">
                        {overviewTitle}
                    </h2>
                    <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed">
                        {overviewContent}
                    </div>
                </div>
            </section>

            {/* WHAT WE DELIVER & BENEFITS */}
            <section className="py-20 px-6 bg-slate-100 border-y border-slate-200">
                <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Deliverables */}
                    <div>
                        <h2 className="text-3xl font-bold mb-8 text-slate-900">What We Deliver</h2>
                        <ul className="space-y-4">
                            {deliverables.map((item, index) => (
                                <li key={index} className="flex items-start gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-slate-700 font-medium text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Benefits */}
                    <div>
                        <h2 className="text-3xl font-bold mb-8 text-slate-900">Results & Benefits</h2>
                        <div className="space-y-6">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h3>
                                    <p className="text-slate-600">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* OUR PROCESS SECTION */}
            <section className="py-24 px-6 max-w-[1000px] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Process</h2>
                    <p className="text-lg text-slate-600">A clear, proven path to long-term digital growth.</p>
                </div>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                    {processSteps.map((step, index) => (
                        <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-blue-100 text-blue-600 font-bold shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                {index + 1}
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-20 px-6 bg-white border-y border-slate-200">
                <div className="max-w-[800px] mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="p-6 md:p-8 rounded-3xl bg-slate-50 border border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{faq.question}</h3>
                                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* INTERNAL LINKING / OTHER SERVICES */}
            <section className="py-20 px-6 max-w-[1000px] mx-auto">
                <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-4 mb-8">
                    Explore Other Digital Growth Services
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {otherServices.map((service, index) => (
                        <Link
                            key={index}
                            href={service.path}
                            className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group"
                        >
                            <span className="font-medium text-slate-800">{service.name}</span>
                            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                        </Link>
                    ))}
                    <Link
                        href="/services"
                        className="flex items-center justify-between p-4 rounded-xl bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-all text-blue-700 font-semibold"
                    >
                        <span>View All Services</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="py-24 px-6 text-center bg-slate-900">
                <div className="max-w-[600px] mx-auto">
                    <MessageCircle className="w-12 h-12 text-blue-400 mx-auto mb-6" />
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let’s Grow Your Business</h2>
                    <p className="text-lg text-slate-300 mb-10">
                        Ready to scale your local brand with data-driven strategies and premium visuals? Drop us a line and let's structure a custom growth plan.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors w-full sm:w-auto"
                        >
                            Book a Free Consultation
                        </Link>
                    </div>
                </div>
            </section>
        </article>
    );
}
