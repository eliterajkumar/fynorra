'use client';

import { useState } from 'react';
import { Suggestion } from '@/lib/types/suggestion';
import { VoteButton } from './vote-button';
import { SuggestionStatusBadge } from './suggestion-status-badge';

interface SuggestionPostProps {
  suggestion: Suggestion;
}

export function SuggestionPost({ suggestion }: SuggestionPostProps) {
  const [voteCount, setVoteCount] = useState(suggestion.totalVotes);
  const [hasVoted, setHasVoted] = useState(false);

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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-8 border-b border-gray-200">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <SuggestionStatusBadge status={suggestion.status} />
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: suggestion.category.color }}
                />
                <span className="text-sm text-gray-600">{suggestion.category.name}</span>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {suggestion.title}
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              {suggestion.description}
            </p>

            {/* Tags */}
            {suggestion.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {suggestion.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author Info */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  {suggestion.author?.avatar ? (
                    <img 
                      src={suggestion.author.avatar} 
                      alt={suggestion.author.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-medium text-gray-600">
                      {suggestion.author?.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {suggestion.author?.name}
                    </span>
                    {suggestion.author?.isVerified && (
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {suggestion.author?.suggestionCount} suggestions • {suggestion.author?.totalUpvotes} upvotes
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-500">
                {new Date(suggestion.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>

          {/* Vote Section */}
          <div className="flex flex-col items-center">
            <VoteButton
              voteCount={voteCount}
              hasVoted={hasVoted}
              onVote={handleVote}
              suggestionId={suggestion.id}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {suggestion.detailedDescription && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Detailed Description</h2>
            <div className="prose prose-gray max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {suggestion.detailedDescription}
              </div>
            </div>
          </div>
        )}

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{suggestion.upvotes}</div>
            <div className="text-sm text-gray-500">Upvotes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{suggestion.downvotes}</div>
            <div className="text-sm text-gray-500">Downvotes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{suggestion.totalVotes}</div>
            <div className="text-sm text-gray-500">Total Votes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{suggestion.voters.length}</div>
            <div className="text-sm text-gray-500">Voters</div>
          </div>
        </div>

        {/* Priority and Impact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Priority & Impact</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Priority:</span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  suggestion.priority === 'high' ? 'bg-red-100 text-red-800' :
                  suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {suggestion.priority.charAt(0).toUpperCase() + suggestion.priority.slice(1)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Estimated Impact:</span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  suggestion.estimatedImpact === 'high' ? 'bg-purple-100 text-purple-800' :
                  suggestion.estimatedImpact === 'medium' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {suggestion.estimatedImpact.charAt(0).toUpperCase() + suggestion.estimatedImpact.slice(1)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Estimated Effort:</span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  suggestion.estimatedEffort === 'high' ? 'bg-orange-100 text-orange-800' :
                  suggestion.estimatedEffort === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {suggestion.estimatedEffort.charAt(0).toUpperCase() + suggestion.estimatedEffort.slice(1)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Created:</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(suggestion.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Updated:</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(suggestion.updatedAt).toLocaleDateString()}
                </span>
              </div>
              {suggestion.roadmapQuarter && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Planned For:</span>
                  <span className="text-sm font-medium text-blue-600">
                    {suggestion.roadmapQuarter}
                  </span>
                </div>
              )}
              {suggestion.implementedAt && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Implemented:</span>
                  <span className="text-sm font-medium text-green-600">
                    {new Date(suggestion.implementedAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 