import type { Branch, CareerPath, SemesterPlan, ProjectIdea, CertificationItem } from "@/types";

export const CS_BRANCH_DATA = {
  id: "computer_science",
  name: "Computer Science Engineering",
  tagline: "Build the digital future",
  description:
    "Computer Science Engineering is one of the most in-demand branches in the world. You'll learn to solve real-world problems using software, algorithms, data structures, and artificial intelligence.",
  icon: "💻",
  color: "from-indigo-500 to-violet-600",
  industry_demand: "very_high",
  avg_salary_fresher: 600000,
  avg_salary_experienced: 2000000,
  top_recruiters: [
    "Google", "Microsoft", "Amazon", "Meta", "Apple", "Flipkart",
    "Infosys", "TCS", "Wipro", "Zoho", "Razorpay", "Swiggy", "CRED"
  ],
  subjects_by_semester: {
    1: ["Engineering Mathematics I", "C Programming", "Engineering Physics", "Engineering Drawing", "Communication Skills"],
    2: ["Engineering Mathematics II", "Data Structures", "Object Oriented Programming (C++)", "Digital Electronics", "Environmental Science"],
    3: ["Discrete Mathematics", "Computer Organization", "Database Management Systems", "Web Technologies", "Operating Systems"],
    4: ["Design & Analysis of Algorithms", "Computer Networks", "Software Engineering", "Theory of Computation", "Python Programming"],
    5: ["Compiler Design", "Machine Learning", "Cloud Computing", "Cyber Security", "Mobile Application Development"],
    6: ["Artificial Intelligence", "Big Data Analytics", "Blockchain Technology", "Internet of Things", "Deep Learning"],
    7: ["Distributed Systems", "Natural Language Processing", "Computer Vision", "Project Work I", "Elective I"],
    8: ["Project Work II", "Industrial Training", "Entrepreneurship", "Elective II", "Seminar"],
  },
  government_opportunities: [
    "ISRO (Scientist/Engineer)", "DRDO", "BARC", "NIC", "CDAC", "BEL",
    "HAL", "ECIL", "Railway IT", "Banking (IBPS IT Officer)", "SSC CGL"
  ],
  higher_studies: [
    "M.Tech in CS", "M.Tech in AI/ML", "MCA", "MBA in IT",
    "MS (USA/Canada/Germany)", "PhD in CS", "Data Science PG Diploma"
  ],
  entrepreneurship: [
    "SaaS Products", "EdTech Startup", "FinTech", "HealthTech",
    "AI/ML Products", "Mobile Apps", "Cybersecurity Services", "Cloud Consulting"
  ],
} as const;

export const CYBER_BRANCH_DATA = {
  id: "cybersecurity",
  name: "Cybersecurity",
  tagline: "Defend the digital world",
  description:
    "Cybersecurity is one of the fastest-growing fields globally. You'll learn to protect systems, networks, and data from hackers and cyber threats. Every organization — from startups to governments — needs cybersecurity professionals.",
  icon: "🛡️",
  color: "from-rose-500 to-orange-600",
  industry_demand: "very_high",
  avg_salary_fresher: 500000,
  avg_salary_experienced: 2500000,
  top_recruiters: [
    "IBM Security", "Palo Alto Networks", "CrowdStrike", "Cisco", "Check Point",
    "KPMG", "Deloitte", "PwC", "CERT-In", "DRDO", "NIC", "BEL", "ECIL"
  ],
  subjects_by_semester: {
    1: ["C Programming", "Engineering Mathematics I", "Digital Electronics", "Communication Skills", "Computer Networks Basics"],
    2: ["Data Structures", "Operating Systems", "Network Protocols", "Cryptography Basics", "Linux Fundamentals"],
    3: ["Network Security", "Ethical Hacking Fundamentals", "Web Application Security", "Database Security", "Digital Forensics I"],
    4: ["Penetration Testing", "Malware Analysis", "Incident Response", "Cloud Security", "Risk Management"],
    5: ["Advanced Penetration Testing", "Threat Intelligence", "SOC Operations", "IoT Security", "Vulnerability Assessment"],
    6: ["Red Team Operations", "Blue Team Defense", "GRC (Governance, Risk, Compliance)", "SIEM Tools", "Forensics II"],
    7: ["Advanced Forensics", "Reverse Engineering", "CTF Competitions", "Security Architecture", "Project Work I"],
    8: ["Project Work II", "Industrial Training", "Elective (AI in Security)", "Seminar", "Entrepreneurship in Cybersecurity"],
  },
  government_opportunities: [
    "CERT-In (Analyst)", "DRDO (Security Research)", "NIC (Security Engineer)", "CRPF Cyber Cell",
    "Police Cyber Crime", "Intelligence Bureau", "NIC", "ISRO Security", "Banking Fraud Prevention"
  ],
  higher_studies: [
    "M.Tech in Cybersecurity", "M.Tech in Information Security", "MS in Cybersecurity (USA)",
    "CISSP", "CEH", "OSCP", "PhD in Cybersecurity", "MBA in IT Security"
  ],
  entrepreneurship: [
    "Cybersecurity Consultancy", "Penetration Testing Firm", "Security Audit Company",
    "Cybersecurity Training Platform", "Bug Bounty Business", "Security Products (SaaS)", "Forensics Lab"
  ],
} as const;

