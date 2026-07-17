const TechStackBadge = ({ name, size = "sm" }) => {
  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm"
  };

  return (
    <span className={`${sizes[size]} font-bold uppercase tracking-wider rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400`}>
      {name}
    </span>
  );
};

export default TechStackBadge;
