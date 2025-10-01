import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Bot, Cable, Phone, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroProps {
  onTryDemo: () => void;
}

const trustBadges = [
    { icon: Zap, text: "Live WhatsApp" },
    { icon: Bot, text: "RAG-backed answers" },
    { icon: Cable, text: "CRM Sync" },
    { icon: ShieldCheck, text: "GDPR-aware" },
];

export function Hero({ onTryDemo }: HeroProps) {
  const heroImage = PlaceHolderImages.find(p => p.id === 'fynorra-hero');

  return (
    <section className="relative w-full overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-900/80"></div>
        <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-start gap-6 animate-in fade-in slide-in-from-bottom-12 duration-600">
                <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
                    Your AI Sales Expert, On-Demand
                </h1>
                <p className="max-w-xl text-lg text-foreground/80 md:text-xl">
                    Fynorra empowers jewelers and SMBs with a world-class AI assistant that masters your product knowledge and supercharges your sales.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                        size="lg" 
                        onClick={onTryDemo} 
                        className="bg-gradient-to-r from-emerald-600 to-indigo-600 text-white font-semibold shadow-lg hover:-translate-y-1 transition-transform duration-200 active:scale-95"
                    >
                        <Phone className="w-5 h-5 mr-2" />
                        Call Demo
                    </Button>
                    <Button 
                        size="lg" 
                        variant="outline"
                        className="bg-transparent border-2 border-slate-700 hover:border-slate-500 hover:bg-slate-800 transition-all duration-200"
                    >
                        Book 15-min demo
                    </Button>
                </div>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                    {trustBadges.map((badge, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-foreground/60">
                            <badge.icon className="h-4 w-4 text-emerald-500" />
                            <span>{badge.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative h-64 md:h-auto animate-in fade-in zoom-in-95 duration-600 delay-150">
                {heroImage && (
                    <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description}
                        fill
                        className="object-cover rounded-2xl shadow-2xl shadow-indigo-900/50"
                        data-ai-hint={heroImage.imageHint}
                    />
                )}
            </div>
        </div>
    </section>
  );
}
