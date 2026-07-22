import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSalary(min: number, max: number): string {
  const fmt = (n: number) =>
    n >= 100000
      ? `₹${(n / 100000).toFixed(1)}L`
      : `₹${(n / 1000).toFixed(0)}K`;
  return `${fmt(min)} – ${fmt(max)} / year`;
}

export function getSemesterFromYear(year: number, isOdd: boolean): number {
  return (year - 1) * 2 + (isOdd ? 1 : 2);
}

export function getYearLabel(year: number): string {
  const labels = ["", "First Year", "Second Year", "Third Year", "Final Year"];
  return labels[year] ?? "Unknown";
}

export function getSemesterLabel(sem: number): string {
  return `Semester ${sem}`;
}

export function getBranchLabel(branch: string): string {
  const map: Record<string, string> = {
    computer_science: "Computer Science",
    cybersecurity: "Cybersecurity",
    food_technology: "Food Technology",
    mechanical: "Mechanical Engineering",
    civil: "Civil Engineering",
    electrical: "Electrical Engineering",
    electronics: "Electronics & Communication",
    ai_data_science: "AI & Data Science",
    biotechnology: "Biotechnology",
    chemical: "Chemical Engineering",
    aerospace: "Aerospace Engineering",
    automobile: "Automobile Engineering",
    information_technology: "Information Technology",
    mba: "MBA",
    mca: "MCA",
  };
  return map[branch] ?? branch;
}

export function getCareerDemandLabel(demand: string): { label: string; color: string } {
  const map: Record<string, { label: string; color: string }> = {
    very_high: { label: "Very High Demand", color: "text-emerald-400" },
    high: { label: "High Demand", color: "text-cyan-400" },
    medium: { label: "Moderate Demand", color: "text-amber-400" },
    low: { label: "Low Demand", color: "text-rose-400" },
  };
  return map[demand] ?? { label: "Unknown", color: "text-gray-400" };
}

export function getReadinessLabel(score: number): { label: string; color: string } {
  if (score >= 80) return { label: "Placement Ready!", color: "text-emerald-400" };
  if (score >= 60) return { label: "Almost Ready", color: "text-cyan-400" };
  if (score >= 40) return { label: "Building Up", color: "text-amber-400" };
  if (score >= 20) return { label: "Early Stage", color: "text-orange-400" };
  return { label: "Just Starting", color: "text-rose-400" };
}

export function getDaysUntilDeadline(dateString: string): number {
  const now = new Date();
  const deadline = new Date(dateString);
  return Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function truncate(str: string, length: number): string {
  return str.length > length ? `${str.slice(0, length)}...` : str;
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
