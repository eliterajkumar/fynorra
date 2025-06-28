'use client';

import { Suggestion } from '@/lib/types/suggestion';
import { SuggestionCard } from './suggestion-card';
import { SimplePagination } from '@/components/ui/simple-pagination';

interface SuggestionListProps {
  suggestions: Suggestion[];
  total: number;
  page: number;
  hasMore: boolean;
  currentFilters: Record<string, string | undefined>;
}

export function SuggestionList({ 
  suggestions, 
  total, 
  page, 
  hasMore, 
  currentFilters 
}: SuggestionListProps) {
  const totalPages = Math.ceil(total / 12);

  if (suggestions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No suggestions found
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {Object.keys(currentFilters).length > 0 
            ? 'Try adjusting your filters to see more suggestions.'
            : 'Be the first to submit a suggestion and help shape the future of Fynorra!'
          }
        </p>
        <a
          href="/suggestions/new"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Submit First Suggestion
        </a>
      </div>
    );
  }

  return (
    <div>
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Suggestions
          </h2>
          <p className="text-gray-600 mt-1">
            Showing {suggestions.length} of {total} suggestions
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            defaultValue="most-voted"
            onChange={(e) => {
              const url = new URL(window.location.href);
              url.searchParams.set('sortBy', e.target.value);
              url.searchParams.delete('page');
              window.location.href = url.toString();
            }}
          >
            <option value="most-voted">Most Voted</option>
            <option value="trending">Trending</option>
            <option value="oldest">Oldest</option>
            <option value="recently-updated">Recently Updated</option>
          </select>
        </div>
      </div>

      {/* Suggestions Grid */}
      <div className="space-y-6">
        {suggestions.map((suggestion) => (
          <SuggestionCard key={suggestion.id} suggestion={suggestion} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12">
          <SimplePagination 
            currentPage={page}
            totalPages={totalPages}
            baseUrl="/suggestions"
            searchParams={currentFilters}
          />
        </div>
      )}
    </div>
  );
} 