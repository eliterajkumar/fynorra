'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Suggestion } from '@/lib/types/suggestion';
import { VoteButton } from './vote-button';
import { SuggestionStatusBadge } from './suggestion-status-badge';

interface SuggestionCardProps {
  suggestion: Suggestion;
}

export function SuggestionCard({ suggestion }: SuggestionCardProps) {
  const [voteCount, setVoteCount] = useState(suggestion.totalVotes);
  const [hasVoted, setHasVoted] = useState(false); // In real app, check user's vote status

  const handleVote = async (voteType: 'up' | 'down') => {
    try {
      const response = await fetch(`/api/suggestions/${suggestion.id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voteType }),
      });

      if (response.ok) {
        const { newVoteCount } = await response.json();
        setVoteCount(newVoteCount);
        setHasVoted(!hasVoted);
      }
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6">
      <div className="flex items-start gap-4">
        {/* Vote Section */}
        <div className="flex flex-col items-center gap-2">
          <VoteButton
            voteCount={voteCount}
            hasVoted={hasVoted}
            onVote={handleVote}
            suggestionId={suggestion.id}
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <Link 
              href={`/suggestions/${suggestion.slug}`}
              className="group"
            >
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {suggestion.title}
              </h3>
            </Link>
            <SuggestionStatusBadge status={suggestion.status} />
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4 line-clamp-3">
            {suggestion.description}
          </p>

          {/* Tags */}
          {suggestion.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestion.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {tag}
                </span>
              ))}
              {suggestion.tags.length > 3 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  +{suggestion.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              {/* Author */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                  {suggestion.author.avatar ? (
                    <img 
                      src={suggestion.author.avatar} 
                      alt={suggestion.author.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-medium text-gray-600">
                      {suggestion.author.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="font-medium text-gray-700">
                  {suggestion.author.name}
                </span>
                {suggestion.author.isVerified && (
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>

              {/* Category */}
              <div className="flex items-center gap-1">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: suggestion.category.color }}
                />
                <span>{suggestion.category.name}</span>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>
                {new Date(suggestion.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
          </div>

          {/* Priority and Impact */}
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500">Priority:</span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                suggestion.priority === 'high' ? 'bg-red-100 text-red-800' :
                suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {suggestion.priority.charAt(0).toUpperCase() + suggestion.priority.slice(1)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500">Impact:</span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                suggestion.estimatedImpact === 'high' ? 'bg-purple-100 text-purple-800' :
                suggestion.estimatedImpact === 'medium' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {suggestion.estimatedImpact.charAt(0).toUpperCase() + suggestion.estimatedImpact.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 