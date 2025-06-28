import { Metadata } from 'next';
import { SignupForm } from '@/components/auth/signup-form';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sign Up - Fynorra Blog Platform',
  description: 'Create your free Fynorra account to start writing and publishing blog posts. Join our community of tech thought leaders and share your insights.',
  keywords: [
    'sign up',
    'create account',
    'blog platform',
    'write blog',
    'Fynorra signup',
    'author account'
  ],
  openGraph: {
    title: 'Sign Up - Fynorra Blog Platform',
    description: 'Create your free account to start writing on Fynorra.',
    type: 'website',
    url: 'https://fynorra.com/auth/signup',
  },
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-white mb-2">
              <span className="text-primary">Fynorra</span> Blog
            </h1>
          </Link>
          <p className="text-slate-300">
            Create your account and start writing today
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
          <SignupForm />
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-slate-400">
            Already have an account?{' '}
            <Link 
              href="/auth/login" 
              className="text-primary hover:text-primary/80 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-slate-800/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Start Writing Today</h3>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Free account with unlimited posts</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Professional editing and SEO optimization</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Reach thousands of tech professionals</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Build your personal brand and network</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Analytics and performance insights</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 