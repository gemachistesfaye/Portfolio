import { createClient } from "@sanity/client";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { postId, type } = req.body;

  // Validate request payload
  if (!postId || !type) {
    return res.status(400).json({ error: 'Missing postId or type' });
  }

  // Ensure the type is one of the allowed counter fields
  const allowedTypes = ['views', 'likes', 'shares'];
  if (!allowedTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid type parameter' });
  }

  // We require the SANITY_API_TOKEN environment variable to securely connect
  const token = process.env.SANITY_API_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'Server missing SANITY_API_TOKEN' });
  }

  // Initialize the authenticated Sanity client
  const client = createClient({
    projectId: process.env.VITE_SANITY_PROJECT_ID || 'dx08sfs5',
    dataset: process.env.VITE_SANITY_DATASET || 'production',
    apiVersion: '2026-06-16',
    token: token,
    useCdn: false, // Must be false for mutations
  });

  try {
    // Perform the mutation
    const result = await client
      .patch(postId)
      .setIfMissing({ [type]: 0 })
      .inc({ [type]: 1 })
      .commit();

    return res.status(200).json({ success: true, newCount: result[type] });
  } catch (error) {
    console.error("Failed to update Sanity counter:", error);
    return res.status(500).json({ error: 'Failed to update counter' });
  }
}
