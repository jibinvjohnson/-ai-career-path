"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Brain, Target, TrendingUp, Flame, CheckCircle2, Circle,
  ArrowRight, Zap, BookOpen, Code2, Briefcase, Award,
  ChevronRight, Star, Clock, AlertCircle, BarChart3,
  MessageSquare, CalendarDays, Sparkles
} from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

// ── Mock data (replace with Supabase data) ──────────────────────

const MOCK_PROFILE = {
  name: "Priya Sharma",
  branch: "Computer Science",
  year: "2nd Year",
  semester: 3,
  college: "NIT Trichy",
  career_goal: "Full Stack Developer at a Product Startup",
};

const MOCK_METRICS = {
  career_readiness: 42,
  placement_readiness: 35,
  resume_score: 28,
  linkedin_score: 15,
  streak_days: 7,
  projects_completed: 1,
  certs_earned: 0,
  weekly_goals_done: 3,
  weekly_goals_total: 7,
};

const TODAY_TASK = {
  title: "Complete DSA Module: Arrays",
  why: "Arrays are asked in 90% of software engineering interviews. Companies like Amazon, Google, and Flipkart test this directly.",
  time: "~2 hours",
  category: "learn",
  href: "/roadmap",
};

const WEEKLY_GOALS = [
  { id: 1, title: "Complete Arrays in LeetCode", done: true, category: "practice" },
  { id: 2, title: "Push Calculator project to GitHub", done: true, category: "build" },
  { id: 3, title: "Add 3 connections on LinkedIn", done: true, category: "connect" },
  { id: 4, title: "Complete DSA: Linked Lists", done: false, category: "learn" },
  { id: 5, title: "Watch 2 System Design videos", done: false, category: "learn" },
  { id: 6, title: "Research 2 internship companies", done: false, category: "apply" },
  { id: 7, title: "Draft Resume Section: Education", done: false, category: "build" },
];

const AI_RECOMMENDATIONS = [
  {
    type: "urgent",
    icon: Flame,
    iconColor: "text-rose-400",
    bg: "from-rose-500/10 to-orange-500/5",
    border: "border-rose-500/20",
    title: "Your Resume is Missing Projects",
    description: "Recruiters skip resumes with no projects. Add your Calculator project right now — it takes 10 minutes.",
    time: "10 mins",
    why: "70% of resumes are rejected for lack of proof of skills. Projects = credibility.",
    action: "Build Resume",
    href: "/resume",
  },
  {
    type: "high",
    icon: Target,
    iconColor: "text-amber-400",
    bg: "from-amber-500/10 to-yellow-500/5",
    border: "border-amber-500/20",
    title: "Start LinkedIn Profile Optimization",
    description: "Your LinkedIn score is 15/100. Recruiters Google you before interviews. Let the AI help optimize it.",
    time: "30 mins",
    why: "40% of recruiters check LinkedIn before interviews. A strong profile = more opportunities.",
    action: "Optimize LinkedIn",
    href: "/profile",
  },
  {
    type: "high",
    icon: Code2,
    iconColor: "text-indigo-400",
    bg: "from-indigo-500/10 to-violet-500/5",
    border: "border-indigo-500/20",
    title: "Next Project: Portfolio Website",
    description: "Sem 3 is the perfect time to build your portfolio website. It's your digital identity for internships.",
    time: "7 days",
    why: "A portfolio website makes you 3x more likely to get internship callbacks.",
    action: "View Project Guide",
    href: "/projects",
  },
];

const SKILL_RADAR_DATA = [
  { skill: "DSA", score: 40 },
  { skill: "Web Dev", score: 25 },
  { skill: "Python", score: 55 },
  { skill: "Git/GitHub", score: 70 },
  { skill: "Databases", score: 20 },
  { skill: "System Design", score: 5 },
];

const LEARNING_TREND = [
  { week: "W1", hours: 4 },
  { week: "W2", hours: 6 },
  { week: "W3", hours: 5 },
  { week: "W4", hours: 8 },
  { week: "W5", hours: 7 },
  { week: "W6", hours: 9 },
  { week: "W7", hours: 11 },
];

const UPCOMING = [
  { title: "Start Web Dev (HTML/CSS)", due: "This week", urgent: false },
  { title: "Apply to Google Summer of Code", due: "3 weeks", urgent: true },
  { title: "Complete CS50 Certificate", due: "Next month", urgent: false },
];

// ── Score Ring Component ─────────────────────────────────────────

