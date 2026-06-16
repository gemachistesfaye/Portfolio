import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Helmet } from "react-helmet-async";
import { getPostBySlug, urlFor } from "../lib/sanity";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getPostBySlug(slug)
      .then((p) => {
        if (!p) setError("Post not found.");
        else setPost(p);
      })
      .catch(() => setError("Failed to load post."))
      .finally(() => setLoading(false));
  }, [slug]);

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
          <div className="flex items-center gap-3 mb-4">
            <time className="text-sm font-semibold text-[#5a9a7a] uppercase tracking-wider">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
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
              src={urlFor(post.coverImage)}
              alt={post.title}
              className="w-full h-auto"
            />
          </div>
        )}

        <div className="blog-prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
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
