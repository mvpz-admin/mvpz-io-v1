import { NextApiRequest, NextApiResponse } from "next";
import { BB_BASE_URL } from "../../../../../../../utils/global/global";
import { isLoginUser } from "../../../../../../../lib/global/getUserFromToken";
import { methodGuard } from "../../../../../../../utils/global/methodNotAllowed";
import prisma from "../../../../../../../lib/prisma";

const getEventImage = ({ image }) => {
  if (!image) return null;
  if (image.includes("https://")) {
    return image;
  } else {
    return `${BB_BASE_URL}${image}`;
  }
};

const checkUserhaseBaseCard = async ({ nftEntityId, userId }) => {
  if (userId) {
    let findInMintPurchase = await prisma.nFTMintCard.findFirst({
      where: {
        nftEntityId: nftEntityId,
        currentOwnerId: userId,
      },
    });

    let findInNftPurchase = await prisma.nFTPurchaseCard.findFirst({
      where: {
        nftEntityId: nftEntityId,
        currentOwnerId: userId,
      },
    });

    return findInMintPurchase?.id || findInNftPurchase?.id;
  }

  return null;
};

const checkCardStatus = async ({ enhId }) => {
  let enhancementCard = await prisma.nFTMajorEnhancement.findFirst({
    where: {
      id: enhId,
    },
    select: {
      nftEntity: {
        select: {
          puchaseCards: {
            where: {
              status: "UNASSIGNED"
            }
          }
        }
      }
    }
  });

  return enhancementCard?.nftEntity?.puchaseCards?.length;
};

const Section1CardDetails = async ({ cardId, user }) => {
  let cardData = await prisma.nFTMajorEnhancement
    .findFirst({
      where: {
        id: cardId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        cardNFTImage: true,
        price: true,
        ver: true,
        avatar: {
          select: {
            id: true,
            tribe: {
              select: {
                tribeLogo: true,
              },
            },
            title: true,
            description: true,
            year: true,
          },
        },
        nftEntity: {
          select: {
            id: true,
            price: true,
            special: true,
            edition: true,
            year: true,
            membershipTier: true,
            design: true,
            designer: true,
            athlete: {
              select: {
                id: true,
                name: true,
                username: true,
                profileImage: true,
                isVerified: true,
              },
            },
          },
        },
      },
    })
    .then(async (res) => {
      let { nftEntity, avatar, cardNFTImage, ...data } = res;
      let { athlete, ...cardDetails } = nftEntity;

      let ifUserHasBaseCard = null;

      const [isUserhaseBaseCard, cardAva] = await Promise.all([
        checkUserhaseBaseCard({
          nftEntityId: nftEntity?.id,
          userId: user?.id,
        }),
        checkCardStatus({
          enhId: cardId,
        }),
      ]);

      ifUserHasBaseCard = isUserhaseBaseCard;
      let totalPrice = data?.price || nftEntity.price


      if(!ifUserHasBaseCard){
        totalPrice += nftEntity?.price
      }

      return {
        ...data,
        price: Number(totalPrice).toFixed(2),
        nftImage: getEventImage({ image: cardNFTImage }),
        cardDetails: {
          ...cardDetails,
        },
        athlete: {
          ...athlete,
          profileImage: getEventImage({ image: athlete.profileImage }),
        },
        avatar: {
          thumbnail: getEventImage({ image: avatar.tribe.tribeLogo }),
          title: avatar.title,
          year: avatar.year,
          edition: "G1E1",
          verseion: data?.ver,
        },
        hasBaseCard : ifUserHasBaseCard,
        cardLeft : cardAva,
        isSoldOut : !ifUserHasBaseCard && cardAva == 0 ? true : false
      };
    });

  return cardData;
};

const Section2CardList = async ({ cardId }) => {
  const enhCards = await prisma.nFTMajorEnhancement
    .findFirst({
      where: {
        id: cardId,
      },
      select: {
        nftEntity: {
          select: {
            majorEnhancements: {
              select: {
                id: true,
                cardNFTImage: true,
              },
            },
          },
        },
      },
    })
    .then((res) => {
      return res.nftEntity.majorEnhancements?.map((majorEnhancement) => ({
        id: majorEnhancement.id,
        nftImage: getEventImage({ image: majorEnhancement.cardNFTImage }),
        selected: majorEnhancement.id == cardId,
      }));
    });

  return {
    cards: enhCards,
    totalResult: enhCards?.length,
  };
};

const Section3OtherCards = async ({ cardId }) => {
  const card = await prisma.nFTMajorEnhancement
    .findFirst({
      where: {
        id: cardId,
      },
      select: {
        avatar: {
          select: {
            id: true,
          },
        },
        nftEntity: {
          select: {
            majorEnhancements: {
              select: {
                avatar: {
                  select: {
                    id: true,
                    title: true,
                    tribe: {
                      select: {
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
    .then((res) => {
      let uniqueAvatars = [];

      const avatars =
        res.nftEntity.majorEnhancements?.map((item) => item.avatar) || [];

      uniqueAvatars = avatars
        .filter(
          (avatar, index, self) =>
            index === self.findIndex((a) => a.id === avatar.id)
        )
        ?.map((ava) => ({
          id: ava?.id,
          title: ava?.title,
          thumbnail: getEventImage({ image: ava?.tribe?.tribeLogo }),
        }));

      return uniqueAvatars;
    });

  return card;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user = await isLoginUser({ req });
    let cardId = req.query.cardId as string;

    let [card, relatedCards, otherAvatars] = await Promise.all([
      Section1CardDetails({ cardId, user }),
      Section2CardList({ cardId }),
      Section3OtherCards({ cardId }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        card,
        relatedCards,
        otherAvatars,
      },
      message: `Card Details Loaded SuccessFully`,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Wrap the handler with methodGuard to allow only GET requests
export default methodGuard({
  allowedMethod: "GET",
  isAuthRequired: false,
  handler,
});
