'use client';

import { useState } from 'react';
import { SuggestionCategory, SuggestionStats } from '@/lib/types/suggestion';

interface SuggestionFiltersProps {
  categories: SuggestionCategory[];
  currentFilters: Record<string, string | undefined>;
  stats: SuggestionStats;
}

export function SuggestionFilters({ categories, currentFilters, stats }: SuggestionFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilters = (key: string, value: string | undefined) => {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
    url.searchParams.delete('page'); // Reset to first page when filtering
    window.location.href = url.toString();
  };

  const clearAllFilters = () => {
    const url = new URL(window.location.href);
    url.search = '';
    window.location.href = url.toString();
  };

  const hasActiveFilters = Object.values(currentFilters).some(Boolean);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Status Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Status</h4>
        <div className="space-y-2">
          {[
            { value: 'open', label: 'Open', count: stats.openSuggestions },
            { value: 'planned', label: 'Planned', count: 0 },
            { value: 'in-progress', label: 'In Progress', count: 0 },
            { value: 'completed', label: 'Completed', count: stats.completedSuggestions }
          ].map((status) => (
            <label key={status.value} className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value={status.value}
                  checked={currentFilters.status === status.value}
                  onChange={(e) => updateFilters('status', e.target.checked ? e.target.value : undefined)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{status.label}</span>
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {status.count}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Priority Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Priority</h4>
        <div className="space-y-2">
          {[
            { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' },
            { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
            { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' }
          ].map((priority) => (
            <label key={priority.value} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="priority"
                value={priority.value}
                checked={currentFilters.priority === priority.value}
                onChange={(e) => updateFilters('priority', e.target.checked ? e.target.value : undefined)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{priority.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Categories Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category.slug}
                  checked={currentFilters.category === category.slug}
                  onChange={(e) => updateFilters('category', e.target.checked ? e.target.value : undefined)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="flex items-center ml-2">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm text-gray-700">{category.name}</span>
                </div>
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {category.suggestionCount}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Popular Tags</h4>
        <div className="flex flex-wrap gap-2">
          {['chatbot', 'ai', 'integration', 'ui', 'performance', 'security'].map((tag) => (
            <button
              key={tag}
              onClick={() => updateFilters('tags', tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                currentFilters.tags === tag
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Stats</h4>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Suggestions</span>
            <span className="font-medium text-gray-900">{stats.totalSuggestions}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Votes</span>
            <span className="font-medium text-gray-900">{stats.totalVotes}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Open Suggestions</span>
            <span className="font-medium text-gray-900">{stats.openSuggestions}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Completed</span>
            <span className="font-medium text-gray-900">{stats.completedSuggestions}</span>
          </div>
        </div>
      </div>

      {/* Top Contributors */}
      {stats.topContributors.length > 0 && (
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Top Contributors</h4>
          <div className="space-y-2">
            {stats.topContributors.slice(0, 3).map((contributor, index) => (
              <div key={contributor.author.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                    {contributor.author.avatar ? (
                      <img 
                        src={contributor.author.avatar} 
                        alt={contributor.author.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-medium text-gray-600">
                        {contributor.author.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-700 truncate max-w-20">
                    {contributor.author.name}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {contributor.suggestions} suggestions
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 