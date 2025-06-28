import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = loginSchema.parse(body);

    // Here you would integrate with your authentication service
    // For now, we'll simulate a successful login
    console.log('Login attempt:', validatedData.email);

    // Simulate authentication check
    if (validatedData.email === 'demo@fynorra.com' && validatedData.password === 'password123') {
      // Generate a session token (in production, use JWT or similar)
      const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Set session cookie
      const response = NextResponse.json({
        success: true,
        message: 'Login successful',
        user: {
          id: '1',
          email: validatedData.email,
          name: 'John Doe',
          username: 'johndoe',
          avatar: null,
        },
        sessionToken,
      });

      // Set HTTP-only cookie for session management
      response.cookies.set('session_token', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    } else {
      return NextResponse.json({
        success: false,
        message: 'Invalid email or password',
      }, { status: 401 });
    }

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      }, { status: 400 });
    }

    console.error('Login error:', error);
    return NextResponse.json({
      success: false,
      message: 'An error occurred during login',
    }, { status: 500 });
  }
} 