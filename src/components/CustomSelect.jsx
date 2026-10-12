import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const CustomSelect = ({ name, options, value, onChange, placeholder, required }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative w-full">
      <input type="hidden" name={name} value={value} />
      {required && !value && (
        <input
          type="text"
          required
          className="absolute opacity-0 pointer-events-none w-0 h-0"
          tabIndex={-1}
          aria-hidden="true"
        />
      )}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`w-full px-4 py-3 rounded-xl border text-sm text-left flex items-center justify-between transition-all duration-200 focus:outline-none ${
          open
            ? "border-emerald-500 ring-2 ring-emerald-500/20 bg-white dark:bg-zinc-950"
            : "border-slate-200 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-950/80 hover:border-slate-300 dark:hover:border-zinc-700"
        }`}
      >
        <span
          className={`truncate ${
            selected
              ? "text-slate-900 dark:text-zinc-100 font-medium"
              : "text-slate-400 dark:text-zinc-500"
          }`}
        >
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-slate-400 dark:text-zinc-500 transition-transform duration-200 flex-shrink-0 ${
            open ? "rotate-180 text-emerald-500 dark:text-emerald-400" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full mt-1.5 z-50 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl max-h-56 overflow-y-auto"
        >
          {options.map((opt) => {
            const isSelected = value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-sm text-left flex items-center justify-between transition-colors ${
                  isSelected
                    ? "bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 font-semibold"
                    : "text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800/80"
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <Check size={14} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
