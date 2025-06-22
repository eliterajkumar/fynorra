import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Users, BookOpen, Target, Github, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl?: string;
  githubUrl?: string;
  dataAiHint?: string;
}

async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const teamCollection = collection(db, "teamMembers");
    const q = query(teamCollection, orderBy("name", "asc"));
    const teamSnapshot = await getDocs(q);
    const teamList = teamSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember));
    return teamList.length > 0 ? teamList : getSampleTeamMembers();
  } catch (error) {
    console.error("Error fetching team members from Firestore:", error);
    return getSampleTeamMembers();
  }
}

function getSampleTeamMembers(): TeamMember[] {
  return [
    {
      id: '1',
      name: 'Raj Kumar',
      role: 'Founder & CEO',
      bio: 'Visionary leader in AI and enterprise software, passionate about driving innovation and building future-forward platforms.',
      photoUrl: 'https://github.com/raj-ai.png',
      githubUrl: 'https://github.com/raj-ai',
    },
    {
      id: '2',
      name: 'Dr. Emily Chen',
      role: 'Chief AI Scientist',
      bio: 'PhD from Stanford, ex-OpenAI. Leading LLM research & deployment at Fynorra.',
      photoUrl: 'https://github.com/emily-ai.png',
      githubUrl: 'https://github.com/emily-ai',
    },
    {
      id: '3',
      name: 'Michael Tanaka',
      role: 'VP of Engineering',
      bio: 'Cloud + AI infra expert. Scaled products at AWS and Stripe.',
      photoUrl: 'https://github.com/michael-cloud.png',
      githubUrl: 'https://github.com/michael-cloud',
    },
    {
      id: '4',
      name: 'Aisha Rahman',
      role: 'Head of Product',
      bio: 'AI product builder. Ex-Google PM, focused on customer-first innovation.',
      photoUrl: 'https://ui-avatars.com/api/?name=Aisha+Rahman&background=0D8ABC&color=fff',
      githubUrl: '',
    },
    {
      id: '5',
      name: 'David Lee',
      role: 'AI Solutions Architect',
      bio: 'Specialist in enterprise LLM fine-tuning, RAG pipelines, and API integrations.',
      photoUrl:  'https://ui-avatars.com/api/?name=David+Lee&background=0D8ABC&color=fff',
      githubUrl: '',
    },
  ];
}



const storyText = "Founded by Raj Kumar in 2025, Fynorra embarked on a mission to revolutionize how businesses leverage AI and software for sustainable growth. We believe in the transformative power of technology to solve complex challenges and create new opportunities. Today, we’re proud to partner with enterprises worldwide, delivering innovative solutions that drive efficiency, enhance customer experiences, and unlock strategic advantages.";
const missionText = "To empower businesses with intelligent, scalable, and custom-fit AI and software solutions that drive tangible results, foster innovation, and pave the way for a technologically advanced future.";

export default async function AboutUsPage() {
  const teamMembers = await getTeamMembers();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <Users className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Meet the Founder & Our Mission
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Led by Raj Kumar, we’re building powerful AI solutions that unlock potential for businesses globally.
          </p>
        </header>

        {/* Our Story */}
        <section className="mb-20 py-12 bg-slate-800/30 rounded-xl shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <BookOpen className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <p className="text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto text-center">
              {storyText}
            </p>
          </div>
        </section>

        {/* Team */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6 text-center">Meet Our Team</h2>
          <p className="text-slate-400 text-center mb-10 text-sm italic">
            Our team includes real and advisory members helping shape Fynorra’s AI vision.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member) => (
              <Card key={member.id} className="bg-slate-800/50 border-slate-700/50 shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col items-center text-center p-6">
                {member.photoUrl && (
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full object-cover mb-6 border-2 border-primary/50"
                    data-ai-hint={member.dataAiHint || "person portrait"}
                  />
                )}
                <CardTitle className="text-xl font-semibold text-primary mb-1">{member.name}</CardTitle>
                <p className="text-sm text-slate-400 font-medium mb-3">{member.role}</p>
                <CardDescription className="text-slate-300 text-sm leading-relaxed flex-grow mb-4">
                  {member.bio}
                </CardDescription>
                {member.githubUrl && (
                  <div className="mt-4">
                    <Link href={member.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-slate-400 hover:text-primary space-x-1">
                      <Github size={20} />
                      <span className="text-sm">GitHub</span>
                    </Link>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="mb-20 py-12 text-center">
          <Target className="mx-auto h-12 w-12 text-primary mb-6" />
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto">
            {missionText}
          </p>
        </section>

        {/* CTA */}
        <section className="text-center py-12 bg-primary/10 rounded-xl shadow-lg">
          <Zap className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold mb-4">Want to Join Our Mission or Learn More?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            We're always looking for passionate individuals and exciting collaborations. Reach out to us!
          </p>
          <Link href="/contact">
            <Button size="lg" className="group text-lg px-8 py-3">
              Contact Us <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>

      </main>
      <Footer />
    </div>
  );
}
