import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-600 mb-4 md:mb-0">© 2025 Fynorra. All rights reserved.</div>
        <nav className="flex space-x-4">
          <Link href="/privacy" className="text-gray-600 hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-gray-600 hover:text-primary">
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  )
}

