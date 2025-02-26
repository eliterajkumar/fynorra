"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Upload, Cpu, Settings, RefreshCw } from "lucide-react";

export default function AutoSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/automation/upload", label: "Upload Data", icon: <Upload size={20} /> },
    { href: "/automation/train-model", label: "Train & Deploy Model", icon: <Cpu size={20} /> },
    { href: "/automation/generate-api", label: "Generate AI API", icon: <Settings size={20} /> },
    { href: "/automation/workflow-automation", label: "Workflow Automation", icon: <RefreshCw size={20} /> },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 fixed">
      <h2 className="text-xl font-bold mb-6">AI Automation</h2>
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.href} className="mb-4">
              <Link
                href={link.href}
                className={`flex items-center gap-3 p-2 rounded transition ${
                  pathname === link.href ? "bg-gray-700" : "hover:bg-gray-800"
                }`}
              >
                {link.icon} {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
