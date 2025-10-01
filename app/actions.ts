"use server";

import type { VoiceCallOutput } from "@/ai/flows/voice-call-flow";

export async function submitAudio(audioDataUri: string): Promise<VoiceCallOutput> {
  if (!audioDataUri) {
    throw new Error("No audio data provided.");
  }

  const backendUrl = process.env.PYTHON_VOICE_API_URL;
  if (!backendUrl) {
    console.error("PYTHON_VOICE_API_URL is not set in the environment variables.");
    throw new Error("Voice assistant backend is not configured.");
  }

  // small timeout
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000); // 30s

  try {
    // forward to python backend; expect { audio: "data:audio/wav;base64,...", text: "..." }
    const resp = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ audio: audioDataUri }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!resp.ok) {
      const text = await resp.text();
      console.error("Error from Python backend:", resp.status, text);
      throw new Error(`Voice backend error: ${resp.status} ${resp.statusText}`);
    }

    const result = (await resp.json()) as VoiceCallOutput;

    if (!result || !result.audio) {
      console.error("Invalid response from voice backend:", result);
      throw new Error("Invalid response from voice backend.");
    }

    // ensure result.audio is a data URI; if backend returns base64 without data-prefix, normalize
    if (!result.audio.startsWith("data:")) {
      // assume wav base64 if no prefix
      result.audio = `data:audio/wav;base64,${result.audio}`;
    }

    return result;
  } catch (err: any) {
    if (err.name === "AbortError") {
      console.error("submitAudio timeout");
      throw new Error("Voice backend timed out.");
    }
    console.error("submitAudio error:", err);
    throw new Error(err?.message || "Unknown error forwarding audio to voice backend.");
  }
}
