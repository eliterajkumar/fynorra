import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Briefcase,
  Building,
  CheckCircle,
  Zap,
  MessageSquareQuote,
} from "lucide-react";

const caseStudies = [
  {
    client: "VI Tech Windows",
    location: "Delhi",
    industry: "UPVC & Aluminium Doors and Windows",
    title: "WhatsApp AI Order Management for Manufacturing Business",
    problem:
      "Orders were coming on WhatsApp but tracking, updating, and production assignment was manual and confusing.",
    solution: [
      "WhatsApp AI Order Creation & Update",
      "Automatic Google Drive folder creation",
      "Order folder link saved in Google Sheets",
      "Order assignment to production team",
      "Order status view directly on WhatsApp",
    ],
    results: [
      "Complete order management on WhatsApp",
      "Zero manual confusion",
      "No WhatsApp API required",
      "Used existing WhatsApp number",
    ],
  },
  {
    client: "Ideal Modular Kitchen",
    location: "Sultanpur, New Delhi",
    industry: "Interior & Modular Kitchen",
    title: "WhatsApp AI Sales Agent for Interior Business",
    problem:
      "Inquiries were unqualified, pricing was shared without customer details, and follow-ups were missed.",
    solution: [
      "Phone number capture before conversation",
      "Human-like sales conversation",
      "Product images & details sharing",
      "Interest tracking in Google Sheets",
      "Price calculation after customer details",
      "Callback time scheduling",
    ],
    results: [
      "Better quality leads",
      "Higher inquiry to sale conversion",
      "Sales team time saved",
      "Organized follow-ups",
    ],
  },
  {
    client: "WAAK Shop",
    location: "India",
    industry: "Clothing Brand",
    title: "WhatsApp AI Lead Capture & CRM for Clothing Store",
    problem:
      "Customer data was getting lost and no system existed for future campaigns.",
    solution: [
      "AI chat with WhatsApp customers",
      "Interest detection",
      "Phone number capture",
      "Google Sheet CRM creation",
      "Ignore WhatsApp groups & automation messages",
      "Ignore own number messages",
    ],
    results: [
      "Clean customer database",
      "Ready audience for future offers",
      "Zero spam replies",
      "Better campaign planning",
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] text-slate-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <Briefcase className="mx-auto h-14 w-14 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Real WhatsApp AI Agent Case Studies
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Real implementations of WhatsApp AI Agents for Indian businesses —
            order management, sales automation, lead capture & CRM.
          </p>
        </header>

        {/* Case Studies */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {caseStudies.map((cs, index) => (
            <Card
              key={index}
              className="bg-slate-900/60 border-slate-700/60 shadow-xl flex flex-col"
            >
              <CardHeader>
                <p className="text-sm text-primary font-medium flex items-center mb-1">
                  <Building className="h-4 w-4 mr-2" />
                  {cs.client} — {cs.location}
                </p>
                <CardTitle className="text-xl">{cs.title}</CardTitle>
                <p className="text-xs text-slate-400 mt-1">
                  {cs.industry}
                </p>
              </CardHeader>

              <CardContent className="flex-grow">
                <p className="text-slate-300 mb-4">
                  <strong>Problem:</strong> {cs.problem}
                </p>

                <div className="mb-4">
                  <p className="font-semibold mb-2">Solution:</p>
                  <ul className="space-y-1 text-sm text-slate-300">
                    {cs.solution.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-2">Results:</p>
                  <ul className="space-y-1 text-sm text-slate-300">
                    {cs.results.map((res, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-cyan-400 mr-2 mt-0.5" />
                        {res}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Testimonial */}
        <section className="mb-20 text-center bg-slate-900/40 rounded-xl py-12 px-6">
          <MessageSquareQuote className="mx-auto h-10 w-10 text-primary mb-4" />
          <p className="text-xl italic text-slate-200 max-w-3xl mx-auto">
            “WhatsApp par orders manage karna pehle mushkil tha.
            Fynorra ke AI agent ne poora order system automate kar diya.”
          </p>
          <p className="mt-4 text-primary font-semibold">
            — Owner, VI Tech Windows (Delhi)
          </p>
        </section>

        {/* CTA */}
        <section className="text-center py-14 bg-primary/10 rounded-xl">
          <Zap className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold mb-4">
            Want This WhatsApp AI Agent for Your Business?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            Get your own WhatsApp AI Agent for sales, orders, lead capture,
            and automation — without WhatsApp API.
          </p>
          <a
            href="https://wa.me/919521297788?text=Hi%20Fynorra%2C%20I%20saw%20your%20WhatsApp%20AI%20case%20studies%20and%20want%20this%20for%20my%20business."
          >
            <Button size="lg" className="text-lg px-8 py-3">
              📲 Get WhatsApp AI Agent Demo
            </Button>
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}