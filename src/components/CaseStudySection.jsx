const CaseStudySection = ({ title, icon, children, id }) => {
  return (
    <section id={id} className="py-8">
      <div className="flex items-center gap-3 mb-5">
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700/60 flex items-center justify-center text-orange-600 dark:text-orange-400 flex-shrink-0">
            {icon}
          </div>
        )}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h2>
      </div>
      <div className="text-slate-600 dark:text-zinc-400 leading-relaxed">
        {children}
      </div>
    </section>
  );
};

export default CaseStudySection;
