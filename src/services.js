import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Globe, Brain, Database, Code, BarChart3, Layers, ArrowRight, Server, Sparkles } from "lucide-react";
import { services, skills } from "./data";
import SectionHeading from "./components/SectionHeading";
import { scrollToSection } from "./utils/scrollTo";

const serviceIcons = {
  "Full-Stack Web Apps": <Globe size={22} />,
  "AI Integration": <Brain size={22} />,
  "Database Design": <Database size={22} />,
  "API Development": <Code size={22} />,
  "Data Analytics": <BarChart3 size={22} />,
  "UI/UX Implementation": <Layers size={22} />,
};

const skillIcons = {
  Frontend: <Code size={18} />,
  Backend: <Server size={18} />,
  Databases: <Database size={18} />,
  "AI & Tools": <Brain size={18} />,
};

const Services = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [openCat, setOpenCat] = useState(skills.categories[0].label);

  return (
    <>
      <section id="services" className="py-28 px-6 bg-[#060a13]">
        <div ref={ref} className="max-w-6xl mx-auto">
          <div className={`opacity-0 ${inView ? 'animate-slide-up' : ''}`}>
            <SectionHeading
              label="Services"
              title="What I Can Build"
              highlight="For You"
              description="Full-stack development, AI integration, and data-driven solutions — from concept to deployment."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div
                key={s.title}
                className={`group p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220] shadow-sm hover:shadow-lg hover:border-accent/30 transition-all duration-500 hover:shadow-accent/5 opacity-0 ${inView ? 'animate-slide-up' : ''}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {serviceIcons[s.title]}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-accent transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {s.desc}
                </p>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
                >
                  Get a quote
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>

          <div className={`mt-12 text-center opacity-0 ${inView ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.5s' }}>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all duration-300 text-base shadow-lg shadow-accent/20 hover:shadow-accent/40"
            >
              Start a Project
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section id="skills" className="py-28 px-6 bg-[#060a13]">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="Skills"
            title="Technical"
            highlight="Expertise"
            description="Full-stack development, databases, AI, and analytics."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              {skills.categories.map((cat, i) => {
                const isActive = openCat === cat.label;
                return (
                  <button
                    key={cat.label}
                    onClick={() => setOpenCat(isActive ? null : cat.label)}
                    aria-expanded={isActive}
                    aria-controls={`skills-panel-${cat.label}`}
                    id={`skills-button-${cat.label}`}
                    className={`group w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-500 text-left ${
                      isActive
                        ? 'border-accent/40 bg-white dark:bg-[#0c1220] shadow-xl shadow-accent/10 scale-[1.02]'
                        : 'border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220] hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 hover:scale-[1.01]'
                    }`}
                  >
                    <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg flex-shrink-0 transition-all duration-500 ${isActive ? 'scale-110 rotate-3' : 'group-hover:scale-105'}`}>
                      {skillIcons[cat.label]}
                      {isActive && (
                        <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-accent/20 to-emerald-500/20 blur-sm -z-10" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-bold uppercase tracking-wide transition-colors duration-300 ${isActive ? 'text-accent' : 'text-slate-900 dark:text-white group-hover:text-accent'}`}>
                          {cat.label}
                        </h3>
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive ? 'bg-accent scale-100' : 'bg-slate-300 dark:bg-slate-600 scale-75 group-hover:scale-100'}`} />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{cat.items.length} technologies</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-2">
              {openCat ? (
                <div
                  id={`skills-panel-${openCat}`}
                  role="region"
                  aria-labelledby={`skills-button-${openCat}`}
                  className="h-full p-6 sm:p-8 rounded-2xl border border-accent/20 bg-white dark:bg-[#0c1220] shadow-xl dark:shadow-accent/5 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/10 via-emerald-500/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-violet-500/5 via-transparent to-transparent rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                  
                  {skills.categories.filter(c => c.label === openCat).map(cat => (
                    <div key={cat.label} className="relative z-10">
                      <div className="flex items-center gap-4 mb-8">
                        <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-xl shadow-accent/20`}>
                          {skillIcons[cat.label]}
                          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent/20 to-emerald-500/20 blur-md -z-10" />
                        </div>
                        <div>
                          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white uppercase tracking-wide">
                            {cat.label}
                          </h3>
                          <p className="text-xs text-slate-400 mt-0.5">Hover to explore each technology</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2.5">
                        {cat.items.map((s, i) => (
                          <span
                            key={s}
                            className="group/skill relative px-4 py-2.5 text-sm font-semibold rounded-xl bg-slate-50 dark:bg-slate-800/30 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700/40 hover:border-accent/50 hover:text-white hover:bg-accent hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 cursor-default"
                            style={{ animationDelay: `${i * 0.04}s` }}
                          >
                            <span className="relative z-10">{s}</span>
                          </span>
                        ))}
                      </div>

                      <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/60">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-slate-400">
                            <span className="font-bold text-accent">{cat.items.length}</span> technologies in this category
                          </p>
                          <div className="flex -space-x-1">
                            {[...Array(Math.min(cat.items.length, 5))].map((_, i) => (
                              <div key={i} className={`w-5 h-5 rounded-full bg-gradient-to-br ${cat.color} border-2 border-white dark:border-[#0c1220]`} style={{ opacity: 0.6 + i * 0.1 }} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full p-8 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700/60 bg-white dark:bg-[#0c1220] flex flex-col items-center justify-center text-center min-h-[350px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] via-transparent to-emerald-500/[0.02] pointer-events-none" />
                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/10 to-emerald-500/10 flex items-center justify-center mb-5 mx-auto ring-4 ring-accent/5">
                      <Sparkles size={28} className="text-accent" />
                    </div>
                    <p className="text-base font-bold text-slate-900 dark:text-white mb-2">Select a category</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">Click any skill category on the left to explore technologies</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
