import React from "react";
import { ArrowUp } from "lucide-react";

const Footer = () => (
  <footer className="py-5 px-6 border-t border-slate-200/80 dark:border-slate-800/50" role="contentinfo">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      <p className="text-[11px] text-slate-400">
        &copy; {new Date().getFullYear()} Gemachis Tesfaye
      </p>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-8 h-8 rounded-lg border border-slate-200/80 dark:border-slate-800/60 flex items-center justify-center text-slate-400 hover:text-accent hover:border-accent/30 transition-all duration-300"
        aria-label="Scroll to top"
      >
        <ArrowUp size={13} />
      </button>
    </div>
  </footer>
);

export default Footer;
