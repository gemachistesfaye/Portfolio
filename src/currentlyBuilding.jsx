import { useInView } from "react-intersection-observer";
import { GraduationCap, Shirt, Briefcase } from "lucide-react";
import SectionHeading from "./components/SectionHeading";

const projects = [
  {
    name: "EduFlow",
    description: "Modern school management system designed to simplify academic operations through dashboards, attendance tracking, grading, timetable scheduling, and role-based access control.",
    category: "Education Platform",
    status: "In Development",
    milestone: "Teacher & Parent portals",
    tags: ["React", "Node.js", "Database", "Authentication"],
    icon: <GraduationCap size={20} />,
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "LaundryFlow",
    description: "Smart laundry management platform with real-time order tracking, role-based dashboards, and AI-powered assistance for students, workers, deliverers, and administrators.",
    category: "Business Platform",
    status: "In Development",
    milestone: "Real-time delivery tracking",
    tags: ["React", "Node.js", "Supabase", "AI"],
    icon: <Shirt size={20} />,
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "SmartHire AI",
    description: "AI-powered candidate screening platform that uses semantic matching and intelligent analysis to improve recruitment workflows.",
    category: "AI-Powered Recruitment Platform",
    status: "MVP",
    milestone: "AI resume ranking & interview insights",
    tags: ["AI", "Machine Learning", "Full Stack"],
    icon: <Briefcase size={20} />,
    color: "from-violet-500 to-purple-600",
  },
];

const CurrentlyBuilding = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="building" className="py-28 px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className={`opacity-0 ${inView ? 'animate-slide-up' : ''}`}>
          <SectionHeading
            label="Work in Progress"
            title="Currently"
            highlight="Building"
            description="Projects I'm actively designing and developing."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div
              key={p.name}
              className={`group p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220] shadow-sm hover:shadow-xl hover:border-accent/30 transition-all duration-500 hover:-translate-y-1 opacity-0 ${inView ? 'animate-slide-up' : ''}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white shadow-lg`}>
                  {p.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-accent transition-colors">
                      {p.name}
                    </h3>
                    <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 whitespace-nowrap">
                      {p.status}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-accent uppercase tracking-widest">{p.category}</p>
                </div>
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                {p.description}
              </p>

              <div className="flex items-center gap-2 mb-4 p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Next:</span>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{p.milestone}</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className={`text-center text-sm text-slate-500 dark:text-slate-400 mt-10 max-w-2xl mx-auto opacity-0 ${inView ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.4s' }}>
          Alongside client projects, I'm building scalable software products with a long-term vision for real-world adoption across education, business, healthcare, and public services.
        </p>
      </div>
    </section>
  );
};

export default CurrentlyBuilding;
