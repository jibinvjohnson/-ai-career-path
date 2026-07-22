"use client";

import { BarChart3, TrendingUp, Award, Flame, CheckCircle2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const DATA = [
  { week: "W1", hours: 4 },
  { week: "W2", hours: 6 },
  { week: "W3", hours: 5 },
  { week: "W4", hours: 8 },
  { week: "W5", hours: 7 },
  { week: "W6", hours: 9 },
  { week: "W7", hours: 11 },
];

export default function AnalyticsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-white mb-1">Career Analytics & Progress</h1>
        <p className="text-slate-400 text-sm">Track your growth across all 8 semesters of engineering.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Career Readiness", val: "42%", color: "text-indigo-400" },
          { label: "Placement Score", val: "35%", color: "text-cyan-400" },
          { label: "Resume Score", val: "28%", color: "text-amber-400" },
          { label: "Streak", val: "7 Days 🔥", color: "text-orange-400" },
        ].map(card => (
          <div key={card.label} className="glass-card p-5 text-center">
            <div className={`font-display font-bold text-2xl ${card.color} mb-1`}>{card.val}</div>
            <div className="text-slate-500 text-xs">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="glass-card p-6">
        <h2 className="font-display font-semibold text-white text-lg mb-4">Weekly Learning Hours</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DATA}>
              <XAxis dataKey="week" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff" }} />
              <Area type="monotone" dataKey="hours" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
