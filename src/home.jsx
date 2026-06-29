import { useState, useEffect, useCallback, useRef } from "react";
import { useInView } from "./hooks/useInView";
import { Sparkles } from "lucide-react";

const rotatingTexts = [
  "I help businesses automate with AI",
  "Building systems that scale",
  "Turning ideas into real products",
  "Full-Stack • AI • Systems",
  "Clean code, real results",
];

const codeLines = [
  { text: "import { brew } from 'coffee';", color: "text-emerald-400" },
  { text: "const morning = () => {", color: "text-cyan-400" },
  { text: "  const energy = brew({", color: "text-cyan-400" },
  { text: "    strength: 'extra strong',", color: "text-amber-400" },
  { text: "    beans: 'ethiopian'", color: "text-amber-400" },
  { text: "  });", color: "text-cyan-400" },
  { text: "  return <div>;", color: "text-violet-400" },
  { text: "    Hello Coffee", color: "text-amber-400" },
  { text: "  </div>;", color: "text-violet-400" },
  { text: "};", color: "text-cyan-400" },
];

const codeSnippets = [
  { text: "useState()", top: "8%", left: "-6%", delay: 0 },
  { text: "useEffect()", top: "5%", right: "-6%", delay: 0.8 },
  { text: "async/await", top: "25%", left: "-10%", delay: 1.6 },
  { text: "npm run dev", top: "18%", right: "-8%", delay: 2.4 },
  { text: "git push", top: "42%", left: "-8%", delay: 3.2 },
  { text: "deploy?", top: "35%", right: "-6%", delay: 4.0 },
  { text: "ref.current", top: "55%", left: "-10%", delay: 4.8 },
  { text: "props.data", top: "50%", right: "-8%", delay: 5.6 },
];

