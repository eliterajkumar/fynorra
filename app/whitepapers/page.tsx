import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, FileText, Download, Info, Zap, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

interface Whitepaper {
  id: string;
  title: string;
  description: string;
  downloadLink: string;
  coverImageUrl?: string;
  category?: string; // Optional
  datePublished?: string; // Optional
  dataAiHint?: string;
}

async function getWhitepapers(): Promise<Whitepaper[]> {
  try {
    const papersCollection = collection(db, "whitepapers");
    // Example: order by datePublished if available, otherwise title
    const q = query(papersCollection, orderBy("title", "asc")); // Adjust orderBy as needed
    const papersSnapshot = await getDocs(q);
    const papersList = papersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Whitepaper));

    if (papersList.length === 0) {
      return getSampleWhitepapers();
    }
    return papersList;
  } catch (error) {
    console.error("Error fetching whitepapers from Firestore:", error);
    return getSampleWhitepapers();
  }
}

function getSampleWhitepapers(): Whitepaper[] {
  return [
    { id: '1', title: 'The Ethical Implications of Advanced AI', description: 'A comprehensive analysis of the ethical challenges and considerations in the development and deployment of advanced artificial intelligence systems.', downloadLink: '#', coverImageUrl: 'https://placehold.co/800x450.png', category: 'AI Ethics', datePublished: '2024-06-15', dataAiHint: 'ethics ai' },
    { id: '2', title: 'Maximizing ROI with Cloud-Native Architectures', description: 'Discover strategies for building and migrating to cloud-native applications to enhance scalability, resilience, and cost-efficiency.', downloadLink: '#', coverImageUrl: 'https://placehold.co/600x400.png', category: 'Cloud Computing', datePublished: '2024-05-20', dataAiHint: 'cloud architecture' },
    { id: '3', title: 'Cybersecurity in the Age of AI: Threats and Defenses', description: 'An in-depth look at how AI is influencing cybersecurity, both as a tool for attackers and a solution for defense.', downloadLink: '#', coverImageUrl: 'https://placehold.co/600x400.png', category: 'Cybersecurity', datePublished: '2024-04-10', dataAiHint: 'security shield' },
  ];
}

const whyWhitepapersMatterText = "Our whitepapers provide in-depth research, expert analysis, and actionable insights to help you navigate the complexities of AI and technology. Make informed decisions and stay ahead of the curve with Fynorra's knowledge base.";

export default async function WhitepapersPage() {
  const allWhitepapers = await getWhitepapers();
  const featuredPaper = allWhitepapers.length > 0 ? allWhitepapers[0] : null;
  const morePapers = allWhitepapers.length > 1 ? allWhitepapers.slice(1) : (allWhitepapers.length === 1 && !featuredPaper ? allWhitepapers : []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <BookOpen className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Whitepapers: Deep Dives into AI & Technology
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Access expert insights, research, and strategies to leverage the full potential of AI and software solutions for your business growth.
          </p>
        </header>

        {/* Featured Whitepaper */}
        {featuredPaper && (
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center sm:text-left">Featured Whitepaper</h2>
            <Card className="bg-slate-800/50 border-primary/30 shadow-xl overflow-hidden lg:flex lg:flex-row">
              {featuredPaper.coverImageUrl && (
                <div className="lg:w-2/5">
                  <Image
                    src={featuredPaper.coverImageUrl}
                    alt={featuredPaper.title}
                    width={800}
                    height={450}
                    className="w-full h-64 lg:h-full object-cover"
                    data-ai-hint={featuredPaper.dataAiHint || "research document"}
                  />
                </div>
              )}
              <div className={`p-6 md:p-10 flex flex-col justify-center ${featuredPaper.coverImageUrl ? 'lg:w-3/5' : 'w-full'}`}>
                <CardHeader className="p-0 mb-4">
                  {featuredPaper.category && <p className="text-sm text-primary font-semibold mb-1 uppercase tracking-wider">{featuredPaper.category}</p>}
                  <CardTitle className="text-3xl font-semibold mb-2">{featuredPaper.title}</CardTitle>
                  {featuredPaper.datePublished && <p className="text-xs text-slate-400">Published: {featuredPaper.datePublished}</p>}
                </CardHeader>
                <CardDescription className="text-slate-300 mb-6 text-base leading-relaxed line-clamp-4">
                  {featuredPaper.description}
                </CardDescription>
                <a href={featuredPaper.downloadLink} target="_blank" rel="noopener noreferrer" className="mt-auto">
                  <Button size="lg" className="group w-full sm:w-auto">
                    <Download className="h-5 w-5 mr-2" /> Download Now
                  </Button>
                </a>
              </div>
            </Card>
          </section>
        )}

        {/* More Whitepapers */}
        {morePapers.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">More Whitepapers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {morePapers.map((paper) => (
                <Card key={paper.id} className="bg-slate-800/50 border-slate-700/50 shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
                  {paper.coverImageUrl && (
                     <Image
                        src={paper.coverImageUrl}
                        alt={paper.title}
                        width={600}
                        height={338}
                        className="w-full h-56 object-cover rounded-t-lg"
                        data-ai-hint={paper.dataAiHint || "technology report"}
                      />
                  )}
                  <CardHeader className="pb-3">
                     {paper.category && <p className="text-xs text-primary font-medium mb-1 uppercase tracking-wide">{paper.category}</p>}
                    <CardTitle className="text-xl font-semibold">{paper.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">{paper.description}</p>
                  </CardContent>
                  <div className="p-6 pt-2 mt-auto">
                    <a href={paper.downloadLink} target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="outline" className="w-full group text-sm border-primary/50 hover:bg-primary/10 hover:text-primary">
                        <Download className="h-4 w-4 mr-2" /> Download
                      </Button>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
        {morePapers.length === 0 && !featuredPaper && (
            <p className="text-slate-400 text-center py-10 text-lg">No whitepapers available at the moment. Please check back soon!</p>
        )}


        {/* Why Whitepapers Matter Section */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4 text-center">
            <Info className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-6">Why Whitepapers Matter</h2>
            <p className="text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto">
              {whyWhitepapersMatterText}
            </p>
          </div>
        </section>

        {/* Call to Action Section */}
        {featuredPaper && (
          <section className="text-center py-12 bg-primary/10 rounded-xl shadow-lg">
            <Zap className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold mb-4">Unlock the Full Potential of AI</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
              Download our featured whitepaper on "{featuredPaper.title}" today and gain valuable insights for your business!
            </p>
            <a href={featuredPaper.downloadLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="group text-lg px-8 py-3">
                <Download className="h-5 w-5 mr-2" /> Download Featured Whitepaper
              </Button>
            </a>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
