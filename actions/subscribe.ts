'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';

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
    // ✅ Nodemailer transporter setup for Zoho SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.in", // Use smtp.zoho.com for global
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_USER!,
        pass: process.env.ZOHO_PASS!,
      },
    });

    // ✅ Send notification email about new subscription
    await transporter.sendMail({
      from: `"Newsletter Subscription" <${process.env.ZOHO_USER}>`,
      to: "info@fynorra.com", // Your notification email address
      subject: "New Newsletter Subscription",
      html: `<p><strong>Email:</strong> ${email}</p>`,
    });

    return {
      message: `Thank you for subscribing, ${email}!`,
      success: true,
    };
  } catch (error) {
    console.error("Subscription error:", error);
    return {
      message: "An error occurred while subscribing. Please try again later.",
      success: false,
    };
  }
}
