"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Sparkles, CheckCircle2, AlertTriangle, Plus, Eye } from "lucide-react";
import { toast } from "sonner";

export default function ResumePage() {
  const [form, setForm] = useState({
    name: "Priya Sharma",
    title: "Computer Science Undergraduate",
    email: "priya.sharma@example.com",
    phone: "+91 9876543210",
    summary: "Motivated BTech CS student passionate about full-stack web development and problem solving.",
    skills: "Python, C, HTML/CSS, Git, GitHub, JavaScript",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-white mb-1">Resume Builder</h1>
          <p className="text-slate-400 text-sm">Build an ATS-friendly resume tailored for engineering campus placements.</p>
        </div>
        <button onClick={() => toast.info("PDF download ready in Pro version!")} className="btn-primary">
          <Download className="w-4 h-4" /> Download PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="glass-card p-6 space-y-5">
          <h2 className="font-display font-semibold text-white text-lg border-b border-white/8 pb-3">Personal Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Professional Title</label>
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Summary</label>
              <textarea value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })} rows={3} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Technical Skills</label>
              <input type="text" value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm" />
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-white text-slate-900 rounded-2xl p-8 shadow-2xl min-h-[500px] text-xs font-sans space-y-4">
          <div className="border-b pb-3">
            <h1 className="text-xl font-bold text-slate-900 uppercase">{form.name || "YOUR NAME"}</h1>
            <p className="text-indigo-600 font-semibold">{form.title}</p>
            <p className="text-slate-500 mt-1">{form.email} | {form.phone}</p>
          </div>
          <div>
            <h2 className="font-bold text-slate-800 uppercase tracking-wide border-b pb-1 mb-1">Summary</h2>
            <p className="text-slate-600">{form.summary}</p>
          </div>
          <div>
            <h2 className="font-bold text-slate-800 uppercase tracking-wide border-b pb-1 mb-1">Skills</h2>
            <p className="text-slate-600">{form.skills}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
