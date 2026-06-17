import { useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Linkedin, Send, Twitter, ArrowRight, Clock } from "lucide-react";
import config from "./config";
import SectionHeading from "./components/SectionHeading";

const FacebookIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const socials = [
  { icon: <Linkedin size={17} />, href: config.socials.linkedin, label: "LinkedIn" },
  { icon: <Twitter size={17} />, href: config.socials.twitter, label: "Twitter" },
  { icon: <FacebookIcon />, href: config.socials.facebook, label: "Facebook" },
  { icon: <Send size={17} />, href: config.socials.telegram, label: "Telegram" },
];

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [status, setStatus] = useState("idle");
  const [focused, setFocused] = useState(null);
  const formLoadTime = useRef(Date.now());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.target));
    try {
      const payload = {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        _fb_hp: "",
        _fb_js: formLoadTime.current.toString(),
        _subject: "New Contact Inquiry from Portfolio"
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
      if (res.ok) e.target.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-28 px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className={`opacity-0 ${inView ? 'animate-slide-up' : ''}`}>
          <SectionHeading
            label="Contact"
            title="Let's Build Something"
            highlight="Together"
            description="Have a project in mind? Tell me about it and I'll get back to you within 24 hours."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className={`lg:col-span-2 space-y-4 opacity-0 ${inView ? 'animate-slide-right' : ''}`}>
            {[
              { icon: <Mail size={18} />, label: "Email", value: config.email, href: `mailto:${config.email}`, color: "from-blue-500 to-indigo-500" },
              { icon: <Phone size={18} />, label: "Phone", value: config.phone, href: config.phoneHref, color: "from-emerald-500 to-teal-500" },
              { icon: <MapPin size={18} />, label: "Location", value: "Adama, Ethiopia", href: null, color: "from-violet-500 to-purple-500" },
            ].map((c, i) => (
              <div
                key={i}
                className="group flex items-center gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220] hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-500"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {c.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400 uppercase tracking-[0.15em] font-semibold mb-0.5">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-accent transition-colors truncate block">
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 truncate">{c.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220]">
              <Clock size={16} className="text-accent flex-shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-[0.15em] font-semibold mb-0.5">Response Time</p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Within 24 hours</p>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em] font-semibold mb-3 pl-1">Find me on</p>
              <div className="flex gap-2">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    aria-label={s.label}
                    className="group/social w-11 h-11 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-accent hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
              <a href={config.socials.telegramCommunity} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-accent/10 hover:bg-accent/20 border border-accent/20 text-accent text-xs font-semibold rounded-xl transition-all duration-300">
                Join my Telegram community
              </a>
            </div>
          </div>

          <div className={`lg:col-span-3 opacity-0 ${inView ? 'animate-slide-left' : ''}`} style={{ animationDelay: '0.15s' }}>
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0c1220] shadow-sm relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

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
                    className={`w-full px-4 py-3.5 rounded-xl border text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all duration-300 ${
                      focused === "name"
                        ? "border-accent/50 ring-4 ring-accent/10 bg-accent/[0.02]"
                        : "border-slate-200 dark:border-slate-700/60 bg-slate-50/80 dark:bg-white/[0.03]"
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
                    className={`w-full px-4 py-3.5 rounded-xl border text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all duration-300 ${
                      focused === "email"
                        ? "border-accent/50 ring-4 ring-accent/10 bg-accent/[0.02]"
                        : "border-slate-200 dark:border-slate-700/60 bg-slate-50/80 dark:bg-white/[0.03]"
                    }`}
                  />
                </div>
              </div>

              <div className="mb-5 relative z-10">
                <label htmlFor="subject" className="sr-only">Subject</label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused(null)}
                    className={`w-full px-4 py-3.5 rounded-xl border text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all duration-300 ${
                    focused === "subject"
                      ? "border-accent/50 ring-4 ring-accent/10 bg-accent/[0.02]"
                      : "border-slate-200 dark:border-slate-700/60 bg-slate-50/80 dark:bg-white/[0.03]"
                    }`}
                />
              </div>

              <div className="mb-5 relative z-10">
                <label htmlFor="message" className="sr-only">Your message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Tell me about your project..."
                  required
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                className={`w-full px-4 py-3.5 rounded-xl border text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all duration-300 resize-none ${
                    focused === "message"
                      ? "border-accent/50 ring-4 ring-accent/10 bg-accent/[0.02]"
                      : "border-slate-200 dark:border-slate-700/60 bg-slate-50/80 dark:bg-white/[0.03]"
                    }`}
                />
              </div>

              {status === "sent" && (
                <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-accent/10 border border-accent/20">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <p className="text-sm text-accent font-medium">Message sent! I'll get back to you within 24 hours.</p>
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
                    className="group w-full py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all duration-300 text-sm disabled:opacity-50 shadow-lg shadow-accent/20 hover:shadow-accent/40 flex items-center justify-center gap-2"
              >
                {status === "sending" ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
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
