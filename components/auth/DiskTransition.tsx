"use client";

import { motion, AnimatePresence } from 'framer-motion';

export default function DiskTransition({
    children,
    isVisible
}: {
    children: React.ReactNode;
    isVisible: boolean;
}) {
    // Replaced complex rendering issue DiskTransition with clean CSS motion logic
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full absolute inset-0 z-0 bg-[#0a0f1e]"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
