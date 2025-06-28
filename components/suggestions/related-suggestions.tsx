import Link from 'next/link';
import { Suggestion } from '@/lib/types/suggestion';
import { SuggestionCard } from './suggestion-card';

interface RelatedSuggestionsProps {
  suggestions: Suggestion[];
  currentSuggestionId: string;
}

export function RelatedSuggestions({ suggestions, currentSuggestionId }: RelatedSuggestionsProps) {
  // Filter out the current suggestion
  const relatedSuggestions = suggestions.filter(s => s.id !== currentSuggestionId);

  if (relatedSuggestions.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Related Suggestions
      </h2>
      <div className="space-y-6">
        {relatedSuggestions.map((suggestion) => (
          <SuggestionCard key={suggestion.id} suggestion={suggestion} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/suggestions"
          className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          View All Suggestions
        </Link>
      </div>
    </div>
  );
} 