"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, ChevronDown, ChevronRight, Clock, Sparkles, Lock, Calendar, BookOpen, Code2, Briefcase, Award, Link as LinkIcon, ArrowRight } from "lucide-react";
import { CS_SEMESTER_ROADMAP } from "@/data/roadmaps";
import type { SemesterPlan, RoadmapTask } from "@/types";

// Mock current user state
const MOCK_USER = { semester: 3, branch: "computer_science" };

const CATEGORY_CONFIG = {
  learn: { icon: BookOpen, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20", label: "Learn" },
  build: { icon: Code2, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", label: "Build" },
  apply: { icon: Briefcase, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", label: "Apply" },
  practice: { icon: Award, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", label: "Practice" },
  connect: { icon: LinkIcon, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20", label: "Connect" },
};

function TaskCard({ task, isLocked }: { task: RoadmapTask; isLocked: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [done, setDone] = useState(task.status === "completed");
  const cat = CATEGORY_CONFIG[task.category];

  return (
    <div className={`glass-card p-4 transition-all ${done ? "opacity-60" : ""} ${task.is_priority ? "border-indigo-500/30" : ""}`}>
      <div className="flex items-start gap-3">
        {/* Check */}
        <button
          onClick={() => !isLocked && setDone(!done)}
          className="mt-0.5 flex-shrink-0"
          disabled={isLocked}
        >
          {isLocked ? (
            <Lock className="w-5 h-5 text-slate-600" />
          ) : done ? (
            <CheckCircle2 className="w-5 h-5 text-indigo-400" />
          ) : (
            <Circle className="w-5 h-5 text-slate-500 hover:text-slate-300 transition-colors" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap mb-1">
            {task.is_priority && (
              <span className="badge badge-danger text-xs">Priority</span>
            )}
            <span className={`badge text-xs ${cat.bg} ${cat.color} ${cat.border}`}>
              <cat.icon className="w-3 h-3" /> {cat.label}
            </span>
            <span className="text-slate-500 text-xs flex items-center gap-1">
              <Clock className="w-3 h-3" /> {task.estimated_hours}h
            </span>
          </div>

          <h3 className={`font-semibold text-white text-sm mb-1 ${done ? "line-through text-slate-500" : ""}`}>
            {task.title}
          </h3>

          <p className="text-slate-400 text-xs leading-relaxed mb-2">{task.description}</p>

          {/* WHY card */}
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-white/4 border border-white/6 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-slate-400">
              <span className="text-slate-300 font-medium">Why: </span>
              {task.why_important}
            </div>
          </div>

          {/* Resources toggle */}
          {task.resources.length > 0 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-indigo-400 hover:text-indigo-300 text-xs flex items-center gap-1 transition-colors"
            >
              {expanded ? "Hide" : "Show"} Resources
              <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`} />
            </button>
          )}

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden mt-2 space-y-1.5"
              >
                {task.resources.map((r) => (
                  <a
                    key={r.id}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg bg-white/4 border border-white/6 hover:border-indigo-500/30 transition-all text-xs text-slate-300 hover:text-white"
                  >
                    <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${r.is_free ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"}`}>
                      {r.is_free ? "FREE" : "PAID"}
                    </span>
                    <span className="flex-1">{r.title}</span>
                    <span className="text-slate-600">{r.provider}</span>
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function SemesterSection({ plan, isActive, isLocked }: { plan: SemesterPlan; isActive: boolean; isLocked: boolean }) {
  const [open, setOpen] = useState(isActive);
  const completedTasks = plan.tasks.filter(t => t.status === "completed").length;
  const progress = Math.round((completedTasks / Math.max(plan.tasks.length, 1)) * 100);

  return (
    <div className={`glass-card overflow-hidden transition-all ${isActive ? "border-indigo-500/30 shadow-lg shadow-indigo-500/5" : ""}`}>
      {/* Header */}
      <button
        onClick={() => !isLocked && setOpen(!open)}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/3 transition-colors"
        disabled={isLocked}
      >
        {/* Sem number */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-bold text-base ${
          isActive ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30" :
          isLocked ? "bg-white/4 text-slate-600 border border-white/6" :
          "bg-white/8 text-slate-300"
        }`}>
          {isLocked ? <Lock className="w-5 h-5" /> : `S${plan.semester}`}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="font-display font-semibold text-white">Semester {plan.semester}</span>
            {isActive && <span className="badge badge-success text-xs">Current</span>}
            {isLocked && <span className="badge text-xs" style={{background:"rgba(255,255,255,0.05)",color:"#475569",border:"1px solid rgba(255,255,255,0.08)"}}>Locked</span>}
          </div>
          <div className="text-indigo-300 text-sm font-medium">{plan.theme}</div>
          <div className="text-slate-500 text-xs mt-0.5 truncate">{plan.description.slice(0, 80)}...</div>
        </div>

        <div className="flex-shrink-0 text-right">
          {!isLocked && (
            <div className="mb-1">
              <div className="text-white text-sm font-semibold">{progress}%</div>
              <div className="text-slate-500 text-xs">{completedTasks}/{plan.tasks.length} tasks</div>
            </div>
          )}
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ml-auto ${open ? "rotate-180" : ""}`} />
        </div>
      </button>

      {/* Progress bar */}
      {!isLocked && (
        <div className="h-0.5 mx-5 mb-0 bg-white/6 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1 }}
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
          />
        </div>
      )}

      {/* Content */}
      <AnimatePresence>
        {open && !isLocked && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-4 space-y-5">
              {/* Goals */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Semester Goals</h3>
                <div className="space-y-1.5">
                  {plan.goals.map((g, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <ChevronRight className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      {g}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tasks */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Tasks ({plan.tasks.length})</h3>
                <div className="space-y-3">
                  {plan.tasks.map((task) => (
                    <TaskCard key={task.id} task={task} isLocked={false} />
                  ))}
                </div>
              </div>

              {/* Projects */}
              {plan.projects.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Projects ({plan.projects.length})</h3>
                  <div className="space-y-2">
                    {plan.projects.map((project) => (
                      <div key={project.id} className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/15">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-cyan-300 font-semibold text-sm">{project.title}</span>
                          <span className="badge badge-cyan text-xs">{project.difficulty}</span>
                        </div>
                        <p className="text-slate-400 text-xs mb-1.5">{project.description}</p>
                        <p className="text-indigo-300 text-xs"><span className="font-medium">Why: </span>{project.why_build_this}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {plan.certifications.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Certifications ({plan.certifications.length})</h3>
                  <div className="space-y-2">
                    {plan.certifications.map((cert) => (
                      <div key={cert.id} className="p-3 rounded-xl bg-violet-500/5 border border-violet-500/15 flex items-center gap-3">
                        <Award className="w-5 h-5 text-violet-400 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-violet-300 font-semibold text-sm">{cert.title}</div>
                          <div className="text-slate-500 text-xs">{cert.provider} · {cert.estimated_hours}h · {cert.is_free ? "🆓 Free" : "Paid"}</div>
                        </div>
                        <span className="badge badge-brand text-xs">{cert.industry_recognition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills to learn */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Skills to Learn</h3>
                <div className="flex flex-wrap gap-1.5">
                  {plan.skills_to_learn.map((skill) => (
                    <span key={skill} className="badge badge-brand">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function RoadmapPage() {
  const currentSem = MOCK_USER.semester;
  // Generate 8 semesters from data (fill gaps with placeholders)
  const allSemesters: SemesterPlan[] = CS_SEMESTER_ROADMAP;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-white mb-1">My Roadmap</h1>
          <p className="text-slate-400 text-sm">Your semester-by-semester career plan. Focused. Actionable. Personalized.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
          <Calendar className="w-4 h-4 text-indigo-400" />
          <span className="text-indigo-300 text-sm font-medium">Semester {currentSem} Active</span>
        </div>
      </div>

      {/* Overall progress */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-semibold text-white">Overall Journey</h2>
          <span className="text-slate-400 text-sm">Sem {currentSem} of 8</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 h-2 bg-white/6 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentSem - 1) / 8) * 100}%` }}
              transition={{ duration: 1.5 }}
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
            />
          </div>
          <span className="text-slate-400 text-sm">{Math.round(((currentSem - 1) / 8) * 100)}%</span>
        </div>
        <div className="grid grid-cols-8 gap-1">
          {Array.from({ length: 8 }, (_, i) => i + 1).map((sem) => (
            <div
              key={sem}
              className={`h-1.5 rounded-full transition-all ${
                sem < currentSem ? "bg-indigo-500" :
                sem === currentSem ? "bg-violet-400 animate-pulse" :
                "bg-white/8"
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-slate-600 text-xs">Start</span>
          <span className="text-slate-600 text-xs">Graduation 🎓</span>
        </div>
      </div>

      {/* Semester sections */}
      <div className="space-y-4">
        {allSemesters.map((plan) => (
          <SemesterSection
            key={plan.semester}
            plan={plan}
            isActive={plan.semester === currentSem}
            isLocked={plan.semester > currentSem + 1}
          />
        ))}

        {/* Future semesters placeholder */}
        {[4, 5, 6, 7, 8].filter(s => !allSemesters.find(p => p.semester === s)).map((sem) => (
          <div key={sem} className="glass-card p-5 opacity-50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/4 border border-white/6 flex items-center justify-center text-slate-600">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="font-display font-semibold text-slate-400">Semester {sem}</div>
                <div className="text-slate-600 text-xs">Unlocks when you reach this semester</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
