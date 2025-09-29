// app/layout.tsx
import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { PerformanceOptimizer } from "@/components/optimization/performance";
import FloatingChat from "@/components/FloatingChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Fynorra",
    template: "%s | Fynorra",
  },
  description:
    "Fynorra helps businesses automate and grow with tailored AI chatbots, custom LLMs, software development, and scalable DevOps solutions. Transform your business with enterprise-grade AI.",
  keywords: [
    "AI chatbot development",
    "custom GPT chatbot",
    "enterprise AI solutions",
    "AI automation",
    "software development",
    "cloud DevOps",
    "machine learning",
    "artificial intelligence",
    "business automation",
    "custom AI models",
    "enterprise software",
    "AI integration",
    "chatbot development",
    "predictive analytics",
    "computer vision",
    "natural language processing",
  ],
  authors: [{ name: "Fynorra Team" }],
  creator: "Fynorra",
  publisher: "Fynorra",
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL("https://www.fynorra.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.fynorra.com",
    title: "Custom AI Solutions & Chatbots for Businesses | Fynorra",
    description:
      "Fynorra helps businesses automate and grow with tailored AI chatbots, custom LLMs, software development, and scalable DevOps solutions.",
    siteName: "Fynorra",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fynorra - Custom AI Solutions & Chatbots for Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom AI Solutions & Chatbots for Businesses | Fynorra",
    description:
      "Fynorra helps businesses automate and grow with tailored AI chatbots, custom LLMs, software development, and scalable DevOps solutions.",
    images: ["/og-image.jpg"],
    creator: "@fynorra",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Client-side providers */}
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} appearance={{
          variables: {
            colorPrimary: "#7DF9FF",
            colorBackground: "#101820",
            colorInputBackground: "#1A202C",
            colorInputText: "#e0f2fe",
            colorText: "#e0f2fe",
            colorTextSecondary: "#94a3b8",
          },
          elements: {
            formButtonPrimary:
              "bg-primary text-primary-foreground hover:bg-primary/90",
            card: "bg-card shadow-xl border-slate-700/50",
            formFieldInput:
              "bg-slate-700/60 border-slate-600 placeholder:text-slate-500 focus:border-primary text-slate-50",
            footerActionLink: "text-primary hover:text-primary/80",
          },
        }}>
          {/* Non-visual client optimizations */}
          <PerformanceOptimizer />

          {/* App content */}
          {children}

          {/* UI helpers */}
          <Toaster />
          <FloatingChat />
        </ClerkProvider>
      </body>
    </html>
  );
}
