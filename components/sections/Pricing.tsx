"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MotionSection } from '@/components/shared/MotionSection';

import { FloatingSection } from "@/components/ui/FloatingSection";

const plans = [
    {
        name: 'Starter',
        price: '₹29,999',
        description: 'Perfect for small businesses starting their journey.',
        features: [
            'Basic Brand Identity',
            'Social Media Setup',
            '5 Social Media Posts',
            'Monthly Analytics Report',
            'Email Support'
        ],
        popular: false
    },
    {
        name: 'Growth',
        price: '₹59,999',
        description: 'Scale your business with advanced strategies.',
        features: [
            'Complete Brand Identity',
            'Web Development (5 Pages)',
            '15 Social Media Posts + Reels',
            'SEO Optimization',
            'Weekly Analytics & Strategy',
            'Priority Support'
        ],
        popular: true
    },
    {
        name: 'Enterprise',
        price: '₹99,999',
        description: 'Dominate your market with full-service agency power.',
        features: [
            'Premium Brand Strategy',
            'Custom Web App Development',
            'Daily Social Media Management',
            'Advanced SEO & SEM',
            'Dedicated Account Manager',
            '24/7 Priority Support'
        ],
        popular: false
    }
];

export const Pricing = () => {
    return (
        <FloatingSection>
            <div className="container mx-auto">
                <MotionSection>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
                            Simple, Transparent Pricing
                        </h2>
                        <p className="text-muted text-lg md:text-xl">
                            Choose the perfect plan to elevate your brand presence.
                        </p>
                    </div>
                </MotionSection>

                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {plans.map((plan, index) => (
                        <MotionSection key={plan.name} delay={index * 0.1}>
                            <motion.div
                                whileHover={{ y: -10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className={cn(
                                    "relative p-8 rounded-2xl bg-white h-full flex flex-col border",
                                    plan.popular
                                        ? "border-blue-500 shadow-[0_20px_40px_-10px_rgba(37,99,235,0.15)] ring-1 ring-blue-500 scale-105 z-10"
                                        : "border-slate-200 shadow-sm hover:shadow-xl"
                                )}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-lg">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-primary mb-2">{plan.name}</h3>
                                    <p className="text-muted text-sm mb-6">{plan.description}</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-primary">{plan.price}</span>
                                        <span className="text-muted">/month</span>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8 flex-grow">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3 text-slate-600">
                                            <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    className={cn(
                                        "w-full",
                                        plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""
                                    )}
                                    variant={plan.popular ? "primary" : "outline"}
                                >
                                    Get Started
                                </Button>
                            </motion.div>
                        </MotionSection>
                    ))}
                </div>
            </div>
        </FloatingSection>
    );
};
