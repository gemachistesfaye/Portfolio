const TechStackBadge = ({ name, size = "sm" }) => {
  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm"
  };

  return (
    <span className={`${sizes[size]} font-medium rounded-md bg-slate-100 dark:bg-zinc-800/80 text-slate-600 dark:text-zinc-300 border border-slate-200/60 dark:border-zinc-700/60`}>
      {name}
    </span>
  );
};

export default TechStackBadge;
