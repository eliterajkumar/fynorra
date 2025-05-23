'use server';

import { z } from 'zod';

const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export interface ContactFormState {
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
    general?: string;
  };
  success?: boolean;
}

export async function contactAction(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check the form.",
      success: false,
    };
  }

  const { name, email, subject, message } = validatedFields.data;

  try {
    // Agar aapke paas /api/contact endpoint hai to ye use karo:
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message }),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to send email.");
    }

    return {
      message: "Thank you for reaching out! We’ll get back to you soon.",
      success: true,
    };
  } catch (error) {
    console.error("Error in contactAction:", error);
    return {
      message: "An error occurred while submitting your message. Please try again later.",
      errors: { general: "Submission failed." },
      success: false,
    };
  }
}
