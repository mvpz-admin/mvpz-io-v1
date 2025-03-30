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

    const users = await prisma.tribeShout.findMany({
        
    })


   let response =  await Promise.all(users.map(async (post) => {
    let getUser = await prisma.user.findUnique({
      where : {
        id : post.userId,
      }
    })

    if(!getUser){
      // First delete related TShtClap records
      await prisma.tShtClap.deleteMany({
        where: {
          shoutId: post.id
        }
      })
      
      // Then delete the TribeShout
      await prisma.tribeShout.delete({
        where : {
          id : post.id,
        }
      })
    }
    
    }))

    // Return success response with created items
    return res.status(201).json({
      message: "updated Tribes",
      data: response,
    });

  } catch (error) {
    console.error("Error creating XP system items:", error);
    return res.status(500).json({ 
      error: "Failed to create XP system items",
      details: error instanceof Error ? error.message : "Unknown error occurred"
    });
  }
}
