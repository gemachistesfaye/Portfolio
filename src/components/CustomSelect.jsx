import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const CustomSelect = ({ name, options, value, onChange, placeholder, required }) => {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  const btnStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid",
    borderColor: isDark ? "#334155" : "#e2e8f0",
    backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
    color: isDark ? "#f1f5f9" : "#0f172a",
    fontSize: "14px",
    textAlign: "left",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    outline: "none",
  };

  const menuStyle = {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: "6px",
    zIndex: 9999,
    borderRadius: "12px",
    border: "1px solid",
    borderColor: isDark ? "#334155" : "#e2e8f0",
    backgroundColor: isDark ? "#0f172a" : "#ffffff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
    overflow: "hidden",
    padding: "4px 0",
  };

  return (
    <div ref={ref} className="relative w-full">
      <input type="hidden" name={name} value={value} />
      {required && !value && (
        <input type="text" required className="absolute opacity-0 pointer-events-none w-0 h-0" tabIndex={-1} />
      )}

      <button type="button" onClick={() => setOpen(!open)} style={btnStyle}>
        <span style={{ color: selected ? (isDark ? "#f1f5f9" : "#0f172a") : "#94a3b8" }}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={16} style={{ color: "#94a3b8", flexShrink: 0, transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
      </button>

      {open && (
        <div style={menuStyle}>
          {options.map((opt) => {
            const isSelected = value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false); }}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px 16px",
                  fontSize: "14px",
                  textAlign: "left",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: isSelected ? (isDark ? "rgba(16,185,129,0.15)" : "rgba(16,185,129,0.1)") : "transparent",
                  color: isSelected ? "#10b981" : (isDark ? "#cbd5e1" : "#334155"),
                  fontWeight: isSelected ? 500 : 400,
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = isDark ? "rgba(255,255,255,0.06)" : "#f1f5f9";
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
