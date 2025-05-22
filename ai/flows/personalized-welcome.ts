// src/ai/flows/personalized-welcome.ts
'use server';

/**
 * @fileOverview Generates a personalized welcome message using AI.
 *
 * - generatePersonalizedWelcomeMessage - A function that generates a personalized welcome message.
 * - PersonalizedWelcomeMessageInput - The input type for the generatePersonalizedWelcomeMessage function.
 * - PersonalizedWelcomeMessageOutput - The return type for the generatePersonalizedWelcomeMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedWelcomeMessageInputSchema = z.object({
  userContext: z
    .string()
    .describe(
      'Information about the user, such as their industry, role, or interests.'
    ),
});
export type PersonalizedWelcomeMessageInput = z.infer<typeof PersonalizedWelcomeMessageInputSchema>;

const PersonalizedWelcomeMessageOutputSchema = z.object({
  message: z.string().describe('The personalized welcome message.'),
});
export type PersonalizedWelcomeMessageOutput = z.infer<typeof PersonalizedWelcomeMessageOutputSchema>;

export async function generatePersonalizedWelcomeMessage(
  input: PersonalizedWelcomeMessageInput
): Promise<PersonalizedWelcomeMessageOutput> {
  return personalizedWelcomeMessageFlow(input);
}

const personalizedWelcomeMessagePrompt = ai.definePrompt({
  name: 'personalizedWelcomeMessagePrompt',
  input: {schema: PersonalizedWelcomeMessageInputSchema},
  output: {schema: PersonalizedWelcomeMessageOutputSchema},
  prompt: `You are a marketing expert tasked with creating a personalized welcome message for a visitor to the Fynorra website.

  Based on the following information about the user, generate a short, engaging, and relevant welcome message to make them feel valued and encourage them to explore our services.

  User Context: {{{userContext}}}

  Welcome Message:`,
});

const personalizedWelcomeMessageFlow = ai.defineFlow(
  {
    name: 'personalizedWelcomeMessageFlow',
    inputSchema: PersonalizedWelcomeMessageInputSchema,
    outputSchema: PersonalizedWelcomeMessageOutputSchema,
  },
  async input => {
    const {output} = await personalizedWelcomeMessagePrompt(input);
    return output!;
  }
);
