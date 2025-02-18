"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useUser } from "@clerk/nextjs"; // Use this hook if you're using Clerk for authentication

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { isSignedIn, user } = useUser(); // Check if the user is signed in

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white shadow-md py-4 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          Fynorra
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/models" className="text-gray-600 hover:text-primary">Models</Link>
          <Link href="/contact" className="text-gray-600 hover:text-primary">Contact</Link>
          <Link href="/the-ai-codex" className="text-gray-600 hover:text-primary">The AI Codex</Link>
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          {isSignedIn ? (
            <>
              {/* Display user name and profile link */}
              <span className="text-gray-600">Welcome, {user?.firstName}</span>
              <Link href="/dashboard" className="text-gray-600 hover:text-primary">Dashboard</Link>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="text-gray-600 hover:text-primary">Login</Link>
              <Button onClick={() => router.push("/sign-up")}>Get Started</Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md p-4 absolute top-16 left-0 right-0 z-40">
          <nav className="flex flex-col space-y-4 text-center">
            <Link href="/models" className="text-gray-600 hover:text-primary" onClick={() => setIsOpen(false)}>Models</Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link href="/the-ai-codex" className="text-gray-600 hover:text-primary" onClick={() => setIsOpen(false)}>The AI Codex</Link>
            {isSignedIn ? (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-primary" onClick={() => setIsOpen(false)}>Dashboard</Link>
                <Button className="w-full" onClick={() => { setIsOpen(false); router.push("/sign-out"); }}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="text-gray-600 hover:text-primary" onClick={() => setIsOpen(false)}>Login</Link>
                <Button className="w-full" onClick={() => { setIsOpen(false); router.push("/sign-up"); }}>
                  Get Started
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
