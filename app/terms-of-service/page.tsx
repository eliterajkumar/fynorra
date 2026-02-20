import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-14">
          <FileText className="mx-auto h-14 w-14 text-primary mb-4" />
          <h1 className="text-4xl font-extrabold mb-3">Terms of Service</h1>
          <p className="text-slate-300 text-lg">
            Rules and conditions for using Fynorra AI Solutions services.
          </p>
        </header>

        <Card className="bg-slate-800/50 border-slate-700/50 shadow-xl">
          <CardContent className="p-8 space-y-8 text-slate-200 leading-relaxed">
            <p className="text-sm text-slate-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section>
              <CardTitle className="mb-2">1. Services</CardTitle>
              <p>
                Fynorra provides WhatsApp AI Agents, sales automation,
                order management systems, and custom AI workflows for businesses.
              </p>
            </section>

            <section>
              <CardTitle className="mb-2">2. Acceptable Use</CardTitle>
              <p>
                You agree not to use our services for spam, fraud, illegal
                activities, or violation of any applicable laws.
              </p>
            </section>

            <section>
              <CardTitle className="mb-2">3. Third-Party Platforms</CardTitle>
              <p>
                Our solutions may integrate with WhatsApp, Google Sheets,
                and Google Drive. Fynorra is not responsible for changes
                or limitations introduced by third-party platforms.
              </p>
            </section>

            <section>
              <CardTitle className="mb-2">4. Payments & Refunds</CardTitle>
              <p>
                Payments are non-refundable unless explicitly agreed in writing.
                Pricing and scope are defined per project or subscription.
              </p>
            </section>

            <section>
              <CardTitle className="mb-2">5. Limitation of Liability</CardTitle>
              <p>
                Fynorra shall not be liable for indirect or consequential damages
                including data loss, revenue loss, or business interruption.
              </p>
            </section>

            <section>
              <CardTitle className="mb-2">6. Contact</CardTitle>
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