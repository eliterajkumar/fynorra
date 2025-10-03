"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PhoneOff, Mic, Loader2, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const sendQueueRef = useRef<Promise<any>>(Promise.resolve());
  const endpoint = process.env.NEXT_PUBLIC_VOICE_STREAM_URL ?? "/voice/stream";
  const sessionIdRef = useRef<string | null>(null);

  const readBlobAsDataURL = (blob: Blob) =>
    new Promise<string>((res, rej) => {
      const fr = new FileReader();
      fr.onload = () => res(fr.result as string);
      fr.onerror = () => rej(new Error("Failed to read blob"));
      fr.readAsDataURL(blob);
    });

  const playAudioDataUri = async (dataUri: string | undefined) => {
    if (!dataUri || !audioRef.current) return;
    try {
      audioRef.current.src = dataUri;
      await audioRef.current.play();
    } catch (e) {
      console.warn("Playback failed:", e);
    }
  };

  const sendChunk = async (dataUri: string) => {
    sendQueueRef.current = sendQueueRef.current.catch(() => {}).then(async () => {
      try {
        const body = { session_id: sessionIdRef.current, chunk: dataUri };
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 25000);
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
        if (json?.session_id) sessionIdRef.current = json.session_id;
        if (json?.audio) await playAudioDataUri(json.audio);
        if (json?.text) setCallStatus(json.text); // Updates to "Hey, how can I help you today?"
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

  useEffect(() => {
    if (open) {
      setCallStatus("Connecting...");
      (async () => {
        try {
          // Initialize session with backend
          const sessionResp = await fetch(endpoint + "/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_name: "demo" }),
          });
          const sessionJson = await sessionResp.json();
          sessionIdRef.current = sessionJson.session_id;

          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          streamRef.current = stream;
          const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
            ? "audio/webm;codecs=opus"
            : MediaRecorder.isTypeSupported("audio/webm")
            ? "audio/webm"
            : "audio/ogg;codecs=opus";

          const recorder = new MediaRecorder(stream, { mimeType: mime });
          mediaRecorderRef.current = recorder;

          recorder.onstart = () => {
            setIsStreaming(true);
            setCallStatus("Live — you are connected");
          };

          recorder.ondataavailable = async (ev: BlobEvent) => {
            if (!ev.data || ev.data.size === 0) return;
            try {
              const dataUri = await readBlobAsDataURL(ev.data);
              sendChunk(dataUri);
            } catch (e) {
              console.error("Failed reading chunk:", e);
            }
          };

          recorder.onerror = (e) => {
            console.error("recorder error", e);
          };

          recorder.start(900);
        } catch (err) {
          console.error("mic access or session failed:", err);
          setCallStatus("Microphone access denied or session failed. Please try again.");
        }
      })();
    } else {
      setCallStatus("Disconnected");
      setIsStreaming(false);
      setIsProcessing(false);
      try {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
          mediaRecorderRef.current.stop();
        }
      } catch {}
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      mediaRecorderRef.current = null;
      streamRef.current = null;
      sendQueueRef.current = sendQueueRef.current.catch(() => {});
      sessionIdRef.current = null;
    }

    return () => {
      try {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") mediaRecorderRef.current.stop();
      } catch {}
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
      mediaRecorderRef.current = null;
      streamRef.current = null;
    };
  }, [open]);

  const handleEndCall = async () => {
    try {
      if (sessionIdRef.current) {
        await fetch(endpoint + "/end", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionIdRef.current }),
        }).catch(() => {});
      }
    } catch {}
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