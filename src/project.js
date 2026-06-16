import React, { useState, useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    name: "Sheger Health Connect",
    category: "Healthcare",
    problem: "Clinics in Addis Ababa needed a digital triage and appointment system to reduce wait times and improve patient care.",
    approach: "Built a full-stack platform with GPT-4-powered symptom analysis, real-time notifications via Socket.io, and role-based dashboards for doctors and patients.",
    outcome: "Reduced average patient wait time by 40% and enabled video consultations for remote patients.",
    tags: ["Node.js", "MySQL", "Socket.io", "GPT-4", "React"],
    github: "https://github.com/gemachistesfaye/Sheger-Health-Connect",
    demo: "https://sheger-health-connect.vercel.app",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
    featured: true,
  },
  {
    name: "Ethio-Brew",
    category: "E-Commerce",
    problem: "Ethiopian coffee producers lacked a modern online marketplace to reach international buyers with localized payment options.",
    approach: "Developed a multilingual platform with Gemini AI product recommendations, Telebirr/CBE payment integration, and seller analytics dashboard.",
    outcome: "Onboarded 50+ sellers in the first month with 95% user satisfaction rating.",
    tags: ["Node.js", "MySQL", "Gemini AI", "React"],
    github: "https://github.com/gemachistesfaye/Ethio-Brew",
    demo: "https://ethio-brew.vercel.app",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=500&fit=crop",
  },
  {
    name: "AeroDemand-AI",
    category: "AI / ML",
    problem: "Airlines needed accurate demand forecasting to optimize pricing and capacity planning.",
    approach: "Built a Flask REST API with predictive ML models, interactive Plotly dashboards, and automated Excel report generation.",
    outcome: "Achieved 92% prediction accuracy, enabling data-driven pricing decisions.",
    tags: ["Python", "Flask", "ML", "REST API", "Plotly"],
    github: "https://github.com/gemachistesfaye/AeroDemand-AI",
    demo: "https://aerodemand-ai.onrender.com",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
  },
  {
    name: "TracePoint",
    category: "PWA / Maps",
    problem: "Students on campus frequently lost items with no efficient way to report or find them.",
    approach: "Created a PWA with AI item matching, Leaflet interactive campus maps, and real-time Firebase push notifications.",
    outcome: "Recovered rate improved by 60% within the first semester of deployment.",
    tags: ["React", "Firebase", "AI", "PWA", "Leaflet"],
    github: "https://github.com/gemachistesfaye/tracepoint-system",
    demo: "https://tracepoint-system.web.app",
    image: "https://images.unsplash.com/photo-1649524013520-2a24862e4581?w=800&h=500&fit=crop",
  },
  {
    name: "SmartQuiz AI",
    category: "EdTech",
    problem: "Students needed an interactive way to learn JavaScript with personalized feedback and progress tracking.",
    approach: "Designed a gamified learning platform with Gemini AI tutor, code labs, real-time analytics, and achievement system.",
    outcome: "100+ active users with 85% course completion rate — 3x industry average.",
    tags: ["React", "Firebase", "Gemini AI", "Vite", "Charts"],
    github: "https://github.com/gemachistesfaye/SmartQuiz-AI-Platform",
    demo: "https://smart-quiz-ai-platform.vercel.app",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&h=500&fit=crop",
  },
];

const Project = () => {
  const [current, setCurrent] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const goTo = useCallback((idx) => setCurrent(idx), []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % projects.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + projects.length) % projects.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  const p = projects[current];

  return (
    <section id="projects" className="py-28 px-6 overflow-hidden">
      <div ref={ref} className="max-w-4xl mx-auto">
        <div className={`text-center mb-14 opacity-0 ${inView ? 'animate-slide-up' : ''}`}>
          <p className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-3">Projects</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Featured Work
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
            Real projects with real results. Click through to see live demos.
          </p>
        </div>

        <div
          className={`relative opacity-0 ${inView ? 'animate-fade-in' : ''}`}
          style={{ animationDelay: '0.15s' }}
        >
          <div className="relative rounded-3xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-[#0c1220] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10">
            <div className={`relative h-52 sm:h-64 bg-gradient-to-br ${p.gradient || 'from-slate-700 to-slate-900'} overflow-hidden`}>
              <img
                src={p.image}
                alt={p.name}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {p.featured && (
                <div className="absolute top-5 left-5 px-3.5 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/20">
                  Featured
                </div>
              )}

              <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] font-bold text-white tracking-wide">LIVE</span>
              </div>

              <div className="absolute bottom-5 left-5 px-3.5 py-1.5 bg-black/20 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/10">
                {p.category}
              </div>

              <div className="absolute bottom-5 right-5 text-[10px] font-bold text-white/60 tracking-widest">
                {String(current + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </div>
            </div>

            <div className="p-7 sm:p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {p.name}
                </h3>
                <div className="flex gap-2 flex-shrink-0">
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn w-10 h-10 rounded-xl bg-accent/10 hover:bg-accent flex items-center justify-center text-accent hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
                    aria-label={`View live demo of ${p.name}`}
                  >
                    <ExternalLink size={16} className="group-hover/btn:rotate-12 transition-transform" />
                  </a>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700/50 hover:border-accent/40 hover:bg-accent/10 flex items-center justify-center text-slate-400 hover:text-accent transition-all duration-300"
                    aria-label={`View source code of ${p.name}`}
                  >
                    <Github size={16} className="group-hover/btn:-rotate-12 transition-transform" />
                  </a>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                <div>
                  <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Problem</span>
                  <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">{p.problem}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Approach</span>
                  <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">{p.approach}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Outcome</span>
                  <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">{p.outcome}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-11 h-11 rounded-full bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/60 shadow-xl flex items-center justify-center text-slate-400 hover:text-accent hover:border-accent/30 hover:shadow-accent/10 transition-all duration-300"
            aria-label="Previous project"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-11 h-11 rounded-full bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/60 shadow-xl flex items-center justify-center text-slate-400 hover:text-accent hover:border-accent/30 hover:shadow-accent/10 transition-all duration-300"
            aria-label="Next project"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className={`mt-8 flex flex-col items-center gap-4 opacity-0 ${inView ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2.5" role="tablist" aria-label="Project navigation">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-400 ${
                  i === current
                    ? 'bg-accent w-8 shadow-lg shadow-accent/30'
                    : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600 w-2'
                }`}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>

          <p className="text-[10px] text-slate-400 font-medium tracking-wide">
            Use arrow keys or click to navigate
          </p>
        </div>

        <div className={`mt-12 text-center opacity-0 ${inView ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.4s' }}>
          <p className="text-sm text-slate-400 mb-4">Want a similar solution for your business?</p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all duration-300 text-base shadow-lg shadow-accent/20 hover:shadow-accent/40"
          >
            Let's Build Together
          </a>
        </div>
      </div>
    </section>
  );
};

export default Project;
