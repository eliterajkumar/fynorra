import { Metadata } from 'next';
import { LoginForm } from '@/components/auth/login-form';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Login - Fynorra Blog Platform',
  description: 'Sign in to your Fynorra account to write, edit, and manage your blog posts. Join our community of writers and thought leaders.',
  keywords: [
    'login',
    'blog platform',
    'write blog',
    'Fynorra login',
    'author account',
    'blog management'
  ],
  openGraph: {
    title: 'Login - Fynorra Blog Platform',
    description: 'Sign in to write and manage your blog posts on Fynorra.',
    type: 'website',
    url: 'https://fynorra.com/auth/login',
  },
};

export default function LoginPage() {
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
            Sign in to your account to write and manage your blog posts
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
          <LoginForm />
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-slate-400">
            Don't have an account?{' '}
            <Link 
              href="/auth/signup" 
              className="text-primary hover:text-primary/80 font-medium"
            >
              Sign up for free
            </Link>
          </p>
        </div>

        {/* Features */}
        <div className="bg-slate-800/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Why Write on Fynorra?</h3>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Reach 10,000+ tech professionals</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Professional editing and SEO optimization</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Build your personal brand and thought leadership</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Connect with industry experts and potential clients</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 