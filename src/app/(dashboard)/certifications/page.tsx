"use client";

import { Award, CheckCircle2, ExternalLink, Clock } from "lucide-react";
import { toast } from "sonner";

const CERTS = [
  { title: "CS50: Introduction to Computer Science", provider: "Harvard (edX)", cost: "Free", hours: "60 hrs", level: "Beginner", branch: "CS" },
  { title: "Google IT Support Professional", provider: "Coursera", cost: "Paid", hours: "40 hrs", level: "Beginner", branch: "Cyber" },
  { title: "AWS Certified Solutions Architect", provider: "Amazon Web Services", cost: "Paid", hours: "100 hrs", level: "Advanced", branch: "CS/Cloud" },
  { title: "FoSTaC Food Safety Supervisor", provider: "FSSAI", cost: "Paid", hours: "8 hrs", level: "Beginner", branch: "Food Tech" },
];

export default function CertificationsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-white mb-1">Certification Tracker</h1>
        <p className="text-slate-400 text-sm">Industry-recognized certifications mapped to your branch and semester.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {CERTS.map(c => (
          <div key={c.title} className="glass-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="badge badge-brand text-xs">{c.provider}</span>
                <span className={`badge text-xs ${c.cost === 'Free' ? 'badge-success' : 'badge-warning'}`}>{c.cost}</span>
              </div>
              <h3 className="font-display font-semibold text-white text-lg mb-2">{c.title}</h3>
              <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                <span><Clock className="w-3.5 h-3.5 inline mr-1" />{c.hours}</span>
                <span>Level: {c.level}</span>
              </div>
            </div>
            <button onClick={() => toast.info("Opening certification details...")} className="btn-ghost w-full justify-center">
              Track Certification <Award className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
