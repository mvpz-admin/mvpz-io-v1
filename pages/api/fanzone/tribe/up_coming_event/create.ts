// pages/api/tribe/event/create.ts

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
    const { tribeId, title, description, eventUrl, date } = req.body;

    // Validate required fields
    if (!tribeId || !title || !description || !eventUrl) {
      return res
        .status(400)
        .json({
          error: "Tribe ID, title, description, and event URL are required",
        });
    }

    // Create the TribeEvent entry
    const tribeEvent = await prisma.tribeEvent.create({
      data: {
        tribeId,
        title,
        description,
        eventUrl,
        date,
      },
    });

    // Return success response with the created event entry
    return res.status(201).json(tribeEvent);
  } catch (err) {
    console.error("Error creating tribe event:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
