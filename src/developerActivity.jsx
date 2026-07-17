import { useInView } from "react-intersection-observer";
import { Github, ExternalLink, GitCommit, BookOpen, GraduationCap, Users } from "lucide-react";
import config from "./config";

const devStats = [
  { icon: <GitCommit size={16} />, label: "Regular commits" },
  { icon: <BookOpen size={16} />, label: "Project documentation" },
  { icon: <Github size={16} />, label: "README files & setup guides" },
  { icon: <GraduationCap size={16} />, label: "Code organization & improvements" },
];

const communities = [
  {
    icon: <GraduationCap size={18} />,
    name: "ISHub AAU",
    role: "Frontend Development Community",
    year: "2025 – Present",
    description: "Participating in a community focused on frontend engineering, collaboration, mentorship, and building practical software projects.",
    link: "https://github.com/ISHUBTEAM/Frontend_G2_Gemachis_Tesfaye_FinalProject",
  },
  {
    icon: <Users size={18} />,
    name: "INFOSA",
    role: "Information Science Community",
    year: "Current Member",
    description: "Participating in technical collaboration, knowledge sharing, software development discussions, innovation, and academic growth.",
    link: "https://github.com/INFOSA-2016/IP-Project-2016",
  },
];

const DeveloperActivity = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="developer" className="py-28 px-6">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className={`opacity-0 ${inView ? 'animate-slide-up' : ''}`}>
          <p className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-4">Activity</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Developer <span className="text-gradient">Activity</span>
          </h2>
          <p className="text-base text-slate-500 dark:text-slate-400 mt-3 max-w-lg mx-auto">
            Building, sharing, and collaborating through software projects, technical communities, and continuous learning.
          </p>
        </div>

        <div className={`mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 opacity-0 ${inView ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.15s' }}>
          {/* Open Source & GitHub */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-5">
              GitHub & Development Activity
            </h3>

            <div className="space-y-2.5 mb-6">
              {devStats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 group"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>

            <a
              href={config.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0c1220] hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 hover:border-accent/40 text-slate-600 dark:text-slate-300 hover:text-accent font-semibold rounded-xl transition-all duration-300 text-sm"
            >
              <Github size={15} />
              View GitHub Profile
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Technical Communities */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-5">
              Technical Communities
            </h3>

            <div className="space-y-4">
              {communities.map((org, i) => (
                <div
                  key={org.name}
                  className="group p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220] hover:border-accent/40 transition-all duration-300"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {org.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{org.name}</h4>
                        <span className="text-[10px] text-slate-400 font-semibold whitespace-nowrap">{org.year}</span>
                      </div>
                      <p className="text-[11px] text-accent font-semibold uppercase tracking-wider mt-0.5">{org.role}</p>
                      <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">{org.description}</p>
                      {org.link && (
                        <a
                          href={org.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-accent hover:text-accent-hover transition-colors"
                        >
                          Visit Community <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperActivity;
