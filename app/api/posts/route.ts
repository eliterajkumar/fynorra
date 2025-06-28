import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for blog posts
const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().default(false),
});

const updatePostSchema = createPostSchema.partial();

// Simulated database (replace with your actual database)
let posts = [
  {
    id: '1',
    title: 'How We Implemented AI-Powered Customer Support',
    content: 'This is a sample blog post content...',
    excerpt: 'A comprehensive guide to implementing AI chatbots for customer support.',
    category: 'ai-implementation',
    tags: ['AI', 'Chatbots', 'Customer Support'],
    authorId: '1',
    author: {
      name: 'John Doe',
      username: 'johndoe',
      avatar: null,
    },
    isPublished: true,
    publishedAt: '2024-01-15T10:00:00Z',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    views: 1250,
    likes: 45,
    comments: 12,
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const authorId = searchParams.get('authorId');
    const isPublished = searchParams.get('isPublished');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Filter posts based on query parameters
    let filteredPosts = posts;

    if (authorId) {
      filteredPosts = filteredPosts.filter(post => post.authorId === authorId);
    }

    if (isPublished !== null) {
      filteredPosts = filteredPosts.filter(post => post.isPublished === (isPublished === 'true'));
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      posts: paginatedPosts,
      pagination: {
        page,
        limit,
        total: filteredPosts.length,
        totalPages: Math.ceil(filteredPosts.length / limit),
        hasNext: endIndex < filteredPosts.length,
        hasPrev: page > 1,
      },
    });

  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({
      success: false,
      message: 'Error fetching posts',
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createPostSchema.parse(body);

    // In a real application, you would get the user ID from the session
    const authorId = '1'; // This should come from authentication middleware

    const newPost = {
      id: `post_${Date.now()}`,
      ...validatedData,
      authorId,
      author: {
        name: 'John Doe', // This should come from the user session
        username: 'johndoe',
        avatar: null,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: validatedData.isPublished ? new Date().toISOString() : null,
      views: 0,
      likes: 0,
      comments: 0,
    };

    posts.push(newPost);

    return NextResponse.json({
      success: true,
      message: validatedData.isPublished ? 'Post published successfully!' : 'Draft saved successfully!',
      post: newPost,
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      }, { status: 400 });
    }

    console.error('Error creating post:', error);
    return NextResponse.json({
      success: false,
      message: 'Error creating post',
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('id');
    
    if (!postId) {
      return NextResponse.json({
        success: false,
        message: 'Post ID is required',
      }, { status: 400 });
    }

    const body = await request.json();
    const validatedData = updatePostSchema.parse(body);

    const postIndex = posts.findIndex(post => post.id === postId);
    
    if (postIndex === -1) {
      return NextResponse.json({
        success: false,
        message: 'Post not found',
      }, { status: 404 });
    }

    // Update the post
    posts[postIndex] = {
      ...posts[postIndex],
      ...validatedData,
      updatedAt: new Date().toISOString(),
      publishedAt: validatedData.isPublished && !posts[postIndex].isPublished 
        ? new Date().toISOString() 
        : posts[postIndex].publishedAt,
    };

    return NextResponse.json({
      success: true,
      message: 'Post updated successfully!',
      post: posts[postIndex],
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      }, { status: 400 });
    }

    console.error('Error updating post:', error);
    return NextResponse.json({
      success: false,
      message: 'Error updating post',
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('id');
    
    if (!postId) {
      return NextResponse.json({
        success: false,
        message: 'Post ID is required',
      }, { status: 400 });
    }

    const postIndex = posts.findIndex(post => post.id === postId);
    
    if (postIndex === -1) {
      return NextResponse.json({
        success: false,
        message: 'Post not found',
      }, { status: 404 });
    }

    // Remove the post
    posts.splice(postIndex, 1);

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully!',
    });

  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({
      success: false,
      message: 'Error deleting post',
    }, { status: 500 });
  }
} 