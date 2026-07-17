import { useInView } from "react-intersection-observer";
import { Github, ExternalLink, GitCommit, GitPullRequest, Star, BookOpen } from "lucide-react";
import SectionHeading from "./components/SectionHeading";
import config from "./config";

const stats = [
  { icon: <GitCommit size={18} />, label: "Regular Commits", desc: "Active development across multiple repositories" },
  { icon: <BookOpen size={18} />, label: "Project Documentation", desc: "README files, setup guides, and architecture docs" },
  { icon: <Star size={18} />, label: "Open Source", desc: "Public repositories with accessible code" },
  { icon: <GitPullRequest size={18} />, label: "Collaborative Development", desc: "Pull requests and team-based workflows" },
];

const GitHubActivity = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="github" className="py-28 px-6">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className={`opacity-0 ${inView ? 'animate-slide-up' : ''}`}>
          <SectionHeading
            label="Development"
            title="Open Source &"
            highlight="Activity"
            description="Active GitHub presence with regular commits, documentation, and public repositories."
          />
        </div>

        <div className={`mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 opacity-0 ${inView ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.15s' }}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="group flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-slate-700/60 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-500"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-accent transition-colors">
                  {stat.label}
                </h3>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-8 text-center opacity-0 ${inView ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.3s' }}>
          <a
            href={config.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0c1220] hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 hover:border-accent/40 text-slate-600 dark:text-slate-300 hover:text-accent font-semibold rounded-xl transition-all duration-300 text-sm"
          >
            <Github size={16} />
            View GitHub Profile
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
