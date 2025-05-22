// src/app/contact/page.tsx

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/forms/contact-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MailQuestion, Mail, Phone, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const contactDetails = [
  {
    icon: Mail,
    title: "Email Us",
    value: "support@fynorra.com",
    href: "mailto:support@fynorra.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    title: "Our Office",
    value: "123 Innovation Drive, Tech City, USA",
    href: "#", // No direct link for address typically
  },
];

export default function ContactUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4e] text-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16 pt-12">
          <MailQuestion className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Contact Us: Let’s Connect
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Have questions or ready to start your project? Reach out to us today. We're here to help you innovate and succeed.
          </p>
        </header>

        {/* Main Content Area: Form & Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Contact Form Section */}
          <div className="lg:col-span-3">
            <Card className="bg-slate-800/50 border-slate-700/50 shadow-xl p-6 sm:p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl sm:text-3xl font-semibold text-primary">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          {/* Contact Information Section */}
          <aside className="lg:col-span-2 space-y-8 sticky top-24">
            <Card className="bg-slate-800/50 border-slate-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactDetails.map((detail) => (
                  <div key={detail.title} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <detail.icon className="h-6 w-6 text-primary/80" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-slate-200">{detail.title}</h3>
                      {detail.href !== "#" ? (
                         <Link href={detail.href} className="text-slate-400 hover:text-primary transition-colors break-all">
                            {detail.value}
                         </Link>
                      ) : (
                        <p className="text-slate-400 break-all">{detail.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

             {/* Live Chat CTA */}
            <Card className="bg-primary/10 border-primary/30 shadow-lg p-6 text-center">
              <MessageCircle className="mx-auto h-10 w-10 text-primary mb-3" />
              <h3 className="text-xl font-semibold text-primary mb-2">Need Immediate Assistance?</h3>
              <p className="text-slate-300 mb-4 text-sm">
                Connect with our support team for real-time help.
              </p>
              <Button className="w-full group">
                Chat Now <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
