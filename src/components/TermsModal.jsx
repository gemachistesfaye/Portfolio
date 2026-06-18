import { useEffect, useRef } from "react";
import { X, Phone, MessageSquare } from "lucide-react";
import config from "../config";

const TermsModal = ({ isOpen, onClose }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const html = document.documentElement;

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.overflow = "";
      html.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-fade-in bg-black/90"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="w-full max-w-xl max-h-[90vh] sm:max-h-[85vh] flex flex-col rounded-2xl sm:rounded-3xl border border-amber-100/60 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.15)] animate-scale-in"
        style={{ background: "#FFFBF5" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 border-b border-amber-100/60">
          <h2
            id="modal-title"
            className="text-sm sm:text-base font-bold tracking-tight"
            style={{ color: "#3D2E1F" }}
          >
            How We Work Together
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-amber-800 hover:bg-amber-50 transition-all"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-5 sm:py-6 space-y-7 text-[13px] sm:text-sm leading-relaxed text-stone-600 overscroll-contain">

          {/* Intro */}
          <div>
            <p>
              We are a full-stack development team focused on building modern, scalable, and
              high-performance digital products. We work with startups, businesses, and individuals
              to turn ideas into real software solutions — clean, reliable, and easy to use.
            </p>
            <p className="mt-2">
              Our goal is not just to build websites — but to create{" "}
              <span className="font-semibold" style={{ color: "#3D2E1F" }}>
                systems that help businesses grow and operate efficiently.
              </span>
            </p>
          </div>

          {/* What We Do */}
          <div>
            <h3 className="text-[11px] sm:text-xs font-bold text-amber-700 uppercase tracking-widest mb-3">
              What We Do
            </h3>
            <ul className="space-y-1.5 pl-4 list-disc marker:text-amber-400">
              <li>Business websites & landing pages that convert</li>
              <li>Full-stack web applications with modern architecture</li>
              <li>Admin dashboards & management systems</li>
              <li>AI-powered tools and automation systems</li>
              <li>Database design, APIs, and third-party integrations</li>
            </ul>
          </div>

          {/* How We Work */}
          <div>
            <h3 className="text-[11px] sm:text-xs font-bold text-amber-700 uppercase tracking-widest mb-3">
              How We Work
            </h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: "#92672B" }}
                >
                  1
                </span>
                <div>
                  <p className="font-semibold" style={{ color: "#3D2E1F" }}>
                    Discovery & Planning
                  </p>
                  <p className="text-[12px] sm:text-[13px] text-stone-500">
                    We understand your idea, define the scope, and deliver a clear roadmap — free of charge.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: "#92672B" }}
                >
                  2
                </span>
                <div>
                  <p className="font-semibold" style={{ color: "#3D2E1F" }}>
                    Design Before Code
                  </p>
                  <p className="text-[12px] sm:text-[13px] text-stone-500">
                    You review UI/UX designs and technical architecture before any development begins.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: "#92672B" }}
                >
                  3
                </span>
                <div>
                  <p className="font-semibold" style={{ color: "#3D2E1F" }}>
                    Weekly Updates
                  </p>
                  <p className="text-[12px] sm:text-[13px] text-stone-500">
                    We build in short cycles with live previews so you can track progress and give feedback anytime.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: "#92672B" }}
                >
                  4
                </span>
                <div>
                  <p className="font-semibold" style={{ color: "#3D2E1F" }}>
                    Launch + 30-Day Support
                  </p>
                  <p className="text-[12px] sm:text-[13px] text-stone-500">
                    We deploy your product and fix any issues for 30 days at no extra cost.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div>
            <h3 className="text-[11px] sm:text-xs font-bold text-amber-700 uppercase tracking-widest mb-3">
              Payment
            </h3>
            <p className="mb-2">Simple milestone-based payments:</p>
            <ul className="space-y-1.5 pl-4 list-disc marker:text-amber-400">
              <li>
                <span className="font-semibold" style={{ color: "#3D2E1F" }}>30%</span> — Project kickoff & planning
              </li>
              <li>
                <span className="font-semibold" style={{ color: "#3D2E1F" }}>40%</span> — Active development (working prototype)
              </li>
              <li>
                <span className="font-semibold" style={{ color: "#3D2E1F" }}>30%</span> — Final delivery & deployment
              </li>
            </ul>
            <p className="mt-2 text-[12px] sm:text-[13px] text-stone-500">
              <span className="font-semibold" style={{ color: "#3D2E1F" }}>Accepted:</span> CBE, Telebirr, Awash Bank.
            </p>
          </div>

          {/* Promise */}
          <div
            className="px-4 sm:px-5 py-4 rounded-xl border border-amber-100/50"
            style={{ background: "linear-gradient(135deg, #FFF8EE 0%, #FFFBF5 100%)" }}
          >
            <p className="text-[12px] sm:text-[13px]">
              <span className="font-semibold" style={{ color: "#3D2E1F" }}>Our promise:</span>{" "}
              If after the initial discussion you feel we are not the right fit, you can stop before
              development begins — no pressure, no obligation. We value quality partnerships over
              quantity of projects.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 sm:px-7 py-3.5 sm:py-4 border-t border-amber-100/60 flex items-center gap-2.5 sm:gap-3">
          <a
            href={config.phoneHref}
            className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-[11px] sm:text-xs font-semibold text-white transition-all duration-300"
            style={{ background: "#92672B" }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#7A5623"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#92672B"}
          >
            <Phone size={12} />
            Call Us
          </a>
          <a
            href={config.socials.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 border border-amber-200/80 hover:border-amber-300 rounded-xl text-[11px] sm:text-xs font-semibold transition-all duration-300"
            style={{ color: "#5C4322" }}
          >
            <MessageSquare size={12} />
            Telegram
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
