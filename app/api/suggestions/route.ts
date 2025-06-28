import { NextRequest, NextResponse } from 'next/server';
import { getSuggestions, createSuggestion } from '@/lib/suggestion-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '12'),
      category: searchParams.get('category') || undefined,
      status: searchParams.get('status') as any || undefined,
      priority: searchParams.get('priority') as any || undefined,
      sortBy: searchParams.get('sortBy') as any || 'most-voted',
      search: searchParams.get('search') || undefined,
      tags: searchParams.get('tags')?.split(',') || undefined,
    };

    const suggestionsResponse = await getSuggestions(filters);
    
    return NextResponse.json(suggestionsResponse);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch suggestions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.description || !body.categoryId) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, categoryId' },
        { status: 400 }
      );
    }

    // Create the suggestion
    const suggestion = await createSuggestion({
      title: body.title,
      description: body.description,
      detailedDescription: body.detailedDescription,
      categoryId: body.categoryId,
      tags: body.tags || [],
      authorId: body.authorId,
      author: body.author,
    });

    return NextResponse.json(suggestion, { status: 201 });
  } catch (error) {
    console.error('Error creating suggestion:', error);
    return NextResponse.json(
      { error: 'Failed to create suggestion' },
      { status: 500 }
    );
  }
} 