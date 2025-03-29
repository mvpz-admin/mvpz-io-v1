import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

// Create XP Stage
const createXpStage = async () => {
  const stage = await prisma.xPStage.create({
    data: {
      name: "Stage 1",
      order: 1,
      description: "Initial stage for new users",
    },
  });
  return stage;
};

// Create XP Types
const createXpTypes = async (stageId: string) => {
  const xpTypes = await prisma.xPType.createMany({
    data: [
      {
        name: "Complete profile",
        description: "Earn XP by completing your profile information",
        xpValue: 5,
        limit: 1,
        stageId: stageId,
      },
      {
        name: "Create card",
        description: "Earn XP by creating your first card",
        xpValue: 15,
        limit: 1,
        stageId: stageId,
      },
      {
        name: "Make a post",
        description: "Earn XP by creating posts",
        xpValue: 5,
        limit: 50,
        stageId: stageId,
      },
      {
        name: "Share card",
        description: "Earn XP by sharing cards with others",
        xpValue: 10,
        limit: 1000,
        stageId: stageId,
      },
      {
        name: "Refer a friend",
        description: "Earn XP by referring new friends to the platform",
        xpValue: 25,
        limit: 1000,
        stageId: stageId,
      },
    ],
  });
  return xpTypes;
};

// Create XP Reward
const createReward = async (stageId: string) => {
  const reward = await prisma.xPReward.create({
    data: {
      name: "Free Card",
      description: "Get a free collectible card",
      xpRequired: 50,
      stageId: stageId,
    },
  });
  return reward;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Create stage first
    const stage = await createXpStage();

    // Create all XP types for the stage
    const xpTypes = await createXpTypes(stage.id);

    // Then create XP type and reward linked to the stage
    const [xpType, reward] = await Promise.all([
      createXpTypes(stage.id),
      createReward(stage.id),
    ]);

    // Return success response with created items
    return res.status(201).json({
      message: "XP system items created successfully",
      data: {
        stage,
        xpTypes,
        xpType,
        reward,
      },
    });

  } catch (error) {
    console.error("Error creating XP system items:", error);
    return res.status(500).json({ 
      error: "Failed to create XP system items",
      details: error instanceof Error ? error.message : "Unknown error occurred"
    });
  }
}
