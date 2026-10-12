const SectionHeading = ({ label, title, highlight, description }) => {
  return (
    <div className="text-center mb-8 sm:mb-10">
      {label && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700/80 text-slate-700 dark:text-zinc-300 text-xs font-semibold tracking-wider uppercase mb-4">
          <span>{label}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {description && (
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 mt-3 max-w-xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
