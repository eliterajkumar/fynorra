'use server';

/**
 * @fileOverview AI-powered sales assistant for answering user questions about products and services.
 *
 * - interactiveAIDemo - A function that handles the AI sales assistant interaction.
 * - InteractiveAIDemoInput - The input type for the interactiveAIDemo function.
 * - InteractiveAIDemoOutput - The return type for the interactiveAIDemo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InteractiveAIDemoInputSchema = z.object({
  query: z.string().describe('The user query about Fynorra AI products and services.'),
});
export type InteractiveAIDemoInput = z.infer<typeof InteractiveAIDemoInputSchema>;

const InteractiveAIDemoOutputSchema = z.object({
  answer: z.string().describe('The AI assistant answer to the user query.'),
});
export type InteractiveAIDemoOutput = z.infer<typeof InteractiveAIDemoOutputSchema>;

export async function interactiveAIDemo(input: InteractiveAIDemoInput): Promise<InteractiveAIDemoOutput> {
  return interactiveAIDemoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interactiveAIDemoPrompt',
  input: {schema: InteractiveAIDemoInputSchema},
  output: {schema: InteractiveAIDemoOutputSchema},
  prompt: `You are an AI-powered sales assistant for Fynorra AI, a company providing AI sales & knowledge assistant for jewelry stores and SMBs.

  Answer the following question about Fynorra AI products and services:

  {{query}}
  `,
});

const interactiveAIDemoFlow = ai.defineFlow(
  {
    name: 'interactiveAIDemoFlow',
    inputSchema: InteractiveAIDemoInputSchema,
    outputSchema: InteractiveAIDemoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
