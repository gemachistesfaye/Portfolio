import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Eye, Heart, Share2, Check } from "lucide-react";
import {
  getPostBySlug,
  urlFor,
  urlForPreview,
  incrementViews,
  incrementLikes,
  incrementShares,
} from "../lib/sanity";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        }
      })
      .catch(() => setError("Failed to load post."))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    incrementViews(post._id)
      .then(() => setViewCount((v) => v + 1))
      .catch(() => {});
  }, [post]);

  const handleLike = () => {
    if (!post) return;
    setLikeCount((c) => c + 1);
    incrementLikes(post._id).catch(() => {
      setLikeCount((c) => c - 1);
    });
  };

  const handleShare = async () => {
    if (!post) return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.excerpt || "Check out this post!",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
      incrementShares(post._id)
        .then(() => setShareCount((c) => c + 1))
        .catch(() => {});
    } catch (error) {
      console.log("Share cancelled", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="w-10 h-10 border-[3px] border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-500 dark:text-zinc-400">Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Post Not Found</h2>
        <p className="text-slate-600 dark:text-zinc-400 text-sm">
          This article doesn't exist yet or has been moved.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-600/20 transition-all duration-300"
        >
          <ArrowLeft size={16} />
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

      <article className="max-w-3xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-8 transition-colors"
        >
          <ArrowLeft size={14} />
          All Posts
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-zinc-500 mb-4">
            <time className="font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye size={13} /> {viewCount} views
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Heart size={13} /> {likeCount} likes
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Share2 size={13} /> {shareCount} shares
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed border-l-4 border-emerald-500 pl-4 py-1 mb-6">
              {post.excerpt}
            </p>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 rounded-full border border-slate-200 dark:border-zinc-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {post.coverImage && (
          <div className="rounded-2xl overflow-hidden mb-12 border border-slate-200 dark:border-zinc-800 shadow-md">
            <img
              src={urlForPreview(post.coverImage, 1200)}
              alt={post.title}
              loading="lazy"
              className="w-full h-auto"
            />
          </div>
        )}

        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-zinc-200 leading-relaxed space-y-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-zinc-800 flex items-center gap-4">
          <button
            onClick={handleLike}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 border bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 border-slate-200 dark:border-zinc-800 hover:border-rose-400 hover:text-rose-500 shadow-sm"
          >
            <Heart size={14} className="text-rose-500" />
            Like ({likeCount})
          </button>

          <div className="relative">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-800 hover:border-emerald-500 hover:text-emerald-500 transition-all duration-200 shadow-sm"
            >
              <Share2 size={14} />
              Share ({shareCount})
            </button>
            {copied && (
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-medium rounded-md shadow-md whitespace-nowrap flex items-center gap-1">
                <Check size={12} /> Copied!
              </span>
            )}
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
