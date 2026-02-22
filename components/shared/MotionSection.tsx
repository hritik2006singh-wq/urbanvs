"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MotionSectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export const MotionSection: React.FC<MotionSectionProps> = ({
    children,
    className,
    delay = 0
}) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: delay
            }}
            className={cn("w-full", className)}
        >
            {children}
        </motion.section>
    );
};
