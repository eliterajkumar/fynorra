'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, Bot } from 'lucide-react';


interface CallDemoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CallDemo({ open, onOpenChange }: CallDemoProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [callStatus, setCallStatus] = useState('Ringing...');

  const handleEndCall = () => {
    onOpenChange(false);
    // Reset state on close
    setTimeout(() => {
      setCallStatus('Ringing...');
    }, 300);
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
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center">
                    <Bot className="w-16 h-16 text-white" />
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-emerald-400/50 animate-ping"></div>
            </div>
            <p className="font-semibold text-xl">Fynorra AI Assistant</p>
        </div>

        <div className="flex justify-center items-center gap-4 bg-slate-800/50 p-4 rounded-xl">
            <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full bg-slate-700/50 hover:bg-slate-700" onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full bg-slate-700/50 hover:bg-slate-700" onClick={() => setIsDeafened(!isDeafened)}>
                {isDeafened ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
            </Button>
             <Button variant="destructive" size="icon" className="h-16 w-16 rounded-full" onClick={handleEndCall}>
                <PhoneOff className="h-7 w-7" />
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
