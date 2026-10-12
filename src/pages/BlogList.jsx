import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { PenLine, ArrowLeft, Eye, Heart, Share2 } from "lucide-react";
import { getAllPosts, urlForPreview, urlForBlur } from "../lib/sanity";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEmpty, setShowEmpty] = useState(false);

  useEffect(() => {
    getAllPosts()
      .then((data) => {
        setPosts(data || []);
        if (!data || data.length === 0) setShowEmpty(true);
      })
      .catch((err) => {
        console.error("Sanity fetch error:", err);
        setShowEmpty(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="w-10 h-10 border-[3px] border-slate-900 dark:border-zinc-100 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-500 dark:text-zinc-400">Loading articles...</p>
      </div>
    );
  }

  if (showEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
        <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700/80 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-sm">
          <PenLine size={32} />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
            Articles & Insights Coming Soon
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            I am currently writing articles exploring full-stack engineering, offline-first PWAs, AI product design, and real-world system architecture.
          </p>
        </div>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white rounded-xl shadow-sm transition-all duration-200"
        >
          <ArrowLeft size={16} />
          Return to Portfolio
        </a>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Blog | Gemachis Tesfaye</title>
        <meta name="description" content="Thoughts on software engineering, web architectures, and AI systems by Gemachis Tesfaye." />
        <meta property="og:title" content="Blog | Gemachis Tesfaye" />
        <meta property="og:description" content="Thoughts on software engineering, web architectures, and AI systems." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
          Engineering Blog
        </h1>
        <p className="text-base text-slate-600 dark:text-zinc-400">
          Articles on scalable web architectures, full-stack development, and practical AI systems.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post._id}
            to={`/blog/${post.slug.current}`}
            className="group block bg-white dark:bg-zinc-900/60 rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 hover:border-orange-500/40 shadow-sm hover:shadow-xl transition-all duration-300 no-underline hover:-translate-y-1"
          >
            {post.coverImage && (
              <div className="aspect-video overflow-hidden bg-slate-100 dark:bg-zinc-950 relative">
                <img
                  src={urlForBlur(post.coverImage)}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-lg scale-110"
                  aria-hidden="true"
                />
                <img
                  src={urlForPreview(post.coverImage, 800)}
                  alt={post.title}
                  loading="lazy"
                  className="relative w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-6">
              <time className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider block mb-2">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200 leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-zinc-950 text-slate-700 dark:text-zinc-300 rounded-md border border-slate-200 dark:border-zinc-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80 text-xs text-slate-500 dark:text-zinc-500">
                <span className="flex items-center gap-1">
                  <Eye size={13} />
                  {post.views || 0}
                </span>
                <span className="flex items-center gap-1">
                  <Heart size={13} />
                  {post.likes || 0}
                </span>
                <span className="flex items-center gap-1">
                  <Share2 size={13} />
                  {post.shares || 0}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
