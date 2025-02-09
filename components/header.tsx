import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8">
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
          <Link href="#contact" className="text-gray-600 hover:text-primary">
            Contact
          </Link>
        </nav>
        <Button>Get Started</Button>
      </div>
    </header>
  )
}

