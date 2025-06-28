import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { SuggestionPost } from '@/components/suggestions/suggestion-post';
import { RelatedSuggestions } from '@/components/suggestions/related-suggestions';
import { SuggestionSchema } from '@/components/seo/suggestion-schema';
import { getSuggestion, getSuggestions } from '@/lib/suggestion-service';

interface SuggestionPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: SuggestionPageProps): Promise<Metadata> {
  const suggestion = await getSuggestion(params.slug);
  
  if (!suggestion) {
    return {
      title: 'Suggestion Not Found - Fynorra',
    };
  }

  return {
    title: `${suggestion.title} - Feature Suggestion - Fynorra AI Platform`,
    description: suggestion.description,
    keywords: [
      'feature suggestion',
      suggestion.title.toLowerCase(),
      ...suggestion.tags,
      'AI platform',
      'product feedback',
      'feature request'
    ],
    openGraph: {
      title: `${suggestion.title} - Feature Suggestion`,
      description: suggestion.description,
      url: `https://fynorra.com/suggestions/${suggestion.slug}`,
      siteName: 'Fynorra',
      images: [
        {
          url: '/og-suggestion.jpg',
          width: 1200,
          height: 630,
          alt: suggestion.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${suggestion.title} - Feature Suggestion`,
      description: suggestion.description,
      images: ['/og-suggestion.jpg'],
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
      canonical: `https://fynorra.com/suggestions/${suggestion.slug}`,
    },
  };
}

export default async function SuggestionPage({ params }: SuggestionPageProps) {
  const suggestion = await getSuggestion(params.slug);
  
  if (!suggestion) {
    notFound();
  }

  // Get related suggestions
  const relatedSuggestions = await getSuggestions({
    category: suggestion.category.slug,
    limit: 3,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <a href="/" className="hover:text-blue-600">Home</a>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <a href="/suggestions" className="hover:text-blue-600">Suggestions</a>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-900 font-medium truncate">
                {suggestion.title}
              </li>
            </ol>
          </nav>

          {/* Suggestion Content */}
          <SuggestionPost suggestion={suggestion} />

          {/* Related Suggestions */}
          {relatedSuggestions.suggestions.length > 0 && (
            <div className="mt-16">
              <RelatedSuggestions 
                suggestions={relatedSuggestions.suggestions}
                currentSuggestionId={suggestion.id}
              />
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Have another idea?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Share your suggestions and help us build the next generation of AI-powered business solutions.
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
                  href="/suggestions"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  View All Suggestions
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      {/* Structured Data */}
      <SuggestionSchema suggestion={suggestion} />
    </div>
  );
} 