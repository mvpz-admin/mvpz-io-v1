import { NextApiRequest, NextApiResponse } from "next";
import { BB_BASE_URL } from "../../../../../../../utils/global/global";
import prisma from "../../../../../../../lib/prisma";
import { isLoginUser } from "../../../../../../../lib/global/getUserFromToken";
import { methodGuard } from "../../../../../../../utils/global/methodNotAllowed";

const getEventImage = ({ image }) => {
  if (!image) return null;
  if (image.includes("https://")) {
    return image;
  } else {
    return `${BB_BASE_URL}${image}`;
  }
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user = await isLoginUser({ req });
    let username = req.query.username as string;

    const getAthlete = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!getAthlete) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    const userWithCollections = await prisma.user.findFirst({
      where: { username },
      select: {
        id: true,
        purchaseCards: {
          select: {
            majorEnhancementPurchases: {
              select: {
                nftMajorEnhancement: {
                  select: {
                    cardNFTImage: true
                  }
                }
              }
            }
          }
        },
      },
    });

    if (!userWithCollections) {
      return res.status(404).json({
        success: false,
        message: "Collections not found"
      });
    }

    const collections = userWithCollections.purchaseCards?.flatMap(cards =>
      cards.majorEnhancementPurchases.map(enh =>
        getEventImage({ image: enh.nftMajorEnhancement.cardNFTImage })
      )
    ) || [];

    return res.status(200).json({
      success: true,
      data: {
        collections,
      },
      message: "Cards Loaded Successfully",
    });
  } catch (error) {
    console.error("Error fetching collections:", error);
    return res.status(500).json({ 
      success: false,
      message: "Internal Server Error" 
    });
  }
}

// Wrap the handler with methodGuard to allow only GET requests
export default methodGuard({
  allowedMethod: "GET",
  isAuthRequired: false,
  handler,
});
