import { useState, useEffect, useCallback, useRef } from "react";
import { MessageCircle, X, Mail, ChevronDown } from "lucide-react";
import config from "./config";

const budgetOptions = {
  "Frontend": [
    "Under 1,000 ETB — Small Fixes & Minor Updates",
    "2,000 - 5,000 ETB — Landing Page (1 Page)",
    "5,000 - 10,000 ETB — Portfolio Website",
    "10,000 - 20,000 ETB — Business Website",
    "Custom Budget — Contact Me",
  ],
  "Backend / API": [
    "Custom Pricing — Contact Me to Discuss Your Backend Needs",
  ],
  "Database": [
    "Custom Pricing — Contact Me to Discuss Your Database Requirements",
  ],
  "Web App": [
    "Custom Pricing — Contact Me for Full-Stack Development Projects",
  ],
  "AI Integration": [
    "Custom Pricing — Contact Me for AI Solutions & Integrations",
  ],
  "Other": [
    "Bug Fixes — Contact Me",
    "Feature Additions — Contact Me",
    "UI Improvements — Contact Me",
    "Performance Optimization — Contact Me",
    "Consultation — Contact Me",
  ],
};

const FloatingButtons = () => {
  const [showCard, setShowCard] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", projectType: "", budget: "", project: "" });
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const holdIntervalRef = useRef(null);
  const holdCompletedRef = useRef(false);

  const handleSend = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\nBudget: ${formData.budget}\n\nProject Details:\n${formData.project}`);
    window.location.href = `mailto:${config.email}?subject=${subject}&body=${body}`;
    setShowCard(false);
    setFormData({ name: "", email: "", projectType: "", budget: "", project: "" });
  };

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const fromBottom = docHeight - winHeight - scrollTop;

    // Hide "Hire Me" when near footer (within 200px)
    setNearFooter(fromBottom < 200);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const HOLD_DURATION = 1500;

  const startHold = () => {
    if (showCard) return;
    holdCompletedRef.current = false;
    setIsHolding(true);
    setHoldProgress(0);
    const startTime = Date.now();
    holdIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / HOLD_DURATION, 1);
      setHoldProgress(progress);
      if (progress >= 1) {
        clearInterval(holdIntervalRef.current);
        holdCompletedRef.current = true;
        scrollToTop();
        setIsHolding(false);
        setHoldProgress(0);
      }
    }, 16);
  };

  const cancelHold = () => {
    clearInterval(holdIntervalRef.current);
    if (!holdCompletedRef.current) {
      setIsHolding(false);
      setHoldProgress(0);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(holdIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (showCard) {
      document.body.classList.add("overflow-hidden");
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [showCard]);

  // Escape key to close modal
  useEffect(() => {
    if (!showCard) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") setShowCard(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showCard]);

  return (
    <>
      {showCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowCard(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Project inquiry form"
        >
          <div
            className="w-full max-w-md p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220] shadow-2xl shadow-slate-200/80 dark:shadow-black/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-accent/20">
                  GT
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Let's Work Together</p>
                  <p className="text-[11px] text-slate-400">I'll get back to you within 24 hours</p>
                </div>
              </div>
              <button
                onClick={() => setShowCard(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-accent hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSend} className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-slate-50/80 dark:bg-white/[0.03] text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/10 transition-all duration-300"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-slate-50/80 dark:bg-white/[0.03] text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/10 transition-all duration-300"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <select
                    required
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value, budget: "" })}
                    className="w-full px-4 py-3 pr-10 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-slate-50/80 dark:bg-white/[0.03] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/10 transition-all duration-300 appearance-none"
                  >
                    <option value="" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Project Type</option>
                    <option value="Frontend" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Frontend</option>
                    <option value="Backend / API" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Backend / API</option>
                    <option value="Database" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Database</option>
                    <option value="Web App" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Web App</option>
                    <option value="AI Integration" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">AI Integration</option>
                    <option value="Other" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Other</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    required
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    disabled={!formData.projectType}
                    className="w-full px-4 py-3 pr-10 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-slate-50/80 dark:bg-white/[0.03] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/10 transition-all duration-300 appearance-none disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <option value="" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">{formData.projectType ? "Select Budget" : "Select Type First"}</option>
                    {(budgetOptions[formData.projectType] || []).map((b) => (
                      <option key={b} value={b} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">{b}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <textarea
                rows="4"
                placeholder="Tell me about your project..."
                required
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-slate-50/80 dark:bg-white/[0.03] text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/10 transition-all duration-300 resize-none"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/40"
              >
                <Mail size={15} />
                Send via Email
              </button>
            </form>

            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/60">
              <a href={config.phoneHref} aria-label="Call me now" className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 glass hover:border-accent/30 text-slate-600 dark:text-slate-400 hover:text-accent text-xs font-semibold rounded-xl transition-all duration-300">
                Call Now
              </a>
              <a href={config.socials.telegram} target="_blank" rel="noopener noreferrer" aria-label="Chat on Telegram" className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 glass hover:border-accent/30 text-slate-600 dark:text-slate-400 hover:text-accent text-xs font-semibold rounded-xl transition-all duration-300">
                Telegram
              </a>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => {
          if (holdCompletedRef.current) {
            holdCompletedRef.current = false;
            return;
          }
          setShowCard(!showCard);
        }}
        onMouseDown={startHold}
        onMouseUp={cancelHold}
        onMouseLeave={cancelHold}
        onTouchStart={startHold}
        onTouchEnd={cancelHold}
        onTouchCancel={cancelHold}
        className={`fixed bottom-4 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-full shadow-xl shadow-accent/30 hover:shadow-accent/50 transition-all duration-300 group sm:bottom-20 select-none ${nearFooter ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label={showCard ? "Close" : "Hold to scroll to top, click to contact"}
      >
        {showCard ? (
          <>
            <X size={16} className="group-hover:rotate-90 transition-transform" />
            <span className="text-sm">Cancel</span>
          </>
        ) : (
          <>
            {isHolding ? (
              <svg className="w-4 h-4 -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
                <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15" fill="none" stroke="white" strokeWidth="3"
                  strokeDasharray={`${holdProgress * 94.25} 94.25`}
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <MessageCircle size={16} className="group-hover:rotate-12 transition-transform" />
            )}
            <span className="text-sm">{isHolding ? 'Hold...' : 'Hire Me'}</span>
          </>
        )}
      </button>

    </>
  );
};

export default FloatingButtons;
