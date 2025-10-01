'use server';

/**
 * @fileOverview A voice-based AI assistant flow.
 *
 * This flow takes audio input, transcribes it, generates a response with an LLM,
 * and converts the response back to audio using a TTS model.
 *
 * - voiceCall - A function that handles the voice call interaction.
 * - VoiceCallInput - The input type for the voiceCall function.
 * - VoiceCallOutput - The return type for the voiceCall function.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'genkit';
import wav from 'wav';

const VoiceCallInputSchema = z.object({
  audio: z.string().describe(
    "A chunk of audio as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
  ),
});
export type VoiceCallInput = z.infer<typeof VoiceCallInputSchema>;

const VoiceCallOutputSchema = z.object({
  text: z.string().describe('The transcribed text from the user and the AI response.'),
  audio: z.string().describe(
    "The AI's audio response, as a data URI with a 'audio/wav' MIME type."
  ),
});
export type VoiceCallOutput = z.infer<typeof VoiceCallOutputSchema>;

export async function voiceCall(input: VoiceCallInput): Promise<VoiceCallOutput> {
  return voiceCallFlow(input);
}

// Helper to convert PCM audio from TTS model to WAV format
async function toWav(pcmData: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels: 1,
      sampleRate: 24000,
      bitDepth: 16,
    });

    const bufs: Buffer[] = [];
    writer.on('data', (chunk: Buffer) => bufs.push(chunk));
    writer.on('end', () => resolve(Buffer.concat(bufs).toString('base64')));
    writer.on('error', reject);

    writer.write(pcmData);
    writer.end();
  });
}


const voiceCallFlow = ai.defineFlow(
  {
    name: 'voiceCallFlow',
    inputSchema: VoiceCallInputSchema,
    outputSchema: VoiceCallOutputSchema,
  },
  async (input) => {
    // 1. Transcribe the user's audio to text
    const transcribeResponse = await ai.generate({
      model: 'googleai/gemini-2.5-flash', // A model that can handle audio input
      prompt: [
        { text: 'You are a transcriber. Transcribe the following audio precisely. Respond only with the transcribed text and nothing else.' },
        { media: { url: input.audio } },
      ],
    });

    const userQuery = transcribeResponse.text;
    console.log('Transcribed query:', userQuery);

    // 2. Generate a text response based on the transcription
    const llmResponse = await ai.generate({
        prompt: `You are Fynorra, an AI sales assistant. Answer the following user query concisely for a voice conversation: "${userQuery}"`,
        model: 'googleai/gemini-2.5-flash',
    });
    
    const aiTextResponse = llmResponse.text;
    console.log('AI text response:', aiTextResponse);

    // 3. Convert the text response to speech
    const { media: ttsMedia } = await ai.generate({
        model: googleAI.model('gemini-2.5-flash-preview-tts'),
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Algenib' }, // Choose a voice
            },
          },
        },
        prompt: aiTextResponse,
      });
  
      if (!ttsMedia || !ttsMedia.url) {
        throw new Error('TTS media generation failed.');
      }
  
      // The TTS model returns raw PCM audio, we need to convert it to a playable format like WAV
      const pcmBuffer = Buffer.from(
        ttsMedia.url.substring(ttsMedia.url.indexOf(',') + 1),
        'base64'
      );
      
      const wavBase64 = await toWav(pcmBuffer);

    return {
      text: `User: ${userQuery}\nAI: ${aiTextResponse}`,
      audio: `data:audio/wav;base64,${wavBase64}`,
    };
  }
);
