import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from '@clerk/nextjs';
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
  title: 'Fynorra Vision',
  description: 'Train Custom AI Models. Deploy Enterprise Solutions.',
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
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
