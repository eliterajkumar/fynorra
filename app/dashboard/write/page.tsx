import { Metadata } from 'next';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { BlogEditor } from '@/components/dashboard/blog-editor';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Write - Fynorra Blog Platform',
  description: 'Create and edit your blog posts with our powerful editor. Write, format, and publish your content on Fynorra.',
  keywords: [
    'write blog',
    'blog editor',
    'create post',
    'Fynorra editor',
    'content creation',
    'blog writing'
  ],
  openGraph: {
    title: 'Write - Fynorra Blog Platform',
    description: 'Create and edit your blog posts with our powerful editor.',
    type: 'website',
    url: 'https://fynorra.com/dashboard/write',
  },
};

export default function WritePage() {
  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <DashboardHeader />
          
          <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Write Your Story</h1>
              <p className="text-slate-300">
                Share your insights, experiences, and expertise with our community
              </p>
            </div>

            <BlogEditor />
          </main>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
} 