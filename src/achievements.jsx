import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Award, ExternalLink, X } from "lucide-react";
import { achievements } from "./data";
import SectionHeading from "./components/SectionHeading";

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
    <section id="achievements" className="py-28 px-6 bg-[#060a13]">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className={`opacity-0 ${inView ? 'animate-slide-up' : ''}`}>
          <SectionHeading
            label="Credentials"
            title="Professional"
            highlight="Credentials"
            description="Bootcamps, training programs, and certifications that have strengthened my software engineering, AI, and product development expertise."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((item, i) => (
            <div
              key={item.title}
              className={`group p-5 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220] shadow-sm hover:shadow-lg hover:border-accent/40 transition-all duration-500 opacity-0 ${inView ? 'animate-slide-up' : ''}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                    <Award size={16} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.year} &bull; {item.org}</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                {item.description}
              </p>
              {item.proofFile && (
                <button
                  onClick={() => setCertImage(item)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent hover:text-accent-hover transition-colors"
                >
                  <ExternalLink size={11} />
                  View Certificate
                </button>
              )}
            </div>
          ))}
        </div>
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
    </section>
  );
};

export default Achievements;
