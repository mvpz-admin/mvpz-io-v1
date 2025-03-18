import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    const { data } = await axios.get(`https://opengraph.io/api/1.1/site/${encodeURIComponent(url)}?app_id=YOUR_OPENGRAPH_API_KEY`);
    
    res.status(200).json({
      title: data.openGraph.title,
      description: data.openGraph.description,
      image: data.openGraph.image?.url,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch metadata" });
  }
}
