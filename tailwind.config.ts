import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        // Brand palette
        brand: {
          50:  "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",  // primary
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        // Violet secondary
        violet: {
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
        },
        // Cyan accent
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
        // Emerald success
        emerald: {
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
        },
        // Amber warning
        amber: {
          400: "#fbbf24",
          500: "#f59e0b",
        },
        // Rose danger
        rose: {
          400: "#fb7185",
          500: "#f43f5e",
        },
        // Dark surfaces
        dark: {
          50:  "#f8fafc",
          100: "#f1f5f9",
          800: "#1a1a2e",   // card
          850: "#16213e",   // sidebar
          900: "#0f0f1a",   // background
          950: "#090910",   // deepest
        },
        // Glass / border
        glass: {
          border: "rgba(255,255,255,0.08)",
          "border-hover": "rgba(255,255,255,0.15)",
          bg: "rgba(255,255,255,0.04)",
          "bg-hover": "rgba(255,255,255,0.07)",
        },
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)",
        "gradient-brand-r": "linear-gradient(135deg, #06b6d4, #8b5cf6, #6366f1)",
        "gradient-cyber": "linear-gradient(135deg, #f43f5e, #f59e0b)",
        "gradient-food": "linear-gradient(135deg, #10b981, #06b6d4)",
        "gradient-dark": "linear-gradient(135deg, #1a1a2e, #0f0f1a)",
        "gradient-glow": "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.15), transparent 70%)",
        "gradient-card": "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
      },
      boxShadow: {
        glow: "0 0 40px rgba(99,102,241,0.3)",
        "glow-sm": "0 0 20px rgba(99,102,241,0.2)",
        "glow-cyan": "0 0 40px rgba(6,182,212,0.3)",
        "glow-emerald": "0 0 40px rgba(16,185,129,0.3)",
        glass: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
        "glass-sm": "0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
        card: "0 4px 24px rgba(0,0,0,0.3)",
        "card-hover": "0 12px 40px rgba(0,0,0,0.4)",
      },
      animation: {
        "gradient-shift": "gradient-shift 6s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "shimmer": "shimmer 2s infinite",
        "spin-slow": "spin 4s linear infinite",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(99,102,241,0.3)" },
          "50%": { boxShadow: "0 0 60px rgba(99,102,241,0.6), 0 0 100px rgba(139,92,246,0.3)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
