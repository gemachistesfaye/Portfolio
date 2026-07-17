import { useState, useEffect, useRef } from "react";
import { Menu, X, PenLine } from "lucide-react";
import { scrollToSection } from "./utils/scrollTo";

const links = ["About", "Services", "Skills", "Projects", "Experience", "Contact"];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
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
    scrollToSection(id.toLowerCase());
  };

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#020617]/90 border-b border-white/5 shadow-xl shadow-black/15'
          : 'bg-transparent'
      }`}
    >
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
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
          <span className="text-sm font-bold text-white tracking-tight">
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
                  : 'text-slate-400 hover:text-accent hover:bg-accent/5'
              }`}
              aria-current={active === l.toLowerCase() ? 'page' : undefined}
            >
              {l}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/blog"
            onClick={(e) => { e.preventDefault(); window.open("/blog", "_blank", "noopener,noreferrer"); }}
            className="relative px-5 py-2 text-[13px] font-semibold rounded-full text-white bg-gradient-to-r from-accent to-emerald-500 shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-105 transition-all duration-300"
          >
            <PenLine size={14} className="inline -mt-0.5" /> Blog
          </a>
        </div>

        <button
          ref={hamburgerRef}
          onClick={() => setOpen(!open)}
          className="md:hidden p-2.5 rounded-lg text-slate-400 hover:text-accent transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={open ? "mobile-menu" : undefined}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Side Drawer */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`fixed top-0 right-0 h-[100dvh] w-64 bg-[#020617] border-l border-white/5 z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col shadow-2xl ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-800/60">
          <span className="text-sm font-bold text-white tracking-tight">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="p-2 -mr-2 text-slate-400 hover:text-accent transition-colors rounded-lg bg-slate-800/50"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2 px-6">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={(e) => go(e, l)}
              className={`block py-4 text-sm font-medium transition-colors border-b border-slate-800/50 last:border-0 ${
                active === l.toLowerCase()
                  ? 'text-accent'
                  : 'text-slate-400 hover:text-accent'
              }`}
            >
              {l}
            </a>
          ))}
        </div>

        <div className="p-6 border-t border-slate-800/60">
          <a
            href="/blog"
            onClick={(e) => { e.preventDefault(); window.open("/blog", "_blank", "noopener,noreferrer"); }}
            className="block w-full text-center py-3 text-sm font-semibold rounded-full text-white bg-gradient-to-r from-accent to-emerald-500 shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-105 transition-all duration-300"
          >
            <PenLine size={14} className="inline -mt-0.5" /> Blog
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
