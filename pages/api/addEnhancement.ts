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

    let majorEnhancements = await prisma.nFTMajorEnhancement.findMany();

    // Create 50 purchases for each enhancement
    const createdPurchases = await Promise.all(
      majorEnhancements.flatMap(async (enhancement) => {
        // Create array of 50 promises for each enhancement
        const purchasePromises = Array.from({ length: 50 }, () =>
          prisma.nFTMajorEnhancementPurchase.create({
            data: {
              nftMajorEnhancementId: enhancement.id,
              avatarId: enhancement.avatarsId,
              mintId: null,
              purchaseId: null
            }
          })
        );

        return await Promise.all(purchasePromises);
      })
    );

    // Flatten the array of arrays into a single array
    const flattenedPurchases = createdPurchases.flat();

    // Return success response
    return res.status(201).json({
      message: "Enhancement purchases created successfully",
      count: flattenedPurchases.length,
      totalEnhancements: majorEnhancements.length,
      purchasesPerEnhancement: 50,
      purchases: flattenedPurchases
    });

  } catch (error) {
    console.error("Error creating enhancement purchases:", error);
    return res.status(500).json({ 
      error: "Failed to create enhancement purchases",
      details: error instanceof Error ? error.message : "Unknown error occurred"
    });
  }
}
