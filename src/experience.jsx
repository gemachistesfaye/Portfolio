import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { GraduationCap, Briefcase, Calendar, ExternalLink, X, Award } from "lucide-react";
import { experience, achievements } from "./data";
import SectionHeading from "./components/SectionHeading";

const Experience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [certImage, setCertImage] = useState(null);

  useEffect(() => {
    if (certImage) {
      document.body.classList.add("cert-lightbox-open");
    } else {
      document.body.classList.remove("cert-lightbox-open");
    }
    return () => document.body.classList.remove("cert-lightbox-open");
  }, [certImage]);

  useEffect(() => {
    if (!certImage) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") setCertImage(null);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [certImage]);

  const workItems = experience.filter((exp) => exp.type !== "Degree");
  const education = experience.find((exp) => exp.type === "Degree");

  return (
    <section id="experience" className="py-20 sm:py-24 px-6 relative z-10 border-t border-slate-200/80 dark:border-zinc-800/80">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className={`opacity-0 ${inView ? 'animate-slide-up' : ''}`}>
          <SectionHeading
            title="Professional"
            highlight="Background"
            description="My engineering experience, academic qualifications, and verified professional credentials."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Work Experience Timeline */}
          <div className={`lg:col-span-7 opacity-0 ${inView ? 'animate-slide-right' : ''}`}>
            <div className="relative">
              <div className="absolute left-4 sm:left-6 top-0 w-px h-full bg-gradient-to-b from-emerald-500/40 via-slate-300 dark:via-zinc-800 to-transparent" />

              <div className="flex items-center gap-2.5 mb-4 ml-11 sm:ml-16">
                <div className="w-1.5 h-3.5 bg-emerald-500 rounded-full" />
                <h3 className="text-xs font-bold text-slate-800 dark:text-zinc-300 uppercase tracking-wider">
                  Work Experience & Initiatives
                </h3>
              </div>

              <div className="space-y-4">
                {workItems.map((exp, i) => (
                  <div key={i} className="relative pl-11 sm:pl-16">
                    <div className="absolute left-1 sm:left-3 top-1 flex items-center justify-center">
                      <div className="w-[26px] h-[26px] rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white ring-4 ring-slate-100 dark:ring-[#09090b] shadow-md shadow-emerald-500/20 z-10">
                        <Briefcase size={14} />
                      </div>
                    </div>

                    <div className="group p-4 sm:p-5 rounded-xl bg-white dark:bg-zinc-900/60 backdrop-blur-sm border border-slate-200/80 dark:border-zinc-800/80 hover:border-emerald-500/40 hover:bg-slate-50 dark:hover:bg-zinc-900/90 shadow-sm transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 mb-2.5">
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                            {exp.role}
                          </h4>
                          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">{exp.org}</p>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-zinc-500 font-medium">
                          <Calendar size={11} />
                          {exp.date}
                        </div>
                      </div>

                      <ul className="space-y-1.5 mb-3">
                        {exp.points.map((p, j) => (
                          <li key={j} className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 flex items-start gap-2 leading-relaxed">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>

                      {exp.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {exp.tags.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-100 dark:bg-zinc-950/70 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800"
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

          {/* Right Column: Professional Credentials / Certifications */}
          <div className={`lg:col-span-5 opacity-0 ${inView ? 'animate-slide-left' : ''}`} style={{ animationDelay: '0.15s' }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Award size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Credentials & Certifications
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-500">Verified programs, bootcamps & awards</p>
              </div>
            </div>

            <div className="space-y-3">
              {achievements.map((item) => (
                <div
                  key={item.title}
                  className="group p-4 rounded-xl border border-slate-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-slate-50 dark:hover:bg-zinc-900/90 shadow-sm transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-500 mt-0.5">{item.org} • {item.year}</p>
                    </div>
                    {item.proofFile && (
                      <button
                        onClick={() => setCertImage(item)}
                        className="flex-shrink-0 p-1.5 rounded-lg text-slate-500 dark:text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-300 hover:bg-slate-100 dark:hover:bg-emerald-500/10 transition-colors"
                        aria-label={`View ${item.title} certificate`}
                        title="View certificate"
                      >
                        <ExternalLink size={14} />
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[9px] font-medium rounded bg-slate-100 dark:bg-zinc-950/70 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dedicated Education Section ("in one", not side-by-side with achievements) */}
        {education && (
          <div className={`mt-8 sm:mt-10 opacity-0 ${inView ? 'animate-slide-up' : ''}`} style={{ animationDelay: '0.2s' }}>
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/60 backdrop-blur-sm border border-slate-200/80 dark:border-zinc-800/80 hover:border-emerald-500/40 shadow-sm transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 mb-3.5">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white ring-4 ring-slate-100 dark:ring-[#09090b] shadow-md shadow-emerald-500/20 flex-shrink-0">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {education.role}
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
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
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0" />
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

        {/* Certificate Lightbox Modal */}
        {certImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setCertImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Certificate image"
          >
            <button
              onClick={() => setCertImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <img
              src={`/Award/${certImage.proofFile}`}
              alt={certImage.title}
              className="w-full h-full max-w-4xl max-h-[85vh] rounded-2xl shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div
              className="hidden max-w-full max-h-[85vh] rounded-2xl shadow-2xl bg-white dark:bg-zinc-900 items-center justify-center p-12 border border-slate-200 dark:border-zinc-800"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-slate-500 dark:text-zinc-500 text-center">Certificate image not available</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
