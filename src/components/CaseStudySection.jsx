const CaseStudySection = ({ title, icon, children, id }) => {
  return (
    <section id={id} className="py-10">
      <div className="flex items-center gap-3 mb-6">
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
            {icon}
          </div>
        )}
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h2>
      </div>
      <div className="text-slate-600 dark:text-slate-400 leading-relaxed">
        {children}
      </div>
    </section>
  );
};

export default CaseStudySection;
