import { AppWindow, BarChartBig, BrainCircuit, Database } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: BrainCircuit,
    title: 'RAG Grounding',
    description: 'Provides accurate, context-aware answers by grounding responses in your own data.',
  },
  {
    icon: AppWindow,
    title: 'Multi-Channel Support',
    description: 'Engage customers on your website, WhatsApp, Instagram, and more from one platform.',
  },
  {
    icon: Database,
    title: 'CRM Sync',
    description: 'Automatically sync conversations and customer data with your existing CRM.',
  },
  {
    icon: BarChartBig,
    title: 'Advanced Analytics',
    description: 'Gain insights into customer interactions and sales performance with a powerful dashboard.',
  },
];

export function FeaturesGrid() {
  return (
    <div className="container">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold text-slate-100">Enterprise-Grade Power, SMB Simplicity</h2>
        <p className="mt-2 text-lg text-foreground/80 max-w-2xl mx-auto">Everything you need to build a world-class customer experience.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Card key={index} className="bg-card/70 border-border/70 p-4 text-center hover:-translate-y-2 transition-transform duration-300">
            <CardHeader className="items-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <feature.icon className="h-7 w-7" />
              </div>
              <CardTitle className="font-body text-xl font-semibold text-slate-200">{feature.title}</CardTitle>
            </CardHeader>
            <CardDescription className="text-foreground/80">
              {feature.description}
            </CardDescription>
          </Card>
        ))}
      </div>
    </div>
  );
}
