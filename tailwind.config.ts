import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#F8FAFC", // Surface default
                foreground: "#0F172A", // Primary Text
                primary: "#0F172A", // Deep Navy
                secondary: "#F8FAFC", // Light Surface
                accent: "#2563EB", // Electric Blue
                highlight: "#F97316", // Orange
                muted: "#94A3B8", // Muted Text
                surface: "#FFFFFF", // Pure White
                glass: "rgba(255, 255, 255, 0.1)",
                "glass-border": "rgba(255, 255, 255, 0.2)",
            },
            boxShadow: {
                'card': '0 20px 40px -5px rgba(15, 23, 42, 0.1), 0 8px 20px -6px rgba(15, 23, 42, 0.1)',
                'card-hover': '0 30px 60px -10px rgba(37, 99, 235, 0.15), 0 12px 24px -8px rgba(37, 99, 235, 0.15)',
                'glow': '0 0 20px rgba(37, 99, 235, 0.5)',
            },
            backdropBlur: {
                xs: '2px',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
export default config;
