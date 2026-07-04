export const config = {
  matcher: '/blog/:slug*',
};

// List of known social media / crawler bots
const BOTS = [
  'telegrambot',
  'twitterbot',
  'whatsapp',
  'facebookexternalhit',
  'linkedinbot',
  'pinterest',
  'slackbot',
  'vkshare',
  'skypeuripreview',
  'discordbot',
  'bingbot',
  'yandexbot'
];

export default async function middleware(request) {
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') || '';

  // 1. Only intercept if it's a known bot
  const isBot = BOTS.some(bot => userAgent.toLowerCase().includes(bot));
  
  if (!isBot) {
    // Let real users pass through to the normal React app
    return;
  }

  // 2. Extract the slug from the URL (e.g. /blog/my-post)
  const pathParts = url.pathname.split('/');
  const slug = pathParts[pathParts.length - 1];

  if (!slug || slug === 'blog') {
    return;
  }

  try {
    // 3. Call the Sanity REST API directly
    const projectId = 'dx08sfs5';
    const dataset = 'production';
    const apiVersion = '2021-10-21';
    
    // GROQ query to get the post details, including the resolved cover image URL
    const query = encodeURIComponent(`*[_type == "post" && slug.current == "${slug}"][0]{
      title,
      excerpt,
      "imageUrl": coverImage.asset->url
    }`);

    const sanityUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;
    
    const response = await fetch(sanityUrl);
    const data = await response.json();
    const post = data.result;

    if (!post) {
      // If post doesn't exist, let it pass through
      return;
    }

    // 4. Build the custom HTML strictly for the bot
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>${post.title} - Gemachis T.</title>
        <meta name="description" content="${post.excerpt || 'Read this post on my portfolio.'}">
        
        <!-- Open Graph / Facebook / WhatsApp -->
        <meta property="og:type" content="article">
        <meta property="og:url" content="${request.url}">
        <meta property="og:title" content="${post.title}">
        <meta property="og:description" content="${post.excerpt || 'Read this post on my portfolio.'}">
        ${post.imageUrl ? `<meta property="og:image" content="${post.imageUrl}">` : ''}

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="${request.url}">
        <meta property="twitter:title" content="${post.title}">
        <meta property="twitter:description" content="${post.excerpt || 'Read this post on my portfolio.'}">
        ${post.imageUrl ? `<meta property="twitter:image" content="${post.imageUrl}">` : ''}
      </head>
      <body>
        <h1>${post.title}</h1>
        <p>${post.excerpt || ''}</p>
        <p>Please open this link in a browser to read the full post.</p>
      </body>
      </html>
    `;

    // 5. Return the HTML response instantly
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 's-maxage=86400, stale-while-revalidate',
      },
    });

  } catch (error) {
    console.error('Middleware error fetching from Sanity:', error);
    // If anything fails, fallback to letting Vercel serve the normal app
    return;
  }
}
