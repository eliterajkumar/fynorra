"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Sparkles, Settings, Cpu, FileText } from "lucide-react";

const automationFeatures = [
  { name: "Auto Data Processing", icon: <Cpu size={20} />, path: "/automation/data-processing" },
  { name: "Custom AI Model", icon: <Settings size={20} />, path: "/automation/ai-model" },
  { name: "AI Report Generation", icon: <FileText size={20} />, path: "/automation/report-generation" },
];

export default function AutomationLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar with Animation */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-64 bg-white shadow-lg p-6 space-y-4"
      >
        <h2 className="text-xl font-bold flex items-center">
          <Sparkles className="mr-2 text-blue-500" /> Automation Tools
        </h2>
        <ul className="space-y-3">
          {automationFeatures.map((feature, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-lg flex items-center space-x-2 cursor-pointer ${
                pathname === feature.path ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {feature.icon}
              <span>{feature.name}</span>
            </motion.li>
          ))}
        </ul>
      </motion.aside>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-8"
      >
        {children ? children : <h1 className="text-2xl font-bold">Select an Automation Tool</h1>}
      </motion.div>
    </div>
  );
}
