import { Metadata } from 'next';
import { Suspense } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { SuggestionList } from '@/components/suggestions/suggestion-list';
import { SuggestionFilters } from '@/components/suggestions/suggestion-filters';
import { SuggestionStats } from '@/components/suggestions/suggestion-stats';
import { getSuggestions, getSuggestionStats, getSuggestionCategories } from '@/lib/suggestion-service';
import { Header } from '@radix-ui/react-accordion';

export const metadata: Metadata = {
  title: 'Feature Suggestions & Ideas - Fynorra AI Platform',
  description: 'Share your ideas and vote on feature suggestions for Fynorra. Help shape the future of AI-powered business solutions with your feedback and suggestions.',
  keywords: [
    'feature suggestions',
    'product feedback',
    'AI platform ideas',
    'chatbot features',
    'business automation',
    'user feedback',
    'product roadmap',
    'feature requests',
    'community suggestions',
    'AI development'
  ],
  openGraph: {
    title: 'Feature Suggestions & Ideas - Fynorra AI Platform',
    description: 'Share your ideas and vote on feature suggestions for Fynorra. Help shape the future of AI-powered business solutions.',
    url: 'https://fynorra.com/suggestions',
    siteName: 'Fynorra',
    images: [
      {
        url: '/og-suggestions.jpg',
        width: 1200,
        height: 630,
        alt: 'Fynorra Feature Suggestions Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Feature Suggestions & Ideas - Fynorra AI Platform',
    description: 'Share your ideas and vote on feature suggestions for Fynorra. Help shape the future of AI-powered business solutions.',
    images: ['/og-suggestions.jpg'],
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
  alternates: {
    canonical: 'https://fynorra.com/suggestions',
  },
};

interface SuggestionsPageProps {
  searchParams: {
    page?: string;
    category?: string;
    status?: string;
    priority?: string;
    sortBy?: string;
    search?: string;
    tags?: string;
  };
}

export default async function SuggestionsPage({ searchParams }: SuggestionsPageProps) {
  const page = parseInt(searchParams.page || '1');
  const limit = 12;

  // Parse tags from URL
  const tags = searchParams.tags ? searchParams.tags.split(',') : undefined;

  // Fetch data
  const [suggestionsResponse, stats, categories] = await Promise.all([
    getSuggestions({
      page,
      limit,
      category: searchParams.category,
      status: searchParams.status as any,
      priority: searchParams.priority as any,
      sortBy: searchParams.sortBy as any,
      search: searchParams.search,
      tags,
    }),
    getSuggestionStats(),
    getSuggestionCategories(),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Feature Suggestions & Ideas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Help shape the future of Fynorra by sharing your ideas and voting on feature suggestions. 
            Your feedback drives our product roadmap and helps us build the AI solutions you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/suggestions/new"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Submit New Suggestion
            </a>
            <a
              href="#trending"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              View Trending
            </a>
          </div>
        </div>

        {/* Stats Section */}
        <Suspense fallback={<div className="animate-pulse h-32 bg-gray-200 rounded-lg mb-8" />}>
          <SuggestionStats stats={stats} />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Suspense fallback={<div className="animate-pulse h-96 bg-gray-200 rounded-lg" />}>
              <SuggestionFilters 
                categories={categories}
                currentFilters={searchParams}
                stats={stats}
              />
            </Suspense>
          </div>

          {/* Suggestions List */}
          <div className="lg:col-span-3">
            <Suspense fallback={<div className="animate-pulse space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg" />
              ))}
            </div>}>
              <SuggestionList 
                suggestions={suggestionsResponse.suggestions}
                total={suggestionsResponse.total}
                page={suggestionsResponse.page}
                hasMore={suggestionsResponse.hasMore}
                currentFilters={searchParams}
              />
            </Suspense>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Submit a new suggestion and let our community vote on it. Your idea could be the next big feature!
            </p>
            <a
              href="/suggestions/new"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Submit Your Suggestion
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 