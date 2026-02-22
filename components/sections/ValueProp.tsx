"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function ValueProp() {
    return (
        <section className="w-full relative py-[120px] px-4 md:px-6 bg-slate-50/50 flex justify-center overflow-hidden">

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[1280px] bg-white rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col md:flex-row overflow-hidden"
            >
                {/* INNER CONTAINER */}
                <div className="w-full h-full flex flex-col md:flex-row items-center">

                    {/* LEFT SIDE — VISUAL (Zoomed Out, Tilted Blue Card) */}
                    <div className="relative w-full md:w-[50%] p-12 md:p-16 flex items-center justify-center bg-slate-50/30">
                        <div className="relative w-[320px] h-[380px] md:w-[360px] md:h-[440px] flex items-center justify-center">

                            {/* TILTED BLUE CARD (Container controlled size) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, rotate: -4, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: -8, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute inset-0 rounded-[40px] z-0"
                                style={{
                                    background: 'linear-gradient(145deg, #1e3a8a 0%, #3b82f6 100%)', // Deeper top-left, lighter bottom-right
                                    boxShadow: '0 30px 60px -10px rgba(30, 58, 138, 0.25)', // Smooth premium shadow
                                }}
                            >
                                {/* Subtle Inner Reflection */}
                                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />
                            </motion.div>

                            {/* HANDSHAKE IMAGE (No Scaling, Object Contain) */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                                className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none"
                            >
                                {/* Soft Contact Shadow */}
                                <div className="absolute -bottom-[60px] ml-[40px] w-[220px] h-[40px] bg-black/30 blur-2xl rounded-full opacity-40" />

                                <img
                                    src="/trust-handshake.png"
                                    alt="Trust Partnership"
                                    className="relative z-10 w-[140%] h-[140%] object-contain"
                                    style={{
                                        transform: 'translateY(65px) translateX(20px)',
                                    }}
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                    }}
                                />
                            </motion.div>
                        </div>
                    </div>

                    {/* RIGHT SIDE — TEXT HIERARCHY */}
                    <div className="relative w-full md:w-[50%] flex flex-col items-center md:items-start text-center md:text-left p-8 md:p-16 space-y-8">

                        {/* LABEL */}
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase"
                        >
                            On-Ground Execution
                        </motion.span>

                        {/* HEADLINES (Progressive Scale) */}
                        <div className="flex flex-col space-y-3 leading-[1.1] text-slate-900">
                            <motion.h3
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-3xl font-medium text-slate-600"
                            >
                                We Visit.
                            </motion.h3>
                            <motion.h2
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.35 }}
                                className="text-4xl md:text-5xl font-semibold text-slate-800"
                            >
                                We Click.
                            </motion.h2>
                            <motion.h1
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="text-5xl md:text-6xl font-bold text-blue-600 tracking-tight"
                            >
                                We Show.
                            </motion.h1>
                        </div>

                        {/* SUBTEXT */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.65 }}
                            className="text-slate-500 text-lg leading-relaxed max-w-[420px]"
                        >
                            You decide the price. Love it? Let's talk.
                            <br className="hidden lg:block" /> Not feeling it? Zero commitment.
                        </motion.p>

                        {/* BUTTON */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <Link href="/contact">
                                <Button
                                    className="group relative bg-blue-600 hover:bg-blue-700 text-white text-base font-medium px-8 py-4 rounded-xl shadow-[0_15px_30px_-10px_rgba(37,99,235,0.4)] transition-all duration-300 hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.5)] hover:-translate-y-0.5 overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Book a Visit
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Button>
                            </Link>
                        </motion.div>

                    </div>

                </div>
            </motion.div>
        </section>
    );
}
