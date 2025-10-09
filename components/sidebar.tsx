"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu as MenuIcon,
  X as XIcon,
  Home,
  Upload,
  Cpu,
  Play,
  CloudUpload,
  Settings,
  Moon,
  Sun,
  ChevronsLeft,
  ChevronsRight,
  BookUserIcon,
} from "lucide-react";

/**
 * Sidebar - Fynorra AI
 * Responsive + Theme toggle + Compact mode + Active link highlight
 * TailwindCSS dark mode required: `darkMode: "class"`
 */

const NAV = [
  { href: "/dashboard", label: "Dashboard", Icon: Home },
  { href: "/upload", label: "Upload Data", Icon: Upload },
  { href: "/train", label: "Train AI", Icon: Cpu },
  { href: "/playground", label: "Playground", Icon: Play },
  { href: "/deploy", label: "Deploy", Icon: CloudUpload },
  { href: "/docs", label: "Docs", Icon: BookUserIcon },
  { href: "/settings", label: "Settings", Icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(
    typeof window !== "undefined" && document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  );

  // handle theme
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  // close mobile on route change
  useEffect(() => setOpen(false), [pathname]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <>
      {/* Mobile topbar */}
      <div className="md:hidden flex items-center justify-between px-3 py-2 bg-white dark:bg-slate-900 border-b dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-md flex items-center justify-center font-bold text-white"
            style={{ background: "linear-gradient(135deg,#6D28D9,#EC4899)" }}
          >
            F
          </div>
          <div className="text-sm font-semibold leading-tight">
            <div>Fynorra AI</div>
            <div className="text-xs text-gray-500 dark:text-slate-400">Custom Assistants</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            title="Toggle theme"
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {open ? <XIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-white dark:bg-slate-900 border-r dark:border-slate-800 transition-transform duration-200 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 ${collapsed ? "w-20" : "w-64"}`}
        style={{ boxShadow: "0 6px 18px rgba(15,23,42,0.06)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white"
              style={{ background: "linear-gradient(135deg,#6D28D9,#EC4899)" }}
            >
              F
            </div>
            {!collapsed && (
              <div>
                <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Fynorra AI
                </div>
                <div className="text-xs text-gray-500 dark:text-slate-400">
                  Build Custom Assistants
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              title="Toggle Theme"
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              onClick={() => setCollapsed((c) => !c)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none"
            >
              {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
            </button>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-auto px-2 py-4">
          <ul className="space-y-1">
            {NAV.map(({ href, label, Icon }) => {
              const active =
                pathname === href || pathname?.startsWith(href + "/");
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`group flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm font-medium transition
                      ${
                        active
                          ? "bg-gradient-to-r from-indigo-50 to-indigo-25 text-indigo-700 dark:text-indigo-300"
                          : "text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800"
                      }
                      ${collapsed ? "justify-center" : ""}
                    `}
                  >
                    <Icon
                      size={18}
                      className={`${
                        active
                          ? "text-indigo-600"
                          : "text-gray-500 dark:text-slate-300"
                      } flex-shrink-0`}
                    />
                    {!collapsed && <span>{label}</span>}
                    {active && !collapsed && (
                      <span className="ml-auto text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Quick Action */}
          {!collapsed && (
            <div className="mt-6 px-2">
              <button
                onClick={() => (window.location.href = "/playground")}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-violet-500 text-white font-semibold shadow-sm hover:scale-[1.01] transition"
              >
                <Play size={16} /> Try Playground
              </button>
              <div className="mt-3 text-xs text-gray-500 dark:text-slate-400">
                Tip: Clean docs before indexing for better RAG results.
              </div>
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="px-3 py-3 border-t dark:border-slate-800">
          <div
            className={`flex items-center gap-3 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-indigo-600 font-medium">
              U
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  You
                </div>
                <div className="text-xs text-gray-500 dark:text-slate-400">
                  Pro Plan
                </div>
              </div>
            )}
            {!collapsed && (
              <Link
                href="/settings"
                className="text-xs text-indigo-600 hover:underline"
              >
                Manage
              </Link>
            )}
          </div>
        </div>
      </aside>

      {/* Backdrop (mobile) */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
