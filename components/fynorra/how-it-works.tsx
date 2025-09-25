import { BrainCircuit, MessageSquareQuote, MousePointerClick, Rocket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: MousePointerClick,
    title: 'Step 1: Connect',
    description: 'Easily link your product catalogs, documents, and past conversations.',
  },
  {
    icon: BrainCircuit,
    title: 'Step 2: Train',
    description: 'Our AI ingests your data, becoming a true expert on your brand and offerings.',
  },
  {
    icon: MessageSquareQuote,
    title: 'Step 3: Deploy',
    description: 'Integrate your new AI assistant across your website, WhatsApp, and social media.',
  },
  {
    icon: Rocket,
    title: 'Step 4: Grow',
    description: 'Watch your sales and customer satisfaction soar with 24/7 expert assistance.',
  },
];

export function HowItWorks() {
  return (
    <div className="container">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold text-slate-100">Four Steps to AI-Powered Sales</h2>
        <p className="mt-2 text-lg text-foreground/80 max-w-2xl mx-auto">Go from setup to selling in minutes. It’s that simple.</p>
      </div>
      <div className="relative">
        <div className="absolute left-1/2 top-7 hidden h-[2px] w-full max-w-2xl -translate-x-1/2 bg-border/50 md:block"></div>
        <div className="grid gap-12 md:grid-cols-4 md:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center relative">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/30 text-primary z-10 bg-card">
                <step.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-200">{step.title}</h3>
              <p className="text-foreground/80">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
