// pages/api/tribe/media/create.ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma"; // Adjust the path to your prisma instance

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Ensure the request method is POST
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Destructure required fields from request body
    const { tribeId, imageUrl, title, description, articleUrl } = req.body;

    // Validate required fields
    if (!tribeId || !imageUrl || !title) {
      return res.status(400).json({ error: "Tribe ID, URL, and title are required" });
    }

    // Create the TribeMedia entry
    const tribeMedia = await prisma.tribeMedia.create({
      data: {
        tribeId,
        imageUrl,
        title,
        description,
        articleUrl,
      },
    
    });

    // Return success response with the created media entry
    return res.status(201).json(tribeMedia);
  } catch (err) {
    console.error("Error creating tribe media:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
