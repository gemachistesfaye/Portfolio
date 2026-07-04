import { useEffect, useRef } from "react";
import { X, MessageSquare, Palette, Rocket, Headphones, Phone } from "lucide-react";
import config from "../config";
import { steps } from "../aboutSteps";

const iconMap = { MessageSquare, Palette, Rocket, Headphones };

const ProcessModal = ({ isOpen, onClose }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is open
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
      aria-labelledby="process-modal-title"
    >
      <div
        className="w-full max-w-xl max-h-[90vh] sm:max-h-[85vh] flex flex-col rounded-2xl sm:rounded-3xl border border-amber-100/60 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.15)] animate-scale-in"
        style={{ background: "#FFFBF5" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 border-b border-amber-100/60">
          <h2
            id="process-modal-title"
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
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}>
                {(() => { const Icon = iconMap[step.icon]; return Icon ? <Icon size={20} /> : null; })()}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Footer */}
        <div className="px-5 sm:px-7 py-3.5 sm:py-4 border-t border-amber-100/60 flex items-center gap-2.5 sm:gap-3">
          <a
            href={config.phoneHref}
            className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all duration-300"
            style={{ background: "#92672B" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#7A5623")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#92672B")}
          >
            <Phone size={12} />
            Call Us
          </a>
          <a
            href={config.socials.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 border border-amber-200/80 hover:border-amber-300 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300"
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

export default ProcessModal;
