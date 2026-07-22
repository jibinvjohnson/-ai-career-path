import type { UserProfile, CareerPath } from "@/types";

// ================================================================
// Google Gemini AI Client
// In production: uses GEMINI_API_KEY from environment
// In development: returns intelligent mock responses
// ================================================================

const SYSTEM_PROMPT = `You are an AI Career Mentor for engineering students in India. You behave like a senior engineer who has already been through engineering college and now guides juniors.

PERSONALITY:
- Warm, supportive, and empathetic — never dismissive
- Realistic and honest — not overly optimistic
- Action-oriented — always give specific next steps
- Encouraging but truthful about effort required

STYLE:
- Use simple language (students may not be confident in English)
- Structure responses with clear numbered steps or bullet points
- Always explain WHY something matters
- Relate to Indian engineering context (IIT/NIT/deemed colleges, Indian companies, Indian salaries)
- Use emojis sparingly but effectively for warmth

TOPICS:
1. Career paths and guidance
2. Skill recommendations (what to learn and why)
3. Resume and LinkedIn advice
4. Internship and placement preparation
5. Project ideas and implementation help
6. Study planning and roadmaps
7. Motivation and handling academic struggles
8. Indian tech industry context

RULES:
- NEVER discourage a student, even if their CGPA is low
- ALWAYS provide actionable next steps (not vague advice)
- ALWAYS explain WHY before WHAT
- If unsure, say so and redirect appropriately
- Mention specific resources (with "FREE" or "PAID" label)`;

const CAREER_SYSTEM_PROMPT = `You are an AI that generates structured career recommendations for engineering students.
Always respond with valid JSON only. No markdown, no explanations outside the JSON.
Base recommendations on the student's branch, semester, skills, and interests.`;

const ROADMAP_SYSTEM_PROMPT = `You are an AI that generates personalized learning roadmaps for engineering students.
Always respond with valid JSON only. No markdown, no explanations outside the JSON.`;

// ----------------------------------------------------------------
// Mentor Chat (conversational)
// ----------------------------------------------------------------
export async function sendMentorMessage(
  userMessage: string,
  profile: Partial<UserProfile>,
  conversationHistory: { role: "user" | "model"; text: string }[]
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey || apiKey === "your_gemini_api_key") {
    // Return mock response in development
    return getMockMentorResponse(userMessage, profile);
  }

  try {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_PROMPT + buildProfileContext(profile),
    });

    const chat = model.startChat({
      history: conversationHistory.map(h => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
    });

    const result = await chat.sendMessage(userMessage);
    return result.response.text();
  } catch (err) {
    console.error("Gemini API error:", err);
    return getMockMentorResponse(userMessage, profile);
  }
}

// ----------------------------------------------------------------
// Career Recommendations
// ----------------------------------------------------------------
export async function generateCareerRecommendations(
  profile: Partial<UserProfile>
): Promise<CareerPath[]> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "your_gemini_api_key") {
    return []; // Use static data in development
  }

  try {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `${CAREER_SYSTEM_PROMPT}

Student Profile:
Branch: ${profile.branch}
Year: ${profile.academic_year}
Semester: ${profile.semester}
CGPA: ${profile.cgpa}
Skills: ${profile.skills?.join(", ")}
Interests: ${profile.interests?.join(", ")}
Career Goal: ${profile.career_goal}

Generate top 3 career path recommendations as JSON array matching this schema:
[{ "id": string, "title": string, "description": string, "branch": string, "industry": string, "salary_min": number, "salary_max": number, "demand": "very_high"|"high"|"medium"|"low", "demand_label": string, "future_scope": string, "required_skills": string[], "nice_to_have_skills": string[], "top_companies": string[], "certifications": string[], "icon": string, "color": string }]`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json|```/g, "").trim();
    return JSON.parse(text);
  } catch (err) {
    console.error("Career recommendation error:", err);
    return [];
  }
}

// ----------------------------------------------------------------
// Skill Gap Analysis
// ----------------------------------------------------------------
export async function analyzeSkillGap(
  targetCareer: string,
  profile: Partial<UserProfile>
): Promise<{
  skills_missing: string[];
  skills_acquired: string[];
  priority_next: string;
  estimated_months: number;
}> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "your_gemini_api_key") {
    return {
      skills_missing: ["DSA", "System Design", "React", "Node.js", "REST APIs"],
      skills_acquired: profile.skills ?? [],
      priority_next: "Data Structures & Algorithms",
      estimated_months: 8,
    };
  }

  try {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Analyze skill gap for a student targeting: ${targetCareer}
Current skills: ${profile.skills?.join(", ")}
Branch: ${profile.branch}, Year: ${profile.academic_year}

Respond with ONLY valid JSON:
{"skills_missing": string[], "skills_acquired": string[], "priority_next": string, "estimated_months": number}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json|```/g, "").trim();
    return JSON.parse(text);
  } catch {
    return {
      skills_missing: ["DSA", "System Design", "React", "Node.js"],
      skills_acquired: profile.skills ?? [],
      priority_next: "Data Structures & Algorithms",
      estimated_months: 8,
    };
  }
}

