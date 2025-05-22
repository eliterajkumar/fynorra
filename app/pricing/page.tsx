
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Tags } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

interface PricingTier {
  id: string; // e.g., "small-business", "custom-ai-chatbot", "enterprise-ai"
  title: string;
  description: string;
  features?: string[];
  isPlaceholder?: boolean;
  ctaText?: string;
  order: number; // To control tab order
}

function getSamplePricingTiers(): PricingTier[] {
  return [
    {
      id: 'small-business',
      title: 'Small Business',
      description: 'Contact us for personalized pricing and solutions for your growing business.',
      isPlaceholder: true,
      ctaText: 'Get in Touch',
      order: 1,
    },
    {
      id: 'custom-ai-chatbot',
      title: 'Custom AI Chatbot',
      description: 'Develop a bespoke AI chatbot tailored to your specific customer service, sales, or internal process needs.',
      features: [
        'Tailored conversation flows',
        'CRM/software integration',
        'Advanced analytics & reporting',
        'Dedicated support & training',
      ],
      ctaText: 'Get a Custom Quote',
      order: 2,
    },
    {
      id: 'enterprise-ai',
      title: 'Enterprise AI',
      description: 'Contact us for personalized pricing and comprehensive AI solutions for large organizations.',
      isPlaceholder: true,
      ctaText: 'Get in Touch',
      order: 3,
    },
  ].sort((a, b) => a.order - b.order);
}

async function getPricingTiers(): Promise<PricingTier[]> {
  try {
    const tiersCollection = collection(db, "pricingTiers");
    const q = query(tiersCollection, orderBy("order", "asc")); 
    const tiersSnapshot = await getDocs(q);
    const tiersList = tiersSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || 'Untitled Tier',
        description: data.description || 'No description available.',
        features: data.features || [],
        isPlaceholder: data.isPlaceholder || false,
        ctaText: data.ctaText || 'Get in Touch',
        order: data.order || 99,
      } as PricingTier;
    });
    
    if (tiersList.length === 0) {
      console.warn("No pricing tiers found in Firestore, using sample data.");
      return getSamplePricingTiers();
    }
    return tiersList;
  } catch (error) {
    console.error("Error fetching pricing tiers from Firestore:", error);
    return getSamplePricingTiers();
  }
}

export default async function PricingPage() {
  const pricingTiers = await getPricingTiers();
  const defaultTab = pricingTiers.find(tier => tier.id === 'custom-ai-chatbot') || pricingTiers.find(tier => tier.order === 2) || pricingTiers[0];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <Tags className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Tailored to your needs
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Custom pricing for custom solutions. We work with you to find the perfect fit.
          </p>
        </header>

        {/* Pricing Tabs Section */}
        <section className="mb-12">
          {pricingTiers.length > 0 && defaultTab ? (
            <Tabs defaultValue={defaultTab.id} className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-10 h-auto sm:h-12 bg-slate-800/60 p-1.5 rounded-lg shadow-md">
                {pricingTiers.map((tier) => (
                  <TabsTrigger
                    key={tier.id}
                    value={tier.id}
                    className="py-2.5 text-sm sm:text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-xl rounded-md text-slate-300 hover:text-slate-50 data-[state=inactive]:hover:bg-slate-700/50 transition-all duration-200"
                  >
                    {tier.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {pricingTiers.map((tier) => (
                <TabsContent key={tier.id} value={tier.id}>
                  <Card className="bg-slate-800/70 border-slate-700/50 shadow-xl backdrop-blur-sm">
                    <CardHeader className="text-center pb-6 pt-8">
                      <CardTitle className="text-3xl font-semibold text-primary">{tier.title}</CardTitle>
                      <CardDescription className="text-slate-300 mt-3 text-base leading-relaxed max-w-xl mx-auto">
                        {tier.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2 pb-8 px-6 sm:px-10">
                      {tier.features && tier.features.length > 0 && !tier.isPlaceholder && (
                        <ul className="space-y-4 mb-10 text-slate-200 max-w-md mx-auto">
                          {tier.features.map((feature, index) => (
                            <li key={index} className="flex items-start text-left">
                              <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5 shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                       {(tier.isPlaceholder && (!tier.features || tier.features.length === 0)) && (
                        <div className="my-8 text-center text-slate-400">
                          {/* Placeholder description is already in CardHeader, so this space can be minimal or show specific placeholder content if needed */}
                        </div>
                      )}
                      <Link href="/contact" passHref>
                        <Button size="lg" className="w-full max-w-xs mx-auto group text-base flex items-center justify-center">
                          {tier.ctaText || "Get in Touch"}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="text-center text-slate-400 py-10">
              <p className="text-xl">Pricing information is currently unavailable.</p>
              <p className="mt-2">Please check back later or contact us for details.</p>
              <Link href="/contact" passHref className="mt-6 inline-block">
                <Button>Contact Us</Button>
              </Link>
            </div>
          )}
        </section>

        {/* General CTA and Customization Note */}
        <section className="text-center mt-20 py-10 bg-slate-800/30 rounded-xl shadow-lg">
          <h3 className="text-2xl font-semibold text-slate-100 mb-3">Don’t see exactly what you need?</h3>
          <p className="text-lg text-slate-300 mb-6 max-w-xl mx-auto">
            Our solutions are highly customizable to match your unique business requirements.
          </p>
          <Link href="/contact" passHref>
            <Button variant="outline" size="lg" className="border-primary/70 text-primary hover:bg-primary/10 hover:text-primary-foreground">
              Contact us for a personalized consultation
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
