const SectionHeading = ({ label, title, highlight, description, id }) => {
  return (
    <div id={id} className="text-center mb-16">
      <p className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-4">
        {label}
      </p>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        {title} <span className="text-gradient">{highlight}</span>
      </h2>
      {description && (
        <p className="text-base text-slate-500 dark:text-slate-400 mt-3 max-w-lg mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
