import { useInView } from "react-intersection-observer";
import { Award, ExternalLink } from "lucide-react";
import { achievements } from "./data";
import SectionHeading from "./components/SectionHeading";

const Achievements = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const achievementItems = achievements.filter((a) => a.category === "achievement");
  const credentialItems = achievements.filter((a) => a.category === "credential");

  return (
    <section id="achievements" className="py-28 px-6 bg-[#060a13]">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className={`opacity-0 ${inView ? 'animate-slide-up' : ''}`}>
          <SectionHeading
            label="Credentials"
            title="Achievements &"
            highlight="Credentials"
            description="Recognized programs and certifications that validate my engineering capabilities."
          />
        </div>

        {/* Achievements & Recognition */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-accent rounded-full" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Achievements & Recognition</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievementItems.map((item, i) => (
              <div
                key={item.title}
                className={`group p-5 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220] shadow-sm hover:shadow-lg hover:border-accent/40 transition-all duration-500 opacity-0 ${inView ? 'animate-slide-up' : ''}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                      <Award size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.org}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-1 rounded-md flex-shrink-0">
                    {item.year}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                  {item.description}
                </p>
                {item.proofUrl && (
                  <a
                    href={item.proofUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent hover:text-accent-hover transition-colors"
                  >
                    <ExternalLink size={11} />
                    View Proof
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Training */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-accent rounded-full" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Certifications & Training</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {credentialItems.map((item, i) => (
              <div
                key={item.title}
                className={`group p-5 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220] shadow-sm hover:shadow-lg hover:border-accent/40 transition-all duration-500 opacity-0 ${inView ? 'animate-slide-up' : ''}`}
                style={{ animationDelay: `${(achievementItems.length + i) * 0.08}s` }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                      <Award size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.org}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-1 rounded-md flex-shrink-0">
                    {item.year}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                  {item.description}
                </p>
                {item.proofUrl && (
                  <a
                    href={item.proofUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent hover:text-accent-hover transition-colors"
                  >
                    <ExternalLink size={11} />
                    View Proof
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
