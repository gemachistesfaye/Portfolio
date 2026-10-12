import { useState, useEffect, useRef } from "react";
import { Menu, X, PenLine, Sun, Moon } from "lucide-react";
import { scrollToSection } from "./utils/scrollTo";
import { useTheme } from "./context/ThemeContext";

const links = ["About", "Skills", "Projects", "Experience", "Contact"];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const { theme, isDark, toggleTheme } = useTheme();
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!open) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!open || !menuRef.current) return;
    const menuLinks = menuRef.current.querySelectorAll("a, button");
    if (menuLinks.length === 0) return;
    menuLinks[0].focus();
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["home", "about", "skills", "projects", "experience", "contact"];
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
    scrollToSection(id.toLowerCase());
  };

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-[#09090b]/85 border-b border-slate-200/80 dark:border-white/[0.08] shadow-lg shadow-black/5 dark:shadow-black/40 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => go(e, "home")}
          className="group flex items-center gap-2.5"
          aria-label="Go to top"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all duration-300">
            GT
          </div>
          <span className="text-sm font-bold text-slate-900 dark:text-zinc-100 tracking-tight">
            Gemachis T.
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-zinc-900/60 p-1 rounded-full border border-slate-200/60 dark:border-white/[0.06] backdrop-blur-md">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={(e) => go(e, l)}
              className={`relative px-4 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200 ${
                active === l.toLowerCase()
                  ? 'text-white bg-indigo-600 shadow-sm shadow-indigo-500/30 font-semibold'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-200/50 dark:hover:bg-white/[0.05]'
              }`}
              aria-current={active === l.toLowerCase() ? 'page' : undefined}
            >
              {l}
            </a>
          ))}
        </div>

        {/* Right CTA + Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white bg-slate-100/80 dark:bg-zinc-800/80 border border-slate-200/60 dark:border-white/[0.08] hover:border-indigo-500/40 transition-all duration-200"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-indigo-600" />}
          </button>

          <a
            href="/blog"
            onClick={(e) => { e.preventDefault(); window.open("/blog", "_blank", "noopener,noreferrer"); }}
            className="relative px-4 py-2 text-[13px] font-semibold rounded-lg text-slate-700 dark:text-zinc-200 bg-slate-100 dark:bg-zinc-800/80 hover:bg-slate-200 dark:hover:bg-zinc-700 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/[0.08] transition-all duration-200"
          >
            <PenLine size={13} className="inline -mt-0.5 mr-1.5 text-indigo-600 dark:text-indigo-400" /> Blog
          </a>
        </div>

        {/* Mobile menu and theme toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-indigo-600" />}
          </button>

          <button
            ref={hamburgerRef}
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={open ? "mobile-menu" : undefined}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="md:hidden fixed inset-0 top-16 bg-white/95 dark:bg-[#09090b]/98 backdrop-blur-2xl z-40 px-6 py-8 flex flex-col justify-between border-t border-slate-200 dark:border-white/[0.08]"
        >
          <div className="space-y-2">
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={(e) => go(e, l)}
                className={`block py-3 px-4 rounded-xl text-base font-medium transition-colors ${
                  active === l.toLowerCase()
                    ? 'text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-600/20 font-semibold border border-indigo-200 dark:border-indigo-500/30'
                    : 'text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                {l}
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-zinc-800 space-y-3">
            <a
              href="/blog"
              onClick={(e) => { e.preventDefault(); setOpen(false); window.open("/blog", "_blank", "noopener,noreferrer"); }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20"
            >
              <PenLine size={16} /> Read Blog
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
