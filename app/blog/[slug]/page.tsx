
// src/app/blog/[slug]/page.tsx
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, CalendarDays, Tag, Edit3 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PostData {
  slug: string;
  title: string;
  date: string;
  category: string;
  imagePrompt: string;
  imageUrl: string; // Using a placeholder for now
  contentHtml: string; // Full HTML content for the blog post
  snippet: string;
}

// In a real app, this would fetch from Firestore or a CMS
// For now, we'll use a hardcoded map for sample posts
const blogPostsData: Record<string, PostData> = {
  'future-of-ai-in-enterprise': {
    slug: 'future-of-ai-in-enterprise',
    title: 'The Future of AI in Enterprise Solutions',
    date: '2025-05-25',
    category: 'AI Trends',
    imageUrl: '/futureai.png', // Placeholder image
    imagePrompt: "A futuristic office with AI-powered holographic dashboards, businesspeople collaborating with humanoid robots, digital data streams floating in the air, clean minimal style, corporate tech environment, blue tones, enterprise technology theme.",
    snippet: 'Explore how artificial intelligence is reshaping industries and what it means for your business.',
    contentHtml: `
      <p class="text-lg text-slate-300 leading-relaxed mb-6">Artificial Intelligence (AI) is no longer a buzzword—it's a business revolution. From automating tasks to making smarter decisions, AI is transforming how enterprises function, grow, and compete.</p>
      <p class="text-lg text-slate-300 leading-relaxed mb-8">In this blog, we explore how AI is reshaping industries and what it means for the future of your business.</p>

      <h2 class="text-2xl font-semibold text-primary mt-10 mb-4">1. Smarter Operations with AI Automation</h2>
      <p class="text-slate-300 leading-relaxed mb-4">AI enables automation of repetitive tasks, freeing up human resources for more strategic work.</p>
      <h3 class="text-xl font-medium text-slate-200 mb-2">Examples:</h3>
      <ul class="list-disc list-inside space-y-2 mb-6 text-slate-300 pl-4">
        <li>HR onboarding with AI chatbots</li>
        <li>Automated invoice processing in finance</li>
        <li>Predictive maintenance in manufacturing</li>
      </ul>
      <p class="text-slate-300 leading-relaxed mb-8">This leads to faster, more efficient processes with fewer errors.</p>

      <h2 class="text-2xl font-semibold text-primary mt-10 mb-4">2. Enhanced Decision-Making with AI Insights</h2>
      <p class="text-slate-300 leading-relaxed mb-4">With vast amounts of data being generated daily, AI helps in extracting actionable insights.</p>
      <h3 class="text-xl font-medium text-slate-200 mb-2">AI Use Cases:</h3>
      <ul class="list-disc list-inside space-y-2 mb-6 text-slate-300 pl-4">
        <li>Customer behavior prediction</li>
        <li>Sales forecasting</li>
        <li>Supply chain optimization</li>
      </ul>
      <p class="text-slate-300 leading-relaxed mb-8">AI not only speeds up analysis but also uncovers patterns that humans might miss.</p>

      <h2 class="text-2xl font-semibold text-primary mt-10 mb-4">3. Personalized Customer Experience</h2>
      <p class="text-slate-300 leading-relaxed mb-4">AI-driven personalization boosts customer satisfaction and loyalty.</p>
      <h3 class="text-xl font-medium text-slate-200 mb-2">Applications:</h3>
      <ul class="list-disc list-inside space-y-2 mb-6 text-slate-300 pl-4">
        <li>Product recommendations (like Amazon)</li>
        <li>Dynamic content in emails/websites</li>
        <li>Chatbots with NLP (like ChatGPT) for 24/7 support</li>
      </ul>
      <p class="text-slate-300 leading-relaxed mb-8">This creates a hyper-personalized experience, improving engagement.</p>

      <h2 class="text-2xl font-semibold text-primary mt-10 mb-4">4. Cybersecurity Reinforcement</h2>
      <p class="text-slate-300 leading-relaxed mb-4">With cyber threats rising, AI plays a crucial role in detecting anomalies and responding to threats in real-time.</p>
      <h3 class="text-xl font-medium text-slate-200 mb-2">AI-based security solutions:</h3>
      <ul class="list-disc list-inside space-y-2 mb-6 text-slate-300 pl-4">
        <li>Threat detection systems</li>
        <li>Behavioral analytics</li>
        <li>Identity & access management with AI</li>
      </ul>

      <h2 class="text-2xl font-semibold text-primary mt-10 mb-4">5. Challenges Enterprises Must Prepare For</h2>
      <p class="text-slate-300 leading-relaxed mb-4">While promising, AI adoption comes with hurdles:</p>
      <ul class="list-disc list-inside space-y-2 mb-6 text-slate-300 pl-4">
        <li>Data privacy and ethical concerns</li>
        <li>Talent shortage for AI-specific roles</li>
        <li>Integration with legacy systems</li>
      </ul>
      <p class="text-slate-300 leading-relaxed mb-8">But these can be overcome with a long-term digital strategy and continuous upskilling.</p>

      <h2 class="text-2xl font-semibold text-primary mt-10 mb-4">Conclusion: Is Your Enterprise Future-Ready?</h2>
      <p class="text-slate-300 leading-relaxed mb-4">AI is not a luxury—it's a necessity for future-ready enterprises. Early adopters are already seeing massive ROI, competitive advantages, and improved efficiency.</p>
      <p class="text-slate-300 leading-relaxed">Embracing AI today means securing your place in tomorrow’s market.</p>
    `,
  },
  'mastering-devops-for-scalability': {
    slug: 'mastering-devops-for-scalability',
    title: 'Mastering DevOps for Scalable Applications',
    date: '2025-05-25',
    category: 'Software Development',
    imageUrl: '/devops2.png',
    imagePrompt: "Server racks in a data center with glowing network cables, DevOps engineers collaborating on a futuristic interface, continuous integration and deployment icons floating, blue and purple hues, technology infrastructure theme.",
    snippet: 'A deep dive into DevOps practices that ensure reliability and scalability for modern applications.',
    contentHtml: `
      <p class="text-lg text-slate-300 leading-relaxed mb-6">DevOps is more than just a set of tools; it's a culture and a practice that aims to shorten the systems development life cycle while delivering features, fixes, and updates frequently in close alignment with business objectives.</p>
      <p class="text-lg text-slate-300 leading-relaxed mb-8">This post explores key DevOps practices crucial for building and maintaining scalable applications in today's fast-paced environment.</p>

      <h2 class="text-2xl font-semibold text-primary mt-10 mb-4">1. Continuous Integration & Continuous Delivery (CI/CD)</h2>
      <p class="text-slate-300 leading-relaxed mb-4">Automating the build, test, and deployment pipeline is fundamental. CI/CD ensures that code changes are automatically built, tested, and deployed to production, reducing manual errors and speeding up release cycles.</p>
      <h3 class="text-xl font-medium text-slate-200 mb-2">Key Benefits:</h3>
      <ul class="list-disc list-inside space-y-2 mb-6 text-slate-300 pl-4">
        <li>Faster time to market</li>
        <li>Improved code quality through automated testing</li>
        <li>Reduced risk in deployments</li>
      </ul>

      <h2 class="text-2xl font-semibold text-primary mt-10 mb-4">2. Infrastructure as Code (IaC)</h2>
      <p class="text-slate-300 leading-relaxed mb-4">Managing and provisioning infrastructure through code (e.g., Terraform, Ansible) rather than manual processes. This ensures consistency, repeatability, and scalability of your environments.</p>
      
      <h2 class="text-2xl font-semibold text-primary mt-10 mb-4">3. Monitoring and Logging</h2>
      <p class="text-slate-300 leading-relaxed mb-4">Implementing comprehensive monitoring and logging solutions (e.g., Prometheus, Grafana, ELK stack) provides visibility into application performance and system health, enabling proactive issue detection and resolution.</p>
      
      <h2 class="text-2xl font-semibold text-primary mt-10 mb-4">Conclusion</h2>
      <p class="text-slate-300 leading-relaxed">Mastering DevOps is an ongoing journey. By embracing these practices, organizations can build more resilient, scalable, and reliable applications, ultimately delivering greater value to their users.</p>
      <p class="text-slate-300 leading-relaxed mt-4"><em>This is placeholder content. More details will be added soon.</em></p>
    `,
  },
  'automating-with-chatbots': {
    slug: 'automating-with-chatbots',
    title: 'Automating Business Processes with Custom Chatbots',
    date: '2025-05-25',
    category: 'Business Automation',
    imageUrl: '/chatbot2.png',
    imagePrompt: "A friendly robot interacting with a customer on a laptop screen, chat bubbles with business icons, gears turning in the background symbolizing automation, clean and modern design, teal and white colors.",
    snippet: 'Discover the benefits of custom chatbots and how they can streamline customer interactions.',
    contentHtml: `
      <p class="text-lg text-slate-300 leading-relaxed mb-6">In an era of instant gratification, businesses are constantly seeking ways to enhance customer experience and streamline operations. Custom AI chatbots have emerged as a powerful tool for achieving both.</p>
      <p class="text-lg text-slate-300 leading-relaxed mb-8">This article delves into how custom chatbots can revolutionize your business processes.</p>

      <h2 class="text-2xl font-semibold text-primary mt-10 mb-4">1. 24/7 Customer Support</h2>
      <p class="text-slate-300 leading-relaxed mb-4">Chatbots can handle a large volume of customer inquiries simultaneously, any time of day or night, without fatigue. This ensures that customers receive instant responses to common questions, improving satisfaction and freeing up human agents for complex issues.</p>
      
      <h2 class="text-2xl font-semibold text-primary mt-10 mb-4">2. Lead Generation and Qualification</h2>
      <p class="text-slate-300 leading-relaxed mb-4">Strategically deployed chatbots on your website can engage visitors, ask qualifying questions, and capture lead information, seamlessly integrating with your CRM.</p>

      <h2 class="text-2xl font-semibold text-primary mt-10 mb-4">3. Streamlining Internal Processes</h2>
      <p class="text-slate-300 leading-relaxed mb-4">Chatbots aren't just for external customers. They can automate internal tasks like IT helpdesk support, HR onboarding, and employee query resolution.</p>

      <h2 class="text-2xl font-semibold text-primary mt-10 mb-4">Conclusion</h2>
      <p class="text-slate-300 leading-relaxed">Custom AI chatbots offer a versatile solution for automating various business processes, leading to increased efficiency, cost savings, and improved user experiences. Investing in a tailored chatbot solution can provide a significant return on investment.</p>
      <p class="text-slate-300 leading-relaxed mt-4"><em>This is placeholder content. More details will be added soon.</em></p>
    `,
  },
  'navigating-the-cloud-landscape': {
    slug: 'navigating-the-cloud-landscape',
    title: 'Tech Insights: Navigating the Cloud Landscape',
    date: '2025-05-25',
    category: 'Tech Insights',
    imageUrl: '/cloud2.png',
    imagePrompt: "Abstract representation of different cloud services (IaaS, PaaS, SaaS) as interconnected floating islands, a businessperson navigating a path between them, bright and airy, blue and white palette.",
    snippet: 'Understand the different cloud models and choose the right strategy for your organization.',
    contentHtml: `
      <p class="text-lg text-slate-300 leading-relaxed mb-6">The cloud has become the backbone of modern IT infrastructure, offering unprecedented scalability, flexibility, and cost-efficiency. However, with various service models (IaaS, PaaS, SaaS) and providers (AWS, Azure, GCP), navigating the cloud landscape can be daunting.</p>
      <p class="text-lg text-slate-300 leading-relaxed mb-8">This insight aims to demystify cloud computing and help you choose the right strategy.</p>

      <h2 class="text-2xl font-semibold text-primary mt-10 mb-4">1. Understanding Cloud Service Models</h2>
      <p class="text-slate-300 leading-relaxed mb-2"><strong>IaaS (Infrastructure as a Service):</strong> Provides virtualized computing resources over the internet. You manage the OS, applications, and data.</p>
      <p class="text-slate-300 leading-relaxed mb-2"><strong>PaaS (Platform as a Service):</strong> Offers a platform for developing, running, and managing applications without the complexity of building and maintaining the infrastructure.</p>
      <p class="text-slate-300 leading-relaxed mb-4"><strong>SaaS (Software as a Service):</strong> Delivers software applications over the internet, on demand, typically on a subscription basis.</p>
      
      <h2 class="text-2xl font-semibold text-primary mt-10 mb-4">2. Choosing a Cloud Strategy</h2>
      <p class="text-slate-300 leading-relaxed mb-4">Consider factors like your existing infrastructure, technical expertise, budget, security requirements, and scalability needs. A hybrid or multi-cloud strategy might be suitable for complex organizations.</p>

      <h2 class="text-2xl font-semibold text-primary mt-10 mb-4">3. Key Considerations for Cloud Adoption</h2>
      <ul class="list-disc list-inside space-y-2 mb-6 text-slate-300 pl-4">
        <li>Security and Compliance</li>
        <li>Cost Management and Optimization</li>
        <li>Data Migration and Integration</li>
        <li>Vendor Lock-in</li>
      </ul>

      <h2 class="text-2xl font-semibold text-primary mt-10 mb-4">Conclusion</h2>
      <p class="text-slate-300 leading-relaxed">A well-defined cloud strategy is essential for leveraging the full potential of cloud computing. By understanding the different models and carefully considering your organization's needs, you can make informed decisions that drive innovation and efficiency.</p>
      <p class="text-slate-300 leading-relaxed mt-4"><em>This is placeholder content. More details will be added soon.</em></p>
    `,
  },
};

