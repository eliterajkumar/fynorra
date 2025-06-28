'use client';

import { useState } from 'react';

interface VoteButtonProps {
  voteCount: number;
  hasVoted: boolean;
  onVote: (voteType: 'up' | 'down') => void;
  suggestionId: string;
}

export function VoteButton({ voteCount, hasVoted, onVote, suggestionId }: VoteButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleVote = async (voteType: 'up' | 'down') => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      await onVote(voteType);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Upvote Button */}
      <button
        onClick={() => handleVote('up')}
        disabled={isLoading}
        className={`p-2 rounded-lg transition-all ${
          hasVoted 
            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-green-600'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        title={hasVoted ? 'Remove your vote' : 'Upvote this suggestion'}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Vote Count */}
      <div className="text-center py-1">
        <span className="text-lg font-semibold text-gray-900">{voteCount}</span>
        <div className="text-xs text-gray-500">votes</div>
      </div>

      {/* Downvote Button */}
      <button
        onClick={() => handleVote('down')}
        disabled={isLoading}
        className={`p-2 rounded-lg transition-all ${
          hasVoted 
            ? 'bg-red-100 text-red-600 hover:bg-red-200' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-red-600'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        title={hasVoted ? 'Remove your vote' : 'Downvote this suggestion'}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
} 