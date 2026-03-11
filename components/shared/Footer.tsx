import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="bg-black text-white/60 border-t border-white/10 py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                    <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
                        Urban<span className="text-primary">Vista</span>
                    </Link>
                    <p className="text-sm">
                        Transforming businesses with futuristic design and powerful strategies.
                    </p>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-4">Services</h3>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link href="/services/social-media-marketing" className="hover:text-blue-500 transition-colors duration-300">
                                Social Media Marketing
                            </Link>
                        </li>
                        <li>
                            <Link href="/services/photography-videography" className="hover:text-blue-500 transition-colors duration-300">
                                Photography & Videography
                            </Link>
                        </li>
                        <li>
                            <Link href="/services/global-outreach" className="hover:text-blue-500 transition-colors duration-300">
                                Global Outreach
                            </Link>
                        </li>
                        <li>
                            <Link href="/services/viral-campaigns" className="hover:text-blue-500 transition-colors duration-300">
                                Viral Campaigns
                            </Link>
                        </li>
                        <li>
                            <Link href="/services/website-development" className="hover:text-blue-500 transition-colors duration-300">
                                Website Development
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-4">Company</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
                        <li><Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-4">Connect</h3>
                    <div className="flex gap-4">
                        <a href="https://www.facebook.com/UrbanVistaService" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors duration-300"><Facebook className="w-5 h-5" /></a>
                        <a href="/" className="hover:text-blue-500 transition-colors duration-300"><Twitter className="w-5 h-5" /></a>
                        <a href="https://www.instagram.com/urbanvista_services" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors duration-300"><Instagram className="w-5 h-5" /></a>
                        <a href="/" className="hover:text-blue-500 transition-colors duration-300"><Linkedin className="w-5 h-5" /></a>
                    </div>
                    <a
                        href="mailto:support@urbanvistaservices.com"
                        className="block mt-3 text-sm text-gray-400 hover:text-blue-500 transition-colors duration-300"
                    >
                        support@urbanvistaservices.com
                    </a>
                </div>
            </div>
            <div className="mt-12 text-center text-xs border-t border-white/5 pt-8">
                © {new Date().getFullYear()} UrbanVista 2.0. All rights reserved.
            </div>
        </footer>
    );
};
