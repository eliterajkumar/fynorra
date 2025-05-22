
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, LogIn, UserPlus, Briefcase, BookOpen, BrainCircuit, Cloud, Code, Users, Info, ShieldCheck, Send, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinkClass = "text-sm font-medium text-foreground/80 hover:text-foreground transition-colors";
const mobileNavLinkClass = "text-lg font-medium text-foreground hover:text-primary transition-colors py-2 block";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLinksContent = () => (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className={cn(navLinkClass, "flex items-center gap-1 outline-none")}>
          What we do <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem asChild><Link href="/custom-ai-solutions" className="flex items-center gap-2 w-full"><BrainCircuit className="h-4 w-4" /> Custom AI Solutions</Link></DropdownMenuItem>
          <DropdownMenuItem asChild><Link href="/software-development" className="flex items-center gap-2 w-full"><Code className="h-4 w-4" /> Software Development</Link></DropdownMenuItem>
          <DropdownMenuItem asChild><Link href="/cloud-devops" className="flex items-center gap-2 w-full"><Cloud className="h-4 w-4" /> Cloud & DevOps</Link></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className={cn(navLinkClass, "flex items-center gap-1 outline-none")}>
          Resources <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem asChild><Link href="/blog" className="flex items-center gap-2 w-full"><BookOpen className="h-4 w-4" /> Blog</Link></DropdownMenuItem>
          <DropdownMenuItem asChild><Link href="/case-studies" className="flex items-center gap-2 w-full"><Briefcase className="h-4 w-4" /> Case Studies</Link></DropdownMenuItem>
          <DropdownMenuItem asChild><Link href="/whitepapers" className="flex items-center gap-2 w-full">Whitepapers</Link></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link href="/for-businesses" className={navLinkClass}>
        For Businesses
      </Link>
      <Link href="/about-us" className={navLinkClass}>
        About Us
      </Link>
    </>
  );
  
  const MobileNavLinksContent = () => (
    <div className="flex flex-col gap-4 mt-8">
       <DropdownMenu>
        <DropdownMenuTrigger className={cn(mobileNavLinkClass, "flex items-center justify-between w-full outline-none")}>
          What we do <ChevronDown className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[calc(100vw-4rem)] ml-4">
          <DropdownMenuItem asChild><Link href="/custom-ai-solutions" className={cn(mobileNavLinkClass, "flex items-center gap-2 w-full")} onClick={() => setMobileMenuOpen(false)}><BrainCircuit className="h-5 w-5" /> Custom AI Solutions</Link></DropdownMenuItem>
          <DropdownMenuItem asChild><Link href="/software-development" className={cn(mobileNavLinkClass, "flex items-center gap-2 w-full")} onClick={() => setMobileMenuOpen(false)}><Code className="h-5 w-5" /> Software Development</Link></DropdownMenuItem>
          <DropdownMenuItem asChild><Link href="/cloud-devops" className={cn(mobileNavLinkClass, "flex items-center gap-2 w-full")} onClick={() => setMobileMenuOpen(false)}><Cloud className="h-5 w-5" /> Cloud & DevOps</Link></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className={cn(mobileNavLinkClass, "flex items-center justify-between w-full outline-none")}>
          Resources <ChevronDown className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[calc(100vw-4rem)] ml-4">
          <DropdownMenuItem asChild><Link href="/blog" className={cn(mobileNavLinkClass, "flex items-center gap-2 w-full")} onClick={() => setMobileMenuOpen(false)}><BookOpen className="h-5 w-5" /> Blog</Link></DropdownMenuItem>
          <DropdownMenuItem asChild><Link href="/case-studies" className={cn(mobileNavLinkClass, "flex items-center gap-2 w-full")} onClick={() => setMobileMenuOpen(false)}><Briefcase className="h-5 w-5" /> Case Studies</Link></DropdownMenuItem>
          <DropdownMenuItem asChild><Link href="/whitepapers" className={cn(mobileNavLinkClass, "flex items-center gap-2 w-full")} onClick={() => setMobileMenuOpen(false)}>Whitepapers</Link></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link href="/for-businesses" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>
        For Businesses
      </Link>
      <Link href="/about-us" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>
        About Us
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger className={cn(mobileNavLinkClass, "flex items-center justify-between w-full outline-none")}>
          Account <ChevronDown className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[calc(100vw-4rem)] ml-4">
          <DropdownMenuItem asChild><Link href="/login" className={cn(mobileNavLinkClass, "flex items-center gap-2 w-full")} onClick={() => setMobileMenuOpen(false)}><LogIn className="h-5 w-5" /> Sign In</Link></DropdownMenuItem>
          <DropdownMenuItem asChild><Link href="/signup" className={cn(mobileNavLinkClass, "flex items-center gap-2 w-full")} onClick={() => setMobileMenuOpen(false)}><UserPlus className="h-5 w-5" /> Sign Up</Link></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button size="lg" className="w-full mt-4" onClick={() => setMobileMenuOpen(false)}>Get Started</Button>
    </div>
  );


  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold uppercase text-foreground">FYNORRA</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <NavLinksContent />
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button>Get Started</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="px-3">
                  Login <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild><Link href="/login" className="flex items-center gap-2 w-full"><LogIn className="h-4 w-4" /> Sign In</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/signup" className="flex items-center gap-2 w-full"><UserPlus className="h-4 w-4" /> Sign Up</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-foreground" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full bg-background p-6">
                <div className="flex justify-between items-center mb-8">
                   <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                     <span className="text-2xl font-bold uppercase text-foreground">FYNORRA</span>
                   </Link>
                   <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                     <X className="h-6 w-6 text-foreground" />
                     <span className="sr-only">Close menu</span>
                   </Button>
                </div>
                <MobileNavLinksContent />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
