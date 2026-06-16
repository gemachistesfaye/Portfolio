import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

const links = ["About", "Services", "Skills", "Projects", "Experience", "Contact"];

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["home", "about", "process", "services", "skills", "projects", "testimonials", "experience", "faq", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(`#${id.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#020617]/90 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-xl shadow-black/[0.05] dark:shadow-black/[0.15]'
          : 'bg-white/50 dark:bg-[#020617]/50 backdrop-blur-lg'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => go(e, "home")}
          className="group flex items-center gap-2.5"
          aria-label="Go to top"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-accent/20 group-hover:shadow-accent/40 group-hover:scale-105 transition-all duration-300">
            GT
          </div>
          <span className="hidden sm:block text-sm font-bold text-slate-900 dark:text-white tracking-tight">
            Gemachis T.
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={(e) => go(e, l)}
              className={`relative px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-300 ${
                active === l.toLowerCase()
                  ? 'text-accent bg-accent/10'
                  : 'text-slate-500 dark:text-slate-400 hover:text-accent hover:bg-accent/5'
              }`}
              aria-current={active === l.toLowerCase() ? 'page' : undefined}
            >
              {l}
            </a>
          ))}

          <div className="w-px h-5 bg-slate-200 dark:bg-slate-800 mx-2" />

          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-400 hover:text-accent transition-all duration-300"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-lg text-slate-400 hover:text-accent transition-colors"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="p-2.5 rounded-lg text-slate-400 hover:text-accent transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-5 pt-3 bg-white/90 dark:bg-[#020617]/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={(e) => go(e, l)}
              className={`block py-3 text-sm font-medium transition-colors border-b border-slate-100 dark:border-slate-800/50 last:border-0 ${
                active === l.toLowerCase()
                  ? 'text-accent'
                  : 'text-slate-500 hover:text-accent'
              }`}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
