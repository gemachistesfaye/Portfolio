import { useInView } from "react-intersection-observer";
import { Users, GraduationCap, ExternalLink } from "lucide-react";

const organizations = [
  {
    icon: <GraduationCap size={20} />,
    name: "ISHub - AAU",
    org: "ISHub Team, School of Information Science",
    institution: "Addis Ababa University",
    role: "Participant / Member",
    year: "2025",
    description: "Technical learning community focused on frontend development, software engineering practices, collaboration, and building practical technology projects.",
    link: "https://aauishub.com",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: <Users size={20} />,
    name: "INFOSA-2016",
    org: "Information Science Community",
    institution: "Addis Ababa University",
    role: "Member",
    year: "Current",
    description: "Information Science community focused on technology collaboration, knowledge sharing, and academic networking.",
    link: null,
    color: "from-violet-500 to-purple-600",
  },
];

const Organizations = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="py-28 px-6">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className={`opacity-0 ${inView ? 'animate-slide-up' : ''}`}>
          <p className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-4 text-center">Community</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight text-center">
            Organizations &{' '}
            <span className="text-gradient">Communities</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Active member of technical communities driving innovation, collaboration, and professional growth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {organizations.map((org, i) => (
            <div
              key={org.name}
              className={`group p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220] hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-500 opacity-0 ${inView ? 'animate-slide-up' : ''}`}
              style={{ animationDelay: `${0.1 + i * 0.15}s` }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${org.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {org.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-accent transition-colors">
                      {org.name}
                    </h3>
                    <span className="text-[10px] text-slate-400 font-semibold">{org.year}</span>
                  </div>
                  <p className="text-[11px] text-accent font-semibold uppercase tracking-wider mb-0.5">
                    {org.role}
                  </p>
                  <p className="text-[11px] text-slate-400 mb-2">{org.org}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {org.description}
                  </p>
                  {org.link && (
                    <a
                      href={org.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium text-accent hover:text-accent-hover transition-colors"
                    >
                      Visit website <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Organizations;