// ----------------------------------------------------------------
// Resume Analysis
// ----------------------------------------------------------------
export async function analyzeResume(resumeText: string): Promise<{
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "your_gemini_api_key") {
    return {
      score: 42,
      strengths: ["Contact info present", "Education section complete"],
      weaknesses: ["No quantified achievements", "Missing projects section", "Skills section too short"],
      suggestions: [
        "Add 2-3 projects with GitHub links",
        "Quantify impact: 'Reduced load time by 40%' not 'Improved performance'",
        "Add 10+ relevant technical skills",
        "Include a professional summary",
      ],
    };
  }

  try {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Analyze this student resume for ATS friendliness and job readiness.
Resume:
${resumeText}

Respond with ONLY valid JSON:
{"score": number (0-100), "strengths": string[], "weaknesses": string[], "suggestions": string[]}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json|```/g, "").trim();
    return JSON.parse(text);
  } catch {
    return {
      score: 30,
      strengths: [],
      weaknesses: ["Could not analyze — please try again"],
      suggestions: [],
    };
  }
}

// ----------------------------------------------------------------
// Helper: Build profile context for system prompt
// ----------------------------------------------------------------
function buildProfileContext(profile: Partial<UserProfile>): string {
  return `

STUDENT CONTEXT (use this to personalize your responses):
- Name: ${profile.full_name || "Student"}
- Branch: ${profile.branch || "Unknown"}
- Year/Semester: Year ${profile.academic_year}, Sem ${profile.semester}
- CGPA: ${profile.cgpa || "Not provided"}
- Known Skills: ${profile.skills?.join(", ") || "None listed yet"}
- Interests: ${profile.interests?.join(", ") || "Not specified"}
- Career Goal: ${profile.career_goal || "Not specified"}
- College: ${profile.college || "Not specified"}`;
}

// ----------------------------------------------------------------
// Mock responses for development (no API key needed)
// ----------------------------------------------------------------
function getMockMentorResponse(message: string, profile: Partial<UserProfile>): string {
  const name = profile.full_name?.split(" ")[0] || "there";
  const lower = message.toLowerCase();

  if (lower.includes("programming") || lower.includes("coding") || lower.includes("start")) {
    return `Hey ${name}! 👋 Starting from zero is completely normal — everyone does.

Here's your first week plan:

**1. Pick ONE language** (don't learn multiple at once)
   → If CS/IT: Start with Python or C
   → If Cybersecurity: Start with Python + Linux
   → If other branches: Python is universally useful

**2. The #1 FREE resource**: CS50 by Harvard (edX)
   - Structured, beginner-friendly, globally recognized
   - Takes 10-15 hours/week
   - Free to audit, certificate is paid

**3. Your first project** (Week 3): A simple calculator
   - Proves you can apply what you learned
   - Goes on GitHub = starts your portfolio

**Don't do**: Watch 10 tutorials and code nothing. Coding by doing, not watching. 💪

What language are you thinking of starting with?`;
  }

  if (lower.includes("cgpa") || lower.includes("marks") || lower.includes("fail")) {
    return `${name}, I hear you. Low marks/CGPA is stressful. Let me be completely honest with you:

**The reality:**
✅ 70% of tech jobs don't have CGPA cutoffs
✅ Startups care about skills, not grades
✅ Google, Amazon have cutoffs (~7.0-7.5) but you don't ONLY target them
❌ Top PSUs and some IT companies (TCS, Infosys) have cutoffs

**Your 3-step plan:**

1. **Don't waste time feeling bad** — every semester ahead is a new start
2. **Build skills aggressively** — a strong GitHub profile + 3 projects > a 9 CGPA with nothing to show
3. **Target the right companies** — startups, product companies, consulting firms that test skills

**Proof it works**: Many students with 6.0-7.0 CGPA are working at Razorpay, CRED, PhonePe because they had strong portfolios.

What's your current semester? Let's make a plan from here. 🎯`;
  }

  if (lower.includes("internship")) {
    return `Great question, ${name}! Here's the honest guide to getting your first internship:

**When to start applying:**
- Sem 3-4: Start targeting small companies, startups
- Sem 5-6: Apply everywhere + big companies

**What companies actually want in Sem 3:**
- Basic coding skills in Python/Java
- At least 1-2 projects on GitHub
- LinkedIn profile with education filled
- Communication skills

**Best platforms to find internships:**
- Internshala (best for Indian students, free)
- LinkedIn Jobs (filter: Internship)
- AngelList / Wellfound (startups)
- Company career pages directly
- College placement cell

**Your resume checklist before applying:**
✅ Education section
✅ 1+ project with GitHub link
✅ Skills section (minimum 5-6)
✅ LinkedIn profile link

**Realistic timeline**: Most CS Sem 3-4 students can get internship responses within 2-4 weeks of applying seriously. Don't give up after 5 rejections — apply to 50.

Want me to help you prepare a specific internship application checklist?`;
  }

  // Default response
  return `Thanks for your question, ${name}! 

Based on what you've shared, here's my honest take:

Your situation is more common than you think, and it's absolutely solvable. The most important thing right now is to **take one concrete action** rather than thinking about all the things you should do.

**My recommendation for this week:**
1. Identify the #1 skill gap for your career goal
2. Find a specific resource to start learning it (not "I'll learn sometime")  
3. Set a 2-hour block in your calendar TODAY

The students who succeed aren't always the smartest — they're the ones who start. You've already started by being here. 🌟

What specific aspect would you like to dig into further?`;
}
