'use server';

import { z } from 'zod';

const SubscribeSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

export interface SubscribeState {
  message?: string;
  errors?: {
    email?: string[];
  };
  success?: boolean;
}

export async function subscribeAction(
  prevState: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  const validatedFields = SubscribeSchema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your email.",
      success: false,
    };
  }

  const { email } = validatedFields.data;

  try {
    // Here you would typically save the email to your database (e.g., Firestore)
    // For this example, we'll just log it and simulate success.
    console.log(`Subscribing email: ${email}`);
    
    // Simulate database operation
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { message: `Thank you for subscribing, ${email}!`, success: true };
  } catch (error) {
    console.error("Subscription error:", error);
    return { message: "An error occurred. Please try again later.", success: false };
  }
}
