"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Menu, X, ChevronDown, LogIn, UserPlus, Briefcase,
  BookOpen, BrainCircuit, Cloud, Code, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";

const navLinkClass = "text-sm font-medium text-slate-200 hover:text-primary transition-colors";
const mobileNavLinkClass = "text-lg font-medium text-slate-50 hover:text-primary transition-colors py-2 block";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLinksContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className={cn(isMobile ? mobileNavLinkClass : navLinkClass, "flex items-center gap-1")}>
            What we do <ChevronDown className={cn("h-4 w-4", isMobile && "h-5 w-5")} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          sideOffset={6}
          className={cn(isMobile && "w-[calc(100vw-4rem)] ml-4 bg-slate-900 border-slate-700", "z-[100]")}
        >
          <DropdownMenuItem asChild>
            <Link href="/custom-ai-solutions" className="flex items-center gap-2 w-full text-slate-200 hover:!text-primary px-2 py-1.5" onClick={() => isMobile && setMobileMenuOpen(false)}>
              <BrainCircuit className="h-4 w-4" /> Custom AI Solutions
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/software-development" className="flex items-center gap-2 w-full text-slate-200 hover:!text-primary px-2 py-1.5" onClick={() => isMobile && setMobileMenuOpen(false)}>
              <Code className="h-4 w-4" /> Software Development
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/cloud-devops" className="flex items-center gap-2 w-full text-slate-200 hover:!text-primary px-2 py-1.5" onClick={() => isMobile && setMobileMenuOpen(false)}>
              <Cloud className="h-4 w-4" /> Cloud & DevOps
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Resources dropdown (kept minimal, uncomment trigger in future if needed) */}
      <DropdownMenu>
        {/* If you want a visible trigger for Resources re-enable below block */}
        {/* <DropdownMenuTrigger asChild>
          <button className={cn(isMobile ? mobileNavLinkClass : navLinkClass, "flex items-center gap-1")}>
            Resources <ChevronDown className={cn("h-4 w-4", isMobile && "h-5 w-5")} />
          </button>
        </DropdownMenuTrigger> */}
        <DropdownMenuContent
          align="start"
          sideOffset={6}
          className={cn(isMobile && "w-[calc(100vw-4rem)] ml-4 bg-slate-900 border-slate-700", "z-[100]")}
        >
          <DropdownMenuItem asChild>
            <Link href="/blog" className="flex items-center gap-2 w-full text-slate-200 hover:!text-primary px-2 py-1.5" onClick={() => isMobile && setMobileMenuOpen(false)}>
              <BookOpen className="h-4 w-4" /> Blog
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/case-studies" className="flex items-center gap-2 w-full text-slate-200 hover:!text-primary px-2 py-1.5" onClick={() => isMobile && setMobileMenuOpen(false)}>
              <Briefcase className="h-4 w-4" /> Case Studies
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link href="/for-businesses" className={isMobile ? mobileNavLinkClass : navLinkClass} onClick={() => isMobile && setMobileMenuOpen(false)}>For Businesses</Link>
      <Link href="/about-us" className={isMobile ? mobileNavLinkClass : navLinkClass} onClick={() => isMobile && setMobileMenuOpen(false)}>About Us</Link>
      <Link href="/services" className={isMobile ? mobileNavLinkClass : navLinkClass} onClick={() => isMobile && setMobileMenuOpen(false)}>Services</Link>
      <Link href="/contact" className={isMobile ? mobileNavLinkClass : navLinkClass} onClick={() => isMobile && setMobileMenuOpen(false)}>Contact</Link>
      <Link href="/dashboard" className={isMobile ? mobileNavLinkClass : navLinkClass} onClick={() => isMobile && setMobileMenuOpen(false)}>A6-Platform</Link>
    </>
  );

  const MobileNavLinks = () => (
    <div className="flex flex-col gap-4 mt-8">
      <NavLinksContent isMobile />
      {/* Commented auth area — keep for future */}
      {/*
      <SignedOut>
        <Link href="/sign-up">
          <Button size="lg" className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setMobileMenuOpen(false)}>Get Started</Button>
        </Link>
        <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
          <Button variant="outline" size="lg" className="w-full border-slate-700 text-slate-200 hover:bg-slate-700" onClick={() => setMobileMenuOpen(false)}>Sign In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <Link href="/dashboard" className="flex items-center gap-2 text-slate-200 hover:text-primary transition-colors py-2">
          <User className="w-5 h-5" />
          Dashboard
        </Link>
      </SignedIn>
      */}
    </div>
  );

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", isScrolled ? "bg-slate-900/80 backdrop-blur-md shadow-lg" : "bg-transparent")}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Parent row relative so nav can be absolutely centered */}
        <div className="relative flex h-20 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center z-30">
            <Link href={isSignedIn ? "/dashboard" : "/"} className="flex items-center">
              <Image src="/logo.jpeg" alt="Fynorra AI Solutions" width={130} height={110} className="mr-3 rounded-full object-contain" />
            </Link>
          </div>

          {/* Center: Nav (absolute center on md+) */}
          <nav className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center space-x-6 z-20">
            <NavLinksContent />
          </nav>

          {/* Right: placeholder for auth/actions (kept commented for now) */}
          <div className="hidden md:flex items-center space-x-4 z-30">
            {/* Uncomment and customize when enabling auth/buttons */}
            {/*
            <SignedOut>
              <Link href="/sign-up">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button>
              </Link>
              <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
                <Button variant="outline" className="border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-primary">Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button variant="outline" className="border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-primary">
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </SignedIn>
            */}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden z-40">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-7 w-7 text-slate-50" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-full bg-slate-900 p-6 border-l border-slate-700">
                <div className="flex justify-between items-center mb-8">
                  <Link href={isSignedIn ? "/dashboard" : "/"} className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                    <Image src="/logo.jpeg" alt="Fynorra AI Assistant" width={100} height={100} className="mr-4 rounded-full object-contain" />
                  </Link>

                  <Button
                    variant="ghost"
                    className="w-12 h-12 p-0 flex items-center justify-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="h-8 w-8 text-slate-50" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>

                <MobileNavLinks />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}


export default Navbar;
