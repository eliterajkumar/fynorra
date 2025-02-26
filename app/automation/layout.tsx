"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
export default function AutomationLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen">
      {/* Automation Sidebar Always Visible */}
      <aside className="w-64 bg-gray-900 text-white p-4 space-y-4">
      <h2 className="text-xl font-bold">
  <Link href="/automation" className="hover:underline">
    AI Automation
  </Link>
</h2>
        <nav className="space-y-2">
          <a href="/automation/upload" className="block p-2 hover:bg-gray-700 rounded">📂 Upload Data</a>
          <a href="/automation/train-model" className="block p-2 hover:bg-gray-700 rounded">🚀 Train & Deploy Model</a>
          <a href="/automation/generate-api" className="block p-2 hover:bg-gray-700 rounded">🔗 Generate AI API</a>
          <a href="/automation/workflow" className="block p-2 hover:bg-gray-700 rounded">⚙️ Workflow Automation</a>
        </nav>
      </aside>

      {/* Dynamic Content Based on Route with Animation */}
      <motion.div 
        key={pathname}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="flex-1 p-8 min-h-screen bg-gray-100"
      >
        {children ? children : <h1 className="text-2xl font-bold">Select an Automation Tool</h1>}
      </motion.div>
    </div>
  );
}
