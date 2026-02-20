// app/layout.tsx
import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
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
    default: "Fynorra AI Solutions | WhatsApp AI Agents & Automation",
    template: "%s | Fynorra AI Solutions",
  },
  description:
    "Fynorra AI Solutions builds WhatsApp AI Agents and automation systems for Indian businesses. We help MSMEs automate sales, capture leads, and grow with human-like AI assistants.",
  keywords: [
    // Brand
    "Fynorra",
    "Fynorra AI",
    "Fynorra AI Solutions",
    "Finorra",

    // Core business
    "WhatsApp AI Agent",
    "WhatsApp chatbot for business",
    "AI sales agent",
    "WhatsApp automation India",
    "AI automation for MSMEs",
    "AI solutions for Indian businesses",
  ],
  authors: [{ name: "Fynorra Team" }],
  creator: "Fynorra AI Solutions",
  publisher: "Fynorra AI Solutions",
  metadataBase: new URL("https://www.fynorra.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.fynorra.com",
    title: "Fynorra AI Solutions | WhatsApp AI Agents & Automation",
    description:
      "Official website of Fynorra AI Solutions. We build WhatsApp AI Agents and automation systems for Indian businesses.",
    siteName: "Fynorra AI Solutions",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fynorra AI Solutions – WhatsApp AI Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fynorra AI Solutions | WhatsApp AI Agents & Automation",
    description:
      "Official website of Fynorra AI Solutions. WhatsApp AI Agents & business automation for India.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "REPLACE_WITH_REAL_SEARCH_CONSOLE_CODE",
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en-IN" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          appearance={{
            variables: {
              colorPrimary: "#7DF9FF",
              colorBackground: "#101820",
              colorInputBackground: "#1A202C",
              colorInputText: "#e0f2fe",
              colorText: "#e0f2fe",
              colorTextSecondary: "#94a3b8",
            },
          }}
        >
          <PerformanceOptimizer />
          {children}
          <Toaster />
          <Sonner position="top-right" richColors />
          <FloatingChat />
        </ClerkProvider>
      </body>
    </html>
  );
}