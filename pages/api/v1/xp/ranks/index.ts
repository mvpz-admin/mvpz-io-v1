import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import { BB_BASE_URL } from "../../../../../utils/global/global";
import { isLoginUser } from "../../../../../lib/global/getUserFromToken";
import { methodGuard } from "../../../../../utils/global/methodNotAllowed";

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
    let user : any= await isLoginUser({ req });

    const topLeaderboard = await prisma.user
    .findMany({
      where: {
        role: "User",
        xp: {
          not: null,
        },
      },
      select: {
        id: true,
        name: true,
        username: true,
        profileImage: true,
        isVerified: true,
        xp: true,
        purchaseCards: {
          select: {
            majorEnhancementPurchases: {
              select: {
                nftMajorEnhancement: {
                  select: {
                    cardNFTImage: true,
                  },
                },
              },
            },
          },
          take: 3,
          orderBy: {
            createdAt: "desc",
          },
        },
        _count: {
          select: {
            purchaseCards: true,
          },
        },
      },
      orderBy: {
        xp: "desc",
      },
    })
    ?.then((res) =>
      res.map((data, idx) => {
        let { purchaseCards, ...user } = data;
        let cards = purchaseCards?.map((purchase) =>
          purchase.majorEnhancementPurchases?.map(
            (enhancement) => enhancement.nftMajorEnhancement.cardNFTImage
          )
        );
        return {
          ...user,
          profileImage: getEventImage({ image: data.profileImage }),
          rank: idx + 1,
          cards,
        };
      })
    );

  const trendingLeaderboard = await prisma.user
    .findMany({
      where: {
        role: "User",
        xp: {
          not: null,
        },
      },
      select: {
        id: true,
        name: true,
        username: true,
        profileImage: true,
        isVerified: true,
        xp: true,
        purchaseCards: {
          select: {
            majorEnhancementPurchases: {
              select: {
                nftMajorEnhancement: {
                  select: {
                    cardNFTImage: true,
                  },
                },
              },
            },
          },
          take: 3,
          orderBy: {
            createdAt: "desc",
          },
        },
        _count: {
          select: {
            purchaseCards: true,
          },
        },
      },
      orderBy: {
        purchaseCards: {
          _count: "desc",
        },
      },
      take: 10,
    })
    ?.then((res) =>
      res.map((data, idx) => {
        let { purchaseCards, ...user } = data;
        let cards = purchaseCards?.map((purchase) =>
          purchase.majorEnhancementPurchases?.map(
            (enhancement) => enhancement.nftMajorEnhancement.cardNFTImage
          )
        );
        return {
          ...user,
          profileImage: getEventImage({ image: data.profileImage }),
          rank: idx + 1,
          cards,
        };
      })
    );


    return res.status(200).json({
      success: true,
      data: { topLeaderboard, trendingLeaderboard },
      message: `Home Loaded SuccessFully`,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Wrap the handler with methodGuard to allow only GET requests
export default methodGuard({
  allowedMethod: "GET",
  isAuthRequired: true,
  handler,
});
