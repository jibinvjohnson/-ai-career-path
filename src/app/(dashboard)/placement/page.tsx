"use client";

import { useState } from "react";
import { BookOpen, CheckCircle2, Award, Clock, ArrowRight, Sparkles, Brain } from "lucide-react";
import { toast } from "sonner";

const QUIZZES = [
  { title: "Quantitative Aptitude", questions: 150, category: "Aptitude", icon: "📐", color: "from-blue-500 to-indigo-600" },
  { title: "Logical Reasoning", questions: 120, category: "Reasoning", icon: "🧩", color: "from-violet-500 to-purple-600" },
  { title: "Data Structures (DSA)", questions: 200, category: "Technical", icon: "💻", color: "from-emerald-500 to-teal-600" },
  { title: "DBMS & SQL", questions: 90, category: "Technical", icon: "🗄️", color: "from-cyan-500 to-blue-600" },
  { title: "HR Interview Prep", questions: 50, category: "Soft Skills", icon: "🗣️", color: "from-amber-500 to-orange-600" },
];

export default function PlacementPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-white mb-1">Placement Preparation</h1>
        <p className="text-slate-400 text-sm">Practice mock tests, aptitude, core CS subjects, and HR interview questions.</p>
      </div>

      <div className="glass-card p-5 border-emerald-500/30 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
          <Award className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-emerald-300 font-semibold text-sm">Placement Readiness Score: 35/100</div>
          <p className="text-slate-400 text-xs mt-0.5">Complete 5 more DSA modules to increase score by +15%.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {QUIZZES.map(q => (
          <div key={q.title} className="glass-card p-6 flex flex-col justify-between">
            <div>
              <div className="text-3xl mb-3">{q.icon}</div>
              <span className="badge badge-brand text-xs mb-2">{q.category}</span>
              <h3 className="font-display font-semibold text-white text-lg mb-1">{q.title}</h3>
              <p className="text-slate-400 text-xs">{q.questions} practice questions available</p>
            </div>
            <button onClick={() => toast.info(`Starting ${q.title} practice...`)} className="btn-primary mt-6 w-full justify-center">
              Start Practice <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