export const FOOD_TECH_BRANCH_DATA = {
  id: "food_technology",
  name: "Food Technology",
  tagline: "Feed the world with science",
  description:
    "Food Technology is a fascinating branch that combines science and engineering to develop, process, preserve, and ensure the safety of food. India's food industry is one of the largest in the world, creating massive career opportunities.",
  icon: "🍽️",
  color: "from-green-500 to-teal-600",
  industry_demand: "high",
  avg_salary_fresher: 350000,
  avg_salary_experienced: 1200000,
  top_recruiters: [
    "Nestle", "ITC Foods", "Britannia", "Amul", "Haldiram's", "Marico",
    "Dabur", "HUL", "Cargill", "PepsiCo India", "Coca-Cola", "FSSAI", "APEDA"
  ],
  subjects_by_semester: {
    1: ["Food Chemistry", "Microbiology Basics", "Engineering Mathematics", "Physics & Chemistry", "Communication Skills"],
    2: ["Food Microbiology", "Biochemistry", "Fluid Mechanics", "Heat Transfer", "Food Engineering I"],
    3: ["Food Processing Technology", "Fruit & Vegetable Processing", "Dairy Technology", "Food Analysis", "Packaging Technology"],
    4: ["Meat & Poultry Processing", "Bakery Technology", "Food Preservation", "Mass Transfer", "Quality Control"],
    5: ["HACCP & Food Safety", "Fermentation Technology", "Functional Foods", "Sensory Evaluation", "Food Laws & Regulations"],
    6: ["Food Plant Design", "Novel Food Processing", "Food Biotechnology", "Export Quality Management", "GMP & GHP"],
    7: ["Research Methodology", "Food Product Development", "Supply Chain Management", "Project Work I", "Elective I"],
    8: ["Project Work II", "Industrial Training", "Regulatory Affairs", "Entrepreneurship in Food", "Seminar"],
  },
  government_opportunities: [
    "FSSAI (Food Safety Officer)", "APEDA (Agri Export)", "FCI (Quality Control)", "ICAR Research",
    "CFTRI (Scientist)", "DFPD (Food Corporation)", "Ministry of Food Processing", "State Food Labs"
  ],
  higher_studies: [
    "M.Tech in Food Technology", "M.Sc Food Science", "MBA in Food & Agri Business",
    "MS Food Technology (USA/UK)", "PhD in Food Science", "PG Diploma in Food Safety"
  ],
  entrepreneurship: [
    "Food Processing Unit", "Organic Food Brand", "Food Testing Lab", "Catering Business",
    "Nutraceuticals", "Ready-to-Eat Products", "Export Business", "Food Consultancy"
  ],
} as const;

export const BRANCH_DATA_MAP = {
  computer_science: CS_BRANCH_DATA,
  cybersecurity: CYBER_BRANCH_DATA,
  food_technology: FOOD_TECH_BRANCH_DATA,
};

export function getBranchData(branch: string) {
  return BRANCH_DATA_MAP[branch as keyof typeof BRANCH_DATA_MAP] ?? null;
}
