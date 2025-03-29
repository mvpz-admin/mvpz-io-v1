import { NextApiRequest, NextApiResponse } from "next";
import {
  BB_BASE_URL,
  cardTyeColorCode,
} from "../../../../../../../utils/global/global";
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
              status: "UNASSIGNED",
            },
          },
        },
      },
    },
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
        type: true,
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
            _count: {
              select: {
                puchaseCards: {
                  where: {
                    status: "UNASSIGNED",
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            enhancementPurchases: {
              where: {
                status: "UNASSIGNED",
              },
            },
          },
        },
      },
    })
    .then(async (res) => {
      let { nftEntity, avatar, cardNFTImage, type, _count, ...card } = res;
      let { athlete, ...cardDetails } = nftEntity;

      let userHasBaseCard = null;

      if (user?.id) {
        let [findInNftPurchase] = await Promise.all([
          prisma.nFTPurchaseCard
            .findMany({
              where: {
                nftEntityId: nftEntity?.id,
                currentOwnerId: user?.id,
              },
              select: {
                id: true,
                cardSerialNumber: true,
                serialNumber: true,
              },
            })
            .then(async (res) => {
              // Wait for all promises to resolve
              const purchaseCardsPromises = res.map(async (data) => {
                const baseCard = await prisma.nFTMajorEnhancementPurchase
                  .findFirst({
                    where: {
                      avatarId: avatar?.id,
                      purchaseId: data?.id,
                    },
                    select: {
                      id: true,
                      nftMajorEnhancement: {
                        where: {
                          isBaseCard: true,
                        },
                        select: {
                          id: true,
                          title: true,
                          price: true,
                          cardNFTImage: true,
                        },
                      },
                    },
                  })
                  .then(async (resp) => {
                    if (!resp) return null;

                    const latestEnhancement =
                      await prisma.nFTMajorEnhancementPurchase.findMany({
                        where: {
                          avatarId: avatar?.id,
                          purchaseId: data?.id,
                        },
                        select: {
                          nftMajorEnhancement: {
                            where: {
                              type: {
                                subType: {
                                  not: "TEAM_ADD",
                                },
                              },
                            },
                            select: {
                              cardNFTImage: true,
                              title: true,
                            },
                          },
                        },
                        orderBy: {
                          updatedAt: "desc",
                        },
                      });
                    return {
                      nftMajorEnhancement: {
                        ...resp?.nftMajorEnhancement,
                        title: resp?.nftMajorEnhancement?.title,
                        thumbnail: getEventImage({
                          image: latestEnhancement[0]?.nftMajorEnhancement
                            ?.cardNFTImage
                            ? getEventImage({
                                image:
                                  latestEnhancement[0].nftMajorEnhancement
                                    .cardNFTImage,
                              })
                            : resp?.nftMajorEnhancement?.cardNFTImage,
                        }),
                      },
                    };
                  });

                return baseCard
                  ? {
                      ...data,
                      ...baseCard,
                    }
                  : null;
              });

              // Wait for all purchase cards to be processed
              const resolvedPurchaseCards = await Promise.all(
                purchaseCardsPromises
              );
              // Filter out null values
              return resolvedPurchaseCards.filter((card) => card !== null);
            }),
        ]);

        userHasBaseCard = {
          hasCard: findInNftPurchase.length > 0,
          purchaseCards: findInNftPurchase,
        };
      }

      let totalPrice = card?.price || res.nftEntity?.price;

      let cardType: "BASE CARD" | "ENHANCEMENT CARD" =
        type.subType === "TEAM_ADD" || type.subType === "TEAM_CHANGE"
          ? "BASE CARD"
          : "ENHANCEMENT CARD";

      let cardsAvailable =
        cardType == "BASE CARD"
          ? {
              total: await prisma.nFTPurchaseCard.count({
                where: {
                  nftEntityId: nftEntity.id,
                },
              }),
              available: await prisma.nFTPurchaseCard.count({
                where: {
                  nftEntityId: nftEntity.id,
                  status: "UNASSIGNED",
                },
              }),
            }
          : {
              total: await prisma.nFTMajorEnhancementPurchase.count({
                where: {
                  nftMajorEnhancementId: card.id,
                },
              }),
              available: await prisma.nFTMajorEnhancementPurchase.count({
                where: {
                  nftMajorEnhancementId: card.id,
                  status: "UNASSIGNED",
                },
              }),
            };

      let avatarBaseCard = await prisma.avatars
        .findFirst({
          where: {
            id: avatar?.id,
          },
          select: {
            majorEnhancements: {
              where: {
                isBaseCard: true,
              },
              select: {
                id: true,
                title: true,
                price: true,
                cardNFTImage: true,
              },
            },
          },
        })
        .then((res) => {
          if (
            !res ||
            !res.majorEnhancements ||
            res.majorEnhancements.length === 0
          ) {
            return {
              id: null,
              title: "",
              price: 0,
              thumnail: null,
            };
          }

          const { cardNFTImage, ...data } = res.majorEnhancements[0];
          return {
            ...data,
            thumnail: getEventImage({ image: cardNFTImage }),
          };
        });

      return {
        ...card,
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
          verseion: card?.ver,
        },
        isSoldOut:
          cardType == "BASE CARD"
            ? nftEntity._count.puchaseCards == 0
            : _count.enhancementPurchases == 0,
        hasBaseCard: userHasBaseCard,
        colors:
          cardType == "BASE CARD"
            ? cardTyeColorCode.baseCard
            : cardTyeColorCode.enhancemnetCard,
        cardsAvailable,
        avatarBaseCard,
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
