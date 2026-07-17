import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ExternalLink, X } from "lucide-react";
import { achievements } from "./data";

const Achievements = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [certImage, setCertImage] = useState(null);

  useEffect(() => {
    if (certImage) {
      document.body.classList.add("cert-lightbox-open");
    } else {
      document.body.classList.remove("cert-lightbox-open");
    }
    return () => document.body.classList.remove("cert-lightbox-open");
  }, [certImage]);

  useEffect(() => {
    if (!certImage) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") setCertImage(null);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [certImage]);

  return (
    <div ref={ref}>
      <div className={`mb-8 opacity-0 ${inView ? 'animate-slide-up' : ''}`}>
        <p className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-3">Credentials</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Professional <span className="text-gradient">Credentials</span>
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Bootcamps, training programs, and certifications.
        </p>
      </div>

      <div className="space-y-3">
        {achievements.map((item, i) => (
          <div
            key={item.title}
            className={`group p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220] hover:border-accent/40 transition-all duration-300 opacity-0 ${inView ? 'animate-slide-up' : ''}`}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{item.title}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">{item.year}</p>
              </div>
              {item.proofFile && (
                <button
                  onClick={() => setCertImage(item)}
                  className="flex-shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-accent hover:bg-accent/10 transition-colors"
                  aria-label={`View ${item.title} certificate`}
                >
                  <ExternalLink size={13} />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {certImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80"
          onClick={() => setCertImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Certificate image"
        >
          <button
            onClick={() => setCertImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <img
            src={`/Award/${certImage.proofFile}`}
            alt={certImage.title}
            className="w-full h-full max-w-5xl max-h-[85vh] rounded-2xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          <div
            className="hidden max-w-full max-h-[85vh] rounded-2xl shadow-2xl bg-[#0c1220] items-center justify-center p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-slate-400 text-center">Certificate image not available</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievements;
