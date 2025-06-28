import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for guest author submissions
const guestAuthorSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().min(2, 'Company name is required'),
  title: z.string().min(2, 'Job title is required'),
  linkedin: z.string().url('Please enter a valid LinkedIn URL').optional().or(z.literal('')),
  articleTitle: z.string().min(10, 'Article title must be at least 10 characters'),
  articleSummary: z.string().min(50, 'Article summary must be at least 50 characters'),
  articleContent: z.string().min(500, 'Article content must be at least 500 characters'),
  category: z.enum(['ai-implementation', 'business-automation', 'chatbot-development', 'case-study', 'industry-insights', 'technical-deep-dive']),
  estimatedWordCount: z.string(),
  agreeToGuidelines: z.boolean().refine(val => val === true, 'You must agree to the guidelines'),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = guestAuthorSchema.parse(body);
    
    // Here you would typically:
    // 1. Save to database
    // 2. Send email notifications
    // 3. Create admin review task
    
    // For now, we'll simulate the process
    console.log('Guest author submission received:', validatedData);
    
    // Simulate database save
    const submissionId = `GA-${Date.now()}`;
    
    // Send email notification to admin (you'd implement this with your email service)
    await sendAdminNotification(validatedData, submissionId);
    
    // Send confirmation email to author
    await sendAuthorConfirmation(validatedData);
    
    return NextResponse.json({
      success: true,
      message: 'Your article has been submitted successfully! We\'ll review it and get back to you within 3-5 business days.',
      submissionId
    }, { status: 201 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        errors: error.errors
      }, { status: 400 });
    }
    
    console.error('Guest author submission error:', error);
    return NextResponse.json({
      success: false,
      message: 'There was an error submitting your article. Please try again.'
    }, { status: 500 });
  }
}

// Email notification functions (implement with your email service)
async function sendAdminNotification(data: any, submissionId: string) {
  // This would integrate with your email service (Resend, SendGrid, etc.)
  console.log('Sending admin notification for submission:', submissionId);
  
  const emailContent = `
    New Guest Author Submission: ${submissionId}
    
    Author: ${data.name} (${data.email})
    Company: ${data.company}
    Title: ${data.title}
    
    Article: ${data.articleTitle}
    Category: ${data.category}
    Word Count: ${data.estimatedWordCount}
    
    Summary: ${data.articleSummary}
    
    LinkedIn: ${data.linkedin || 'Not provided'}
    
    Review the full article in the admin dashboard.
  `;
  
  // Send email to admin team
  // await sendEmail({
  //   to: 'admin@fynorra.com',
  //   subject: `New Guest Author Submission: ${data.articleTitle}`,
  //   text: emailContent
  // });
}

async function sendAuthorConfirmation(data: any) {
  // Send confirmation email to the author
  console.log('Sending confirmation email to:', data.email);
  
  const emailContent = `
    Hi ${data.name},
    
    Thank you for submitting your article "${data.articleTitle}" to Fynorra!
    
    We've received your submission and our editorial team will review it within 3-5 business days. You'll receive an email with our feedback and next steps.
    
    In the meantime, feel free to reach out if you have any questions.
    
    Best regards,
    The Fynorra Team
  `;
  
  // Send confirmation email
  // await sendEmail({
  //   to: data.email,
  //   subject: 'Your Guest Author Submission - Fynorra',
  //   text: emailContent
  // });
}

// GET endpoint to retrieve guest author submissions (admin only)
export async function GET(request: NextRequest) {
  try {
    // This would be protected by authentication
    // For now, we'll return a sample response
    
    const submissions = [
      {
        id: 'GA-1234567890',
        name: 'Sarah Chen',
        email: 'sarah@example.com',
        company: 'TechFlow Solutions',
        title: 'CTO',
        articleTitle: 'How We Implemented AI-Powered Customer Support',
        category: 'ai-implementation',
        status: 'pending',
        submittedAt: new Date().toISOString(),
      }
    ];
    
    return NextResponse.json({
      success: true,
      submissions
    });
    
  } catch (error) {
    console.error('Error fetching guest author submissions:', error);
    return NextResponse.json({
      success: false,
      message: 'Error fetching submissions'
    }, { status: 500 });
  }
} 