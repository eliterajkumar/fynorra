import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const pricingTiers = [
  {
    name: 'Pilot',
    price: '$199',
    description: 'For small teams getting started with AI.',
    features: ['1 AI Assistant', 'Website Chat', '500 conversations/mo'],
    isPopular: false,
  },
  {
    name: 'MVP',
    price: '$499',
    description: 'For growing businesses ready to scale.',
    features: ['3 AI Assistants', 'Multi-channel Support', '2,000 conversations/mo', 'Basic Analytics'],
    isPopular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with custom needs.',
    features: ['Unlimited Assistants', 'CRM Sync', 'Advanced Analytics', 'Dedicated Support'],
    isPopular: false,
  },
];

export function Pricing() {
  return (
    <div className="container">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold text-slate-100">Find the Perfect Plan</h2>
        <p className="mt-2 text-lg text-foreground/80 max-w-2xl mx-auto">Start your pilot today. Cancel anytime. No hidden fees.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {pricingTiers.map((tier) => (
          <Card
            key={tier.name}
            className={cn(
              'flex flex-col bg-card/70 border-border/70 shadow-lg transition-transform duration-300',
              tier.isPopular && 'border-2 border-accent/80 -translate-y-4'
            )}
          >
            {tier.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-sm font-semibold text-accent-foreground">
                Most Popular
              </div>
            )}
            <CardHeader className="pt-10">
              <CardTitle className="text-2xl font-bold text-slate-200">{tier.name}</CardTitle>
              <CardDescription className="text-foreground/80">{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-6">
                <span className="text-5xl font-bold text-slate-100">{tier.price}</span>
                {tier.price.startsWith('$') && <span className="text-foreground/60">/mo</span>}
              </div>
              <ul className="space-y-3 text-left">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-emerald-500" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={cn(
                  'w-full',
                  tier.isPopular ? 'bg-accent text-accent-foreground hover:bg-accent/90' : 'bg-primary hover:bg-primary/90'
                )}
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
