import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Globe, Brain, Database, Code, BarChart3, Layers, Server, Sparkles } from "lucide-react";
import { services, skills } from "./data";
import SectionHeading from "./components/SectionHeading";

const serviceIcons = {
  "Business Platforms": <Globe size={22} />,
  "AI-Powered Applications": <Brain size={22} />,
  "Data-Driven Systems": <BarChart3 size={22} />,
  "API Development": <Code size={22} />,
  "Database Architecture": <Database size={22} />,
  "Digital Transformation": <Layers size={22} />,
};

const skillIcons = {
  Frontend: <Code size={18} />,
  Backend: <Server size={18} />,
  Databases: <Database size={18} />,
  "AI & Tools": <Brain size={18} />,
};

const Services = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={s.title}
                className={`group p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220] shadow-sm hover:shadow-xl hover:border-accent/30 transition-all duration-500 hover:-translate-y-1 opacity-0 ${inView ? 'animate-slide-up' : ''}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                  {serviceIcons[s.title]}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-accent transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-0">
                  {s.desc}
                </p>
              </div>
            ))}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {skills.categories.map((cat, i) => (
              <div
                key={cat.label}
                className="group p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220] shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-500 relative overflow-hidden"
              >
                {/* Background glow effect on hover */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-accent/10 to-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Header */}
                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    {skillIcons[cat.label]}
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent/20 to-emerald-500/20 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white uppercase tracking-wide group-hover:text-accent transition-colors duration-300">
                      {cat.label}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium tracking-wide mt-1">{cat.items.length} technologies</p>
                  </div>
                </div>

                {/* Pills */}
                <div className="flex flex-wrap gap-2.5 relative z-10">
                  {cat.items.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50 hover:bg-white dark:hover:bg-[#0c1220] hover:border-accent hover:text-accent hover:shadow-md hover:shadow-accent/10 hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
