import { useInView } from "react-intersection-observer";
import { Monitor, Server, Database, Cloud, Shield, ArrowDown } from "lucide-react";
import SectionHeading from "./components/SectionHeading";

const layers = [
  {
    icon: <Monitor size={20} />,
    label: "Frontend",
    tech: "React + TypeScript + Tailwind CSS",
    desc: "Component architecture, state management, responsive UI",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: <Server size={20} />,
    label: "Backend API",
    tech: "Node.js / Express / Flask",
    desc: "REST API design, authentication, business logic",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: <Database size={20} />,
    label: "Database",
    tech: "PostgreSQL / MySQL / Firebase",
    desc: "Schema design, normalization, query optimization",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: <Cloud size={20} />,
    label: "Cloud Deployment",
    tech: "Vercel / Render / Firebase Hosting",
    desc: "CI/CD, environment management, performance monitoring",
    color: "from-emerald-500 to-teal-600",
  },
];

const securityPractices = [
  "Authentication & Authorization",
  "Input Validation & Sanitization",
  "API Security Basics",
  "Environment Variable Security",
  "Database Optimization",
];

const ArchitectureSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="architecture" className="py-28 px-6 bg-[#060a13]">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className={`opacity-0 ${inView ? 'animate-slide-up' : ''}`}>
          <SectionHeading
            label="Engineering"
            title="How I Build"
            highlight="Systems"
            description="A structured approach to building scalable, secure, and maintainable software."
          />
        </div>

        <div className={`mt-12 opacity-0 ${inView ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.15s' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Stack Flow */}
            <div className="space-y-0">
              {layers.map((layer, i) => (
                <div key={layer.label}>
                  <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-slate-700/60 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-500">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${layer.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {layer.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-accent transition-colors">
                        {layer.label}
                      </h3>
                      <p className="text-xs font-semibold text-accent mt-0.5">{layer.tech}</p>
                      <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-1">{layer.desc}</p>
                    </div>
                  </div>
                  {i < layers.length - 1 && (
                    <div className="flex justify-center py-1">
                      <ArrowDown size={16} className="text-slate-300 dark:text-slate-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Security Practices */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-slate-700/60">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Security Practices</h3>
                    <p className="text-[11px] text-slate-500">Applied to every project</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {securityPractices.map((practice) => (
                    <li key={practice} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      {practice}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-accent/10 to-emerald-500/5 border border-accent/20">
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  <span className="font-bold text-accent">Every project</span> follows this architecture pattern — from simple landing pages to complex full-stack systems with AI integration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
