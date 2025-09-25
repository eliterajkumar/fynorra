'use client';

import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Loader2, Send, User } from 'lucide-react';
import { submitQuery } from '@/app/actions';
import { getDemo, type Demo } from '@/lib/demos';

interface InteractiveDemoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  demoId: string | null;
}

type Message = {
  role: 'user' | 'ai' | 'loading';
  content: string;
};

export function InteractiveDemo({ open, onOpenChange, demoId }: InteractiveDemoProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [demo, setDemo] = useState<Demo | null>(null);

  useEffect(() => {
    if (open) {
      const currentDemo = getDemo(demoId);
      setDemo(currentDemo);
      setMessages([
        { role: 'ai', content: currentDemo.greeting }
      ]);
    } else {
      // Reset when closed
      setMessages([]);
      setDemo(null);
    }
  }, [open, demoId]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage, { role: 'loading', content: '' }]);
    setInput('');
    setIsLoading(true);

    try {
      let reply = "Sorry, I'm not sure how to respond to that. Please try another question.";
      if (demo?.assistant_replies) {
          const lowerCaseInput = input.toLowerCase();
          const matchingReply = demo.assistant_replies.find(r => lowerCaseInput.includes(r.match));
          if(matchingReply) {
              reply = matchingReply.reply;
          } else {
            // Fallback to genkit if no canned response
            const result = await submitQuery(input);
            reply = result.answer;
          }
      } else {
        const result = await submitQuery(input);
        reply = result.answer;
      }
      
      const aiMessage: Message = { role: 'ai', content: reply };
      setMessages(prev => [...prev.filter(m => m.role !== 'loading'), aiMessage]);

    } catch (error) {
      const errorMessage: Message = { role: 'ai', content: 'Sorry, I ran into an error. Please try again.' };
      setMessages(prev => [...prev.filter(m => m.role !== 'loading'), errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSampleQueryClick = (query: string) => {
    setInput(query);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            
            <span className="font-body">{demo?.title || 'Live Demo'}</span>
          </DialogTitle>
          <DialogDescription>
            {demo?.subtitle || 'This is an interactive demo. Your conversation is not stored.'}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-hidden">
            <ScrollArea className="h-full p-6" ref={scrollAreaRef}>
            <div className="space-y-6">
                {messages.map((message, index) => (
                <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                    {message.role === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <Bot className="w-5 h-5 text-primary-foreground" />
                    </div>
                    )}
                    
                    {message.role !== 'loading' && (
                    <div className={`max-w-md p-3 rounded-lg ${message.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-card'}`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    )}

                    {message.role === 'loading' && (
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                                <Bot className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                        </div>
                    )}
                    
                    {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-slate-200" />
                    </div>
                    )}
                </div>
                ))}
            </div>
            </ScrollArea>
        </div>
        <div className="p-4 border-t space-y-3">
          {demo && (
            <div className="flex flex-wrap gap-2">
              {demo.sample_user_queries.map((query, i) => (
                <Button key={i} size="sm" variant="outline" onClick={() => handleSampleQueryClick(query)} className="text-xs h-auto py-1 px-2">
                  {query}
                </Button>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., 'Tell me about your CRM integration'"
              className="flex-grow"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
