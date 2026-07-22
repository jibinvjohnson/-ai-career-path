'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Copy, ThumbsUp, Plus, Sparkles, CheckCheck } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  "I don't know where to start with programming 😟",
  "My CGPA is low, what should I do?",
  "Help me choose the right career path",
  "How do I prepare for campus placements?",
  "What projects should I build for my resume?",
  "Which certifications are worth getting?",
];

const INITIAL_MESSAGE: Message = {
  id: 'init-1',
  role: 'assistant',
  content: `Hello! 👋 I'm your **AI Career Mentor**, here to guide you through your academic and professional journey.

I can help you with:
- **Career Guidance** – Explore paths in tech, cybersecurity, data science & more
- **Skill Development** – Know what to learn and how to get started
- **Placement Prep** – Resume tips, interview strategies, and company insights
- **Project Ideas** – Hands-on projects that impress recruiters
- **Certification Advice** – Which certifications truly matter in your field

Feel free to ask me anything — no question is too small! What's on your mind today? 😊`,
  timestamp: new Date(),
};

const AI_RESPONSES: Record<string, string> = {
  default: `That's a great question! 🤔

Here's what I'd suggest:
- **Start with the basics** and build your foundation gradually
- **Practice consistently** — even 30 minutes a day makes a huge difference
- **Leverage online resources** like freeCodeCamp, CS50, and Coursera
- **Join communities** on Discord, Reddit, or LinkedIn to stay motivated

Remember, every expert was once a beginner. Don't hesitate to ask me more specific questions — I'm here to help! 💪`,

  "don't know programming": `No worries at all! 🌟 Everyone starts from scratch. Here's your **beginner roadmap**:

**Step 1 – Pick a Language**
- **Python** is the best for beginners — simple syntax, widely used in AI/ML, data science & automation
- **JavaScript** if you're interested in web development

**Step 2 – Free Resources to Start**
- CS50 by Harvard (free on edX) — absolute gold standard
- freeCodeCamp.org — interactive coding lessons
- The Odin Project — full-stack web dev path

**Step 3 – Build Habits**
- Code for at least **30 minutes daily**
- Solve problems on **HackerRank** or **LeetCode Easy** section
- Build small projects like a calculator, to-do app, or quiz game

**Step 4 – Join Communities**
- r/learnprogramming on Reddit
- CS student Discord servers
- GitHub — start pushing your code

You've got this! The hardest part is just getting started. 🚀`,

  "low cgpa": `I hear you — a low CGPA can feel discouraging, but it's **not the end of the road**. Here's how to turn things around:

**📊 Why CGPA Matters (and When It Doesn't)**
- Some companies have a CGPA cutoff (usually 6.0 or 7.0)
- But many top companies — including startups and product companies — care more about **skills and projects**

**🔧 What You Can Do Right Now**
- **Build 2–3 strong projects** on GitHub — quality > quantity
- **Get certified** — AWS, Google, Microsoft certs signal competence
- **Contribute to open source** — shows real-world collaboration
- **Prepare for aptitude & DSA** — many companies test these separately

**📝 In Academics**
- Focus on the subjects remaining — every point counts
- Attend extra classes or study groups
- Talk to professors — they can guide better study strategies

**💼 Career Strategy**
- Target **service-based companies** that have relaxed CGPA bars
- Look at **product-based startups** that value skills over grades
- Consider **higher studies (MTech/MS)** where entrance exam scores matter more

Your CGPA is just one chapter of your story. Let's write the rest with skills and determination! 💪`,

  "career path": `Choosing the right career path is one of the most important decisions you'll make. Let me help you think it through! 🗺️

**🔍 Step 1 – Know Your Interests**
- Do you enjoy problem-solving → **Software Engineering / DSA**
- Are you fascinated by data → **Data Science / ML / AI**
- Do you care about security → **Cybersecurity**
- Love building things visually → **Frontend / Full Stack Dev**
- Interested in infrastructure → **DevOps / Cloud Engineering**

**🎯 Step 2 – Assess Your Strengths**
- Strong in math → Data Science, ML Engineering
- Good communicator + technical → Product Management
- Creative + logical → UI/UX + Frontend

**📈 Step 3 – Research the Market**
- Check job postings on LinkedIn, Naukri, Glassdoor
- Look at salary trends on levels.fyi or AmbitionBox
- Identify top companies in your domain of interest

**🛠️ Step 4 – Build a Targeted Skillset**
- Pick **1 domain** and go deep rather than spreading thin
- Follow a structured roadmap (check roadmap.sh)
- Build projects that demonstrate domain expertise

Use the **Career Paths** section of this platform to explore detailed roadmaps for each field. 🚀`,

  placement: `Placement season can be stressful, but with the right prep, you can crack it! Here's a comprehensive guide: 🎯

**📋 3–6 Months Before Placements**

*Technical Prep:*
- **DSA** — Practice 150+ problems on LeetCode (focus on Arrays, Strings, Trees, Graphs, DP)
- **System Design** — Learn basics if targeting product companies
- **Core subjects** — OS, DBMS, CN, OOP — often asked in interviews

*Resume:*
- Keep it **1 page**, clean and ATS-friendly
- Highlight **projects with impact** (e.g., "Built X that reduced Y by Z%")
- Add relevant certifications and internship experience

**🏢 During Placement Season**

*Aptitude & Reasoning:*
- Practice on IndiaBix, PrepInsta daily
- Speed + accuracy = success in online assessments

*HR Round Tips:*
- Prepare "Tell me about yourself" (2 min version)
- Know why you want to join that specific company
- Have genuine answers for strengths/weaknesses

**💡 Pro Tips**
- Apply to **10–15 companies** — don't rely on just one
- Network with seniors who got placed for insider tips
- Revise your projects thoroughly — they'll ask deep questions

You've got what it takes. Prep smart, stay consistent! 💼`,
};

function getAIResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  if (lower.includes("don't know") && (lower.includes("program") || lower.includes("code") || lower.includes("coding"))) {
    return AI_RESPONSES["don't know programming"];
  }
  if (lower.includes("cgpa") || lower.includes("gpa") || lower.includes("marks") || lower.includes("low grade")) {
    return AI_RESPONSES["low cgpa"];
  }
  if (lower.includes("career") || lower.includes("path") || lower.includes("field") || lower.includes("domain")) {
    return AI_RESPONSES["career path"];
  }
  if (lower.includes("placement") || lower.includes("campus") || lower.includes("interview") || lower.includes("job")) {
    return AI_RESPONSES["placement"];
  }
  if (lower.includes("program") || lower.includes("start") || lower.includes("beginner") || lower.includes("learn")) {
    return AI_RESPONSES["don't know programming"];
  }
  return AI_RESPONSES["default"];
}

function formatMessage(content: string): React.ReactNode {
  const lines = content.split('\n');
  return lines.map((line, lineIndex) => {
    if (line.trim() === '') return <br key={lineIndex} />;

    // Process bold text
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    const formatted = parts.map((part, partIndex) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={partIndex} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
      }
      return <span key={partIndex}>{part}</span>;
    });

    // Bullet points
    if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
      const bulletContent = line.trim().slice(2);
      const bulletParts = bulletContent.split(/(\*\*[^*]+\*\*)/g);
      const formattedBullet = bulletParts.map((part, partIndex) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={partIndex} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
        }
        return <span key={partIndex}>{part}</span>;
      });
      return (
        <div key={lineIndex} className="flex items-start gap-2 my-0.5">
          <span className="text-indigo-400 mt-1 text-xs">●</span>
          <span>{formattedBullet}</span>
        </div>
      );
    }

    // Headers (lines ending with nothing special but starting with **)
    if (line.trim().startsWith('**') && line.trim().endsWith('**') && !line.includes(' ')) {
      return (
        <div key={lineIndex} className="font-bold text-white mt-2 mb-1">
          {formatted}
        </div>
      );
    }

    return <div key={lineIndex} className={line.trim() === '' ? 'h-2' : 'my-0.5'}>{formatted}</div>;
  });
}

export default function MentorPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setLoading(true);

    const delay = 800 + Math.random() * 1200;
    await new Promise(res => setTimeout(res, delay));

    const responseContent = getAIResponse(text);
    const assistantMsg: Message = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: responseContent,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMsg]);
    setLoading(false);
  };

  const handleCopy = (msg: Message) => {
    navigator.clipboard.writeText(msg.content).then(() => {
      setCopiedId(msg.id);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleLike = (id: string) => {
    setLikedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        toast.success('Glad that was helpful! 😊');
      }
      return next;
    });
  };

  const handleNewChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput('');
    setLoading(false);
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex flex-col h-screen bg-[#0a0a1a] overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          {/* AI Avatar */}
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#0a0a1a] rounded-full" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-sm">AI Career Mentor</h1>
            <p className="text-emerald-400 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Online — always here to help
            </p>
          </div>
        </div>
        <button
          onClick={handleNewChat}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-3`}
            >
              {/* Assistant Avatar */}
              {msg.role === 'assistant' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/30">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}

              <div className={`flex flex-col gap-1 max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                {/* Bubble */}
                <div
                  className={`relative group px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-br-sm shadow-lg shadow-indigo-500/20'
                      : 'bg-white/8 backdrop-blur-md border border-white/10 text-gray-200 rounded-bl-sm shadow-lg'
                  }`}
                >
                  <div className="whitespace-pre-wrap">
                    {msg.role === 'assistant' ? formatMessage(msg.content) : msg.content}
                  </div>

                  {/* Action buttons on assistant messages */}
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-1 mt-2 pt-2 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => handleCopy(msg)}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white text-xs transition-all"
                      >
                        {copiedId === msg.id ? (
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        {copiedId === msg.id ? 'Copied!' : 'Copy'}
                      </button>
                      <button
                        onClick={() => handleLike(msg.id)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/10 text-xs transition-all ${
                          likedIds.has(msg.id) ? 'text-indigo-400' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        {likedIds.has(msg.id) ? 'Liked' : 'Helpful'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Timestamp */}
                <span className="text-gray-600 text-[10px] px-1">{formatTime(msg.timestamp)}</span>
              </div>

              {/* User Avatar */}
              {msg.role === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center shadow-md">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-end gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="px-4 py-3.5 bg-white/8 backdrop-blur-md border border-white/10 rounded-2xl rounded-bl-sm shadow-lg flex items-center gap-1.5">
                {[0, 1, 2].map(i => (
                  <motion.span
                    key={i}
                    className="w-2 h-2 bg-indigo-400 rounded-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      <AnimatePresence>
        {messages.length <= 1 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="flex-shrink-0 px-4 pb-2"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-gray-500 text-xs font-medium">Suggested questions</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(prompt)}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/40 text-gray-300 hover:text-white text-xs transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="flex-shrink-0 px-4 pb-6 pt-2">
        <div className="flex items-end gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-2xl focus-within:border-indigo-500/50 transition-all duration-200">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about your career, skills, or placements..."
            rows={1}
            disabled={loading}
            className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm resize-none outline-none leading-relaxed max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 disabled:opacity-50"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:shadow-none"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
        <p className="text-center text-gray-600 text-[10px] mt-2">
          Press <kbd className="px-1 py-0.5 bg-white/10 rounded text-gray-500 text-[10px]">Enter</kbd> to send · <kbd className="px-1 py-0.5 bg-white/10 rounded text-gray-500 text-[10px]">Shift+Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
}
