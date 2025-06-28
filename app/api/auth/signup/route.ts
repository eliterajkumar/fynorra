import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters').regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions'),
  agreeToNewsletter: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = signupSchema.parse(body);

    // Here you would integrate with your authentication service
    // For now, we'll simulate a successful signup
    console.log('Signup attempt:', validatedData.email);

    // Simulate user creation
    const userId = `user_${Date.now()}`;
    const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create user object
    const user = {
      id: userId,
      email: validatedData.email,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      username: validatedData.username,
      name: `${validatedData.firstName} ${validatedData.lastName}`,
      avatar: null,
      createdAt: new Date().toISOString(),
      isVerified: false,
      agreeToNewsletter: validatedData.agreeToNewsletter || false,
    };

    // Send welcome email (implement with your email service)
    await sendWelcomeEmail(user);

    // Set session cookie
    const response = NextResponse.json({
      success: true,
      message: 'Account created successfully! Welcome to Fynorra.',
      user,
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

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      }, { status: 400 });
    }

    console.error('Signup error:', error);
    return NextResponse.json({
      success: false,
      message: 'An error occurred during signup',
    }, { status: 500 });
  }
}

// Email function (implement with your email service)
async function sendWelcomeEmail(user: any) {
  console.log('Sending welcome email to:', user.email);
  
  // Implement with Resend, SendGrid, or your preferred email service
  // await sendEmail({
  //   to: user.email,
  //   subject: 'Welcome to Fynorra!',
  //   template: 'welcome',
  //   data: { user }
  // });
} 