const Home = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [textIndex, setTextIndex] = useState(0);
  const [textAnimating, setTextAnimating] = useState(false);
  const [typingLine, setTypingLine] = useState(0);

  const [displayedLines, setDisplayedLines] = useState([]);
  const [replayKey, setReplayKey] = useState(0);
  const [hovering, setHovering] = useState(false);
  const typingRef = useRef(null);


  // Rotating text with 3D transition
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setTextAnimating(true);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % rotatingTexts.length);
        setTextAnimating(false);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Typing simulator
  useEffect(() => {
    if (!inView) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    let lineIdx = 0;
    let colIdx = 0;
    let lines = [];

    const type = () => {
      if (lineIdx >= codeLines.length) {
        setTimeout(() => {
          lines = [];
          lineIdx = 0;
          colIdx = 0;
          setDisplayedLines([]);
          typingRef.current = setTimeout(type, 800);
        }, 3000);
        return;
      }

      const currentLine = codeLines[lineIdx];
      colIdx++;
      setTypingLine(lineIdx);
      setDisplayedLines(
        lines.slice(0, lineIdx).concat([
          { ...currentLine, visibleText: currentLine.text.slice(0, colIdx) },
        ])
      );

      if (colIdx >= currentLine.text.length) {
        lines = [
          ...lines.slice(0, lineIdx),
          { ...currentLine, visibleText: currentLine.text },
        ];
        lineIdx++;
        colIdx = 0;
        typingRef.current = setTimeout(type, 200);
      } else {
        const char = currentLine.text[colIdx - 1];
        const delay = char === ' ' ? 30 : char === ';' ? 120 : char === '{' || char === '}' ? 80 : 45;
        typingRef.current = setTimeout(type, delay);
      }
    };

    typingRef.current = setTimeout(type, 1200);
    return () => clearTimeout(typingRef.current);
  }, [inView, replayKey]);

  const replay = useCallback(() => {
    setReplayKey((k) => k + 1);
    setTextIndex(0);
    setDisplayedLines([]);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center px-6 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden sm:block absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] lg:w-[700px] h-[500px] lg:h-[700px] bg-accent/[0.07] dark:bg-accent/[0.04] rounded-full blur-[100px] lg:blur-[120px] animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="hidden sm:block absolute top-20 right-20 lg:right-20 w-36 lg:w-48 h-36 lg:h-48 bg-violet-500/[0.06] dark:bg-violet-500/[0.03] rounded-full blur-[60px] lg:blur-[80px] animate-[pulse_8s_ease-in-out_infinite_1s]" />
        <div className="hidden sm:block absolute bottom-20 left-20 lg:left-20 w-36 lg:w-48 h-36 lg:h-48 bg-cyan-500/[0.06] dark:bg-cyan-500/[0.03] rounded-full blur-[60px] lg:blur-[80px] animate-[pulse_7s_ease-in-out_infinite_2s]" />
        <div
          className="hidden sm:block absolute inset-0 opacity-[0.03] dark:opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div ref={ref} className="max-w-5xl w-full mx-auto flex flex-col lg:flex-row items-center gap-6 lg:gap-10 relative z-10">
        {/* Left — Text */}
        <div className="flex-1 max-w-xl">
          {/* Available badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 mb-4 sm:mb-6 rounded-full glass text-accent text-xs font-semibold tracking-wider uppercase opacity-0 ${inView ? 'animate-fade-in' : ''}`}
            key={`badge-${replayKey}`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" aria-hidden="true" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            Available for freelance
          </div>

          {/* Name */}
          <h1
            className={`text-3xl sm:text-5xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] opacity-0 ${inView ? 'animate-slide-up' : ''}`}
            style={{ animationDelay: '0.1s', letterSpacing: '0.02em' }}
            key={`name-${replayKey}`}
          >
            Gemachis
            <br />
            <span className="text-gradient" style={{ letterSpacing: '0.04em' }}>Tesfaye</span>
          </h1>

          {/* Accent bar */}
          <div
            className={`w-12 h-[3px] bg-gradient-to-r from-accent to-teal-400 my-4 sm:my-5 rounded-full opacity-0 ${inView ? 'animate-scale-in' : ''}`}
            style={{ animationDelay: '0.2s' }}
            key={`bar-${replayKey}`}
          />

          {/* Title */}
          <div
            className={`flex items-center gap-2 mb-2 opacity-0 ${inView ? 'animate-slide-up' : ''}`}
            style={{ animationDelay: '0.3s' }}
            key={`title-${replayKey}`}
          >
            <Sparkles size={14} className="text-accent" />
            <p className="text-lg sm:text-xl font-semibold text-slate-700 dark:text-slate-300" style={{ letterSpacing: '0.04em' }}>
              Full-Stack Software Engineer & AI Systems Builder
            </p>
          </div>

          {/* Description */}
          <p
            className={`text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-lg mb-4 sm:mb-5 leading-relaxed opacity-0 ${inView ? 'animate-slide-up' : ''}`}
            style={{ animationDelay: '0.4s', letterSpacing: '0.01em' }}
            key={`desc-${replayKey}`}
          >
            I build business websites, web apps, and AI-powered systems that help companies automate, scale, and grow.
            From idea to deployment — I turn concepts into real working products.
          </p>

          {/* SlideUpRotate rotating text */}
          <div
            className={`h-8 overflow-hidden opacity-0 ${inView ? 'animate-fade-in' : ''}`}
            style={{ animationDelay: '0.6s' }}
            key={`rotate-${replayKey}`}
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-[blink_2s_ease-in-out_infinite]" />
              <div className="relative h-7 overflow-hidden">
                <span
                  key={textIndex}
                  className={`absolute inset-0 text-sm font-mono font-medium text-accent flex items-center transition-all duration-400 ${textAnimating ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}
                >
                  {rotatingTexts[textIndex]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Animated Developer Scene */}
        <div
          className={`flex-shrink-0 opacity-0 ${inView ? 'animate-scale-in' : ''}`}
          style={{ animationDelay: '0.3s' }}
          key={`scene-${replayKey}`}
        >
          <div
            className="relative w-64 h-56 sm:w-64 sm:h-56 lg:w-80 lg:h-72 transition-transform duration-300 mx-auto lg:mx-0"
            style={{ transform: hovering ? 'scale(1.02) translateY(-4px)' : 'scale(1) translateY(0)' }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {/* Desk */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 sm:h-1.5 lg:h-2 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 rounded-sm shadow-lg" />
            <div className="absolute bottom-1.5 sm:bottom-1.5 lg:bottom-2 left-5 lg:left-6 w-1.5 sm:w-1.5 lg:w-2 h-6 sm:h-6 lg:h-8 bg-slate-300 dark:bg-slate-600 rounded-b" />
            <div className="absolute bottom-1.5 sm:bottom-1.5 lg:bottom-2 right-5 lg:right-6 w-1.5 sm:w-1.5 lg:w-2 h-6 sm:h-6 lg:h-8 bg-slate-300 dark:bg-slate-600 rounded-b" />

            {/* Laptop */}
            <div className="absolute bottom-1.5 sm:bottom-1.5 lg:bottom-2 left-1/2 -translate-x-1/2">
              <div className="w-48 lg:w-52 rounded-t-lg border-2 border-b-0 border-slate-200 dark:border-slate-600 bg-slate-900 dark:bg-[#0a0f1a] overflow-hidden shadow-xl relative">
                <div className="flex items-center gap-1 px-2 py-1 bg-slate-800 border-b border-slate-700/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="ml-2 text-[6px] text-slate-500 font-mono">coffee.js</span>
                </div>
                {/* Typing simulator */}
                <div className="p-1.5 lg:p-2 font-mono text-[6px] lg:text-[7px] leading-relaxed min-h-[80px] lg:min-h-[96px]">
                  {displayedLines.map((line, i) => (
                    <div key={i} className={line.color}>
                      {line.visibleText}
                      {i === typingLine && <span className="inline-block w-[5px] h-[9px] bg-white/80 ml-[1px] animate-[blink_1s_step-end_infinite] align-middle" aria-hidden="true" />}
                    </div>
                  ))}
                  {displayedLines.length === 0 && typingLine === 0 && (
                    <div className="text-emerald-400">
                      <span className="inline-block w-[5px] h-[9px] bg-white/80 animate-[blink_1s_step-end_infinite] align-middle" aria-hidden="true" />
                    </div>
                  )}
                </div>
                {/* Screen glow */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-accent/[0.03] to-transparent" />
              </div>
              <div className="w-52 lg:w-56 h-1.5 sm:h-1.5 lg:h-2 bg-slate-200 dark:bg-slate-600 rounded-b-lg mx-auto -ml-2" />
            </div>

            {/* Floating code particles — positioned around edges, hidden on mobile */}
            <div className="hidden sm:block">
            {codeSnippets.map((snippet, i) => (
              <div
                key={i}
                className="absolute px-2 py-1 rounded-md text-[7px] sm:text-[8px] font-mono animate-[codeDrift_6s_ease-in-out_infinite] pointer-events-none"
                style={{
                  top: snippet.top,
                  left: snippet.left,
                  right: snippet.right,
                  animationDelay: `${snippet.delay}s`,
                  animationDuration: `${5 + (i % 3) * 0.5}s`,
                  background: i % 3 === 0 ? 'rgba(16,185,129,0.1)' : i % 3 === 1 ? 'rgba(139,92,246,0.1)' : 'rgba(6,182,212,0.1)',
                  border: `1px solid ${i % 3 === 0 ? 'rgba(16,185,129,0.2)' : i % 3 === 1 ? 'rgba(139,92,246,0.2)' : 'rgba(6,182,212,0.2)'}`,
                  color: i % 3 === 0 ? '#10b981' : i % 3 === 1 ? '#8b5cf6' : '#06b6d4',
                }}
              >
                {snippet.text}
              </div>
            ))}
            </div>

            {/* Coffee cup — enhanced */}
            <div className="absolute bottom-1.5 sm:bottom-1.5 lg:bottom-2 right-2.5 lg:right-3">
              {/* Desk shadow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 lg:w-10 h-1 lg:h-1.5 bg-black/10 dark:bg-black/20 rounded-full blur-[2px]" />
              {/* Cup body */}
              <div className="relative">
                {/* Steam — realistic wavy wisps */}
                <div className="absolute -top-10 lg:-top-12 left-1/2 -translate-x-1/2 w-6 lg:w-8 h-10 lg:h-12 pointer-events-none">
                  <svg className="absolute left-[4px] bottom-0 animate-[steamRise_3s_ease-in-out_infinite]" width="6" height="22" viewBox="0 0 6 22" fill="none">
                    <path d="M3 22 C3 18, 1 15, 3 11 C5 7, 1 4, 3 0" stroke="rgba(148,163,184,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <svg className="absolute left-[10px] bottom-0 animate-[steamRise_3.5s_ease-in-out_infinite_0.4s]" width="6" height="26" viewBox="0 0 6 26" fill="none">
                    <path d="M3 26 C3 21, 5 18, 3 13 C1 8, 5 4, 3 0" stroke="rgba(148,163,184,0.55)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <svg className="absolute left-[16px] bottom-0 animate-[steamRise_2.8s_ease-in-out_infinite_0.8s]" width="6" height="20" viewBox="0 0 6 20" fill="none">
                    <path d="M3 20 C3 16, 1 13, 3 9 C5 5, 1 2, 3 0" stroke="rgba(148,163,184,0.5)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <svg className="absolute left-[22px] bottom-0 animate-[steamRise_3.2s_ease-in-out_infinite_1.2s]" width="6" height="24" viewBox="0 0 6 24" fill="none">
                    <path d="M3 24 C3 19, 5 16, 3 11 C1 6, 5 3, 3 0" stroke="rgba(148,163,184,0.45)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <svg className="absolute left-[1px] bottom-0 animate-[steamRise_3.8s_ease-in-out_infinite_1.6s]" width="6" height="18" viewBox="0 0 6 18" fill="none">
                    <path d="M3 18 C3 14, 1 11, 3 7 C5 3, 1 1, 3 0" stroke="rgba(148,163,184,0.4)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <svg className="absolute left-[13px] bottom-0 animate-[steamRise_2.5s_ease-in-out_infinite_2s]" width="6" height="20" viewBox="0 0 6 20" fill="none">
                    <path d="M3 20 C3 16, 5 13, 3 9 C1 5, 5 2, 3 0" stroke="rgba(148,163,184,0.5)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="w-7 h-6 lg:w-8 lg:h-7 bg-gradient-to-b from-white to-slate-100 dark:from-slate-100 dark:to-slate-200 rounded-b-[5px] lg:rounded-b-[6px] border border-slate-200 dark:border-slate-300 shadow-lg relative">
                  <div className="absolute top-1 left-1 right-1 h-2 lg:h-2.5 bg-gradient-to-b from-amber-700 to-amber-800 rounded-sm" />
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-slate-100/80 rounded-t" />
                </div>
                {/* Handle — solid arc */}
                <svg className="absolute top-0.5 -right-2.5" width="10" height="16" viewBox="0 0 10 16" fill="none">
                  <path d="M8 2C10 2 10 14 8 14" stroke="currentColor" strokeWidth="2" className="text-slate-200 dark:text-slate-300" strokeLinecap="round" />
                </svg>
              </div>
              {/* Saucer */}
              <div className="w-9 lg:w-11 h-1.5 lg:h-2 bg-gradient-to-b from-white via-slate-100 to-slate-200 dark:from-slate-200 dark:via-slate-300 dark:to-slate-400 rounded-full mx-auto -ml-1.5 mt-0.5 border border-slate-200 dark:border-slate-300 shadow-sm" />
            </div>

            {/* Status indicator — top right */}
            <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[blink_2s_ease-in-out_infinite]" />
              <span className="text-[7px] font-semibold text-green-600 dark:text-green-400">Online</span>
            </div>

            {/* Hover glow effect */}
            <div
              className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle at 50% 80%, rgba(16,185,129,0.06) 0%, transparent 60%)',
                opacity: hovering ? 1 : 0,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
