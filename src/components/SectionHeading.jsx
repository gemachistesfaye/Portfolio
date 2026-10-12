const SectionHeading = ({ label, title, highlight, description }) => {
  return (
    <div className="text-center mb-14 sm:mb-16">
      {label && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wider uppercase mb-4">
          <span>{label}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {description && (
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 mt-3.5 max-w-xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
