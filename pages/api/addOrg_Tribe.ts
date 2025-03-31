import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    console.log("hello");
    

   
    return res.status(200).json({
      success: true,
      message: "Enhancements created successfully",
      data : true,
     
    });
  } catch (error) {
    console.error("Error creating enhancement purchases:", error);
    return res.status(500).json({
      error: "Failed to create enhancement purchases",
      details:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
}
