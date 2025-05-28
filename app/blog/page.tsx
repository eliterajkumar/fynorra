
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, Mail, Library, CalendarDays, Tag, Rss } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { SubscribeForm } from "./_components/subscribe-form";

export interface BlogPost {
  id: string;
  title: string;
  snippet: string;
  date: string;
  category: string;
  imageUrl?: string;
  slug: string; // Added slug for linking
  dataAiHint?: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const postsCollection = collection(db, "blogPosts");
    const q = query(postsCollection, orderBy("date", "desc"));
    const postsSnapshot = await getDocs(q);
    const postsList = postsSnapshot.docs.map(doc => {
      const data = doc.data();
      return { 
        id: doc.id,
        title: data.title || "Untitled Post",
        snippet: data.snippet || "No snippet available.",
        date: data.date || new Date().toISOString().split('T')[0],
        category: data.category || "Uncategorized",
        imageUrl: data.imageUrl,
        slug: data.slug || doc.id, // Use slug from data or fallback to doc.id
        dataAiHint: data.dataAiHint,
      } as BlogPost;
    });
    
    if (postsList.length === 0) {
        return getSampleBlogPosts();
    }
    return postsList;
  } catch (error) {
    console.error("Error fetching blog posts from Firestore:", error);
    return getSampleBlogPosts();
  }
}

// Ensure sample posts also have slugs and dataAiHint
function getSampleBlogPosts(): BlogPost[] {
  return [
    { id: '1', title: 'The Future of AI in Enterprise Solutions', snippet: 'Explore how artificial intelligence is reshaping industries and what it means for your business.', date: '2025-05-25', category: 'AI Trends', imageUrl: '/futureai 2.png', slug: 'future-of-ai-in-enterprise', dataAiHint: 'technology abstract' },
    { id: '2', title: 'Mastering DevOps for Scalable Applications', snippet: 'A deep dive into DevOps practices that ensure reliability and scalability for modern applications.', date: '2025-05-25', category: 'Software Development', imageUrl: '/devops.png', slug: 'mastering-devops-for-scalability', dataAiHint: 'cloud server' },
    { id: '3', title: 'Automating Business Processes with Custom Chatbots', snippet: 'Discover the benefits of custom chatbots and how they can streamline customer interactions.', date: '2025-05-25', category: 'Business Automation', imageUrl: '/chatbot.png', slug: 'automating-with-chatbots', dataAiHint: 'robot chat' },
    { id: '4', title: 'Tech Insights: Navigating the Cloud Landscape', snippet: 'Understand the different cloud models and choose the right strategy for your organization.', date: '2025-05-25', category: 'Tech Insights', imageUrl: '/Cloud.png', slug: 'navigating-the-cloud-landscape', dataAiHint: 'cloud computing' },
  ];
}

const categories = ['AI Trends', 'Software Development', 'Business Automation', 'Tech Insights', 'Cloud & DevOps', 'Cybersecurity'];

export default async function BlogPage() {
  const allPosts = await getBlogPosts();
  const featuredPost = allPosts.length > 0 ? allPosts[0] : null;
  const recentPosts = allPosts.length > 1 ? allPosts.slice(1) : (allPosts.length === 1 && !featuredPost ? allPosts : []);


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <Rss className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Fynorra Blog: Insights on AI & Innovation
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Stay updated with the latest trends, tips, and innovations in AI and software solutions.
          </p>
        </header>

        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center sm:text-left">Featured Post</h2>
            <Card className="bg-slate-800/50 border-primary/30 shadow-xl overflow-hidden md:flex md:flex-row">
              {featuredPost.imageUrl && (
                <div className="md:w-1/2">
                  <Image
                    src={featuredPost.imageUrl}
                    alt={featuredPost.title}
                    width={800}
                    height={400}
                    className="w-full h-64 md:h-full object-cover"
                    data-ai-hint={featuredPost.dataAiHint || "technology blog"}
                  />
                </div>
              )}
              <div className={`p-6 md:p-8 flex flex-col justify-center ${featuredPost.imageUrl ? 'md:w-1/2' : 'w-full'}`}>
                <CardHeader className="p-0 mb-3">
                  <CardTitle className="text-2xl font-semibold text-primary mb-1">{featuredPost.title}</CardTitle>
                  <div className="flex items-center text-sm text-slate-400 space-x-4">
                    <span className="flex items-center"><CalendarDays className="h-4 w-4 mr-1.5" /> {featuredPost.date}</span>
                    <span className="flex items-center"><Tag className="h-4 w-4 mr-1.5" /> {featuredPost.category}</span>
                  </div>
                </CardHeader>
                <CardDescription className="text-slate-300 mb-6 text-base leading-relaxed line-clamp-3">
                  {featuredPost.snippet}
                </CardDescription>
                <Link href={`/blog/${featuredPost.slug}`}>
                  <Button className="group mt-auto w-full sm:w-auto">
                    Read More <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </Card>
          </section>
        )}

        {/* Main Content Area: Recent Posts & Sidebar */}
        <div className="lg:flex lg:gap-12">
          {/* Recent Posts */}
          <section className="lg:w-2/3">
            <h2 className="text-3xl font-bold mb-8 text-center sm:text-left">Recent Posts</h2>
            {recentPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {recentPosts.map((post) => (
                  <Card key={post.id} className="bg-slate-800/50 border-slate-700/50 shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
                     {post.imageUrl && (
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        width={600}
                        height={300} // Adjusted height for a 2:1 aspect ratio or similar
                        className="w-full h-48 object-cover rounded-t-lg"
                        data-ai-hint={post.dataAiHint || "technology article"}
                      />
                    )}
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-primary group-hover:text-primary-dark transition-colors">{post.title}</CardTitle>
                       <div className="flex items-center text-xs text-slate-400 space-x-3 pt-1">
                        <span className="flex items-center"><CalendarDays className="h-3 w-3 mr-1" /> {post.date}</span>
                        <span className="flex items-center"><Tag className="h-3 w-3 mr-1" /> {post.category}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">{post.snippet}</p>
                    </CardContent>
                    <div className="p-6 pt-0 mt-auto">
                       <Link href={`/blog/${post.slug}`}>
                        <Button variant="outline" className="w-full group text-sm border-primary/50 hover:bg-primary/10 hover:text-primary">
                          Read More <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
               featuredPost ? (
                <p className="text-slate-400">No other recent posts available. Check back soon!</p>
              ) : (
                <p className="text-slate-400">No blog posts available at the moment. Please check back soon!</p>
              )
            )}
          </section>

          {/* Sidebar */}
          <aside className="lg:w-1/3 mt-16 lg:mt-0">
             <div className="sticky top-24"> {/* Makes sidebar sticky */}
                <Card className="bg-slate-800/50 border-slate-700/50 shadow-lg p-6">
                  <h3 className="text-2xl font-semibold text-primary mb-6">Categories</h3>
                  <ul className="space-y-3">
                    {categories.map((category) => (
                      <li key={category}>
                        <Link href={`/blog/category/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} 
                              className="flex items-center text-slate-300 hover:text-primary transition-colors group text-lg">
                          <Library className="h-5 w-5 mr-3 text-primary/70 group-hover:text-primary transition-colors" /> 
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Subscribe Section in Sidebar */}
                <Card className="bg-slate-800/50 border-slate-700/50 shadow-lg p-6 mt-8">
                  <h3 className="text-2xl font-semibold text-primary mb-2">Stay Updated</h3>
                  <p className="text-slate-400 mb-4 text-sm">Get the latest insights directly to your inbox.</p>
                  <SubscribeForm />
                </Card>
              </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

    