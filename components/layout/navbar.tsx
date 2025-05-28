
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
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

const navLinkClass = "text-sm font-medium text-slate-200 hover:text-primary transition-colors"; // Adjusted for better visibility on dark bg
const mobileNavLinkClass = "text-lg font-medium text-slate-50 hover:text-primary transition-colors py-2 block"; // Ensure high contrast

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    // Set initial state
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLinksContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className={cn(isMobile ? mobileNavLinkClass : navLinkClass, "flex items-center gap-1 outline-none", isMobile && "justify-between w-full")}>
          What we do <ChevronDown className={cn("h-4 w-4", isMobile && "h-5 w-5")} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className={cn(isMobile && "w-[calc(100vw-4rem)] ml-4 bg-slate-900 border-slate-700")}>
          <DropdownMenuItem asChild><Link href="/custom-ai-solutions" className={cn(isMobile ? mobileNavLinkClass : "flex items-center gap-2 w-full text-slate-200 hover:!text-primary", "px-2 py-1.5")} onClick={() => isMobile && setMobileMenuOpen(false)}><BrainCircuit className={cn("h-4 w-4", isMobile && "h-5 w-5")} /> Custom AI Solutions</Link></DropdownMenuItem>
          <DropdownMenuItem asChild><Link href="/software-development" className={cn(isMobile ? mobileNavLinkClass : "flex items-center gap-2 w-full text-slate-200 hover:!text-primary", "px-2 py-1.5")} onClick={() => isMobile && setMobileMenuOpen(false)}><Code className={cn("h-4 w-4", isMobile && "h-5 w-5")} /> Software Development</Link></DropdownMenuItem>
          <DropdownMenuItem asChild><Link href="/cloud-devops" className={cn(isMobile ? mobileNavLinkClass : "flex items-center gap-2 w-full text-slate-200 hover:!text-primary", "px-2 py-1.5")} onClick={() => isMobile && setMobileMenuOpen(false)}><Cloud className={cn("h-4 w-4", isMobile && "h-5 w-5")} /> Cloud & DevOps</Link></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className={cn(isMobile ? mobileNavLinkClass : navLinkClass, "flex items-center gap-1 outline-none", isMobile && "justify-between w-full")}>
          Resources <ChevronDown className={cn("h-4 w-4", isMobile && "h-5 w-5")} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className={cn(isMobile && "w-[calc(100vw-4rem)] ml-4 bg-slate-900 border-slate-700")}>
          <DropdownMenuItem asChild><Link href="/blog" className={cn(isMobile ? mobileNavLinkClass : "flex items-center gap-2 w-full text-slate-200 hover:!text-primary", "px-2 py-1.5")} onClick={() => isMobile && setMobileMenuOpen(false)}><BookOpen className={cn("h-4 w-4", isMobile && "h-5 w-5")} /> Blog</Link></DropdownMenuItem>
          <DropdownMenuItem asChild><Link href="/case-studies" className={cn(isMobile ? mobileNavLinkClass : "flex items-center gap-2 w-full text-slate-200 hover:!text-primary", "px-2 py-1.5")} onClick={() => isMobile && setMobileMenuOpen(false)}><Briefcase className={cn("h-4 w-4", isMobile && "h-5 w-5")} /> Case Studies</Link></DropdownMenuItem>
         {/* <DropdownMenuItem asChild><Link href="/whitepapers" className={cn(isMobile ? mobileNavLinkClass : "flex items-center gap-2 w-full text-slate-200 hover:!text-primary", "px-2 py-1.5")} onClick={() => isMobile && setMobileMenuOpen(false)}>Whitepapers</Link></DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>

      <Link href="/for-businesses" className={isMobile ? mobileNavLinkClass : navLinkClass} onClick={() => isMobile && setMobileMenuOpen(false)}>
        For Businesses
      </Link>
      <Link href="/about-us" className={isMobile ? mobileNavLinkClass : navLinkClass} onClick={() => isMobile && setMobileMenuOpen(false)}>
        About Us
      </Link>
       <Link href="/pricing" className={isMobile ? mobileNavLinkClass : navLinkClass} onClick={() => isMobile && setMobileMenuOpen(false)}>
        Pricing
      </Link>
       <Link href="/contact" className={isMobile ? mobileNavLinkClass : navLinkClass} onClick={() => isMobile && setMobileMenuOpen(false)}>
        Contact
      </Link>
    </>
  );
  
  const MobileNavLinks = () => (
    <div className="flex flex-col gap-4 mt-8">
      <NavLinksContent isMobile={true} />
      
      <SignedOut>
        <Link href="/sign-up" passHref>
            <Button size="lg" className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setMobileMenuOpen(false)}>Get Started</Button>
        </Link>
        <SignInButton mode="modal" redirectUrl="/">
          <Button variant="outline" size="lg" className="w-full border-slate-700 text-slate-200 hover:bg-slate-700" onClick={() => setMobileMenuOpen(false)}>Sign In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
        {/* Optionally, a "Dashboard" or other relevant button for signed-in users on mobile */}
        {/* <Link href="/dashboard" passHref><Button size="lg" className="w-full mt-4">Dashboard</Button></Link> */}
      </SignedIn>
    </div>
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-slate-900/80 backdrop-blur-md shadow-lg" : "bg-transparent" // Adjusted for darker theme
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold uppercase text-slate-50">FYNORRA</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <NavLinksContent />
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <Link href="/sign-up" passHref>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button>
              </Link>
              <SignInButton mode="modal" redirectUrl="/">
                <Button variant="outline" className="border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-primary">Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              {/* You can add a dashboard link or other actions for signed-in users here if needed */}
              {/* <Link href="/dashboard" passHref><Button>Dashboard</Button></Link> */}
              <UserButton afterSignOutUrl="/" appearance={{
                elements: {
                  userButtonAvatarBox: "w-10 h-10",
                  userButtonPopoverCard: "bg-slate-800 border-slate-700 text-slate-200",
                  userButtonPopoverActionButton: "text-slate-300 hover:bg-slate-700",
                  userButtonPopoverActionButtonIcon: "text-slate-400",
                  userButtonPopoverFooter: "hidden" // Example: hide footer
                }
              }}/>
            </SignedIn>
          </div>

          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-slate-50" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full bg-slate-900 p-6 border-l-slate-700">
                <div className="flex justify-between items-center mb-8">
                   <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                     <span className="text-2xl font-bold uppercase text-slate-50">FYNORRA</span>
                   </Link>
                   <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                     <X className="h-6 w-6 text-slate-50" />
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