async function getPostData(slug: string): Promise<PostData | null> {
  // In a real app, fetch from Firestore based on slug
  // For example:
  // const postDoc = await getDoc(doc(db, "blogPosts", slug)); // Assuming slug is document ID
  // if (postDoc.exists()) { return { id: postDoc.id, ...postDoc.data() } as PostData; }
  // else { return null; }

  if (blogPostsData[slug]) {
    return blogPostsData[slug];
  }
  return null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostData(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found | Fynorra Blog',
      description: 'The blog post you are looking for could not be found.',
    }
  }

  return {
    title: `${post.title} | Fynorra Blog`,
    description: post.snippet,
    openGraph: {
        title: post.title,
        description: post.snippet,
        images: [
            {
                url: post.imageUrl, // Use a relevant image for social sharing
                width: 1200,
                height: 650,
                alt: post.title,
            },
        ],
        type: 'article',
        publishedTime: post.date, // Ensure date is in ISO 8601 format
        authors: ['Fynorra'], // Replace with actual author if available
        tags: [post.category],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);

  if (!post) {
    notFound(); // Triggers the not-found.tsx page or a default 404
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24 md:pt-32">
        <article className="max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <div className="mb-4">
              <Link href="/blog" className="text-primary hover:underline flex items-center justify-center sm:justify-start w-max mx-auto sm:mx-0">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-50 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center justify-center text-sm text-slate-400 space-x-4">
              <span className="flex items-center"><CalendarDays className="h-4 w-4 mr-1.5" /> {post.date}</span>
              <span className="flex items-center"><Tag className="h-4 w-4 mr-1.5" /> {post.category}</span>
            </div>
          </header>

          {post.imageUrl && (
            <div className="mb-12 aspect-video relative rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                data-ai-hint={post.imagePrompt}
                priority // For LCP
              />
            </div>
          )}
          
          {/* Prose styles for Tailwind Typography if you install it, or custom styles */}
          <div 
            className="prose prose-invert prose-lg max-w-none 
                       prose-headings:text-slate-100 prose-h2:text-2xl prose-h2:font-semibold prose-h2:text-primary prose-h2:mb-4 prose-h2:mt-10
                       prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
                       prose-ul:list-disc prose-ul:pl-6 prose-ul:text-slate-300 prose-li:mb-2
                       prose-strong:text-slate-200
                       prose-a:text-primary hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
          />

          <div className="mt-16 text-center">
            <Link href="/blog">
                <Button variant="outline" className="group text-lg border-primary/50 hover:bg-primary/10 hover:text-primary">
                    <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Explore More Posts
                </Button>
            </Link>
          </div>

        </article>
      </main>
      <Footer />
    </div>
  );
}

    