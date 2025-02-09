import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white shadow-md py-4 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          Fynorra
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link href="#features" className="text-gray-600 hover:text-primary">
            Models
          </Link>
          <Link href="#services" className="text-gray-600 hover:text-primary">
            Services
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-primary">
            Contact
          </Link>
<<<<<<< HEAD
          <Link href="#contact" className="text-gray-600 hover:text-primary">
           The AI Codex 
=======
          <Link href="#The AI Codex" className="text-gray-600 hover:text-primary">
            The AI Codex
>>>>>>> 0bb4d0f (contact page updated)
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-gray-600 hover:text-primary">
            Login
          </Link>
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  );
}
