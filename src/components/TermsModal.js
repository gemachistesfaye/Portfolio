import { useEffect, useRef } from "react";
import { X, Phone, MessageSquare, Quote } from "lucide-react";
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

  // Robust scroll lock for all browsers including iOS
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

          {/* Client Quote */}
          <div
            className="relative px-5 sm:px-6 py-5 sm:py-6 rounded-xl border border-amber-100/50"
            style={{ background: "linear-gradient(135deg, #FFF8EE 0%, #FFFBF5 100%)" }}
          >
            <Quote
              size={28}
              className="absolute top-3 right-4 text-amber-200/60"
              style={{ transform: "scaleX(-1)" }}
            />
            <p
              className="text-base sm:text-lg font-semibold leading-snug mb-3"
              style={{ color: "#3D2E1F", fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              "Working with this team felt like having a co-founder who actually ships. They understood
              exactly what I needed before I could even explain it properly."
            </p>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-200/60 flex items-center justify-center text-amber-800 text-[10px] sm:text-xs font-bold">
                DM
              </div>
              <div>
                <p className="text-xs font-semibold text-stone-700">Daniel M.</p>
                <p className="text-[10px] sm:text-[11px] text-stone-400">Startup Founder, Addis Ababa</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] sm:text-xs font-bold text-amber-700 uppercase tracking-widest mb-2">Who We Are</h3>
            <p>
              We are a small, passionate team of developers and designers who love building things that
              matter. We work closely with startups, small businesses, and individuals to turn their ideas
              into real, working products — from AI-powered platforms to clean business websites.
            </p>
            <p className="mt-2">
              When you work with us, it feels like working with a friend who happens to be really good at
              code. We keep things simple, honest, and collaborative. No corporate jargon, no unnecessary
              complexity — just good work delivered on time.
            </p>
          </div>

          <div>
            <h3 className="text-[11px] sm:text-xs font-bold text-amber-700 uppercase tracking-widest mb-2">Something Exciting Is Coming</h3>
            <p>
              We are building something bigger. A startup focused on empowering the local tech community —
              creating tools, platforms, and opportunities for developers, creators, and entrepreneurs
              across Ethiopia and beyond.
            </p>
            <p className="mt-2">
              The vision is to build a community-driven tech company where young talent can grow, learn,
              and build products together. We want to create an ecosystem, not just a service. This is
              still in its early stages, but the energy and the ideas are already here.
            </p>
            <p className="mt-2">
              Clients who partner with us now are not just getting a developer — they are getting in on the
              ground floor. Early partners will always be part of our story, and we will always take care
              of the people who believed in us first.
            </p>
          </div>

          <div>
            <h3 className="text-[11px] sm:text-xs font-bold text-amber-700 uppercase tracking-widest mb-2">What We Believe In</h3>
            <p>
              We believe great software starts with great communication. Before we write any code, we make
              sure we truly understand what you need, why you need it, and who it is for. We ask a lot of
              questions — and that is a good thing.
            </p>
            <p className="mt-2">
              We also believe you should own what you pay for. When the project is done, you get everything:
              the source code, the designs, the documentation. No lock-ins, no hidden fees, no strings
              attached.
            </p>
          </div>

          <div>
            <h3 className="text-[11px] sm:text-xs font-bold text-amber-700 uppercase tracking-widest mb-2">Our Process</h3>

            <p className="mb-3">
              <span className="font-semibold" style={{ color: "#3D2E1F" }}>Step 1 — Free Discovery Call.</span>{" "}
              We start with a relaxed 15-minute call where you tell us about your idea. After the call,
              we put together a clear project plan and roadmap — completely free. You keep it even if you
              decide not to work with us. Zero risk.
            </p>

            <p className="mb-3">
              <span className="font-semibold" style={{ color: "#3D2E1F" }}>Step 2 — Design Before Code.</span>{" "}
              Before building anything, we show you exactly what the product will look like. You review
              the designs, the user flow, and the technical plan. Nothing moves forward until you say
              "this is exactly what I want."
            </p>

            <p className="mb-3">
              <span className="font-semibold" style={{ color: "#3D2E1F" }}>Step 3 — Build & Share Progress Weekly.</span>{" "}
              We work in short weekly cycles and share a live preview link with you every week. You can
              click around, test things, and give us feedback in real-time.
            </p>

            <p>
              <span className="font-semibold" style={{ color: "#3D2E1F" }}>Step 4 — Launch & Free 30-Day Support.</span>{" "}
              We deploy your product, make sure everything runs smoothly, and hand over the full codebase.
              For 30 days after launch, we fix bugs and make tweaks — completely free.
            </p>
          </div>

          <div>
            <h3 className="text-[11px] sm:text-xs font-bold text-amber-700 uppercase tracking-widest mb-2">Payment</h3>
            <p className="mb-2">
              Simple and fair. You pay in three parts, tied to real progress:
            </p>
            <ul className="space-y-1.5 pl-4 list-disc marker:text-amber-400">
              <li><span className="font-semibold" style={{ color: "#3D2E1F" }}>30%</span> when we kick off and you receive the roadmap.</li>
              <li><span className="font-semibold" style={{ color: "#3D2E1F" }}>40%</span> when you can test the working prototype.</li>
              <li><span className="font-semibold" style={{ color: "#3D2E1F" }}>30%</span> when the final product is live and the code is yours.</li>
            </ul>
            <p className="mt-3">
              <span className="font-semibold" style={{ color: "#3D2E1F" }}>Local:</span> CBE, Telebirr, Awash Bank.{" "}
              <span className="font-semibold" style={{ color: "#3D2E1F" }}>International:</span> PayPal, Stripe, Wise.
            </p>
          </div>

          <div>
            <h3 className="text-[11px] sm:text-xs font-bold text-amber-700 uppercase tracking-widest mb-2">Our Promise</h3>
            <p>
              If after the discovery call and initial planning you feel we are not the right match, we
              refund any deposit in full. No hard feelings. We only want to work with people who genuinely
              feel good about working with us.
            </p>
          </div>

          <div>
            <h3 className="text-[11px] sm:text-xs font-bold text-amber-700 uppercase tracking-widest mb-2">After the Project</h3>
            <p>
              We do not disappear after launch. Many of our clients come back for new features, updates,
              or new projects entirely. Returning clients always get priority. Once you work with us,
              you are part of the family.
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
