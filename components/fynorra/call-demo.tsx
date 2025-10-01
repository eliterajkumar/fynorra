'use client';

import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, Bot, Loader2 } from 'lucide-react';
import { submitAudio } from '@/app/actions';
import { cn } from '@/lib/utils';

interface CallDemoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CallDemo({ open, onOpenChange }: CallDemoProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [callStatus, setCallStatus] = useState('Connecting...');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);

  // Initialize MediaRecorder
  useEffect(() => {
    if (open) {
      setCallStatus('Connected. Hold mic to speak.');
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const recorder = new MediaRecorder(stream);
          recorder.ondataavailable = event => {
            setAudioChunks(chunks => [...chunks, event.data]);
          };
          setMediaRecorder(recorder);
        })
        .catch(err => {
            console.error("Mic access denied:", err);
            setCallStatus("Microphone access denied.");
        });
    } else {
       // Cleanup on close
       mediaRecorder?.stream.getTracks().forEach(track => track.stop());
       setMediaRecorder(null);
       setCallStatus('Connecting...');
       setIsAgentSpeaking(false);
    }
  }, [open]);

  const handleMicPress = () => {
    if (mediaRecorder && !isRecording && !isAgentSpeaking) {
      setAudioChunks([]);
      mediaRecorder.start();
      setIsRecording(true);
      setCallStatus('Listening...');
    }
  };

  const handleMicRelease = async () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setIsProcessing(true);
      setCallStatus('Thinking...');

      // Wait for data to be available
      setTimeout(async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result as string;
          try {
            const result = await submitAudio(base64Audio);
            if (result.audio) {
              if(audioRef.current) {
                audioRef.current.src = result.audio;
                audioRef.current.play();
                setIsAgentSpeaking(true);
                setCallStatus('AI is speaking...');
              }
            } else {
                setCallStatus('No audio response.');
                setIsAgentSpeaking(false);
            }
          } catch (error) {
            console.error('Error processing audio:', error);
            setCallStatus('Error processing audio.');
            setIsAgentSpeaking(false);
          } finally {
            setIsProcessing(false);
            // Don't reset call status here, let audio end handler do it
          }
        };
      }, 100);
    }
  };

  const handleEndCall = () => {
    onOpenChange(false);
  };
  
  useEffect(() => {
    const audioEl = audioRef.current;
    const handleAudioEnd = () => {
      setIsAgentSpeaking(false);
      setCallStatus('Connected. Hold mic to speak.');
    };
    if (audioEl) {
      audioEl.addEventListener('ended', handleAudioEnd);
      return () => audioEl.removeEventListener('ended', handleAudioEnd);
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-800 text-white">
        <DialogHeader className="items-center text-center">
         
          <DialogTitle className="text-2xl font-bold">AI Call Demo</DialogTitle>
          <DialogDescription>{callStatus}</DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center gap-8 py-8">
            <div className="relative">
                <div className={cn("w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center transition-all", isAgentSpeaking && "scale-110")}>
                    <Bot className="w-16 h-16 text-white" />
                </div>
                <div className={cn("absolute inset-0 rounded-full border-4 border-emerald-400/50", isAgentSpeaking && "animate-ping")}></div>
            </div>
            <p className="font-semibold text-xl">Fynorra AI Assistant</p>
        </div>

        <div className="flex justify-center items-center gap-4 bg-slate-800/50 p-4 rounded-xl">
            <Button 
                variant="ghost" 
                size="icon" 
                className={cn("h-16 w-16 rounded-full bg-slate-700/50 hover:bg-slate-700 transition-all", isRecording && "bg-red-500 scale-110", (isProcessing || isAgentSpeaking) && "opacity-50")}
                onMouseDown={handleMicPress}
                onMouseUp={handleMicRelease}
                onTouchStart={handleMicPress}
                onTouchEnd={handleMicRelease}
                disabled={isProcessing || isAgentSpeaking || !mediaRecorder}
            >
                {isProcessing ? <Loader2 className="h-7 w-7 animate-spin"/> : <Mic className="h-7 w-7" />}
            </Button>
            <Button variant="destructive" size="icon" className="h-16 w-16 rounded-full" onClick={handleEndCall}>
                <PhoneOff className="h-7 w-7" />
            </Button>
        </div>
        <audio ref={audioRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
}
