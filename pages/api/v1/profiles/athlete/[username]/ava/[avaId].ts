import { NextApiRequest, NextApiResponse } from "next";
import { BB_BASE_URL } from "../../../../../../../utils/global/global";
import { isLoginUser } from "../../../../../../../lib/global/getUserFromToken";
import prisma from "../../../../../../../lib/prisma";
import { methodGuard } from "../../../../../../../utils/global/methodNotAllowed";
import { formatName } from "../../../../../../../utils/global/formating";

const getEventImage = ({ image }) => {
  if (!image) return null;
  return image.includes("https://") ? image : `${BB_BASE_URL}${image}`;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user = await isLoginUser({ req });
    let avaId = req.query.avaId as string;

    prisma.avatars
      .findFirst({
        where: { id: avaId },
        select: {
          title: true,
          tribe: {
            select: {
              tribeLogo: true,
              tribeHorizontalBanner: true,
            },
          },
          nftEntity: {
            select: {
              price: true,
              athlete: {
                select: {
                  id: true,
                  name: true,
                  username: true,
                  profileImage: true,
                  bannerImage: true,
                  socialLinks: true,
                  isVerified: true,
                },
              },
              majorEnhancements: {
                select: {
                  id: true,
                  cardNFTImage: true,
                  title: true,
                  price: true,
                  avatar: {
                    select: {
                      tribe: {
                        select: {
                          tribeShortName: true,
                          tribeLogo: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      })
      .then((getAthlete) => {
        if (!getAthlete) {
          return res.status(404).json({ error: "Athlete not found" });
        }

        const collections = {
          cards: getAthlete.nftEntity.majorEnhancements.map(({ avatar, cardNFTImage, ...card }) => ({
            ...card,
            nftImage: getEventImage({ image: cardNFTImage }),
            price: card.price || getAthlete.nftEntity.price,
            tribe: {
              ...avatar.tribe,
              tribeShortName: `#${avatar?.tribe?.tribeShortName}`,
              tribeLogo: getEventImage({ image: avatar.tribe.tribeLogo }),
            },
          })),
          totalResult: getAthlete.nftEntity.majorEnhancements.length,
        };

        res.status(200).json({
          success: true,
          data: {
            title: `${formatName({ fullName: getAthlete.nftEntity.athlete.name }).firstName}'s ${getAthlete.title} Collections`,
            athlete: {
              ...getAthlete.nftEntity.athlete,
              profileImage: getEventImage({ image: getAthlete.nftEntity.athlete.profileImage }),
              bannerImage: getEventImage({ image: getAthlete.tribe?.tribeHorizontalBanner }),
            },
            collections,
          },
          message: "Home Loaded Successfully",
        });
      })
      .catch((error) => {
        console.error("Error fetching athlete:", error);
        res.status(500).json({ error: "Internal Server Error" });
      });

  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Wrap the handler with methodGuard to allow only GET requests
export default methodGuard({
  allowedMethod: "GET",
  isAuthRequired: false,
  handler,
});
