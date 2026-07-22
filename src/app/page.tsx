"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Brain, Target, TrendingUp, Shield, Code2, Cpu, Zap, Star, CheckCircle2, ChevronRight, Sparkles, BookOpen, Briefcase, Award, Users, BarChart3, MessageSquare } from "lucide-react";

const FEATURES = [
  {
    icon: Brain,
    title: "AI Career Mentor",
    description: "Your personal senior friend who has already been through engineering. Ask anything — from 'I don't know what to study' to 'How do I get a job at Google?'",
    color: "from-indigo-500 to-violet-600",
    glow: "rgba(99,102,241,0.3)",
  },
  {
    icon: Target,
    title: "Semester-wise Roadmap",
    description: "Never be lost. Know exactly what to learn, build, and achieve in each semester — from Sem 1 to Sem 8.",
    color: "from-cyan-500 to-blue-600",
    glow: "rgba(6,182,212,0.3)",
  },
  {
    icon: TrendingUp,
    title: "Skill Gap Analysis",
    description: "See exactly which skills you're missing for your dream career and a step-by-step plan to acquire them.",
    color: "from-emerald-500 to-teal-600",
    glow: "rgba(16,185,129,0.3)",
  },
  {
    icon: Briefcase,
    title: "Resume Builder",
    description: "Build an ATS-friendly resume with AI suggestions. Know your Resume Score and exactly how to improve it.",
    color: "from-amber-500 to-orange-600",
    glow: "rgba(245,158,11,0.3)",
  },
  {
    icon: Code2,
    title: "Project Roadmap",
    description: "Get year-wise project ideas with complete guidance — tech stack, GitHub structure, and resume bullet points.",
    color: "from-rose-500 to-pink-600",
    glow: "rgba(244,63,94,0.3)",
  },
  {
    icon: Award,
    title: "Certification Tracker",
    description: "Know which certifications to get and when. Track progress and never miss an expiry date.",
    color: "from-violet-500 to-purple-600",
    glow: "rgba(139,92,246,0.3)",
  },
];

const BRANCHES = [
  { icon: "💻", name: "Computer Science", careers: ["Software Engineer", "AI Engineer", "Data Scientist"], color: "from-indigo-500 to-violet-600" },
  { icon: "🛡️", name: "Cybersecurity", careers: ["SOC Analyst", "Pen Tester", "Cloud Security"], color: "from-rose-500 to-orange-600" },
  { icon: "🍽️", name: "Food Technology", careers: ["QA Officer", "R&D Executive", "FSSAI Officer"], color: "from-green-500 to-teal-600" },
];

const JOURNEY_STEPS = [
  { sem: "Sem 1–2", title: "Foundation", desc: "C Programming, GitHub, LinkedIn, First Projects", icon: BookOpen },
  { sem: "Sem 3–4", title: "Build Skills", desc: "Web Dev, DSA, Databases, Certifications, Resume v1", icon: Code2 },
  { sem: "Sem 5–6", title: "Real Experience", desc: "Major Projects, Internships, Open Source, LinkedIn Growth", icon: Briefcase },
  { sem: "Sem 7–8", title: "Get Hired", desc: "Placement Prep, Mock Interviews, Job Applications, OFFER", icon: Star },
];

