import { NextRequest, NextResponse } from 'next/server';
import { voteSuggestion } from '@/lib/suggestion-service';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Validate required fields
    if (!body.voteType || !['up', 'down'].includes(body.voteType)) {
      return NextResponse.json(
        { error: 'Invalid vote type. Must be "up" or "down"' },
        { status: 400 }
      );
    }

    // In a real app, you would get the user ID from authentication
    const userId = 'user1'; // Replace with actual user ID from auth

    // Vote on the suggestion
    const result = await voteSuggestion(id, userId, body.voteType);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Suggestion not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      newVoteCount: result.newVoteCount,
    });
  } catch (error) {
    console.error('Error voting on suggestion:', error);
    return NextResponse.json(
      { error: 'Failed to vote on suggestion' },
      { status: 500 }
    );
  }
} 