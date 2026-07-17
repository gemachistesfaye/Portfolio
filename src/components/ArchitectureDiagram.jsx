const ArchitectureDiagram = ({ layers }) => {
  return (
    <div className="my-6">
      <div className="flex flex-col items-center gap-0">
        {layers.map((layer, i) => (
          <div key={layer.name} className="flex flex-col items-center">
            <div className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220] shadow-sm text-center min-w-[200px]">
              <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">{layer.name}</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{layer.tech}</p>
            </div>
            {i < layers.length - 1 && (
              <div className="flex flex-col items-center">
                <div className="w-px h-4 bg-gradient-to-b from-accent/40 to-accent/10" />
                <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-accent/40" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
