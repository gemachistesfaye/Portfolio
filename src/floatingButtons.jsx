import { useState, useEffect, useCallback, useRef } from "react";
import { MessageCircle, X, Mail, ChevronDown } from "lucide-react";
import config from "./config";
import { scrollToTop } from "./utils/scrollTo";

const PROJECT_TYPES = ["Frontend", "Backend / API", "Database", "Web App", "AI Integration", "Other"];
const BUDGETS = ["1,000 - 3,000 ETB", "3,000 - 5,000 ETB", "5,000 - 10,000 ETB", "10,000 - 20,000 ETB", "20,000 - 50,000 ETB", "50,000+ ETB"];

const CustomSelect = ({ value, options, placeholder, onChange, disabled, isOpen, onToggle }) => (
  <div className="relative">
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      disabled={disabled}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      className={`w-full px-4 py-3 text-left rounded-xl border ${isOpen ? 'border-accent/50 ring-4 ring-accent/10' : 'border-slate-200 dark:border-slate-700/60'} bg-slate-50/80 dark:bg-white/[0.03] text-sm ${value ? 'text-slate-900 dark:text-white' : 'text-slate-400'} transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-between`}
    >
      <span className="truncate">{value || placeholder}</span>
      <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </button>

    {isOpen && !disabled && (
      <div className="absolute z-50 w-full mt-2 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl max-h-48 overflow-y-auto">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={(e) => { e.stopPropagation(); onChange(opt); onToggle(); }}
            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${value === opt ? 'bg-accent/10 text-accent font-medium' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
          >
            {opt}
          </button>
        ))}
      </div>
    )}
  </div>
);

const FloatingButtons = () => {
  const [showCard, setShowCard] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", projectType: "", budget: "", project: "" });
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const holdIntervalRef = useRef(null);
  const holdCompletedRef = useRef(false);
  const formLoadTime = useRef(Date.now());

  const [status, setStatus] = useState("idle");
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    if (openDropdown) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openDropdown]);

  const handleSend = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        projectType: formData.projectType,
        budget: formData.budget || "",
        project: formData.project,
        _fb_hp: "",
        _fb_js: formLoadTime.current.toString(),
        _subject: "New Quick Inquiry from Portfolio"
      };

      const res = await fetch(config.formbladeHireMe, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", projectType: "", budget: "", project: "" });
      } else {
        const responseText = await res.text().catch(() => "");
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch {
          errorData = responseText || "Unknown error";
        }
        console.error("Formblade validation error:", res.status, errorData);
        setStatus("error");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
    }
  };

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const fromBottom = docHeight - winHeight - scrollTop;
    setNearFooter(fromBottom < 200);
    setPastHero(scrollTop > 300);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(max-width: 639px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
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
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50"
          onClick={() => setShowCard(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Quick project inquiry form"
        >
          <div
            id="hire-me-modal"
            className="w-full max-w-lg max-h-[80vh] overflow-y-auto p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220] shadow-2xl shadow-slate-200/80 dark:shadow-black/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-accent/20">GT</div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Quick Project Inquiry</p>
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

            <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
              Tell me briefly about your project. For detailed requirements, use the full project form at the bottom of the page.
            </p>

            <form onSubmit={handleSend} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-slate-50/80 dark:bg-white/[0.03] text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/10 transition-all duration-300"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-slate-50/80 dark:bg-white/[0.03] text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/10 transition-all duration-300"
                />
              </div>
              <CustomSelect
                value={formData.projectType}
                options={PROJECT_TYPES}
                placeholder="Project type"
                isOpen={openDropdown === 'type'}
                onToggle={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
                onChange={(val) => setFormData({ ...formData, projectType: val, budget: "" })}
              />
              <CustomSelect
                value={formData.budget}
                options={BUDGETS}
                placeholder="Budget (optional)"
                isOpen={openDropdown === 'budget'}
                onToggle={() => setOpenDropdown(openDropdown === 'budget' ? null : 'budget')}
                onChange={(val) => setFormData({ ...formData, budget: val })}
              />
              <textarea
                rows="3"
                placeholder="Brief project description..."
                required
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-slate-50/80 dark:bg-white/[0.03] text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/10 transition-all duration-300 resize-none"
              />

              <p className="text-[10px] text-slate-400 leading-relaxed">
                Your information is only used to respond to your inquiry.
              </p>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/40 disabled:opacity-50"
              >
                <Mail size={15} />
                {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : "Send Inquiry"}
              </button>
              {status === "sent" && (
                <p className="text-xs text-accent text-center">Thanks! I received your inquiry and will get back to you within 24 hours.</p>
              )}
              {status === "error" && (
                <p className="text-xs text-red-500 text-center">Something went wrong. Try again or email me directly.</p>
              )}
            </form>
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
        className={`fixed bottom-4 right-6 z-40 flex items-center gap-2 px-5 py-3 bg-accent hover:bg-accent-hover text-white font-bold rounded-full shadow-xl shadow-accent/20 hover:shadow-accent/40 border border-white/10 transition-all duration-300 group sm:bottom-20 select-none outline-none focus:outline-none ${(nearFooter || (isMobile && !pastHero)) ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label={showCard ? "Close project inquiry form" : "Open project inquiry form"}
        aria-expanded={showCard}
        aria-controls="hire-me-modal"
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
