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
            id: true,
            majorEnhancementPurchases: {
              orderBy: {
                nftMajorEnhancement: {
                  ver: 'desc'
                }
              },
              select: {
                id: true,
                nftMajorEnhancementId: true,
                nftMajorEnhancement: {
                  select: {
                    id: true,
                    cardNFTImage: true,
                    title: true,
                    description: true,
                    ver: true,
                    avatar: {
                      select: {
                        id: true,
                        title: true,
                      }
                    }
                  }
                }
              }
            }
          }
        },
      },
    }).then((res) => res?.purchaseCards?.map((card) => ({
      id : card?.id,
      title : card?.majorEnhancementPurchases[0]?.nftMajorEnhancement?.title,
      ver : card?.majorEnhancementPurchases[0]?.nftMajorEnhancement?.ver,
      avatar : card?.majorEnhancementPurchases[0]?.nftMajorEnhancement?.avatar,
      cardImage : getEventImage({ image: card?.majorEnhancementPurchases[0]?.nftMajorEnhancement?.cardNFTImage }),
      count : card?.majorEnhancementPurchases?.length
    })))

    if (!userWithCollections) {
      return res.status(404).json({
        success: false,
        message: "Collections not found"
      });
    }

  

    return res.status(200).json({
      success: true,
      data: {
        collections : userWithCollections,
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
