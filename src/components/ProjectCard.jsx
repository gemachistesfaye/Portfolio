import { ExternalLink, Github } from "lucide-react";

const ProjectCard = ({ project, onSelect, showCaseStudyLink = true }) => {
  return (
    <div className="group relative rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 backdrop-blur-md overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl hover:border-indigo-500/40 dark:hover:border-indigo-500/40 hover:bg-slate-50 dark:hover:bg-zinc-900/90 text-slate-900 dark:text-white flex flex-col justify-between">
      {/* Subtle Ambient Hover Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        <div className={`relative h-48 sm:h-52 bg-slate-100 dark:bg-zinc-950 overflow-hidden`}>
          <img
            src={project.image}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent dark:from-[#09090b] dark:via-zinc-950/40 opacity-80" />

          <div className="absolute top-3.5 right-3.5 px-3 py-1 bg-white/90 dark:bg-zinc-950/80 backdrop-blur-md rounded-full border border-slate-200/80 dark:border-white/[0.08] shadow-sm">
            <span className="text-[10px] font-bold text-slate-800 dark:text-zinc-300 tracking-wide">{project.category}</span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
              {project.name}
            </h3>
          </div>
          <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
            {project.role}
          </p>

          <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mb-5">
            {project.problem}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[10px] font-medium rounded-md bg-slate-100 dark:bg-zinc-950/70 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-800"
              >
                {t}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2.5 py-1 text-[10px] font-medium rounded-md bg-slate-100 dark:bg-zinc-950/70 text-slate-500 dark:text-zinc-500 border border-slate-200 dark:border-zinc-800">
                +{project.tags.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-0">
        <div className="flex items-center gap-2">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-sm hover:scale-[1.02]"
            >
              <ExternalLink size={12} />
              Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-zinc-800/80 hover:bg-slate-200 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-700/60 hover:border-indigo-500/40 text-slate-700 dark:text-zinc-200 hover:text-slate-900 dark:hover:text-white text-xs font-medium rounded-lg transition-all duration-200"
            >
              <Github size={12} />
              Code
            </a>
          )}
          {showCaseStudyLink && project.slug && (
            <button
              onClick={() => onSelect?.(project.slug)}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-zinc-800/80 hover:bg-slate-200 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-700/60 hover:border-indigo-500/40 text-slate-700 dark:text-zinc-200 hover:text-slate-900 dark:hover:text-white text-xs font-medium rounded-lg transition-all duration-200"
            >
              Case Study
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
