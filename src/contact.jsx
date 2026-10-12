import { useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Linkedin, Send, ArrowRight, Clock } from "lucide-react";
import config from "./config";
import SectionHeading from "./components/SectionHeading";
import CustomSelect from "./components/CustomSelect";

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [status, setStatus] = useState("idle");
  const [focused, setFocused] = useState(null);
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [size, setSize] = useState("");
  const formLoadTime = useRef(Date.now());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.target));
    try {
      const payload = {
        name: data.name,
        email: data.email,
        projectType: data.projectType || "",
        budget: data.budget || "",
        timeline: data.timeline || "",
        size: data.size || "",
        message: data.message,
        _fb_hp: "",
        _fb_js: formLoadTime.current.toString(),
        _subject: "New Project Inquiry from Portfolio"
      };

      const res = await fetch(config.formbladeContact, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) {
        e.target.reset();
        setProjectType("");
        setBudget("");
        setTimeline("");
        setSize("");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="pt-20 sm:pt-24 pb-16 px-6 relative z-10 border-t border-slate-200/80 dark:border-zinc-800/80">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className={`opacity-0 ${inView ? 'animate-slide-up' : ''}`}>
          <SectionHeading
            title="Let's Build"
            highlight="Something Great"
            description="Have a project idea, question, or want to collaborate? Send me a message and I'll get back to you promptly."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className={`lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 opacity-0 ${inView ? 'animate-slide-right' : ''}`}>
            {[
              { icon: <Mail size={18} />, label: "Email", value: config.email, href: `mailto:${config.email}` },
              { icon: <Phone size={18} />, label: "Phone", value: config.phone, href: `tel:${config.phone}` },
              { icon: <MapPin size={18} />, label: "Location", value: "Harar, Ethiopia", href: null },
            ].map((c, i) => (
              <div
                key={i}
                className="group flex items-center gap-4 p-4 rounded-xl border border-slate-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 backdrop-blur-md hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-slate-50/20 dark:hover:bg-zinc-900/90 shadow-sm transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-zinc-800 border border-slate-200/80 dark:border-zinc-700/80 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
                  {c.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-wider font-semibold mb-0.5">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="text-sm font-semibold text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors truncate block">
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{c.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-3 p-4 rounded-xl border border-slate-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 backdrop-blur-md hover:border-slate-300 dark:hover:border-zinc-700 shadow-sm transition-all duration-300">
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-wider font-semibold mb-0.5">Response Time</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`lg:col-span-3 opacity-0 ${inView ? 'animate-slide-left' : ''}`} style={{ animationDelay: '0.15s' }}>
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 backdrop-blur-md shadow-sm dark:shadow-2xl relative"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 relative z-10">
                <div className="relative">
                  <label htmlFor="name" className="sr-only">Your name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="e.g., Abebe Kebede"
                    required
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none transition-all duration-200 ${
                      focused === "name"
                        ? "border-amber-500/70 ring-2 ring-amber-500/15 bg-white dark:bg-zinc-950"
                        : "border-slate-200/80 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-950/80"
                    }`}
                  />
                </div>
                <div className="relative">
                  <label htmlFor="email" className="sr-only">Your email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="e.g., abebe@example.com"
                    required
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none transition-all duration-200 ${
                      focused === "email"
                        ? "border-amber-500/70 ring-2 ring-amber-500/15 bg-white dark:bg-zinc-950"
                        : "border-slate-200/80 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-950/80"
                    }`}
                  />
                </div>
              </div>

              <div className="mb-4 relative z-30">
                <CustomSelect
                  name="projectType"
                  value={projectType}
                  onChange={setProjectType}
                  placeholder="Project Type"
                  required
                  options={[
                    { value: "webapp", label: "Full-Stack Application / PWA" },
                    { value: "ai", label: "AI Integration / Agent System" },
                    { value: "website", label: "Web Platform / Modern UI" },
                    { value: "api", label: "Backend API & Database Architecture" },
                    { value: "other", label: "Other" },
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 relative z-20">
                <CustomSelect
                  name="budget"
                  value={budget}
                  onChange={setBudget}
                  placeholder="Budget (Optional)"
                  options={[
                    { value: "discuss-later", label: "Discuss Later" },
                    { value: "under-10k", label: "Under 10,000 ETB" },
                    { value: "10k-50k", label: "10,000 - 50,000 ETB" },
                    { value: "50k+", label: "50,000+ ETB" },
                  ]}
                />
                <CustomSelect
                  name="timeline"
                  value={timeline}
                  onChange={setTimeline}
                  placeholder="Timeline (Optional)"
                  options={[
                    { value: "asap", label: "ASAP" },
                    { value: "1month", label: "Within 1 month" },
                    { value: "flexible", label: "Flexible" },
                  ]}
                />
                <CustomSelect
                  name="size"
                  value={size}
                  onChange={setSize}
                  placeholder="Size (Optional)"
                  options={[
                    { value: "small", label: "Small / MVP" },
                    { value: "medium", label: "Medium Scope" },
                    { value: "large", label: "Large Enterprise" },
                  ]}
                />
              </div>

              <div className="mb-4 relative z-10">
                <label htmlFor="message" className="sr-only">Your message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  maxLength={2000}
                  placeholder="Tell me about your project goals and scope..."
                  required
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none transition-all duration-200 resize-none ${
                    focused === "message"
                      ? "border-amber-500/70 ring-2 ring-amber-500/15 bg-white dark:bg-zinc-950"
                      : "border-slate-200/80 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-950/80"
                  }`}
                />
              </div>

              <div className="mb-5 relative z-10">
                <label htmlFor="attachment" className="sr-only">Attachment</label>
                <input
                  id="attachment"
                  type="file"
                  name="attachment"
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs text-slate-700 dark:text-zinc-300 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 dark:file:bg-zinc-800 file:text-slate-800 dark:file:text-zinc-200 hover:file:bg-slate-200 dark:hover:file:bg-zinc-700 focus:outline-none transition-all duration-200 ${
                    focused === "attachment"
                      ? "border-amber-500/70 ring-2 ring-amber-500/15 bg-white dark:bg-zinc-950"
                      : "border-slate-200/80 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-950/80"
                  }`}
                  onFocus={() => setFocused("attachment")}
                  onBlur={() => setFocused(null)}
                />
                <p className="text-[10px] text-slate-500 dark:text-zinc-500 mt-1">Optional — PDF, DOC, or image (max 5MB)</p>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-zinc-500 mb-5 relative z-10">
                Your information is kept private and never shared. I'll only use it to respond to your inquiry.
              </p>

              {status === "sent" && (
                <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <p className="text-sm text-slate-800 dark:text-zinc-200 font-medium">Thanks! I received your project details and will get back to you within 24 hours.</p>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">Something went wrong. Please try again or email me directly.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="group w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white font-semibold rounded-xl transition-all duration-200 text-sm disabled:opacity-50 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
              >
                {status === "sending" ? (
                  "Sending..."
                ) : (
                  <>
                    Send Project Brief
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
