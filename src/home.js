import React from "react";
import { useInView } from "react-intersection-observer";
import { ArrowDown, Sparkles, Download } from "lucide-react";

const Home = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-accent/[0.04] rounded-full blur-[120px]" />
        <div className="absolute top-20 right-20 w-48 h-48 bg-violet-500/[0.03] rounded-full blur-[80px]" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-cyan-500/[0.03] rounded-full blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div ref={ref} className="max-w-4xl text-left relative z-10">
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full glass text-accent text-xs font-semibold tracking-wider uppercase opacity-0 ${inView ? 'animate-fade-in' : ''}`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          Available for freelance projects
        </div>

        <h1
          className={`text-4xl sm:text-7xl font-black text-slate-900 dark:text-white mb-2 tracking-tight opacity-0 ${inView ? 'animate-slide-up' : ''}`}
          style={{ animationDelay: '0.1s' }}
        >
          Gemachis
          <br />
          <span className="text-gradient">Tesfaye</span>
        </h1>

        <div
          className={`w-12 h-[3px] bg-gradient-to-r from-accent to-teal-400 my-7 rounded-full opacity-0 ${inView ? 'animate-scale-in' : ''}`}
          style={{ animationDelay: '0.2s' }}
        />

        <div
          className={`flex items-center gap-2 mb-3 opacity-0 ${inView ? 'animate-slide-up' : ''}`}
          style={{ animationDelay: '0.3s' }}
        >
          <Sparkles size={14} className="text-accent" />
          <p className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-300">
            Full-Stack Engineer & AI Builder
          </p>
        </div>

        <p
          className={`text-base text-slate-400 dark:text-slate-500 max-w-lg mb-10 leading-relaxed opacity-0 ${inView ? 'animate-slide-up' : ''}`}
          style={{ animationDelay: '0.4s' }}
        >
          I help businesses build AI-powered web applications that scale.
          From concept to deployment, I turn ideas into intelligent systems.
        </p>

        <div
          className={`flex items-center gap-3 mb-14 opacity-0 ${inView ? 'animate-slide-up' : ''}`}
          style={{ animationDelay: '0.5s' }}
        >
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
            className="group px-7 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all duration-300 text-base shadow-lg shadow-accent/20 hover:shadow-accent/40 flex items-center gap-2"
          >
            View Projects
            <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          </a>
          <a
            href="https://drive.google.com/file/d/1fDKsgGi0OVM1bRVau7tt7PkH9af_ArrK/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-7 py-3.5 border border-slate-200/80 dark:border-slate-700/40 hover:border-accent/40 hover:bg-accent/10 text-slate-600 dark:text-slate-400 hover:text-accent font-semibold rounded-xl transition-all duration-300 text-base flex items-center gap-2"
          >
            <Download size={15} />
            Download CV
          </a>
        </div>
      </div>

      <button
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-accent transition-colors group"
        aria-label="Scroll to about section"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
          Scroll
        </span>
        <ArrowDown size={16} className="animate-bounce" />
      </button>
    </section>
  );
};

export default Home;
