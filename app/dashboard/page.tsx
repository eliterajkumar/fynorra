import { Metadata } from 'next';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { DashboardActions } from '@/components/dashboard/dashboard-actions';
import { RecentPosts } from '@/components/dashboard/recent-posts';
import { QuickStats } from '@/components/dashboard/quick-stats';
import { DashboardWelcome } from '@/components/dashboard/dashboard-welcome';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Dashboard - Fynorra Blog Platform',
  description: 'Manage your blog posts, track performance, and write new content on Fynorra. Your personal writing dashboard.',
  keywords: [
    'dashboard',
    'blog management',
    'write blog',
    'Fynorra dashboard',
    'author dashboard',
    'content management'
  ],
  openGraph: {
    title: 'Dashboard - Fynorra Blog Platform',
    description: 'Manage your blog posts and write new content.',
    type: 'website',
    url: 'https://fynorra.com/dashboard',
  },
};

export default function DashboardPage() {
  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <DashboardHeader />
          
          <main className="container mx-auto px-4 py-8">
            {/* Welcome Section */}
            <DashboardWelcome />

            {/* Quick Stats */}
            <QuickStats />

            {/* Dashboard Actions */}
            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2">
                <DashboardActions />
              </div>
              <div>
                <DashboardStats />
              </div>
            </div>

            {/* Recent Posts */}
            <RecentPosts />
          </main>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
} 