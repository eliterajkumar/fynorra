"use client";

import { useState } from "react";
import { Menu, X, Home, Cpu, Settings, Play, Book } from "lucide-react";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs"; // Clerk Authentication

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser(); // Get User Data

  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        className="p-2 m-2 bg-gray-200 rounded-md md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm md:hidden z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 h-full bg-white shadow-lg p-5 transform md:translate-x-0 transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:block z-50`}
      >
        {/* Fynorra AI (Home Redirect) */}
        <Link
          href="/"
          className="text-xl font-bold mb-6 block cursor-pointer hover:text-blue-600 transition-colors"
          onClick={handleLinkClick}
        >
          Fynorra AI
        </Link>

        {/* User Profile Section */}
        {isLoaded && isSignedIn ? (
          <div className="flex items-center gap-3 mb-6 p-3 bg-gray-100 rounded-lg">
            <UserButton afterSignOutUrl="/" /> {/* Profile Avatar */}
            <div>
              <p className="text-sm font-semibold">{user.fullName}</p>
              <p className="text-xs text-gray-500">{user.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>
        ) : (
          <Link
            href="/sign-in"
            className="block bg-blue-500 text-white text-center p-2 rounded-md hover:bg-blue-600 transition"
            onClick={handleLinkClick}
          >
            Login / Sign Up
          </Link>
        )}

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={handleLinkClick}>
            <Home size={20} /> Dashboard
          </Link>
          <Link href="/multimodal" className="flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={handleLinkClick}>
            <Cpu size={20} /> MultiModal AI
          </Link>
          <Link href="/automation" className="flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={handleLinkClick}>
            <Settings size={20} /> Automation Tools
          </Link>
          <Link href="/playground" className="flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={handleLinkClick}>
            <Play size={20} /> Playground
          </Link>
          <Link href="/documentations" className="flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={handleLinkClick}>
            <Book size={20} /> Documentations
          </Link>
        </nav>
      </div>
    </>
  );
}
