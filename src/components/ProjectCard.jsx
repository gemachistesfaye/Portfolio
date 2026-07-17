import { ExternalLink, Github } from "lucide-react";
import { scrollToSection } from "../utils/scrollTo";

const ProjectCard = ({ project, onSelect, showCaseStudyLink = true }) => {
  return (
    <div className="group relative rounded-3xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220] overflow-hidden transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-accent/10">
      <div className={`relative h-48 sm:h-52 bg-gradient-to-br ${project.gradient || 'from-slate-700 to-slate-900'} overflow-hidden`}>
        <img
          src={project.image}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute top-4 right-4 px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full border border-white/20">
          <span className="text-[10px] font-bold text-white tracking-wide">{project.category}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-accent transition-colors">
            {project.name}
          </h3>
        </div>
        <p className="text-[11px] font-semibold text-accent uppercase tracking-wider mb-2">
          {project.role}
        </p>

        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
          {project.problem}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400"
            >
              {t}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-400">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-semibold rounded-xl transition-all duration-300 shadow-md shadow-accent/20 hover:shadow-accent/40"
          >
            <ExternalLink size={13} />
            Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 border border-slate-200 dark:border-slate-700/50 hover:border-accent/40 hover:bg-accent/10 text-slate-600 dark:text-slate-400 hover:text-accent text-xs font-semibold rounded-xl transition-all duration-300"
          >
            <Github size={13} />
            GitHub
          </a>
          {showCaseStudyLink && project.slug && (
            <button
              onClick={() => onSelect?.(project.slug)}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 border border-slate-200 dark:border-slate-700/50 hover:border-accent/40 hover:bg-accent/10 text-slate-600 dark:text-slate-400 hover:text-accent text-xs font-semibold rounded-xl transition-all duration-300"
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
