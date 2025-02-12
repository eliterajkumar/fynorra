"use client";

import { useState } from "react";
import { Menu, X, Home, Cpu, Settings, Play } from "lucide-react";
import Link from "next/link";
import Playground from "@/app/playground/page";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar Toggle Button */}
      <button
        className="p-2 m-2 bg-gray-200 rounded-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-md p-5 transform md:translate-x-0 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:block`}
      >
        <h2 className="text-xl font-bold mb-6">Fynorra AI</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
            <Home size={20} /> Dashboard
          </Link>
          <Link href="/multimodal" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
            <Cpu size={20} /> MultiModal AI
          </Link>
          
          <Link href="/automation" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
            <Settings size={20} /> Automation Tools
          </Link>
          <Link href="/playground" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
            <Play size={20} /> Playground
          </Link>
        </nav>
      </div>
    </div>
  );
}
