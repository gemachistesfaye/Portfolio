import { useInView } from "react-intersection-observer";
import { GraduationCap, Briefcase, Calendar } from "lucide-react";
import { experience } from "./data";
import SectionHeading from "./components/SectionHeading";

const Experience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const workItems = experience.filter((exp) => exp.type !== "Degree");
  const education = experience.find((exp) => exp.type === "Degree");

  return (
    <section id="experience" className="py-20 sm:py-24 px-6 relative z-10 border-t border-slate-200/80 dark:border-zinc-800/80">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className={`opacity-0 ${inView ? 'animate-slide-up' : ''}`}>
          <SectionHeading
            title="Professional"
            highlight="Background"
            description="My engineering experience and academic qualifications."
          />
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Left Column: Work Experience Timeline */}
          <div className={`opacity-0 ${inView ? 'animate-slide-up' : ''}`}>
            <div className="relative">
              <div className="absolute left-4 sm:left-6 top-0 w-px h-full bg-gradient-to-b from-amber-500/40 via-slate-200 dark:via-zinc-800 to-transparent" />

              <div className="flex items-center gap-2.5 mb-4 ml-11 sm:ml-16">
                <div className="w-1.5 h-3.5 bg-amber-500 rounded-full" />
                <h3 className="text-xs font-bold text-slate-800 dark:text-zinc-300 uppercase tracking-wider">
                  Work Experience & Initiatives
                </h3>
              </div>

              <div className="space-y-4">
                {workItems.map((exp, i) => (
                  <div key={i} className="relative pl-11 sm:pl-16">
                    <div className="absolute left-1 sm:left-3 top-1 flex items-center justify-center">
                      <div className="w-[26px] h-[26px] rounded-full bg-slate-900 dark:bg-zinc-800 flex items-center justify-center text-white ring-4 ring-slate-100 dark:ring-[#09090b] shadow-sm z-10">
                        <Briefcase size={14} />
                      </div>
                    </div>

                    <div className="group p-4 sm:p-5 rounded-xl bg-white dark:bg-zinc-900/60 backdrop-blur-sm border border-slate-200/80 dark:border-zinc-800/80 hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-slate-50/20 dark:hover:bg-zinc-900/90 shadow-sm transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 mb-2.5">
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                            {exp.role}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-zinc-400 font-semibold mt-0.5">{exp.org}</p>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-zinc-500 font-medium">
                          <Calendar size={11} />
                          {exp.date}
                        </div>
                      </div>

                      <ul className="space-y-1.5 mb-3">
                        {exp.points.map((p, j) => (
                          <li key={j} className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 flex items-start gap-2 leading-relaxed">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-500 flex-shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>

                      {exp.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {exp.tags.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-100 dark:bg-zinc-950/70 text-slate-600 dark:text-zinc-400 border border-slate-200/80 dark:border-zinc-800"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Dedicated Education Section */}
        {education && (
          <div className={`mt-8 sm:mt-10 opacity-0 ${inView ? 'animate-slide-up' : ''}`} style={{ animationDelay: '0.2s' }}>
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/60 backdrop-blur-sm border border-slate-200/80 dark:border-zinc-800/80 hover:border-slate-300 dark:hover:border-zinc-700 shadow-sm transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 mb-3.5">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-slate-900 dark:bg-zinc-800 flex items-center justify-center text-white ring-4 ring-slate-100 dark:ring-[#09090b] shadow-sm flex-shrink-0">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {education.role}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-semibold mt-0.5">
                      {education.org}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-500 font-medium">
                  <Calendar size={13} />
                  {education.date}
                </div>
              </div>

              <ul className="space-y-1.5 mb-3.5">
                {education.points.map((p, j) => (
                  <li key={j} className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 flex items-start gap-2 leading-relaxed">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-500 flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5">
                {education.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 text-[10px] font-medium rounded-md bg-slate-100 dark:bg-zinc-950/70 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Experience;
