"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Loader2, CheckCircle } from 'lucide-react';

export const ContactForm = () => {
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        businessType: 'Local Shop', // Corrected from the provided snippet
        businessDetails: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    full_name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    businessType: formData.businessType,
                    businessDetails: formData.businessDetails
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to submit form.");
            }

            setStatus("success");
            setFormData({
                name: "",
                email: "",
                phone: "",
                businessDetails: "",
                businessType: "Local Shop",
            });

            setTimeout(() => setStatus("idle"), 2500);

        } catch (error: any) {
            console.error("Contact Form Submission Error:", error?.message, error);
            setErrorMessage("Something went wrong. Please try again or email us directly.");
            setStatus("idle");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white/60 transition-all"
                        placeholder="Kunal"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white/60 transition-all"
                        placeholder="kunal@example.com"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white/60 transition-all"
                        placeholder="+91 9818xxxxxx"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="businessType" className="text-sm font-medium text-slate-700">Business Type</label>
                    <select
                        id="businessType"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white/60 transition-all text-slate-700"
                    >
                        <option value="Local Shop">Local Shop</option>
                        <option value="Barber">Barber</option>
                        <option value="Cafe">Cafe</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Gym">Gym</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="businessDetails" className="text-sm font-medium text-slate-700">Business Details / Project Goals</label>
                <textarea
                    id="businessDetails"
                    name="businessDetails"
                    required
                    rows={5}
                    value={formData.businessDetails}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white/60 transition-all resize-none"
                    placeholder="Tell us about your business and what you want to achieve..."
                />
            </div>

            <div className="space-y-3">
                <style>{`
                    @keyframes scaleIn {
                        from { transform: scale(0); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }
                    .animate-scale-in {
                        animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                    }
                `}</style>
                <Button
                    type="submit"
                    size="lg"
                    disabled={status === 'loading'}
                    className={`w-full py-4 text-lg font-medium shadow-lg transition-all duration-300 flex items-center justify-center ${status === 'success'
                            ? '!bg-green-500 hover:!bg-green-600 shadow-green-500/20 text-white'
                            : 'shadow-blue-500/20'
                        }`}
                >
                    {status === 'loading' && <Loader2 className="w-5 h-5 animate-spin mr-2" />}
                    {status === 'success' && <CheckCircle className="w-5 h-5 mr-2 animate-scale-in" />}
                    {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent Successfully' : 'Send Message'}
                </Button>
                {errorMessage && (
                    <p className="text-red-500 text-sm text-center font-medium animate-in fade-in slide-in-from-top-1">{errorMessage}</p>
                )}
            </div>
        </form>
    );
}
