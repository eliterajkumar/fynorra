"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PhoneOff, Mic, Loader2, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * NEW behavior:
 * - When dialog opens -> request mic -> start MediaRecorder with timeslice (e.g. 900ms)
 * - ondataavailable -> send chunk immediately to backend /voice/stream endpoint
 * - backend returns optional { audio, text } -> if audio present, play it immediately
 * - On close -> stop recorder & stream
 *
 * IMPORTANT: set NEXT_PUBLIC_VOICE_STREAM_URL env in your Next app to your backend streaming endpoint,
 * e.g. NEXT_PUBLIC_VOICE_STREAM_URL=https://fynorra-ai-system.onrender.com/voice/stream
 */

interface CallDemoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CallDemo({ open, onOpenChange }: CallDemoProps) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [callStatus, setCallStatus] = useState("Connecting...");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sendQueueRef = useRef<Promise<any>>(Promise.resolve()); // ensures sequential send order
  const endpoint = process.env.NEXT_PUBLIC_VOICE_STREAM_URL ?? "/voice/stream";
  const sessionIdRef = useRef<string | null>(null);

  // small helper to read Blob -> dataURI
  const readBlobAsDataURL = (blob: Blob) =>
    new Promise<string>((res, rej) => {
      const fr = new FileReader();
      fr.onload = () => res(fr.result as string);
      fr.onerror = () => rej(new Error("Failed to read blob"));
      fr.readAsDataURL(blob);
    });

  // play audio safely
  const playAudioDataUri = async (dataUri: string | undefined) => {
    if (!dataUri || !audioRef.current) return;
    try {
      audioRef.current.src = dataUri;
      await audioRef.current.play();
    } catch (e) {
      console.warn("Playback failed:", e);
    }
  };

  // send chunk to backend (queue to preserve order)
  const sendChunk = async (dataUri: string) => {
    // chain on queueRef to keep ordering and avoid parallel flood
    sendQueueRef.current = sendQueueRef.current
      .catch(() => {}) // swallow previous errors so chain continues
      .then(async () => {
        try {
          // small payload: { session_id?, chunk: dataUri }
          const body = { session_id: sessionIdRef.current, chunk: dataUri };
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 25000); // 25s per chunk max
          setIsProcessing(true);
          const resp = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            signal: controller.signal,
          });
          clearTimeout(timeout);
          if (!resp.ok) {
            const txt = await resp.text().catch(() => "");
            console.warn("stream endpoint error:", resp.status, txt);
            return;
          }
          const json = await resp.json().catch(() => null);
          // backend contract: { audio?: "data:audio/wav;base64,...", text?: string, session_id?: string }
          if (json?.session_id) sessionIdRef.current = json.session_id;
          if (json?.audio) {
            await playAudioDataUri(json.audio);
          }
          if (json?.text) {
            setCallStatus(json.text);
          }
        } catch (err: any) {
          if (err.name === "AbortError") {
            console.warn("Chunk send aborted (timeout)");
          } else {
            console.error("sendChunk error:", err);
          }
        } finally {
          setIsProcessing(false);
        }
      });
    return sendQueueRef.current;
  };

  // Setup streaming on open
  useEffect(() => {
    let localStream: MediaStream | null = null;
    if (open) {
      setCallStatus("Requesting microphone...");
      (async () => {
        try {
          localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          streamRef.current = localStream;
          // choose supported mime
          const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
            ? "audio/webm;codecs=opus"
            : MediaRecorder.isTypeSupported("audio/webm")
            ? "audio/webm"
            : "audio/ogg;codecs=opus";

          const recorder = new MediaRecorder(localStream, { mimeType: mime });
          mediaRecorderRef.current = recorder;

          recorder.onstart = () => {
            setIsStreaming(true);
            setCallStatus("Live — you are connected");
          };

          // timeslice sends chunk every X ms (here ~900ms). Adjust if needed.
          recorder.ondataavailable = async (ev: BlobEvent) => {
            if (!ev.data || ev.data.size === 0) return;
            try {
              const dataUri = await readBlobAsDataURL(ev.data);
              // fire-and-forget but kept in queue to avoid spikes
              sendChunk(dataUri);
            } catch (e) {
              console.error("Failed reading chunk:", e);
            }
          };

          recorder.onerror = (e) => {
            console.error("recorder error", e);
          };

          recorder.start(900); // <--- important: sends chunk every 900ms (near realtime)
          setCallStatus("Live — streaming audio...");
          // optional: create session first by calling POST /session if needed
          // const s = await fetch('/session', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({user_name:'demo'})});
          // const j = await s.json(); sessionIdRef.current = j.session_id;
        } catch (err) {
          console.error("mic access failed:", err);
          setCallStatus("Microphone access denied. Allow mic and reopen demo.");
        }
      })();
    } else {
      // stop streaming & cleanup
      setCallStatus("Disconnected");
      setIsStreaming(false);
      setIsProcessing(false);
      // stop recorder
      try {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
          mediaRecorderRef.current.stop();
        }
      } catch {}
      // stop tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      mediaRecorderRef.current = null;
      streamRef.current = null;
      // wait for queue to drain optionally
      sendQueueRef.current = sendQueueRef.current.catch(() => {});
      sessionIdRef.current = null;
    }

    return () => {
      // cleanup on unmount
      try {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") mediaRecorderRef.current.stop();
      } catch {}
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
      mediaRecorderRef.current = null;
      streamRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleEndCall = async () => {
    // tell backend call ended (optional)
    try {
      if (sessionIdRef.current) {
        await fetch(endpoint + "/end", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionIdRef.current }),
        }).catch(() => {});
      }
    } catch {}
    // close UI
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-800 text-white">
        <DialogHeader className="items-center text-center">
          <DialogTitle className="text-2xl font-bold">AI Call Demo</DialogTitle>
          <DialogDescription>{callStatus}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-8 py-8">
          <div className="relative">
            <div className={cn("w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center transition-all", isProcessing && "scale-110")}>
              <Bot className="w-16 h-16 text-white" />
            </div>
            <div className={cn("absolute inset-0 rounded-full border-4 border-emerald-400/50", isProcessing && "animate-ping")}></div>
          </div>
          <p className="font-semibold text-xl">Fynorra AI Assistant</p>
        </div>

        <div className="flex justify-center items-center gap-4 bg-slate-800/50 p-4 rounded-xl">
          <div className={cn("h-16 w-16 rounded-full bg-slate-700/50 flex items-center justify-center text-white")}>
            {isStreaming ? <Mic className="h-7 w-7" /> : <Loader2 className="h-7 w-7 animate-spin" />}
          </div>

          <Button variant="destructive" size="icon" className="h-16 w-16 rounded-full" onClick={handleEndCall}>
            <PhoneOff className="h-7 w-7" />
          </Button>
        </div>

        <audio ref={audioRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
}
