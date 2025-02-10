import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function TheAICodex() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">The AI Codex</h1>
        <p className="text-lg text-center max-w-3xl mx-auto mb-10">
          Your ultimate learning hub for mastering AI and Machine Learning. Explore curated courses, roadmaps, and resources.
        </p>

        {/* AI Learning Roadmap */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-6">AI Learning Roadmap</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "Beginner", topics: ["Python Basics", "Math for AI", "Intro to AI"] },
              { step: "Intermediate", topics: ["Machine Learning", "Deep Learning", "NLP Basics"] },
              { step: "Advanced", topics: ["LLMs & Fine-Tuning", "Computer Vision", "AI Deployment"] },
            ].map((level, index) => (
              <div key={index} className="p-6 border rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold mb-4">{level.step}</h3>
                <ul className="text-gray-600">
                  {level.topics.map((topic, i) => (
                    <li key={i} className="mb-2">{topic}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* AI Free Courses */}
        <section>
          <h2 className="text-3xl font-semibold text-center mb-6">Free AI Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Machine Learning", url: "https://www.coursera.org/learn/machine-learning" },
              { title: "Deep Learning", url: "https://www.udacity.com/course/deep-learning-nanodegree--nd101" },
              { title: "NLP", url: "https://www.edx.org/course/natural-language-processing" },
              { title: "Computer Vision", url: "https://www.udacity.com/course/computer-vision-nanodegree--nd891" },
              { title: "AI for Everyone", url: "https://www.coursera.org/learn/ai-for-everyone" },
              { title: "Generative AI", url: "https://www.deeplearning.ai/courses/generative-ai/" },
            ].map((course, index) => (
              <div key={index} className="p-6 border rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold mb-4">{course.title}</h3>
                <Link href={course.url} target="_blank" passHref>
                  <Button size="lg" variant="secondary">Enroll Now</Button>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
