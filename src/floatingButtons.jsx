import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles, RotateCcw, Bot } from "lucide-react";
import config from "./config";
import { scrollToSection } from "./utils/scrollTo";

const SUGGESTED_QUESTIONS = [
  "What is your tech stack?",
  "Tell me about SmartBiz ERP & RPMS",
  "Are you open to hire?",
  "How can I contact Gemachis?",
];

function getBotReply(query) {
  const q = query.toLowerCase().trim();

  if (q.includes("stack") || q.includes("tech") || q.includes("skill") || q.includes("language") || q.includes("framework")) {
    return "Gemachis builds modern applications with React 19, TypeScript, Tailwind CSS, NestJS, Node.js/Express, and Python (Flask). For storage, he leverages PostgreSQL, Prisma ORM, MySQL, and Supabase, plus AI workflows with Gemini & OpenAI APIs and Scikit-Learn!";
  }

  if (q.includes("smartbiz") || q.includes("erp")) {
    return "SmartBiz ERP Lite is an offline-first Progressive Web App (PWA) Gemachis engineered during his remote internship at Sofomar Technologies. Built with React 19, NestJS, Prisma, and PostgreSQL, it features local offline caching, automatic background sync, and inventory tracking for SMEs.";
  }

  if (q.includes("rpms") || q.includes("research") || q.includes("astu")) {
    return "At Adama Science and Technology University (ASTU), Gemachis completed an on-site full-stack engineering internship where he built the institutional Research Project Management System (RPMS) — orchestrating proposal governance, blind peer reviews, milestone tracking, and grant disbursements.";
  }

  if (q.includes("project") || q.includes("work") || q.includes("portfolio") || q.includes("built")) {
    return "Featured projects include:\n• SmartBiz ERP Lite — Offline-first PWA (React 19 & NestJS)\n• RPMS — Research Governance Platform (ASTU)\n• Sheger Health Connect — Telemedicine & Clinical Triage\n• EduFlow — Multi-portal School Management\n• AeroDemand-AI — ML Time-Series Demand Forecasting\nExplore the Projects section for live demos and case studies!";
  }

  if (q.includes("intern") || q.includes("experience") || q.includes("job") || q.includes("company")) {
    return "Gemachis's experience includes:\n• Full-Stack Engineer Intern at Sofomar Technologies (Remote, 2026)\n• Full-Stack Engineering Intern at ASTU (On-site, 2026 — RPMS Platform)\n• Frontend Development Trainee at ISHub, Addis Ababa University (2025)\n• BSc in Information Science at Haramaya University (2024–2027)";
  }

  if (q.includes("education") || q.includes("university") || q.includes("degree") || q.includes("study") || q.includes("haramaya")) {
    return "Gemachis is completing his BSc in Information Science at Haramaya University (2024 – 2027, Expected), with core coursework in Database Systems, Data Structures, Web Development, AI, and Systems Analysis.";
  }

  if (q.includes("hire") || q.includes("availab") || q.includes("role") || q.includes("opportunity") || q.includes("job")) {
    return "Yes! Gemachis is actively open to Full-Stack Developer roles, Software Engineering internships, and high-impact contract opportunities in web development and AI systems.";
  }

  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("message")) {
    return `You can reach Gemachis directly:\n• Email: ${config.email}\n• Phone: ${config.phone}\n• Telegram: @gemachis_t\nOr scroll to the Contact section below to send a message!`;
  }

  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
    return "Hello! 👋 I'm Gemachis's AI assistant. Ask me anything about his technical stack, full-stack projects, or work experience!";
  }

  return "Thanks for asking! Gemachis specializes in full-stack web applications, backend APIs, and AI systems (React 19, NestJS, Python, PostgreSQL). Feel free to ask about his projects (SmartBiz ERP, RPMS, Sheger Health), experience, or reach him directly at gemachistesfaye1@gmail.com!";
}

const INITIAL_MESSAGES = [
  {
    sender: "bot",
    text: "Hi there! 👋 I'm Gemachis's AI portfolio assistant. Ask me anything about his software engineering projects, technical stack, or background!",
  },
];

const FloatingButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg = { sender: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim() }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
          setIsTyping(false);
          return;
        }
      }
    } catch {
      // If endpoint is offline, fall through to client-side engine
    }

    // Resilient client-side fallback
    setTimeout(() => {
      const reply = getBotReply(text);
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      setIsTyping(false);
    }, 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <>
      {/* Chat Window Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Ask Gemachis Chat"
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[380px] max-h-[520px] h-[500px] flex flex-col rounded-2xl border border-slate-200/90 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shadow-2xl overflow-hidden animate-slide-up"
        >
          {/* Header */}
          <div className="px-4 py-3 bg-slate-900 dark:bg-zinc-950 border-b border-white/[0.08] flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/80 flex items-center justify-center text-amber-400">
                <Bot size={18} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-white tracking-wide">Ask Gemachis</h3>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400">AI Portfolio Copilot</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Reset conversation"
                aria-label="Reset conversation"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs leading-relaxed">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl whitespace-pre-line ${
                    m.sender === "user"
                      ? "bg-slate-900 dark:bg-zinc-800 text-white rounded-br-xs shadow-sm"
                      : "bg-slate-100 dark:bg-zinc-800/90 text-slate-800 dark:text-zinc-200 border border-slate-200/80 dark:border-zinc-700/60 rounded-bl-xs"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-zinc-800/90 text-slate-500 dark:text-zinc-400 border border-slate-200/80 dark:border-zinc-700/60 text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          {messages.length <= 2 && (
            <div className="px-3 py-2 bg-slate-50 dark:bg-zinc-900/60 border-t border-slate-200/80 dark:border-zinc-800/70 flex flex-wrap gap-1.5">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="px-2.5 py-1 text-[11px] rounded-lg bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200/80 dark:border-zinc-700/80 hover:border-slate-300 dark:hover:border-zinc-600 hover:text-slate-900 dark:hover:text-white transition-all text-left truncate max-w-full"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <div className="p-3 bg-white dark:bg-zinc-950 border-t border-slate-200/80 dark:border-zinc-800/80 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about stack, projects, experience..."
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-zinc-900 text-slate-900 dark:text-white border border-slate-200/80 dark:border-zinc-800 focus:outline-none focus:border-amber-500/50 dark:focus:border-amber-500/50"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              aria-label="Send message"
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 disabled:opacity-40 transition-all shadow-sm"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white font-semibold rounded-full shadow-lg border border-slate-800 dark:border-zinc-200 transition-all duration-200 group select-none outline-none focus:outline-none hover:scale-105"
        aria-label={isOpen ? "Close Ask Gemachis" : "Open Ask Gemachis"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <>
            <X size={16} className="group-hover:rotate-90 transition-transform" />
            <span className="text-xs font-semibold">Close</span>
          </>
        ) : (
          <>
            <Sparkles size={16} className="group-hover:rotate-12 transition-transform text-amber-400 dark:text-amber-500" />
            <span className="text-xs font-semibold">Ask Gemachis</span>
          </>
        )}
      </button>
    </>
  );
};

export default FloatingButtons;
