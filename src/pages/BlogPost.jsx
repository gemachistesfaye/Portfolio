import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Helmet } from "react-helmet-async";
import {
  getPostBySlug,
  urlFor,
  urlForPreview,
  incrementViews,
  incrementLikes,
  incrementShares,
} from "../lib/sanity";

const HeartIcon = ({ filled }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "#ef4444" : "none"} stroke={filled ? "#ef4444" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ShareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPostBySlug(slug)
      .then((p) => {
        if (!p) setError("Post not found.");
        else {
          setPost(p);
          setLikeCount(p.likes || 0);
          setShareCount(p.shares || 0);
          setViewCount(p.views || 0);
          setLiked(localStorage.getItem(`liked_${p._id}`) === "true");
        }
      })
      .catch(() => setError("Failed to load post."))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    const viewedKey = `viewed_${post._id}`;
    if (!localStorage.getItem(viewedKey)) {
      incrementViews(post._id)
        .then(() => setViewCount((v) => v + 1))
        .catch(() => {});
      localStorage.setItem(viewedKey, "true");
    }
  }, [post]);

  const handleLike = () => {
    if (!post || liked) return;
    incrementLikes(post._id)
      .then(() => {
        setLiked(true);
        setLikeCount((c) => c + 1);
        localStorage.setItem(`liked_${post._id}`, "true");
      })
      .catch(() => {});
  };

  const handleShare = () => {
    if (!post) return;
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    incrementShares(post._id)
      .then(() => setShareCount((c) => c + 1))
      .catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="w-10 h-10 border-[3px] border-[#5a9a7a] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[#a09890]">Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#f0ebe4] to-[#ebe5dc] flex items-center justify-center shadow-sm border border-[#e0d9cf]">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#5a9a7a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"/>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#3d3833] mb-2">Post Not Found</h2>
          <p className="text-[#8a837d] text-base">
            This article doesn't exist yet or has been moved.
          </p>
        </div>
        <Link
          to="/blog"
          className="mt-4 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#5a9a7a] to-[#3d7a5a] rounded-full shadow-lg shadow-[#5a9a7a]/20 hover:shadow-[#5a9a7a]/40 hover:scale-105 transition-all duration-300 no-underline"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Browse All Posts
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Gemachis Tesfaye</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.coverImage && (
          <meta property="og:image" content={urlFor(post.coverImage)} />
        )}
      </Helmet>

      <article>
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#8a837d] hover:text-[#5a9a7a] mb-8 no-underline transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          All Posts
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <time className="text-sm font-semibold text-[#5a9a7a] uppercase tracking-wider">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="text-[#d4c9ba]">·</span>
            <span className="flex items-center gap-1.5 text-sm text-[#a09890]">
              <EyeIcon /> {viewCount} views
            </span>
            <span className="text-[#d4c9ba]">·</span>
            <span className="flex items-center gap-1.5 text-sm text-[#a09890]">
              <HeartIcon filled={false} /> {likeCount} likes
            </span>
            <span className="text-[#d4c9ba]">·</span>
            <span className="flex items-center gap-1.5 text-sm text-[#a09890]">
              <ShareIcon /> {shareCount} shares
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#3d3833] mb-5 leading-tight tracking-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-lg text-[#8a837d] leading-relaxed border-l-4 border-[#5a9a7a]/30 pl-5">
              {post.excerpt}
            </p>
          )}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
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
        </header>

        {post.coverImage && (
          <div className="rounded-2xl overflow-hidden mb-12 border border-[#e8e2da] shadow-sm">
            <img
              src={urlForPreview(post.coverImage, 1200)}
              alt={post.title}
              loading="lazy"
              className="w-full h-auto"
            />
          </div>
        )}

        <div className="blog-prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="mt-12 flex items-center gap-4">
          <button
            onClick={handleLike}
            disabled={liked}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
              liked
                ? "bg-red-50 text-red-500 border-red-200 cursor-default"
                : "bg-white text-[#3d3833] border-[#e8e2da] hover:border-red-300 hover:text-red-500 hover:bg-red-50 cursor-pointer"
            }`}
          >
            <HeartIcon filled={liked} />
            {liked ? "Liked" : "Like"} ({likeCount})
          </button>

          <div className="relative">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-[#3d3833] border border-[#e8e2da] hover:border-[#5a9a7a] hover:text-[#5a9a7a] hover:bg-[#5a9a7a]/5 transition-all duration-300 cursor-pointer"
            >
              <ShareIcon />
              Share ({shareCount})
            </button>
            {copied && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#3d3833] text-white text-xs rounded-lg whitespace-nowrap">
                Copied!
              </span>
            )}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#e8e2da]">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[#5a9a7a] font-semibold hover:underline no-underline text-base"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Read more posts
          </Link>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
