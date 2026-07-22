"use client";

import { useState } from "react";
import { FlaskConical, Code2, Sparkles, ArrowRight, ExternalLink, GitBranch } from "lucide-react";
import { toast } from "sonner";

const PROJECTS = [
  { title: "CLI Student Management System", sem: "Sem 1", desc: "Build in C using file handling and structs.", stack: ["C", "File I/O"], level: "Beginner" },
  { title: "Personal Portfolio Website", sem: "Sem 2", desc: "Responsive portfolio hosted on Vercel with GitHub links.", stack: ["HTML", "CSS", "JavaScript"], level: "Beginner" },
  { title: "Full Stack Weather App", sem: "Sem 3", desc: "Fetch real-time weather using OpenWeather API.", stack: ["React", "Node.js", "API"], level: "Intermediate" },
  { title: "E-Commerce Microservices", sem: "Sem 5", desc: "Scalable backend with JWT auth and payment gateway.", stack: ["Next.js", "PostgreSQL", "Docker"], level: "Advanced" },
];

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-white mb-1">Project Roadmap</h1>
        <p className="text-slate-400 text-sm">Build industry-ready projects tailored for every semester of engineering.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {PROJECTS.map(p => (
          <div key={p.title} className="glass-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="badge badge-brand text-xs">{p.sem}</span>
                <span className="badge badge-cyan text-xs">{p.level}</span>
              </div>
              <h3 className="font-display font-semibold text-white text-lg mb-2">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.stack.map(s => <span key={s} className="badge bg-white/5 text-slate-300 text-xs">{s}</span>)}
              </div>
            </div>
            <button onClick={() => toast.info("Opening project guide...")} className="btn-ghost mt-6 w-full justify-center">
              View Implementation Guide <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
