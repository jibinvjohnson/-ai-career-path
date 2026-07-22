"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Sparkles, CheckCircle2, User, GraduationCap, Target, Zap } from "lucide-react";
import { toast } from "sonner";

const BRANCHES = [
  { id: "computer_science", label: "Computer Science", icon: "💻", desc: "Software, AI, Data Science, Cloud" },
  { id: "cybersecurity", label: "Cybersecurity", icon: "🛡️", desc: "Ethical Hacking, SOC, Cloud Security" },
  { id: "food_technology", label: "Food Technology", icon: "🍽️", desc: "QA, R&D, FSSAI, Production" },
  { id: "mechanical", label: "Mechanical Engg.", icon: "⚙️", desc: "Design, Manufacturing, Robotics" },
  { id: "civil", label: "Civil Engg.", icon: "🏗️", desc: "Construction, Structural, Smart Cities" },
  { id: "electrical", label: "Electrical Engg.", icon: "⚡", desc: "Power Systems, Renewables, Control" },
];

const YEARS = [
  { value: 1, label: "1st Year", desc: "Just started!", sem: "Sem 1 or 2" },
  { value: 2, label: "2nd Year", desc: "Building skills", sem: "Sem 3 or 4" },
  { value: 3, label: "3rd Year", desc: "Getting serious", sem: "Sem 5 or 6" },
  { value: 4, label: "Final Year", desc: "Placement time!", sem: "Sem 7 or 8" },
];

const STEPS = [
  { id: 1, label: "Account", icon: User },
  { id: 2, label: "Branch", icon: GraduationCap },
  { id: 3, label: "Year & CGPA", icon: Target },
  { id: 4, label: "Goal", icon: Zap },
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    branch: "",
    academic_year: 0,
    semester: 0,
    cgpa: "",
    career_goal: "",
    college: "",
  });
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string | number) => setForm(f => ({ ...f, [field]: value }));

  const next = () => {
    if (step === 1 && (!form.full_name || !form.email || !form.password)) {
      toast.error("Please fill in all fields");
      return;
    }
    if (step === 2 && !form.branch) { toast.error("Please select your branch"); return; }
    if (step === 3 && !form.academic_year) { toast.error("Please select your year"); return; }
    if (step < 4) setStep(s => s + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    toast.success("Account created! Setting up your personalized roadmap...");
    setTimeout(() => { window.location.href = "/dashboard"; }, 1500);
    setLoading(false);
  };

  const variants = {
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />

      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white">AI Career Path</span>
          </Link>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s) => (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  step > s.id
                    ? "bg-indigo-500 text-white"
                    : step === s.id
                    ? "bg-indigo-500/20 border-2 border-indigo-500 text-indigo-300"
                    : "bg-white/5 border border-white/10 text-slate-500"
                }`}
              >
                {step > s.id ? <CheckCircle2 className="w-4 h-4" /> : s.id}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${
                step === s.id ? "text-indigo-300" : "text-slate-500"
              }`}>{s.label}</span>
              {s.id < 4 && <div className="w-8 h-px bg-white/10" />}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="glass-card p-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Account */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-display font-bold text-xl text-white mb-1">Create your account</h2>
                    <p className="text-slate-400 text-sm">Start your engineering career journey today</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                    <input
                      id="full_name"
                      type="text"
                      value={form.full_name}
                      onChange={(e) => update("full_name", e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@college.edu"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">College</label>
                    <input
                      id="college"
                      type="text"
                      value={form.college}
                      onChange={(e) => update("college", e.target.value)}
                      placeholder="e.g. NIT Trichy"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                    <input
                      id="password"
                      type="password"
                      value={form.password}
                      onChange={(e) => update("password", e.target.value)}
                      placeholder="Create a strong password"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Branch */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-display font-bold text-xl text-white mb-1">What's your branch?</h2>
                    <p className="text-slate-400 text-sm">We'll personalize everything for your engineering discipline</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {BRANCHES.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => update("branch", b.id)}
                        className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                          form.branch === b.id
                            ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
                            : "border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5"
                        }`}
                      >
                        <div className="text-2xl mb-1.5">{b.icon}</div>
                        <div className={`text-sm font-semibold mb-0.5 ${
                          form.branch === b.id ? "text-indigo-300" : "text-slate-200"
                        }`}>{b.label}</div>
                        <div className="text-xs text-slate-500">{b.desc}</div>
                      </button>
                    ))}
                  </div>
                  <p className="text-slate-500 text-xs text-center">Don't see your branch? More coming soon.</p>
                </div>
              )}

              {/* Step 3: Year */}
              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-display font-bold text-xl text-white mb-1">What year are you in?</h2>
                    <p className="text-slate-400 text-sm">Your roadmap will be tailored to where you are right now</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {YEARS.map((y) => (
                      <button
                        key={y.value}
                        onClick={() => { update("academic_year", y.value); update("semester", y.value * 2 - 1); }}
                        className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                          form.academic_year === y.value
                            ? "border-indigo-500 bg-indigo-500/10"
                            : "border-white/10 bg-white/3 hover:border-white/20"
                        }`}
                      >
                        <div className={`text-base font-bold mb-0.5 ${
                          form.academic_year === y.value ? "text-indigo-300" : "text-white"
                        }`}>{y.label}</div>
                        <div className="text-xs text-slate-400 mb-1">{y.desc}</div>
                        <div className="text-xs text-slate-500">{y.sem}</div>
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Your CGPA (optional)</label>
                    <input
                      type="number"
                      min="0" max="10" step="0.01"
                      value={form.cgpa}
                      onChange={(e) => update("cgpa", e.target.value)}
                      placeholder="e.g. 7.5"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 transition-all"
                    />
                    <p className="text-slate-500 text-xs mt-1.5">Don't worry if it's low — we'll help you overcome it</p>
                  </div>
                </div>
              )}

              {/* Step 4: Goal */}
              {step === 4 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-display font-bold text-xl text-white mb-1">What's your career goal?</h2>
                    <p className="text-slate-400 text-sm">Your AI mentor will be configured to guide you toward this (you can change later)</p>
                  </div>
                  <div className="space-y-2">
                    {[
                      "Get a job at a top tech company (Google, Microsoft, Amazon)",
                      "Work at a product startup",
                      "Become a government employee",
                      "Start my own company",
                      "Go for higher studies (MS/MBA)",
                      "I'm not sure yet — help me explore!",
                    ].map((goal) => (
                      <button
                        key={goal}
                        onClick={() => update("career_goal", goal)}
                        className={`w-full p-4 rounded-xl border text-left text-sm transition-all duration-200 ${
                          form.career_goal === goal
                            ? "border-indigo-500 bg-indigo-500/10 text-indigo-300"
                            : "border-white/10 bg-white/3 text-slate-300 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {form.career_goal === goal
                            ? <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                            : <div className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0" />
                          }
                          {goal}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="btn-ghost flex-1 justify-center"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            )}
            <button
              onClick={step === 4 ? handleSubmit : next}
              disabled={loading}
              className="btn-primary flex-1 justify-center disabled:opacity-60"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : step === 4 ? (
                <><span>Create My Roadmap 🚀</span></>
              ) : (
                <><span>Continue</span><ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>

        <p className="text-center text-slate-500 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Sign in →</Link>
        </p>
      </div>
    </div>
  );
}
