import { NextApiRequest, NextApiResponse } from "next";
import {
  BB_BASE_URL,
  cardTyeColorCode,
} from "../../../../../../../utils/global/global";
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

const Section1NftList = async ({ username, user }) => {
  return prisma.user
    .findFirst({
      where: { username },
      select: {
        id: true,
        username: true,
        entities: {
          where: {
            membershipTier: { in: ["BRONZE", "Bronze"] },
            design: { in: ["BASE", "Base"] },
          },
          select: {
            price: true,
            majorEnhancements: {
              select: {
                id: true,
                cardNFTImage: true,
                title: true,
                price: true,
                type: {
                  select: {
                    type: true,
                    subType: true,
                  },
                },
                avatar: {
                  select: {
                    id: true,
                    tribe: {
                      select: {
                        tribeShortName: true,
                        tribeLogo: true,
                      },
                    },
                  },
                },
                nftEntity: {
                  select: {
                    id: true,
                    price: true,
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
            },
          },
        },
      },
    })
    .then((res) => {
      if (!res || !res.entities.length) return { cards: [], totalResult: 0 };
      return Promise.all(
        res.entities[0].majorEnhancements.map(async (data) => {
          let { avatar, cardNFTImage, _count, nftEntity, type, ...card } = data;
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
                          purchaseId: data?.id
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

                        const latestEnhancement = await prisma.nFTMajorEnhancementPurchase.findMany({
                          where: {
                            avatarId: avatar?.id,
                            purchaseId: data?.id
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
                           updatedAt : "desc"
                          },
                        });
                        return {
                          nftMajorEnhancement: {
                            ...resp?.nftMajorEnhancement,
                            title: resp?.nftMajorEnhancement?.title,
                            thumbnail: getEventImage({
                              image: latestEnhancement[0]?.nftMajorEnhancement?.cardNFTImage
                                ? getEventImage({
                                    image: latestEnhancement[0].nftMajorEnhancement.cardNFTImage,
                                  })
                                : resp?.nftMajorEnhancement?.cardNFTImage,
                            }),
                          },
                        };
                      });

                    return baseCard ? {
                      ...data,
                      ...baseCard,
                    } : null;
                  });

                  // Wait for all purchase cards to be processed
                  const resolvedPurchaseCards = await Promise.all(purchaseCardsPromises);
                  // Filter out null values
                  return resolvedPurchaseCards.filter(card => card !== null);
                }),
            ]);

            userHasBaseCard = {
              hasCard: findInNftPurchase.length > 0,
              purchaseCards: findInNftPurchase,
            };
          }

          let totalPrice = card?.price || res.entities[0]?.price;

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

        let avatarBaseCard = await prisma.avatars.findFirst({
          where: {
            id: avatar?.id
          },
          select: {
            majorEnhancements: {
              where: {
                isBaseCard: true
              },
              select: {
                id: true,
                title: true,
                price: true,
                cardNFTImage: true
              }
            }
          }
        }).then(res => {
          if (!res || !res.majorEnhancements || res.majorEnhancements.length === 0) {
            return {
              id: null,
              title: "",
              price: 0,
              thumnail: null
            };
          }

          const { cardNFTImage, ...data } = res.majorEnhancements[0];
          return {
            ...data,
            thumnail: getEventImage({ image: cardNFTImage })
          };
        });

          return {
            ...card,
            nftImage: getEventImage({ image: cardNFTImage }),
            price: Number(totalPrice).toFixed(2),
            tribe: {
              ...avatar.tribe,
              tribeShortName: `#${avatar?.tribe?.tribeShortName}`,
              tribeLogo: getEventImage({ image: avatar.tribe.tribeLogo }),
            },
            hasBaseCard: userHasBaseCard,
            baseCardPrice: res.entities[0]?.price,
            isSoldOut:
              cardType == "BASE CARD"
                ? nftEntity._count.puchaseCards == 0
                : _count.enhancementPurchases == 0,
            cardType: cardType === "BASE CARD" ? "Base Card" : "Enhancement",
            colors:
              cardType == "BASE CARD"
                ? cardTyeColorCode.baseCard
                : cardTyeColorCode.enhancemnetCard,
            cardsAvailable,
            avatarBaseCard
          };
        })
      ).then((cardList) => ({ cards: cardList, totalResult: cardList.length }));
    });
};

const Section2Teams = async ({ username }) => {
  let teamList = await prisma.user
    .findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        athleteTribes: {
          select: {
            tribe: {
              select: {
                tribeId: true,
                tribeLogo: true,
              },
            },
          },
        },
      },
    })
    ?.then((res) =>
      res.athleteTribes?.map((data) => ({
        ...data.tribe,
        tribeLogo: getEventImage({ image: data?.tribe?.tribeLogo }),
      }))
    );

  return teamList;
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
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const [collections, teams] = await Promise.all([
      Section1NftList({ username, user }),
      Section2Teams({ username }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        collections,
        teams,
      },
      message: `Cards Loaded SuccessFully`,
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
