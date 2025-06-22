"use client";

import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Send, Copyright } from "lucide-react";

export function Footer() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic, e.g., using a server action
    const email = (event.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    alert(`Subscribed with ${email}! (Demo)`);
    event.currentTarget.reset();
  };

  return (
    <footer className="bg-background border-t border-border/20 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-2">
          <Link href="/" className="flex items-center mb-4">
  <Image 
    src="/logo.jpeg" // path relative to the /public folder
    alt="FYNORRA Logo"
    width={40}
    height={40}
    className="mr-2 rounded-full"
  />
</Link>
            <p className="text-foreground/70 max-w-sm">
              Empowering businesses with cutting-edge IT software development and custom AI solutions to build the future.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about-us" className="text-foreground/70 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-foreground/70 hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="text-foreground/70 hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-foreground/70 hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Stay Updated</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input type="email" name="email" placeholder="Enter your email" required className="bg-input/50 placeholder:text-foreground/50" />
              <Button type="submit" className="w-full group">
                Subscribe <Send className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
            <div className="mt-6 flex space-x-4">
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-foreground/70 hover:text-primary transition-colors">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-foreground/70 hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border/20 pt-8 text-center text-foreground/60">
          <p className="flex items-center justify-center">
            <Copyright className="h-4 w-4 mr-1.5" /> {new Date().getFullYear()} Fynorra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
