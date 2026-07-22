"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, DollarSign, Users, Star, ArrowRight, ChevronRight, Sparkles, CheckCircle2, Award, Zap } from "lucide-react";
import { CS_CAREERS, CYBER_CAREERS, FOOD_TECH_CAREERS } from "@/data/careers";
import type { CareerPath } from "@/types";
import { formatSalary, getCareerDemandLabel } from "@/lib/utils";

const BRANCH_TABS = [
  { id: "computer_science", label: "Computer Science", icon: "💻", careers: CS_CAREERS },
  { id: "cybersecurity", label: "Cybersecurity", icon: "🛡️", careers: CYBER_CAREERS },
  { id: "food_technology", label: "Food Technology", icon: "🍽️", careers: FOOD_TECH_CAREERS },
];

function CareerDetailModal({ career, onClose }: { career: CareerPath; onClose: () => void }) {
  const demandInfo = getCareerDemandLabel(career.demand);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={e => e.stopPropagation()}
        className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className={`p-6 bg-gradient-to-br ${career.color} relative rounded-t-2xl`}>
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg bg-black/20 text-white/70 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="text-4xl mb-3">{career.icon}</div>
          <h2 className="font-display font-bold text-2xl text-white mb-1">{career.title}</h2>
          <p className="text-white/80 text-sm">{career.industry}</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/8">
              <DollarSign className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
              <div className="text-white font-semibold text-sm">{formatSalary(career.salary_min, career.salary_max)}</div>
              <div className="text-slate-500 text-xs">Fresher Salary</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/8">
              <TrendingUp className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
              <div className={`font-semibold text-sm ${demandInfo.color}`}>{demandInfo.label}</div>
              <div className="text-slate-500 text-xs">Industry Demand</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/8">
              <Users className="w-5 h-5 text-violet-400 mx-auto mb-1" />
              <div className="text-white font-semibold text-sm">{career.top_companies.length}+ Companies</div>
              <div className="text-slate-500 text-xs">Hiring This Role</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-slate-300 leading-relaxed text-sm">{career.description}</p>
          </div>

          {/* Future scope */}
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-indigo-300 font-semibold text-sm">Future Scope</span>
            </div>
            <p className="text-slate-300 text-sm">{career.future_scope}</p>
          </div>

          {/* Required skills */}
          <div>
            <h3 className="font-display font-semibold text-white mb-3 flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-amber-400" /> Required Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {career.required_skills.map(skill => (
                <span key={skill} className="badge badge-brand text-xs">
                  <CheckCircle2 className="w-3 h-3" /> {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Nice to have */}
          {career.nice_to_have_skills.length > 0 && (
            <div>
              <h3 className="font-display font-semibold text-white mb-3 flex items-center gap-2 text-sm">
                <Star className="w-4 h-4 text-slate-400" /> Nice to Have
              </h3>
              <div className="flex flex-wrap gap-2">
                {career.nice_to_have_skills.map(skill => (
                  <span key={skill} className="badge text-xs" style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)' }}>{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* Top companies */}
          <div>
            <h3 className="font-display font-semibold text-white mb-3 flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-cyan-400" /> Top Recruiters
            </h3>
            <div className="flex flex-wrap gap-2">
              {career.top_companies.map(c => (
                <span key={c} className="badge badge-cyan text-xs">{c}</span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="font-display font-semibold text-white mb-3 flex items-center gap-2 text-sm">
              <Award className="w-4 h-4 text-violet-400" /> Key Certifications
            </h3>
            <div className="space-y-2">
              {career.certifications.map(cert => (
                <div key={cert} className="flex items-center gap-2 p-2.5 rounded-lg bg-white/4 border border-white/8 text-slate-300 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 flex-shrink-0" /> {cert}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3 pt-2">
            <button className="btn-primary flex-1 justify-center text-sm" onClick={onClose}>
              Start This Career Path <ArrowRight className="w-4 h-4" />
            </button>
            <button className="btn-ghost px-4 text-sm" onClick={onClose}>Close</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CareerPage() {
  const [activeBranch, setActiveBranch] = useState(BRANCH_TABS[0]);
  const [selectedCareer, setSelectedCareer] = useState<CareerPath | null>(null);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-2xl text-white mb-1">Career Paths</h1>
        <p className="text-slate-400 text-sm">Explore what's possible. Understand what it takes. Then pick your path.</p>
      </div>

      {/* AI Career Match Banner */}
      <div className="glass-card p-5 flex flex-col sm:flex-row items-center gap-4" style={{ boxShadow: "0 0 30px rgba(99,102,241,0.1)" }}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <div className="font-semibold text-white text-sm">AI Career Match</div>
          <div className="text-slate-400 text-xs">Based on your profile (CS, Sem 3, interests in web dev), here are your top 3 career matches.</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 text-xs font-semibold">
            <span>🥇</span> Full Stack Dev
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
            <span>🥈</span> Software Eng.
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold hidden sm:flex">
            <span>🥉</span> AI/ML Eng.
          </div>
        </div>
      </div>

      {/* Branch Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {BRANCH_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveBranch(tab)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeBranch.id === tab.id
                ? "bg-indigo-500/15 border border-indigo-500/30 text-indigo-300"
                : "bg-white/4 border border-white/8 text-slate-400 hover:text-slate-200 hover:bg-white/6"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Career Cards Grid */}
      <motion.div
        key={activeBranch.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {activeBranch.careers.map((career, i) => {
          const demandInfo = getCareerDemandLabel(career.demand);
          return (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              onClick={() => setSelectedCareer(career)}
              className="glass-card p-6 cursor-pointer group"
            >
              {/* Top */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${career.color} flex items-center justify-center text-2xl shadow-lg`}>
                  {career.icon}
                </div>
                <span className={`badge text-xs ${demandInfo.color} bg-white/5 border-white/10`}>{demandInfo.label}</span>
              </div>

              {/* Title */}
              <h3 className="font-display font-semibold text-white text-lg mb-1 group-hover:text-indigo-300 transition-colors">{career.title}</h3>
              <p className="text-slate-400 text-xs mb-4 leading-relaxed line-clamp-2">{career.description}</p>

              {/* Salary */}
              <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-semibold mb-4">
                <span className="text-base">💰</span>
                {formatSalary(career.salary_min, career.salary_max)}
              </div>

              {/* Skills preview */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {career.required_skills.slice(0, 3).map(s => (
                  <span key={s} className="badge badge-brand text-xs">{s}</span>
                ))}
                {career.required_skills.length > 3 && (
                  <span className="badge text-xs" style={{ background: 'rgba(255,255,255,0.05)', color: '#64748b', border: '1px solid rgba(255,255,255,0.08)' }}>+{career.required_skills.length - 3} more</span>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/6">
                <span className="text-slate-500 text-xs">{career.top_companies.slice(0, 2).join(', ')} & more</span>
                <div className="flex items-center gap-1 text-indigo-400 text-xs font-medium group-hover:gap-2 transition-all">
                  View Details <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Career Detail Modal */}
      <AnimatePresence>
        {selectedCareer && (
          <CareerDetailModal career={selectedCareer} onClose={() => setSelectedCareer(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
