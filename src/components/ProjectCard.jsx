import { ExternalLink, Github, FileText } from "lucide-react";

const ProjectCard = ({ project, onSelect, showCaseStudyLink = true, compact = false }) => {
  return (
    <div className="group relative rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 backdrop-blur-md overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-slate-50/20 dark:hover:bg-zinc-900/90 text-slate-900 dark:text-white flex flex-col justify-between h-full">
      {/* Subtle Ambient Hover Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        <div className={`relative ${compact ? 'h-32 sm:h-36' : 'h-40 sm:h-44'} bg-stone-100 dark:bg-zinc-950 overflow-hidden`}>
          <img
            project={project.name}
            src={project.image}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent dark:from-[#09090b] dark:via-zinc-950/40 opacity-80" />

          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <div className="px-2.5 py-0.5 bg-white/90 dark:bg-zinc-950/80 backdrop-blur-md rounded-full border border-slate-200/80 dark:border-white/[0.08] shadow-sm">
              <span className="text-[10px] font-bold text-slate-800 dark:text-zinc-300 tracking-wide">{project.category}</span>
            </div>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto p-1.5 rounded-full bg-white/90 dark:bg-zinc-950/80 backdrop-blur-md border border-slate-200/80 dark:border-white/[0.08] text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-zinc-600 shadow-sm transition-all duration-200 hover:scale-110"
                aria-label={`View ${project.name} source code on GitHub`}
                title="View Source Code on GitHub"
              >
                <Github size={12} />
              </a>
            )}
          </div>
        </div>

        <div className={compact ? "p-3.5" : "p-4"}>
          <h3 className={`${compact ? 'text-sm' : 'text-sm sm:text-base'} font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1 mb-1.5`}>
            {project.name}
          </h3>

          <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed line-clamp-2 mb-3">
            {project.problem}
          </p>

          <div className="flex flex-wrap gap-1 mb-3">
            {project.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-100/90 dark:bg-zinc-950/70 text-slate-700 dark:text-zinc-300 border border-slate-200/80 dark:border-zinc-800"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={`${compact ? 'px-4 pb-4' : 'px-5 pb-5'} pt-0`}>
        <div className="flex items-center gap-2">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center gap-1.5 ${compact ? 'px-2.5 py-1.5' : 'px-3 py-2'} text-xs font-medium rounded-lg border transition-all duration-200 bg-slate-100/90 dark:bg-zinc-800/80 hover:bg-slate-200/90 dark:hover:bg-zinc-700/80 border-slate-200/80 dark:border-zinc-700/60 hover:border-slate-300 dark:hover:border-zinc-600 text-slate-700 dark:text-zinc-200 hover:text-slate-900 dark:hover:text-white shadow-sm`}
            >
              <ExternalLink size={12} className="text-slate-500 dark:text-zinc-400" />
              Live Demo
            </a>
          )}

          {showCaseStudyLink && project.slug ? (
            <button
              onClick={() => onSelect?.(project.slug)}
              className={`flex-1 flex items-center justify-center gap-1.5 ${compact ? 'px-2.5 py-1.5' : 'px-3 py-2'} text-xs font-medium rounded-lg border transition-all duration-200 bg-slate-100/90 dark:bg-zinc-800/80 hover:bg-slate-200/90 dark:hover:bg-zinc-700/80 border-slate-200/80 dark:border-zinc-700/60 hover:border-slate-300 dark:hover:border-zinc-600 text-slate-700 dark:text-zinc-200 hover:text-slate-900 dark:hover:text-white shadow-sm`}
            >
              <FileText size={12} className="text-slate-500 dark:text-zinc-400" />
              Case Study
            </button>
          ) : !project.demo && project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center gap-1.5 ${compact ? 'px-2.5 py-1.5' : 'px-3 py-2'} text-xs font-medium rounded-lg border transition-all duration-200 bg-slate-100/90 dark:bg-zinc-800/80 hover:bg-slate-200/90 dark:hover:bg-zinc-700/80 border-slate-200/80 dark:border-zinc-700/60 hover:border-slate-300 dark:hover:border-zinc-600 text-slate-700 dark:text-zinc-200 hover:text-slate-900 dark:hover:text-white shadow-sm`}
            >
              <Github size={12} className="text-slate-500 dark:text-zinc-400" />
              Source Code
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
