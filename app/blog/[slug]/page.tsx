// src/app/blog/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BlogPost } from "@/components/blog/blog-post";
import { RelatedPosts } from "@/components/blog/related-posts";
import { BlogPostSchema } from "@/components/seo/blog-post-schema";
import { getBlogPost, getRelatedPosts } from "@/lib/blog-service";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found - Fynorra Blog',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.seoKeywords,
    authors: post.author ? [{ name: post.author.name }] : undefined,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: 'article',
      url: `https://www.fynorra.com/blog/${post.slug}`,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: post.author ? [post.author.name] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: [post.coverImage],
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.id, 3);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Blog Post Schema */}
        <BlogPostSchema post={post} />
        
        {/* Blog Post Content */}
        <BlogPost post={post} />
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-slate-900/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <RelatedPosts posts={relatedPosts} currentPostSlug={post.slug} />
            </div>
          </section>
        )}
        
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

    