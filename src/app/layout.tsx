import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "AI Career Path — Career Operating System for Engineers",
    template: "%s | AI Career Path",
  },
  description:
    "The AI-powered career operating system for BTech students. Get personalized roadmaps, skill gap analysis, resume builder, AI mentor, and placement preparation — from Day 1 of college to your first job offer.",
  keywords: [
    "career guidance for engineers",
    "BTech career path",
    "AI career mentor",
    "placement preparation",
    "engineering roadmap",
    "skill gap analysis",
    "resume builder for students",
  ],
  authors: [{ name: "AI Career Path Team" }],
  openGraph: {
    title: "AI Career Path — Career Operating System for Engineers",
    description: "Guide from Day 1 of college to your first job offer with AI-powered mentorship.",
    type: "website",
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0f0f1a] text-slate-100 antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1a1a2e",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#f1f5f9",
            },
          }}
        />
      </body>
    </html>
  );
}
