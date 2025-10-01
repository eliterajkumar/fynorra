
'use server';

import { interactiveAIDemo } from '@/ai/flows/interactive-ai-demo';
import type { InteractiveAIDemoOutput } from '@/ai/flows/interactive-ai-demo';
// We are replacing the internal voiceCall with a proxy to the Python backend.
// import { voiceCall, type VoiceCallOutput } from '@/ai/flows/voice-call-flow';
import type { VoiceCallOutput } from '@/ai/flows/voice-call-flow';

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

/**
 * This function acts as a proxy to your Python voice assistant backend.
 * It takes the audio data from the client, forwards it to your Railway endpoint,
 * and returns the AI's audio response.
 */
export async function submitAudio(audioDataUri: string): Promise<VoiceCallOutput> {
  if (!audioDataUri) {
    throw new Error("No audio data provided.");
  }
  
  const backendUrl = process.env.PYTHON_VOICE_API_URL;
  if (!backendUrl) {
    console.error('PYTHON_VOICE_API_URL is not set in the environment variables.');
    throw new Error("Voice assistant backend is not configured.");
  }

  try {
    console.log(`Forwarding audio to: ${backendUrl}`);
    
    // Forward the request to your Python backend
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // We send the audio in the format your Python backend expects.
      // Assuming it expects a JSON payload with an "audio" key containing the data URI.
      body: JSON.stringify({ audio: audioDataUri }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Error from Python backend:', response.status, errorBody);
      throw new Error(`The voice assistant returned an error: ${response.statusText}`);
    }

    // Assuming your backend returns a JSON object with a field `audio`
    // containing the base64 encoded WAV audio data URI, similar to the original flow's output.
    const result: VoiceCallOutput = await response.json();
    
    // Add a dummy text response if your backend doesn't provide one.
    if (!result.text) {
      result.text = "AI is responding...";
    }
    
    return result;

  } catch (error) {
    console.error('Error proxying voice request to Python backend:', error);
    throw new Error("Sorry, I encountered an error processing your voice request.");
  }
}
