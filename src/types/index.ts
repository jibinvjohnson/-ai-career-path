// ============================================================
// AI Career Path — Shared TypeScript Types
// ============================================================

// ------ Enums ------

export type Branch =
  | "computer_science"
  | "cybersecurity"
  | "food_technology"
  | "mechanical"
  | "civil"
  | "electrical"
  | "electronics"
  | "ai_data_science"
  | "biotechnology"
  | "chemical"
  | "aerospace"
  | "automobile"
  | "information_technology"
  | "mba"
  | "mca";

export type AcademicYear = 1 | 2 | 3 | 4;
export type Semester = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type SkillLevel = "beginner" | "intermediate" | "advanced";
export type CertificationLevel = "beginner" | "intermediate" | "advanced" | "expert";
export type CareerDemand = "very_high" | "high" | "medium" | "low";
export type TaskStatus = "not_started" | "in_progress" | "completed" | "skipped";
export type InternshipStatus = "not_applied" | "applied" | "interviewing" | "offer_received" | "rejected" | "completed";
export type UserRole = "student" | "admin" | "mentor";

// ------ User & Profile ------

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  college?: string;
  university?: string;
  branch?: Branch;
  academic_year?: AcademicYear;
  semester?: Semester;
  cgpa?: number;
  skills: string[];
  interests: string[];
  career_goal?: string;
  preferred_industry?: string;
  preferred_location?: string;
  languages: string[];
  github_url?: string;
  linkedin_url?: string;
  resume_url?: string;
  avatar_url?: string;
  role: UserRole;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

// ------ Career & Roadmap ------

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  branch: Branch;
  industry: string;
  salary_min: number;
  salary_max: number;
  demand: CareerDemand;
  demand_label: string;
  future_scope: string;
  required_skills: string[];
  nice_to_have_skills: string[];
  top_companies: string[];
  certifications: string[];
  icon: string;
  color: string;
}

export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  why_important: string;
  semester: Semester;
  week?: number;
  estimated_hours: number;
  category: "learn" | "build" | "apply" | "practice" | "connect";
  resources: Resource[];
  status: TaskStatus;
  is_priority: boolean;
}

export interface SemesterPlan {
  semester: Semester;
  theme: string;
  description: string;
  goals: string[];
  tasks: RoadmapTask[];
  projects: ProjectIdea[];
  certifications: CertificationItem[];
  skills_to_learn: string[];
}

// ------ Skills ------

export interface Skill {
  name: string;
  category: string;
  level: SkillLevel;
  is_acquired: boolean;
  is_required_for_goal: boolean;
  priority: "high" | "medium" | "low";
  why_important: string;
  estimated_weeks: number;
  resources: Resource[];
}

export interface SkillGapAnalysis {
  target_career: string;
  skills_acquired: string[];
  skills_missing: string[];
  skills_in_progress: string[];
  priority_skills: Skill[];
  overall_gap_percentage: number;
  estimated_months_to_ready: number;
}

// ------ Resources ------

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: "video" | "article" | "course" | "book" | "platform" | "documentation" | "tool";
  is_free: boolean;
  provider: string;
  estimated_hours?: number;
  rating?: number;
}

// ------ Projects ------

export interface ProjectIdea {
  id: string;
  title: string;
  description: string;
  difficulty: SkillLevel;
  year: AcademicYear;
  semester: Semester;
  objectives: string[];
  features: string[];
  tech_stack: string[];
  skills_demonstrated: string[];
  resume_bullet_points: string[];
  github_template_url?: string;
  estimated_days: number;
  why_build_this: string;
}

// ------ Certifications ------

export interface CertificationItem {
  id: string;
  title: string;
  provider: string;
  level: CertificationLevel;
  branch: Branch[];
  url: string;
  is_free: boolean;
  estimated_hours: number;
  validity_months?: number;
  skills_covered: string[];
  industry_recognition: "global" | "national" | "regional";
  why_important: string;
  status?: "not_started" | "in_progress" | "completed" | "expired";
  completion_date?: string;
  expiry_date?: string;
}

// ------ Internships ------

export interface Internship {
  id: string;
  company: string;
  role: string;
  type: "remote" | "hybrid" | "onsite";
  duration_months: number;
  stipend_min?: number;
  stipend_max?: number;
  eligibility: {
    min_cgpa?: number;
    branches: Branch[];
    min_semester: Semester;
    required_skills: string[];
  };
  application_period: {
    start_month: string;
    end_month: string;
  };
  apply_url?: string;
  logo_url?: string;
  status?: InternshipStatus;
  applied_date?: string;
  notes?: string;
}

// ------ Dashboard Metrics ------

export interface DashboardMetrics {
  career_readiness_score: number;
  placement_readiness_score: number;
  resume_score: number;
  linkedin_score: number;
  skills_completed: number;
  skills_total: number;
  projects_completed: number;
  certifications_earned: number;
  learning_streak_days: number;
  weekly_goals_completed: number;
  weekly_goals_total: number;
  today_task?: RoadmapTask;
  next_milestone: string;
}

// ------ AI Mentor ------

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  suggested_actions?: SuggestedAction[];
}

export interface SuggestedAction {
  label: string;
  action: string;
  href?: string;
}

export interface AIRecommendation {
  id: string;
  type: "skill" | "project" | "certification" | "internship" | "career" | "daily_task";
  title: string;
  description: string;
  why: string;
  priority: "urgent" | "high" | "medium" | "low";
  estimated_time: string;
  href?: string;
  action_label: string;
}

// ------ Placement Prep ------

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  category: "aptitude" | "logical" | "verbal" | "technical" | "hr";
  difficulty: SkillLevel;
}

export interface MockTestResult {
  test_id: string;
  score: number;
  total: number;
  percentage: number;
  time_taken_seconds: number;
  category: string;
  answers: { question_id: string; selected: number; is_correct: boolean }[];
  created_at: string;
}
