import { Metadata } from 'next';
import { GuestAuthorForm } from '@/components/blog/guest-author-form';
import { GuestAuthorGuidelines } from '@/components/blog/guest-author-guidelines';

export const metadata: Metadata = {
  title: 'Write for Fynorra - Guest Author Program',
  description: 'Share your AI and business insights with our community. Submit guest blog posts about AI implementation, business automation, and technology innovation.',
  keywords: [
    'guest blogging',
    'AI writing opportunities',
    'business technology blog',
    'AI implementation stories',
    'tech guest posts',
    'business automation blog'
  ],
  openGraph: {
    title: 'Write for Fynorra - Guest Author Program',
    description: 'Share your AI and business insights with our community of technology leaders and innovators.',
    type: 'website',
    url: 'https://fynorra.com/blog/guest-author',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Write for Fynorra - Guest Author Program',
    description: 'Share your AI and business insights with our community.',
  },
};

export default function GuestAuthorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Write for <span className="text-primary">Fynorra</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Share your expertise in AI, business automation, and technology innovation with our growing community of technology leaders and innovators.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Reach 10,000+ tech professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Build your personal brand</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Share your success stories</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Guest Author Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-white mb-6">Submit Your Article</h2>
            <GuestAuthorForm />
          </div>

          {/* Guidelines and Benefits */}
          <div className="space-y-8">
            <GuestAuthorGuidelines />
            
            {/* Success Stories */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <h3 className="text-xl font-bold text-white mb-6">Featured Guest Authors</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">SC</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Sarah Chen</h4>
                    <p className="text-slate-400 text-sm">CTO, TechFlow Solutions</p>
                    <p className="text-slate-300 mt-2">
                      "Writing for Fynorra helped us showcase our AI implementation success and generated 15 new leads within a month."
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">MR</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Marcus Rodriguez</h4>
                    <p className="text-slate-400 text-sm">AI Director, InnovateCorp</p>
                    <p className="text-slate-300 mt-2">
                      "The exposure from Fynorra's platform led to speaking opportunities at major tech conferences."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 