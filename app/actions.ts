'use server';

import { interactiveAIDemo } from '@/ai/flows/interactive-ai-demo';
import type { InteractiveAIDemoOutput } from '@/ai/flows/interactive-ai-demo';

export async function submitQuery(query: string): Promise<InteractiveAIDemoOutput> {
  if (!query) {
    return { answer: "Please provide a query." };
  }
  try {
    const result = await interactiveAIDemo({ query });
    return result;
  } catch (error) {
    console.error('Error in AI flow:', error);
    return { answer: "Sorry, I encountered an error processing your request. Please try again later." };
  }
}
