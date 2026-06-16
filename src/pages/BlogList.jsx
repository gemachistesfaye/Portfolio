import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllPosts, urlFor } from "../lib/sanity";

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
      .catch(() => setShowEmpty(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="w-10 h-10 border-[3px] border-[#5a9a7a] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[#a09890]">Loading posts...</p>
      </div>
    );
  }

  if (showEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-6">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#f0ebe4] to-[#ebe5dc] flex items-center justify-center shadow-sm border border-[#e0d9cf]">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#5a9a7a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"/>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#3d3833] mb-3">Blog Coming Soon</h2>
          <p className="text-[#8a837d] text-base max-w-md leading-relaxed">
            I'm working on some exciting articles about web development, AI, and building scalable applications. Stay tuned!
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <div className="w-2 h-2 rounded-full bg-[#5a9a7a] animate-pulse" />
          <span className="text-sm font-medium text-[#b5aea5] uppercase tracking-wider">Coming Soon</span>
          <div className="w-2 h-2 rounded-full bg-[#5a9a7a] animate-pulse" />
        </div>
        <a
          href="/"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#5a9a7a] to-[#3d7a5a] rounded-full shadow-lg shadow-[#5a9a7a]/20 hover:shadow-[#5a9a7a]/40 hover:scale-105 transition-all duration-300 no-underline"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Back to Portfolio
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-[#3d3833] mb-3 tracking-tight">
          Blog
        </h1>
        <p className="text-lg text-[#8a837d]">
          Thoughts on development, AI, and building things.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-[#5a9a7a] to-[#3d7a5a] rounded-full mt-5" />
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post._id}
            to={`/blog/${post.slug.current}`}
            className="group block bg-[#fffcf8] rounded-2xl overflow-hidden border border-[#e8e2da] hover:border-[#5a9a7a]/40 shadow-sm hover:shadow-xl hover:shadow-[#5a9a7a]/5 transition-all duration-400 no-underline translate-y-0 hover:-translate-y-1"
          >
            {post.coverImage && (
              <div className="aspect-video overflow-hidden bg-[#f0ebe4]">
                <img
                  src={urlFor(post.coverImage)}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            )}
            {!post.coverImage && (
              <div className="aspect-video bg-gradient-to-br from-[#f0ebe4] to-[#ebe5dc] flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d4c9ba" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"/>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <time className="text-xs font-semibold text-[#5a9a7a] uppercase tracking-wider">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
              <h2 className="text-lg font-bold text-[#3d3833] mb-2 group-hover:text-[#5a9a7a] transition-colors duration-300 leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-[#8a837d] line-clamp-2 mb-5 leading-relaxed">
                {post.excerpt}
              </p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-[#f0ebe4] text-[#6b8a74] rounded-full border border-[#e0d9cf]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
