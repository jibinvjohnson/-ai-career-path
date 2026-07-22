"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Target, AlertCircle, CheckCircle2, Clock, ArrowRight, Sparkles, BookOpen, ChevronDown } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

const MOCK_SKILLS_DATA = [
  { name: "DSA", category: "Programming", current_level: 40, required_level: 85, priority: "high", why_important: "Tested in 90% of tech interviews at top product companies.", weeks_to_learn: 12, status: "in_progress" },
  { name: "Python", category: "Programming", current_level: 55, required_level: 80, priority: "medium", why_important: "Core language for AI, data science, and scripting.", weeks_to_learn: 6, status: "in_progress" },
  { name: "Web Dev", category: "Web", current_level: 25, required_level: 90, priority: "high", why_important: "Essential for building full-stack applications and portfolios.", weeks_to_learn: 8, status: "not_started" },
  { name: "SQL & Databases", category: "Backend", current_level: 20, required_level: 75, priority: "high", why_important: "Every production app uses a database.", weeks_to_learn: 4, status: "not_started" },
  { name: "Git & GitHub", category: "Tools", current_level: 70, required_level: 80, priority: "medium", why_important: "Your digital portfolio and proof of work.", weeks_to_learn: 1, status: "completed" },
  { name: "System Design", category: "Architecture", current_level: 5, required_level: 60, priority: "high", why_important: "Crucial for mid to senior developer interviews.", weeks_to_learn: 10, status: "not_started" },
];

const RADAR_DATA = MOCK_SKILLS_DATA.map(s => ({ skill: s.name, current: s.current_level, required: s.required_level }));

export default function SkillsPage() {
  const [filter, setFilter] = useState("all");

  const filteredSkills = MOCK_SKILLS_DATA.filter(s => filter === "all" || s.priority === filter);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-white mb-1">Skill Gap Analysis</h1>
        <p className="text-slate-400 text-sm">Discover what you know, what's missing, and how to reach your career goal.</p>
      </div>

      {/* AI Insight Box */}
      <div className="glass-card p-5 border-indigo-500/30 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-indigo-300 font-semibold text-sm mb-1">AI Career Insight</div>
          <p className="text-slate-300 text-sm leading-relaxed">
            Your biggest gap for Full Stack Developer roles is <strong className="text-white">System Design</strong> & <strong className="text-white">Web Development</strong>. Focus on completing your DSA module first, then move directly to React & Node.js.
          </p>
        </div>
      </div>

      {/* Radar + Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6 lg:col-span-1">
          <h2 className="font-display font-semibold text-white text-base mb-4">Skills Radar</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={RADAR_DATA}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "#94a3b8", fontSize: 10 }} />
                <Radar name="Current" dataKey="current" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
                <Radar name="Required" dataKey="required" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.1} strokeWidth={1} strokeDasharray="3 3" />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-2 text-xs">
            <span className="flex items-center gap-1.5 text-indigo-400 font-medium"><div className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Current Level</span>
            <span className="flex items-center gap-1.5 text-cyan-400 font-medium"><div className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Target Level</span>
          </div>
        </div>

        <div className="glass-card p-6 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-white text-base">Required Skills Breakdown</h2>
            <div className="flex gap-1.5">
              {["all", "high", "medium"].map(p => (
                <button
                  key={p}
                  onClick={() => setFilter(p)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${filter === p ? "bg-indigo-500/20 border border-indigo-500/40 text-indigo-300" : "bg-white/5 text-slate-400 hover:text-slate-200"}`}
                >
                  {p} Priority
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredSkills.map(skill => (
              <div key={skill.name} className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-sm">{skill.name}</span>
                    <span className={`badge text-xs ${skill.priority === 'high' ? 'badge-danger' : 'badge-brand'}`}>{skill.priority} priority</span>
                  </div>
                  <span className="text-xs text-slate-400">{skill.current_level} / {skill.required_level}%</span>
                </div>
                <div className="w-full h-2 bg-white/6 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full" style={{ width: `${skill.current_level}%` }} />
                </div>
                <p className="text-slate-400 text-xs">{skill.why_important}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
