const ProjectFilter = ({ categories, active, onChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 justify-center mb-10">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
            active === cat
              ? 'bg-accent text-white shadow-lg shadow-accent/20'
              : 'bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:text-accent hover:bg-accent/10'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilter;