function ScoreRing({
  score, label, sublabel, size = 120, strokeWidth = 10,
  gradient = ["#6366f1", "#8b5cf6"],
}: {
  score: number; label: string; sublabel?: string; size?: number;
  strokeWidth?: number; gradient?: [string, string];
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const gradId = `grad-${label.replace(/\s/g, "")}`;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradient[0]} />
              <stop offset="100%" stopColor={gradient[1]} />
            </linearGradient>
          </defs>
          <circle cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
          <motion.circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke={`url(#${gradId})`} strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="font-display font-bold text-2xl text-white">{score}</div>
          <div className="text-slate-400 text-xs">/ 100</div>
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-semibold text-white">{label}</div>
        {sublabel && <div className="text-xs text-slate-500">{sublabel}</div>}
      </div>
    </div>
  );
}

// ── Category badge ───────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  learn: "badge-brand",
  build: "badge-cyan",
  apply: "badge-success",
  practice: "badge-warning",
  connect: "badge-danger",
};

// ── Main Dashboard ───────────────────────────────────────────────

export default function DashboardPage() {
  const [checkedGoals, setCheckedGoals] = useState<Record<number, boolean>>(
    Object.fromEntries(WEEKLY_GOALS.filter(g => g.done).map(g => [g.id, true]))
  );

  const toggleGoal = (id: number) => {
    setCheckedGoals(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedGoals).filter(Boolean).length;
  const weeklyProgress = Math.round((completedCount / WEEKLY_GOALS.length) * 100);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto space-y-6"
    >
      {/* ── Header ── */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">
            Good evening, {MOCK_PROFILE.name.split(" ")[0]} 👋
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {MOCK_PROFILE.branch} · {MOCK_PROFILE.year} · {MOCK_PROFILE.college}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-orange-300 text-sm font-semibold">{MOCK_METRICS.streak_days} day streak</span>
          </div>
          <Link href="/mentor" className="btn-primary text-sm px-4 py-2">
            <MessageSquare className="w-4 h-4" /> Ask AI Mentor
          </Link>
        </div>
      </motion.div>

      {/* ── Goal banner ── */}
      <motion.div variants={itemVariants}>
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
            <Star className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-slate-400 mb-0.5">Your Career Goal</div>
            <div className="text-white font-semibold text-sm">{MOCK_PROFILE.career_goal}</div>
          </div>
          <Link href="/career" className="btn-ghost text-xs px-3 py-1.5 shrink-0">
            Explore Paths <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </motion.div>

      {/* ── Today's #1 Action ── */}
      <motion.div variants={itemVariants}>
        <div className="glass-card p-6 relative overflow-hidden" style={{ boxShadow: "0 0 40px rgba(99,102,241,0.1)" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/0" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-indigo-300 text-xs font-semibold uppercase tracking-wide">Today's Priority Action</span>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="flex-1">
                <h2 className="font-display font-bold text-xl text-white mb-2">{TODAY_TASK.title}</h2>
                <div className="flex items-start gap-2 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/15 mb-3">
                  <Sparkles className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-indigo-300 text-xs font-semibold">WHY THIS MATTERS: </span>
                    <span className="text-slate-300 text-xs">{TODAY_TASK.why}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{TODAY_TASK.time}</span>
                  <span className={`badge ${CATEGORY_COLORS[TODAY_TASK.category]}`}>{TODAY_TASK.category}</span>
                </div>
              </div>
              <Link href={TODAY_TASK.href} className="btn-primary shrink-0">
                Start Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Score Rings Row ── */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { score: MOCK_METRICS.career_readiness, label: "Career Ready", gradient: ["#6366f1", "#8b5cf6"] as [string, string], sublabel: "Building up" },
            { score: MOCK_METRICS.placement_readiness, label: "Placement Ready", gradient: ["#06b6d4", "#0891b2"] as [string, string], sublabel: "Early stage" },
            { score: MOCK_METRICS.resume_score, label: "Resume Score", gradient: ["#f59e0b", "#d97706"] as [string, string], sublabel: "Needs work" },
            { score: MOCK_METRICS.linkedin_score, label: "LinkedIn Score", gradient: ["#10b981", "#059669"] as [string, string], sublabel: "Just started" },
          ].map((ring) => (
            <div key={ring.label} className="glass-card p-6 flex justify-center">
              <ScoreRing {...ring} size={110} strokeWidth={9} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Main grid: Left (Recommendations + Goals) | Right (Charts + Upcoming) ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left col (2/3) */}
        <div className="xl:col-span-2 space-y-6">

          {/* AI Recommendations */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-lg text-white">AI Recommendations</h2>
              <span className="text-slate-500 text-xs">Updated just now</span>
            </div>
            <div className="space-y-3">
              {AI_RECOMMENDATIONS.map((rec, i) => (
                <motion.div
                  key={rec.title}
                  variants={itemVariants}
                  className={`glass-card p-5 border bg-gradient-to-r ${rec.bg} ${rec.border}`}
                >
                  <div className="flex gap-4 items-start">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      rec.type === "urgent" ? "bg-rose-500/20" : rec.type === "high" ? "bg-amber-500/20" : "bg-indigo-500/20"
                    }`}>
                      <rec.icon className={`w-5 h-5 ${rec.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-white text-sm">{rec.title}</h3>
                        {rec.type === "urgent" && (
                          <span className="badge badge-danger flex-shrink-0">Urgent</span>
                        )}
                      </div>
                      <p className="text-slate-400 text-xs mb-2 leading-relaxed">{rec.description}</p>
                      <div className="flex items-start gap-1.5 p-2.5 rounded-lg bg-white/5 mb-3">
                        <Sparkles className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-400 text-xs"><span className="text-slate-300 font-medium">Why: </span>{rec.why}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-xs flex items-center gap-1"><Clock className="w-3 h-3" />{rec.time}</span>
                        <Link href={rec.href} className="text-indigo-400 hover:text-indigo-300 text-xs font-semibold flex items-center gap-1 transition-colors">
                          {rec.action} <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Weekly Goals */}
          <motion.div variants={itemVariants} className="glass-card p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-display font-semibold text-lg text-white">This Week's Goals</h2>
              <span className="text-slate-400 text-sm">{completedCount}/{WEEKLY_GOALS.length} done</span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-white/8 rounded-full mb-5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${weeklyProgress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
              />
            </div>
            <div className="space-y-2">
              {WEEKLY_GOALS.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${ 
                    checkedGoals[goal.id]
                      ? "bg-indigo-500/8 border border-indigo-500/15"
                      : "bg-white/3 border border-white/6 hover:bg-white/5"
                  }`}
                >
                  {checkedGoals[goal.id]
                    ? <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                    : <Circle className="w-5 h-5 text-slate-500 flex-shrink-0" />
                  }
                  <span className={`text-sm flex-1 ${ checkedGoals[goal.id] ? "text-slate-400 line-through" : "text-slate-200" }`}>
                    {goal.title}
                  </span>
                  <span className={`badge text-xs ${CATEGORY_COLORS[goal.category]}`}>{goal.category}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right col (1/3) */}
        <div className="space-y-6">

          {/* Skills Radar */}
          <motion.div variants={itemVariants} className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-base text-white">Skills Snapshot</h2>
              <Link href="/skills" className="text-indigo-400 hover:text-indigo-300 text-xs font-medium flex items-center gap-1 transition-colors">
                Full Gap Analysis <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={SKILL_RADAR_DATA}>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "#64748b", fontSize: 11 }} />
                  <Radar dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} strokeWidth={2} dot={{ fill: "#6366f1", r: 3 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/15 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-slate-300">
                <span className="text-amber-300 font-semibold">System Design </span>
                is your biggest gap for Full Stack roles.
              </div>
            </div>
          </motion.div>

          {/* Learning Trend */}
          <motion.div variants={itemVariants} className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-base text-white">Learning Trend</h2>
              <span className="text-emerald-400 text-xs font-semibold">↑ 57% this week</span>
            </div>
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={LEARNING_TREND}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="week" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#f1f5f9", fontSize: 12 }}
                    formatter={(val?: any) => [`${val ?? 0}h`, "Learning"]}
                  />
                  <Area type="monotone" dataKey="hours" stroke="#6366f1" fill="url(#areaGrad)" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={itemVariants} className="glass-card p-6">
            <h2 className="font-display font-semibold text-base text-white mb-4">Quick Stats</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Code2, label: "Projects", value: MOCK_METRICS.projects_completed, color: "text-cyan-400", bg: "bg-cyan-500/10" },
                { icon: Award, label: "Certs", value: MOCK_METRICS.certs_earned, color: "text-violet-400", bg: "bg-violet-500/10" },
                { icon: Flame, label: "Streak", value: `${MOCK_METRICS.streak_days}d`, color: "text-orange-400", bg: "bg-orange-500/10" },
                { icon: BarChart3, label: "Goals Done", value: `${completedCount}/${WEEKLY_GOALS.length}`, color: "text-emerald-400", bg: "bg-emerald-500/10" },
              ].map((s) => (
                <div key={s.label} className={`p-3 rounded-xl ${s.bg} border border-white/6 text-center`}>
                  <s.icon className={`w-5 h-5 ${s.color} mx-auto mb-1`} />
                  <div className={`font-bold text-lg ${s.color}`}>{s.value}</div>
                  <div className="text-slate-500 text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming */}
          <motion.div variants={itemVariants} className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-base text-white">Upcoming</h2>
              <CalendarDays className="w-4 h-4 text-slate-500" />
            </div>
            <div className="space-y-3">
              {UPCOMING.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${item.urgent ? "bg-rose-400" : "bg-slate-600"}`} />
                  <div className="flex-1">
                    <div className="text-sm text-slate-200">{item.title}</div>
                    <div className={`text-xs mt-0.5 ${item.urgent ? "text-rose-400" : "text-slate-500"}`}>{item.due}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
