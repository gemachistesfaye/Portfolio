const ArchitectureDiagram = ({ layers }) => {
  return (
    <div className="my-6">
      <div className="flex flex-col items-center gap-0">
        {layers.map((layer, i) => (
          <div key={layer.name} className="flex flex-col items-center">
            <div className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-sm text-center min-w-[220px]">
              <p className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-0.5">{layer.name}</p>
              <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-zinc-200">{layer.tech}</p>
            </div>
            {i < layers.length - 1 && (
              <div className="flex flex-col items-center">
                <div className="w-px h-3.5 bg-slate-300 dark:bg-zinc-700" />
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-slate-400 dark:border-t-zinc-600" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
