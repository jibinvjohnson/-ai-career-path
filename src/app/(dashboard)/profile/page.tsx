"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, GraduationCap, Target, Code2, Settings, Save, Plus, X, Camera, CheckCircle2, ExternalLink, GitBranch, Link2 } from "lucide-react";
import { toast } from "sonner";
import { getBranchLabel } from "@/lib/utils";

const BRANCHES = [
  "computer_science", "cybersecurity", "food_technology",
  "mechanical", "civil", "electrical", "electronics",
  "ai_data_science", "biotechnology", "information_technology",
];

const CAREER_GOALS = [
  "Software Engineer at a top tech company",
  "Full Stack Developer at a startup",
  "AI/ML Engineer",
  "Data Scientist",
  "DevOps/Cloud Engineer",
  "Cybersecurity Professional",
  "Government Job (PSU/UPSC)",
  "Higher Studies (MS/PhD/MBA)",
  "Entrepreneur / Startup founder",
  "Not sure yet — exploring",
];

const SECTION_TABS = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "academic", label: "Academic", icon: GraduationCap },
  { id: "career", label: "Career Goals", icon: Target },
  { id: "skills", label: "Skills & Interests", icon: Code2 },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    full_name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 9876543210",
    college: "NIT Trichy",
    university: "Anna University",
    branch: "computer_science",
    academic_year: 2,
    semester: 3,
    cgpa: "7.8",
    career_goal: "Full Stack Developer at a startup",
    preferred_industry: "Technology",
    preferred_location: "Bangalore",
    github_url: "https://github.com/priyasharma",
    linkedin_url: "https://linkedin.com/in/priyasharma",
    languages: ["English", "Tamil", "Hindi"],
    skills: ["Python", "HTML", "CSS", "Git", "C"],
    interests: ["Web Development", "AI", "Open Source"],
  });

  const [skillInput, setSkillInput] = useState("");
  const [interestInput, setInterestInput] = useState("");

  const update = (field: string, value: string | number | string[]) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
      update("skills", [...profile.skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    update("skills", profile.skills.filter(s => s !== skill));
  };

  const addInterest = () => {
    if (interestInput.trim() && !profile.interests.includes(interestInput.trim())) {
      update("interests", [...profile.interests, interestInput.trim()]);
      setInterestInput("");
    }
  };

  const removeInterest = (interest: string) => {
    update("interests", profile.interests.filter(i => i !== interest));
  };

  const saveProfile = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    toast.success("Profile saved successfully! Your AI recommendations will update shortly.");
    setSaving(false);
  };

  const profileCompletionFields = [
    { label: "Full Name", done: !!profile.full_name },
    { label: "Phone", done: !!profile.phone },
    { label: "College", done: !!profile.college },
    { label: "Branch", done: !!profile.branch },
    { label: "CGPA", done: !!profile.cgpa },
    { label: "Career Goal", done: !!profile.career_goal },
    { label: "GitHub", done: !!profile.github_url },
    { label: "LinkedIn", done: !!profile.linkedin_url },
    { label: "Skills (3+)", done: profile.skills.length >= 3 },
    { label: "Interests", done: profile.interests.length >= 1 },
  ];
  const completionPct = Math.round((profileCompletionFields.filter(f => f.done).length / profileCompletionFields.length) * 100);

  const inputClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-white/8 transition-all";
  const labelClass = "block text-sm font-medium text-slate-300 mb-2";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-white mb-1">My Profile</h1>
          <p className="text-slate-400 text-sm">Keep your profile updated — the AI uses this to give better recommendations.</p>
        </div>
        <button
          onClick={saveProfile}
          disabled={saving}
          className="btn-primary disabled:opacity-60"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Avatar + Completion */}
        <div className="space-y-4">
          {/* Avatar */}
          <div className="glass-card p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-indigo-500/20 mx-auto">
                PS
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg hover:bg-indigo-400 transition-colors">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="font-display font-bold text-white">{profile.full_name}</div>
            <div className="text-slate-400 text-sm">{getBranchLabel(profile.branch)}</div>
            <div className="text-slate-500 text-xs mt-1">{profile.college}</div>
            <div className="mt-3 flex justify-center gap-3">
              {profile.github_url && (
                <a href={profile.github_url} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
                  <GitBranch className="w-4 h-4" />
                </a>
              )}
              {profile.linkedin_url && (
                <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-slate-400 hover:text-blue-400">
                  <Link2 className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Completion */}
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-white">Profile Complete</span>
              <span className="text-indigo-400 font-bold">{completionPct}%</span>
            </div>
            <div className="w-full h-2 bg-white/6 rounded-full overflow-hidden mb-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPct}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
              />
            </div>
            <div className="space-y-1.5">
              {profileCompletionFields.map(f => (
                <div key={f.label} className="flex items-center gap-2 text-xs">
                  {f.done
                    ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    : <div className="w-3.5 h-3.5 rounded-full border border-slate-600 flex-shrink-0" />
                  }
                  <span className={f.done ? "text-slate-400 line-through" : "text-slate-300"}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section tabs (vertical) */}
          <div className="glass-card p-2 space-y-0.5">
            {SECTION_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`sidebar-item w-full ${activeTab === tab.id ? "active" : ""}`}
              >
                <tab.icon className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-3">
          <div className="glass-card p-6">
            {/* Personal Info */}
            {activeTab === "personal" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                <h2 className="font-display font-semibold text-lg text-white mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input type="text" value={profile.full_name} onChange={e => update("full_name", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input type="email" value={profile.email} className={inputClass + " opacity-60 cursor-not-allowed"} readOnly />
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number</label>
                    <input type="tel" value={profile.phone} onChange={e => update("phone", e.target.value)} placeholder="+91 9876543210" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Preferred Location</label>
                    <input type="text" value={profile.preferred_location} onChange={e => update("preferred_location", e.target.value)} placeholder="e.g. Bangalore, Remote" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>GitHub Profile URL</label>
                  <div className="relative">
                    <GitBranch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input type="url" value={profile.github_url} onChange={e => update("github_url", e.target.value)} placeholder="https://github.com/username" className={inputClass + " pl-10"} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>LinkedIn Profile URL</label>
                  <div className="relative">
                    <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input type="url" value={profile.linkedin_url} onChange={e => update("linkedin_url", e.target.value)} placeholder="https://linkedin.com/in/username" className={inputClass + " pl-10"} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Academic */}
            {activeTab === "academic" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                <h2 className="font-display font-semibold text-lg text-white mb-4">Academic Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>College / Institution</label>
                    <input type="text" value={profile.college} onChange={e => update("college", e.target.value)} placeholder="e.g. NIT Trichy" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>University / Board</label>
                    <input type="text" value={profile.university} onChange={e => update("university", e.target.value)} placeholder="e.g. Anna University" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Engineering Branch *</label>
                    <select value={profile.branch} onChange={e => update("branch", e.target.value)} className={inputClass}>
                      {BRANCHES.map(b => (
                        <option key={b} value={b} style={{ background: "#1a1a2e" }}>{getBranchLabel(b)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Academic Year *</label>
                    <select value={profile.academic_year} onChange={e => update("academic_year", parseInt(e.target.value))} className={inputClass}>
                      {[1, 2, 3, 4].map(y => (
                        <option key={y} value={y} style={{ background: "#1a1a2e" }}>Year {y}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Current Semester *</label>
                    <select value={profile.semester} onChange={e => update("semester", parseInt(e.target.value))} className={inputClass}>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                        <option key={s} value={s} style={{ background: "#1a1a2e" }}>Semester {s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Current CGPA</label>
                    <input type="number" min="0" max="10" step="0.01" value={profile.cgpa} onChange={e => update("cgpa", e.target.value)} placeholder="e.g. 7.8" className={inputClass} />
                    <p className="text-slate-500 text-xs mt-1">Don't worry if it's low — we'll work with it</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Career Goals */}
            {activeTab === "career" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                <h2 className="font-display font-semibold text-lg text-white mb-4">Career Goals</h2>
                <div>
                  <label className={labelClass}>Primary Career Goal *</label>
                  <div className="space-y-2">
                    {CAREER_GOALS.map(goal => (
                      <button
                        key={goal}
                        onClick={() => update("career_goal", goal)}
                        className={`w-full p-3.5 rounded-xl border text-left text-sm transition-all ${
                          profile.career_goal === goal
                            ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-300"
                            : "border-white/8 bg-white/3 text-slate-300 hover:border-white/15"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {profile.career_goal === goal
                            ? <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                            : <div className="w-4 h-4 rounded-full border border-slate-600 flex-shrink-0" />
                          }
                          {goal}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Preferred Industry</label>
                  <input type="text" value={profile.preferred_industry} onChange={e => update("preferred_industry", e.target.value)} placeholder="e.g. FinTech, HealthTech, EdTech" className={inputClass} />
                </div>
              </motion.div>
            )}

            {/* Skills & Interests */}
            {activeTab === "skills" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h2 className="font-display font-semibold text-lg text-white mb-4">Skills & Interests</h2>

                {/* Skills */}
                <div>
                  <label className={labelClass}>Your Skills <span className="text-slate-500 font-normal">(what you already know)</span></label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={e => setSkillInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && addSkill()}
                      placeholder="Type a skill and press Enter"
                      className={inputClass + " flex-1"}
                    />
                    <button onClick={addSkill} className="btn-primary px-4">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map(skill => (
                      <div key={skill} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 text-sm">
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="text-indigo-400 hover:text-rose-400 transition-colors">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    {profile.skills.length === 0 && (
                      <p className="text-slate-500 text-sm">No skills added yet. Add skills you know (even basic ones count!)</p>
                    )}
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <label className={labelClass}>Interests <span className="text-slate-500 font-normal">(what excites you)</span></label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={interestInput}
                      onChange={e => setInterestInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && addInterest()}
                      placeholder="e.g. Machine Learning, Web Dev, Gaming"
                      className={inputClass + " flex-1"}
                    />
                    <button onClick={addInterest} className="btn-primary px-4">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map(interest => (
                      <div key={interest} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/25 text-cyan-300 text-sm">
                        {interest}
                        <button onClick={() => removeInterest(interest)} className="text-cyan-400 hover:text-rose-400 transition-colors">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Settings */}
            {activeTab === "settings" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                <h2 className="font-display font-semibold text-lg text-white mb-4">Settings</h2>
                <div className="space-y-4">
                  {[
                    { label: "Email Notifications", desc: "Weekly progress reports and goal reminders", checked: true },
                    { label: "AI Mentor Messages", desc: "Daily tip from your AI mentor", checked: true },
                    { label: "Internship Deadline Alerts", desc: "Notify me when application windows open", checked: true },
                    { label: "Public Profile", desc: "Allow companies to find you on AI Career Path", checked: false },
                  ].map(setting => (
                    <div key={setting.label} className="flex items-center justify-between p-4 rounded-xl bg-white/3 border border-white/8">
                      <div>
                        <div className="text-white text-sm font-medium">{setting.label}</div>
                        <div className="text-slate-400 text-xs">{setting.desc}</div>
                      </div>
                      <div className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${setting.checked ? "bg-indigo-500" : "bg-white/15"}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${setting.checked ? "left-5" : "left-1"}`} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/6">
                  <button className="btn-ghost text-rose-400 border-rose-500/20 hover:bg-rose-500/10 w-full justify-center">
                    Delete Account
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
