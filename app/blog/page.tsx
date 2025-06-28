import { Metadata } from 'next';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BlogList } from "@/components/blog/blog-list";
import { BlogStats } from "@/components/blog/blog-stats";
import { getBlogPosts, getBlogStats, getBlogCategories } from "@/lib/blog-service";
import { BlogFilters } from '@/components/blog/blog-filters';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Fynorra Blog - AI Insights, Case Studies & Industry Trends',
  description: 'Explore expert insights on AI chatbots, custom LLMs, software development, and cloud solutions. Read case studies, tutorials, and industry trends from Fynorra.',
  keywords: [
    'AI blog',
    'chatbot development',
    'custom AI solutions',
    'machine learning',
    'software development',
    'cloud computing',
    'DevOps',
    'enterprise AI',
    'AI case studies',
    'technology insights'
  ],
  openGraph: {
    title: 'Fynorra Blog - AI Insights & Case Studies',
    description: 'Expert insights on AI chatbots, custom LLMs, software development, and cloud solutions.',
    url: 'https://www.fynorra.com/blog',
    type: 'website',
    images: [
      {
        url: '/blog-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fynorra Blog - AI Insights & Case Studies',
      },
    ],
  },
  alternates: {
    canonical: '/blog',
  },
};

interface BlogPageProps {
  searchParams: {
    page?: string;
    category?: string;
    tag?: string;
    author?: string;
    search?: string;
    sort?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const page = parseInt(searchParams.page || '1');
  const limit = 12;
  
  // Fetch blog data
  const [posts, stats, categories] = await Promise.all([
    getBlogPosts({
      page,
      category: searchParams.category,
      tag: searchParams.tag,
      author: searchParams.author,
      search: searchParams.search,
      sortBy: searchParams.sort as any,
    }),
    getBlogStats(),
    getBlogCategories(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
                Fynorra Blog
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Expert insights on AI chatbots, custom LLMs, software development, and cloud solutions. 
                Stay ahead with our latest case studies, tutorials, and industry trends.
              </p>
              
              {/* Blog Stats */}
              <BlogStats stats={stats} />
              
              {/* Guest Author CTA */}
              <div className="mt-8 p-6 bg-primary/10 rounded-2xl border border-primary/20">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Share Your Expertise
                </h3>
                <p className="text-slate-300 mb-4">
                  Have insights on AI implementation, business automation, or tech innovation? 
                  Write for our community of 10,000+ tech professionals.
                </p>
                <Link 
                  href="/blog/guest-author"
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                >
                  Submit Your Article
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Filters */}
              <div className="lg:col-span-1">
                <BlogFilters 
                  categories={categories}
                  currentFilters={searchParams}
                />
                
                {/* Guest Author Sidebar CTA */}
                <div className="mt-8 p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <h4 className="text-lg font-semibold text-white mb-3">
                    Write for Fynorra
                  </h4>
                  <p className="text-slate-300 text-sm mb-4">
                    Share your AI success stories and insights with our community.
                  </p>
                  <Link 
                    href="/blog/guest-author"
                    className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    Submit Article
                  </Link>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <BlogList 
                  posts={posts.posts}
                  total={posts.total}
                  page={page}
                  limit={limit}
                  hasMore={posts.hasMore}
                  currentFilters={searchParams}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-primary/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated with AI Insights</h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Get the latest AI trends, case studies, and technical insights delivered to your inbox weekly.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-50 placeholder:text-slate-400 focus:outline-none focus:border-primary"
                />
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-slate-400 mt-2">
                No spam, unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

    