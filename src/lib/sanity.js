import { createClient } from "@sanity/client";

const projectId = process.env.REACT_APP_SANITY_PROJECT_ID || "dx08sfs5";
const dataset = process.env.REACT_APP_SANITY_DATASET || "production";

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-06-16",
  useCdn: true,
});

export async function getAllPosts() {
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      coverImage,
      tags,
      publishedAt
    }
  `);
  return posts;
}

export async function getPostBySlug(slug) {
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
      publishedAt
    }
  `,
    { slug }
  );
  return post;
}

export function urlFor(source) {
  if (!source?.asset?._ref) return "";
  const [, id, dimension, format] = source.asset._ref.split("-");
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimension}.${format}`;
}

export default client;
