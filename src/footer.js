import { ArrowUp, Github, Linkedin, Send } from "lucide-react";
import config from "./config";

const Footer = () => (
  <footer className="py-5 px-6 border-t border-slate-200 dark:border-slate-700/50" role="contentinfo">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      <p className="text-[11px] text-slate-500 dark:text-slate-400">
        &copy; {new Date().getFullYear()} Gemachis Tesfaye. All rights reserved.
      </p>
      <div className="flex items-center gap-2">
        <a
          href={config.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700/60 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-accent hover:border-accent/30 transition-all duration-300"
        >
          <Github size={13} />
        </a>
        <a
          href={config.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700/60 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-accent hover:border-accent/30 transition-all duration-300"
        >
          <Linkedin size={13} />
        </a>
        <a
          href={config.socials.telegram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
          className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700/60 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-accent hover:border-accent/30 transition-all duration-300"
        >
          <Send size={13} />
        </a>
        <div className="w-px h-4 bg-slate-200 dark:bg-slate-700/60 mx-1" />
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700/60 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-accent hover:border-accent/30 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp size={13} />
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
