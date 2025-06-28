import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { NewSuggestionForm } from '@/components/suggestions/new-suggestion-form';
import { getSuggestionCategories } from '@/lib/suggestion-service';

export const metadata: Metadata = {
  title: 'Submit New Feature Suggestion - Fynorra AI Platform',
  description: 'Share your ideas and suggestions for new features on the Fynorra AI platform. Help us build the next generation of AI-powered business solutions.',
  keywords: [
    'submit suggestion',
    'feature request',
    'product feedback',
    'AI platform ideas',
    'new features',
    'user suggestions',
    'product development',
    'community feedback'
  ],
  openGraph: {
    title: 'Submit New Feature Suggestion - Fynorra AI Platform',
    description: 'Share your ideas and suggestions for new features on the Fynorra AI platform.',
    url: 'https://fynorra.com/suggestions/new',
    siteName: 'Fynorra',
    images: [
      {
        url: '/og-new-suggestion.jpg',
        width: 1200,
        height: 630,
        alt: 'Submit New Feature Suggestion - Fynorra',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Submit New Feature Suggestion - Fynorra AI Platform',
    description: 'Share your ideas and suggestions for new features on the Fynorra AI platform.',
    images: ['/og-new-suggestion.jpg'],
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
    canonical: 'https://fynorra.com/suggestions/new',
  },
};

export default async function NewSuggestionPage() {
  const categories = await getSuggestionCategories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Submit New Suggestion
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Share your ideas and help shape the future of Fynorra. Your suggestions drive our product roadmap 
            and help us build the AI solutions that matter most to our community.
          </p>
        </div>

        {/* Form Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <NewSuggestionForm categories={categories} />
          </div>
        </div>

        {/* Tips Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Tips for Great Suggestions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Be Specific</h3>
                <p className="text-gray-600 text-sm">
                  Describe the feature in detail, including how it would work and what problem it solves.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Provide Context</h3>
                <p className="text-gray-600 text-sm">
                  Explain your use case and why this feature would be valuable to you and others.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Consider Impact</h3>
                <p className="text-gray-600 text-sm">
                  Think about how this feature would benefit the broader community and business users.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Check Existing</h3>
                <p className="text-gray-600 text-sm">
                  Search existing suggestions first to avoid duplicates and add your vote instead.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Community Guidelines
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Be respectful and constructive in your feedback
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Focus on features that benefit the broader community
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Provide clear, actionable suggestions
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Avoid feature requests that are too specific to individual use cases
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Consider the technical feasibility and business impact
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 