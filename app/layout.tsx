import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from '@clerk/nextjs';
import { StructuredData } from "@/components/seo/structured-data";
import { PerformanceOptimizer } from "@/components/optimization/performance";
// Removed: import { dark } from '@clerk/themes';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Custom AI Solutions & Chatbots for Businesses | Fynorra',
    template: '%s | Fynorra'
  },
  description: 'Fynorra helps businesses automate and grow with tailored AI chatbots, custom LLMs, software development, and scalable DevOps solutions. Transform your business with enterprise-grade AI.',
  keywords: [
    'AI chatbot development',
    'custom GPT chatbot',
    'enterprise AI solutions',
    'AI automation',
    'software development',
    'cloud DevOps',
    'machine learning',
    'artificial intelligence',
    'business automation',
    'custom AI models',
    'enterprise software',
    'AI integration',
    'chatbot development',
    'predictive analytics',
    'computer vision',
    'natural language processing'
  ],
  authors: [{ name: 'Fynorra Team' }],
  creator: 'Fynorra',
  publisher: 'Fynorra',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.fynorra.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.fynorra.com',
    title: 'Custom AI Solutions & Chatbots for Businesses | Fynorra',
    description: 'Fynorra helps businesses automate and grow with tailored AI chatbots, custom LLMs, software development, and scalable DevOps solutions.',
    siteName: 'Fynorra',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fynorra - Custom AI Solutions & Chatbots for Businesses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom AI Solutions & Chatbots for Businesses | Fynorra',
    description: 'Fynorra helps businesses automate and grow with tailored AI chatbots, custom LLMs, software development, and scalable DevOps solutions.',
    images: ['/og-image.jpg'],
    creator: '@fynorra',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // Add other verification codes as needed
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        // baseTheme: dark, // Removed this line as `dark` is no longer imported
        variables: {
          colorPrimary: '#7DF9FF', // Electric Blue for primary actions
          colorBackground: '#101820', // Dark background
          colorInputBackground: '#1A202C',
          colorInputText: '#e0f2fe',
          colorText: '#e0f2fe', // Light sky blue for text
          colorTextSecondary: '#94a3b8', // Lighter gray for secondary text
        },
        elements: {
          formButtonPrimary:
            'bg-primary text-primary-foreground hover:bg-primary/90',
          card: 'bg-card shadow-xl border-slate-700/50',
          formFieldInput:
            'bg-slate-700/60 border-slate-600 placeholder:text-slate-500 focus:border-primary text-slate-50',
          footerActionLink: 'text-primary hover:text-primary/80',
        },
      }}
    >
      <html lang="en" className="dark">
        <head>
          <StructuredData />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <PerformanceOptimizer />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
