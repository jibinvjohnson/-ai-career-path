"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Map, Brain, Target, BookOpen, FileText,
  Briefcase, Award, FlaskConical, BarChart3, Settings, Menu,
  X, Sparkles, Bell, Search, ChevronRight, LogOut, User, Zap
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", description: "Overview & next actions" },
  { href: "/roadmap", icon: Map, label: "My Roadmap", description: "Semester-wise plan" },
  { href: "/mentor", icon: Brain, label: "AI Mentor", description: "Ask anything" },
  { href: "/skills", icon: Target, label: "Skill Gap", description: "What you're missing" },
  { href: "/career", icon: Zap, label: "Career Paths", description: "Explore options" },
  { href: "/projects", icon: FlaskConical, label: "Projects", description: "What to build" },
  { href: "/internships", icon: Briefcase, label: "Internships", description: "Get experience" },
  { href: "/certifications", icon: Award, label: "Certifications", description: "Prove your skills" },
  { href: "/resume", icon: FileText, label: "Resume Builder", description: "ATS-friendly resume" },
  { href: "/placement", icon: BookOpen, label: "Placement Prep", description: "Aptitude & interviews" },
  { href: "/analytics", icon: BarChart3, label: "Analytics", description: "Track your progress" },
  { href: "/profile", icon: User, label: "Profile", description: "Your information" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0f0f1a] flex">
      {/* Sidebar Desktop */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 240 : 72 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="hidden lg:flex flex-col fixed top-0 left-0 h-full z-40 border-r border-white/5 bg-[#16213e] overflow-hidden"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-display font-bold text-white whitespace-nowrap"
              >
                AI Career Path
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-item ${active ? "active" : ""} ${!sidebarOpen ? "justify-center" : ""}`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 min-w-0"
                    >
                      <div className="text-sm">{item.label}</div>
                      <div className="text-xs opacity-60 truncate">{item.description}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* Collapse button + User */}
        <div className="border-t border-white/5 p-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="sidebar-item w-full justify-center mb-2"
          >
            <motion.div animate={{ rotate: sidebarOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronRight className="w-5 h-5" />
            </motion.div>
          </button>
          <Link href="/login" className="sidebar-item w-full">
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">Sign Out</span>}
          </Link>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.25 }}
            className="fixed top-0 left-0 h-full w-64 z-50 bg-[#16213e] border-r border-white/5 flex flex-col lg:hidden"
          >
            <div className="flex items-center justify-between px-4 py-5 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-bold text-white">AI Career Path</span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`sidebar-item ${active ? "active" : ""}`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm">{item.label}</div>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        className="flex-1 flex flex-col min-h-screen transition-all duration-250"
        style={{ marginLeft: typeof window !== 'undefined' && window.innerWidth >= 1024 ? (sidebarOpen ? 240 : 72) : 0 }}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex items-center gap-4 px-4 md:px-6 py-4 border-b border-white/5 bg-[#0f0f1a]/80 backdrop-blur-xl">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-slate-400 hover:text-white transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/8 rounded-xl text-slate-400 text-sm">
              <Search className="w-4 h-4" />
              <span>Search anything...</span>
              <kbd className="ml-auto text-xs bg-white/10 px-1.5 py-0.5 rounded">⌘K</kbd>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500" />
            </button>

            {/* Avatar */}
            <Link href="/profile" className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-indigo-500/20">
              PS
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
