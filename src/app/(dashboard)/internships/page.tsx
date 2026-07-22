"use client";

import { useState } from "react";
import { Briefcase, MapPin, Building2, Calendar, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const INTERNSHIPS = [
  { company: "Google STEP Internship", role: "Software Eng Intern", location: "Remote / Bangalore", stipend: "₹80,000/mo", deadline: "Apply by March" },
  { company: "Microsoft SWE Intern", role: "Software Engineer", location: "Hyderabad", stipend: "₹70,000/mo", deadline: "Apply by November" },
  { company: "Amazon SDE Internship", role: "SDE Intern", location: "Bangalore", stipend: "₹60,000/mo", deadline: "Apply by December" },
  { company: "Zoho Internship Program", role: "Product Developer", location: "Chennai", stipend: "₹20,000/mo", deadline: "Rolling Admissions" },
];

export default function InternshipsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-white mb-1">Internship Guidance & Tracker</h1>
        <p className="text-slate-400 text-sm">Discover internships for freshers and track your application progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {INTERNSHIPS.map(i => (
          <div key={i.company} className="glass-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-indigo-400" />
                <h3 className="font-display font-semibold text-white text-lg">{i.company}</h3>
              </div>
              <p className="text-indigo-300 text-sm font-medium mb-3">{i.role}</p>
              <div className="space-y-1 text-slate-400 text-xs mb-4">
                <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{i.location}</div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">💰 {i.stipend}</div>
                <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{i.deadline}</div>
              </div>
            </div>
            <button onClick={() => toast.success("Added to your application tracker!")} className="btn-primary w-full justify-center">
              Apply & Track
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
