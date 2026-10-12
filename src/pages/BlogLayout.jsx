import { Outlet, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const BlogLayout = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-zinc-100 font-sans transition-colors duration-300">
      <Helmet>
        <link rel="alternate" type="application/rss+xml" title="Gemachis Tesfaye Blog" href="/rss.xml" />
      </Helmet>
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#09090b]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/blog"
            className="flex items-center gap-2.5 no-underline"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-orange-500/20">
              GT
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-zinc-100 tracking-tight">
              Gemachis T.
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-orange-500" />}
            </button>
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm"
            >
              <ArrowLeft size={13} />
              Portfolio
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs text-slate-500 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} Gemachis Tesfaye. Engineering insights, architectures & AI systems.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BlogLayout;
