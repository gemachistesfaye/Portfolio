import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
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
          ? 'bg-[#020617]/60 backdrop-blur-2xl border-b border-white/5 shadow-xl shadow-black/15'
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
            ✍ Blog
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

      <div
        ref={menuRef}
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!open}
      >
        <div className="px-6 pb-5 pt-3 bg-[#020617]/60 backdrop-blur-2xl border-b border-white/5">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={(e) => go(e, l)}
              className={`block py-3 text-sm font-medium transition-colors border-b border-slate-700/50 last:border-0 ${
                active === l.toLowerCase()
                  ? 'text-accent'
                  : 'text-slate-400 hover:text-accent'
              }`}
            >
              {l}
            </a>
          ))}
          <a
            href="/blog"
            onClick={(e) => { e.preventDefault(); window.open("/blog", "_blank", "noopener,noreferrer"); }}
            className="mt-3 block text-center py-3 text-sm font-semibold rounded-full text-white bg-gradient-to-r from-accent to-emerald-500 shadow-lg shadow-accent/30"
          >
            ✍ Blog
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
