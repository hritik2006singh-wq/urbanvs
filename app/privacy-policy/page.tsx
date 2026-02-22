import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy | UrbanVista",
    description: "Read the privacy policy of UrbanVista regarding data collection, usage, and protection.",
};

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-24 px-6 md:pt-40">
            <article className="max-w-4xl mx-auto bg-white rounded-[32px] p-8 md:p-16 shadow-sm border border-slate-200">
                <header className="mb-12 border-b border-slate-100 pb-8 text-center md:text-left">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold tracking-wide uppercase mb-4">
                        Legal Documentation
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-slate-500">
                        Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </header>

                <div className="space-y-12 text-slate-600 leading-relaxed text-lg">

                    {/* Section 1: Introduction */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900">1. Introduction</h2>
                        <p>
                            Welcome to UrbanVista ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us at <a href="mailto:urbancistaservices@gmail.com" className="text-blue-600 hover:underline">urbancistaservices@gmail.com</a>.
                        </p>
                        <p>
                            This Privacy Policy applies to all information collected through our website, as well as any related services, sales, marketing, or events. Please read this privacy notice carefully as it will help you understand what we do with the information that we collect.
                        </p>
                    </section>

                    {/* Section 2: Information We Collect */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900">2. Information We Collect</h2>
                        <p>
                            We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the Website, or otherwise when you contact us.
                        </p>
                        <p>The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-700">
                            <li><strong>Full Name:</strong> To address you properly in our communications.</li>
                            <li><strong>Email Address:</strong> To send you proposals, updates, and replies to your inquiries.</li>
                            <li><strong>Phone Number:</strong> For direct communication regarding ongoing or prospective projects.</li>
                            <li><strong>Business Details:</strong> Including company name, website URLs, and project requirements submitted directly through our contact forms.</li>
                        </ul>
                    </section>

                    {/* Section 3: How We Use Your Information */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900">3. How We Use Your Information</h2>
                        <p>
                            We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                        </p>
                        <p>We use the information we collect or receive to:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-700">
                            <li><strong>Fulfill and manage your requests:</strong> To construct dedicated proposals, schedule consultations, and manage our business relationship with you.</li>
                            <li><strong>Deliver services to the user:</strong> To execute the digital marketing, web development, or media production services you requested.</li>
                            <li><strong>Respond to user inquiries:</strong> To offer support and respond to any questions you may have regarding our services.</li>
                            <li><strong>Send administrative information:</strong> To send you details about our structural changes, policy updates, or changes to our terms and conditions.</li>
                        </ul>
                    </section>

                    {/* Section 4: Data Sharing & Third Parties */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900">4. Data Sharing & Third Parties</h2>
                        <p className="font-semibold text-slate-900 border-l-4 border-blue-600 pl-4 py-2 bg-slate-50">
                            We do not, and will never, sell your personal data to third parties.
                        </p>
                        <p>
                            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. Your data may be processed through the following categories of third-party vendors:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-700">
                            <li><strong>Hosting Providers:</strong> Such as Vercel or AWS, which actively host our website infrastructure and secure databases.</li>
                            <li><strong>Email Services:</strong> Such as Resend, standard SMTP relays, or Google Workspace to handle our automated and direct email communications.</li>
                            <li><strong>Analytics Tools:</strong> Privacy-focused analytics tools to monitor website performance and broad traffic metrics without tracking individual identities.</li>
                        </ul>
                    </section>

                    {/* Section 5: Data Security */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900">5. Data Security</h2>
                        <p>
                            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
                        </p>
                        <p>
                            We cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Transmission of personal information to and from our Website is at your own risk. You should only access the Website within a secure environment.
                        </p>
                    </section>

                    {/* Section 6: Cookies & Tracking */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900">6. Cookies & Tracking</h2>
                        <p>
                            We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
                        </p>
                        <p>
                            In most cases, these tools are simply used to ensure our site operates at maximum efficiency (functional cookies) or to gather broad, anonymized analytics regarding how users navigate our service architecture.
                        </p>
                    </section>

                    {/* Section 7: Your Rights */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900">7. Your Rights</h2>
                        <p>
                            Depending on your geographical location, applicable privacy laws may mean you have certain rights regarding your personal information. These may include the right to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-700">
                            <li>Request access and obtain a copy of your personal information.</li>
                            <li>Request rectification or erasure of your personal data.</li>
                            <li>Restrict the processing of your personal information.</li>
                            <li>Object to the processing of your personal data under certain circumstances.</li>
                        </ul>
                        <p className="mt-4 font-medium text-slate-800">
                            If you would like to exercise any of these rights, or request the complete deletion of your data from our systems, please contact us at the email provided below. We will consider and act upon any request in accordance with applicable data protection laws.
                        </p>
                    </section>

                    {/* Section 8: Changes to This Policy */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900">8. Changes to This Policy</h2>
                        <p>
                            We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible.
                        </p>
                        <p>
                            If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.
                        </p>
                    </section>

                    {/* Section 9: Contact Information */}
                    <section className="space-y-4 bg-slate-50 p-8 rounded-2xl border border-slate-100 mt-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Contact Information</h2>
                        <p className="mb-6">
                            If you have questions or comments about this notice, standard data practices, or wish to exercise your rights regarding deletion of your PII, you may email us at:
                        </p>
                        <a
                            href="mailto:urbancistaservices@gmail.com"
                            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-xl transition-colors"
                        >
                            urbancistaservices@gmail.com
                        </a>
                    </section>

                </div>

                <div className="mt-16 pt-8 border-t border-slate-100 text-center">
                    <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                        &larr; Return to Home
                    </Link>
                </div>
            </article>
        </main>
    );
}
