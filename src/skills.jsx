import { useInView } from "react-intersection-observer";
import { Brain, Database, Code, Server } from "lucide-react";
import { skills } from "./data";
import SectionHeading from "./components/SectionHeading";

const skillIcons = {
  "Full-Stack Development": <Code size={20} />,
  "Database & Backend Systems": <Database size={20} />,
  "AI Integration & Data Science": <Brain size={20} />,
  "Cloud, DevOps & Workflows": <Server size={20} />,
};

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="skills" className="py-20 sm:py-24 px-6 relative z-10 border-t border-orange-200/50 dark:border-zinc-800/80">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className={`opacity-0 ${inView ? 'animate-slide-up' : ''}`}>
          <SectionHeading
            title="Engineering"
            highlight="Capabilities"
            description="Production-tested technologies across frontend, scalable backend architectures, and AI systems."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {skills.categories.map((cat, i) => (
            <div
              key={cat.label}
              className={`group p-6 sm:p-8 rounded-2xl border border-orange-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 backdrop-blur-md shadow-sm dark:shadow-xl hover:border-orange-500/40 dark:hover:border-emerald-500/40 hover:bg-orange-50/30 dark:hover:bg-zinc-900/90 transition-all duration-300 relative overflow-hidden opacity-0 ${inView ? 'animate-slide-up' : ''}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-orange-500/10 to-amber-500/10 dark:from-emerald-500/10 dark:to-teal-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex items-center gap-4 mb-7 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-stone-100 dark:bg-zinc-800/90 border border-orange-200/50 dark:border-zinc-700/80 flex items-center justify-center text-orange-600 dark:text-emerald-400 group-hover:text-orange-500 dark:group-hover:text-emerald-300 group-hover:border-orange-500/40 dark:group-hover:border-emerald-500/40 transition-colors duration-300">
                  {skillIcons[cat.label] || <Code size={20} />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-emerald-300 transition-colors duration-300">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium tracking-wide mt-0.5">{cat.items.length} technologies</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 relative z-10">
                {cat.items.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-stone-100/80 dark:bg-zinc-950/70 text-slate-700 dark:text-zinc-300 border border-orange-200/50 dark:border-zinc-800/90 hover:border-orange-500/40 dark:hover:border-emerald-500/40 hover:text-orange-600 dark:hover:text-emerald-300 transition-all duration-200 cursor-default"
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
  );
};

export default Skills;
