import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-14">
          <ShieldCheck className="mx-auto h-14 w-14 text-primary mb-4" />
          <h1 className="text-4xl font-extrabold mb-3">Privacy Policy</h1>
          <p className="text-slate-300 text-lg">
            How Fynorra AI Solutions collects, uses, and protects your data.
          </p>
        </header>

        <Card className="bg-slate-800/50 border-slate-700/50 shadow-xl">
          <CardContent className="p-8 space-y-8 text-slate-200 leading-relaxed">
            <p className="text-sm text-slate-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section>
              <CardTitle className="mb-2">1. Information We Collect</CardTitle>
              <ul className="list-disc ml-6 space-y-1">
                <li>Business contact details (name, phone number, email)</li>
                <li>WhatsApp conversations handled by AI agents</li>
                <li>Order, inquiry, and lead data stored in Google tools</li>
              </ul>
            </section>

            <section>
              <CardTitle className="mb-2">2. How We Use Information</CardTitle>
              <ul className="list-disc ml-6 space-y-1">
                <li>Provide WhatsApp AI Agents & automation services</li>
                <li>Manage orders, leads, and workflows</li>
                <li>Improve system performance and reliability</li>
              </ul>
            </section>

            <section>
              <CardTitle className="mb-2">3. Data Storage & Security</CardTitle>
              <p>
                Data may be stored securely using tools such as Google Sheets,
                Google Drive, and cloud infrastructure. We implement reasonable
                security measures to prevent unauthorized access.
              </p>
            </section>

            <section>
              <CardTitle className="mb-2">4. Client Responsibility</CardTitle>
              <p>
                Clients are responsible for collecting user consent before
                processing customer data through WhatsApp or other channels.
                Fynorra acts strictly as a technology service provider.
              </p>
            </section>

            <section>
              <CardTitle className="mb-2">5. Contact</CardTitle>
              <p>
                📧 support@fynorra.com  
                <br />
                🌐 https://www.fynorra.com
              </p>
            </section>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}