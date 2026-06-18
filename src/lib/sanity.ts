import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImage } from "../types";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";

if (!projectId && import.meta.env.MODE === "development") {
  console.warn(
    "[Portfolio] VITE_SANITY_PROJECT_ID is not set. Blog features will not work."
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-06-16",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export async function getAllPosts() {
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      coverImage,
      tags,
      publishedAt,
      views,
      likes,
      shares
    }
  `);
  return posts;
}

export async function getPostBySlug(slug: string) {
  const post = await client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      content,
      coverImage,
      tags,
      publishedAt,
      views,
      likes,
      shares
    }
  `,
    { slug }
  );
  return post;
}

export async function incrementViews(postId: string) {
  return client
    .patch(postId)
    .setIfMissing({ views: 0 })
    .inc({ views: 1 })
    .commit();
}

export async function incrementLikes(postId: string) {
  return client
    .patch(postId)
    .setIfMissing({ likes: 0 })
    .inc({ likes: 1 })
    .commit();
}

export async function incrementShares(postId: string) {
  return client
    .patch(postId)
    .setIfMissing({ shares: 0 })
    .inc({ shares: 1 })
    .commit();
}

export function urlFor(source: SanityImage) {
  if (!source?.asset?._ref || !projectId) return "";
  return builder.image(source).auto("format").url();
}

export function urlForPreview(source: SanityImage, width: number = 800) {
  if (!source?.asset?._ref || !projectId) return "";
  return builder.image(source).width(width).auto("format").url();
}

export function urlForBlur(source: SanityImage) {
  if (!source?.asset?._ref || !projectId) return "";
  return builder.image(source).width(20).quality(20).blur(10).url();
}

export default client;
