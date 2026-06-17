import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const BlogLayout = () => {
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.className;
    html.className = "";
    return () => {
      html.className = prev;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f3ee] text-[#3d3833] font-sans">
      <Helmet>
        <link rel="alternate" type="application/rss+xml" title="Gemachis Tesfaye Blog" href="/rss.xml" />
      </Helmet>
      <header className="sticky top-0 z-50 bg-[#f7f3ee]/80 backdrop-blur-xl border-b border-[#e8e2da]">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/blog"
            className="flex items-center gap-2.5 no-underline"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#5a9a7a] to-[#3d7a5a] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[#5a9a7a]/20">
              GT
            </div>
            <span className="text-sm font-bold text-[#3d3833] tracking-tight">
              Gemachis T.
            </span>
          </Link>
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#8a837d] hover:text-[#5a9a7a] transition-colors no-underline px-4 py-2 rounded-full hover:bg-[#5a9a7a]/5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Portfolio
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Outlet />
      </main>

      <footer className="border-t border-[#e8e2da] bg-[#f0ebe4]">
        <div className="max-w-4xl mx-auto px-6 py-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#5a9a7a] to-[#3d7a5a] flex items-center justify-center text-white font-bold text-[10px]">
              GT
            </div>
            <span className="text-sm font-semibold text-[#3d3833]">Gemachis Tesfaye</span>
          </div>
          <p className="text-sm text-[#a09890]">
            Built with React & Sanity CMS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BlogLayout;
