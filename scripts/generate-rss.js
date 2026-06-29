const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || "dx08sfs5",
  dataset: process.env.VITE_SANITY_DATASET || "production",
  apiVersion: "2026-06-16",
  useCdn: true,
});

const SITE_URL = "https://gemachistesfaye.github.io/Portfolio";
const SITE_TITLE = "Gemachis Tesfaye | Blog";
const SITE_DESCRIPTION = "Thoughts on web development, AI, and building scalable applications.";

async function generateRSS() {
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      title,
      slug,
      excerpt,
      publishedAt,
      tags
    }
  `);

  const items = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/blog/${post.slug.current}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug.current}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt || ""}]]></description>
      ${(post.tags || []).map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  const fs = require("fs");
  const path = require("path");
  const outputPath = path.join(__dirname, "..", "public", "rss.xml");
  fs.writeFileSync(outputPath, rss, "utf8");
  console.log(`RSS feed generated at ${outputPath} with ${posts.length} posts.`);
}

generateRSS().catch((err) => {
  console.error("Failed to generate RSS feed:", err.message);
  console.log("Generating empty RSS feed...");
  const fs = require("fs");
  const path = require("path");
  const emptyRSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
  </channel>
</rss>`;
  const outputPath = path.join(__dirname, "..", "public", "rss.xml");
  fs.writeFileSync(outputPath, emptyRSS, "utf8");
  console.log("Empty RSS feed generated.");
});