const STATS = [
  { value: "10,000+", label: "Students Guided" },
  { value: "3", label: "Engineering Branches" },
  { value: "500+", label: "Career Resources" },
  { value: "95%", label: "Placement Rate" },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0f0f1a] text-slate-100 overflow-x-hidden">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* ── NAV ── */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-white">AI Career Path</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Features</Link>
          <Link href="#branches" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Branches</Link>
          <Link href="#journey" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Your Journey</Link>
          <Link href="#pricing" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="btn-ghost text-sm px-4 py-2">Sign In</Link>
          <Link href="/register" className="btn-primary text-sm px-5 py-2">
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 text-center px-6 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            Powered by Google Gemini AI
          </div>

          <h1 className="font-display font-bold mb-6 leading-tight">
            <span className="text-white">Your Career Operating System</span>
            <br />
            <span className="gradient-text">From Day 1 to Dream Job</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            The AI-powered platform that guides BTech students step-by-step — from picking the right career path to landing the perfect placement. Like having a senior mentor available 24/7.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/register"
              className="btn-primary text-base px-8 py-4 shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40"
            >
              Start Your Journey Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/login" className="btn-ghost text-base px-8 py-4">
              Already a student? Sign In
            </Link>
          </div>

          {/* Hero stats */}
          <div className="flex flex-wrap justify-center gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-3xl gradient-text">{stat.value}</div>
                <div className="text-slate-500 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── JOURNEY STEPS ── */}
      <section id="journey" className="relative z-10 px-6 md:px-12 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-white mb-4">Your 4-Year Engineering Journey</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Every semester has a clear purpose. You'll always know exactly what to do and why.</p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Journey path */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-indigo-500/50 via-violet-500/50 to-cyan-500/50" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {JOURNEY_STEPS.map((step, i) => (
                <motion.div
                  key={step.sem}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 mb-4 mx-auto">
                    <step.icon className="w-7 h-7 text-indigo-400" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">
                      {i + 1}
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-indigo-400 mb-1 uppercase tracking-wide">{step.sem}</div>
                  <div className="font-display font-semibold text-white mb-2">{step.title}</div>
                  <div className="text-slate-400 text-sm">{step.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="relative z-10 px-6 md:px-12 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-white mb-4">Everything You Need, Nothing You Don't</h2>
          <p className="text-slate-400 max-w-xl mx-auto">One platform. Every tool you need to go from confused fresher to confident professional.</p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glass-card p-6 group cursor-pointer"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg`}
                style={{ boxShadow: `0 8px 24px ${f.glow}` }}
              >
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display font-semibold text-white text-lg mb-2 group-hover:text-indigo-300 transition-colors">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── BRANCHES ── */}
      <section id="branches" className="relative z-10 px-6 md:px-12 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-white mb-4">Built for Your Branch</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Specialized career guidance for each engineering branch — same AI engine, tailored content.</p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {BRANCHES.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card p-6 text-center group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="text-5xl mb-4">{b.icon}</div>
              <h3 className="font-display font-semibold text-white mb-3">{b.name}</h3>
              <div className="space-y-1.5">
                {b.careers.map((c) => (
                  <div key={c} className="flex items-center justify-center gap-2 text-slate-400 text-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {c}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── WHAT THE AI MENTOR CAN DO ── */}
      <section className="relative z-10 px-6 md:px-12 pb-28">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold mb-4">
                  <MessageSquare className="w-3.5 h-3.5" /> AI Mentor
                </div>
                <h2 className="font-display font-bold text-white mb-4 text-2xl md:text-3xl">Ask Anything. Get Real Answers.</h2>
                <p className="text-slate-400 mb-6">Our AI Mentor responds like a senior engineer who has walked your path. No judgment. No generic advice. Just honest, actionable guidance.</p>
                <div className="space-y-3">
                  {[
                    "I don't know programming. Where do I start?",
                    "I have low CGPA. Can I still get a good job?",
                    "Which career path is right for me?",
                    "How do I prepare for campus placements?",
                  ].map((q) => (
                    <div key={q} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/8 text-slate-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                      {q}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div className="chat-bubble-user self-end ml-auto max-w-xs">
                  I don't know programming and I'm in Sem 1. What should I do?
                </div>
                <div className="chat-bubble-ai max-w-sm">
                  That's completely okay! Every programmer starts knowing nothing. 🙌 Here's your exact Sem 1 plan:
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="text-indigo-300">1. Start with C Programming (CS50 by Harvard — FREE)</div>
                    <div className="text-indigo-300">2. Create a GitHub account this week</div>
                    <div className="text-indigo-300">3. Learn Git basics (2 hours, once)</div>
                    <div className="text-indigo-300">4. Don't worry about the rest yet</div>
                  </div>
                  <div className="mt-3 text-slate-400 text-sm">That's it. Focus only on this. You've got this! 💪</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="relative z-10 px-6 md:px-12 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-white mb-4">Simple, Fair Pricing</h2>
          <p className="text-slate-400">Start free. Upgrade when you're ready.</p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free */}
          <div className="glass-card p-8">
            <div className="font-display font-semibold text-xl text-white mb-1">Free Forever</div>
            <div className="text-4xl font-bold text-white mb-1">₹0<span className="text-lg text-slate-400 font-normal">/month</span></div>
            <p className="text-slate-400 text-sm mb-6">Everything a fresher needs to get started</p>
            <div className="space-y-3 mb-8">
              {["Career Path Exploration", "Semester Roadmap (Sem 1–4)", "AI Mentor (10 chats/day)", "Resume Builder (1 template)", "Skill Gap Analysis", "Basic Analytics"].map(f => (
                <div key={f} className="flex items-center gap-3 text-slate-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />{f}
                </div>
              ))}
            </div>
            <Link href="/register" className="btn-ghost w-full justify-center">Get Started Free</Link>
          </div>

          {/* Pro */}
          <div className="relative glass-card p-8 border-indigo-500/30" style={{ boxShadow: "0 0 40px rgba(99,102,241,0.2)" }}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1 bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-xs font-bold rounded-full">MOST POPULAR</span>
            </div>
            <div className="font-display font-semibold text-xl text-white mb-1">Pro Student</div>
            <div className="text-4xl font-bold gradient-text mb-1">₹299<span className="text-lg text-slate-400 font-normal">/month</span></div>
            <p className="text-slate-400 text-sm mb-6">Full access for serious career builders</p>
            <div className="space-y-3 mb-8">
              {["Everything in Free", "Full Sem 1–8 Roadmap", "Unlimited AI Mentor", "All Resume Templates + AI Review", "LinkedIn Optimizer", "Mock Tests & Placement Prep", "Internship Tracker", "Priority Support"].map(f => (
                <div key={f} className="flex items-center gap-3 text-slate-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />{f}
                </div>
              ))}
            </div>
            <Link href="/register" className="btn-primary w-full justify-center">
              Start 7-Day Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 px-6 pb-24 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-12" style={{ boxShadow: "0 0 60px rgba(99,102,241,0.15)" }}>
            <div className="text-5xl mb-4">🚀</div>
            <h2 className="font-display font-bold text-white mb-4">Start Your Journey Today</h2>
            <p className="text-slate-400 mb-8">Every day you wait is a day behind. The best time to start was Day 1 of college. The second best time is right now.</p>
            <Link href="/register" className="btn-primary text-base px-10 py-4 shadow-xl shadow-indigo-500/20">
              Create Free Account <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-white/5 px-6 md:px-12 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-semibold text-slate-300">AI Career Path</span>
          </div>
          <div className="text-slate-500 text-sm">© 2024 AI Career Path. Built for engineers, by engineers.</div>
        </div>
      </footer>
    </main>
  );
}
