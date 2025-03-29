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

const getCardHistory = async ({ cardId, user }) => {
  const cardHistory = await prisma.nFTPurchaseCard
    .findFirst({
      where: {
        id: cardId,
      },
      select: {
        id: true,
        nftEntity: {
          select: {
            id: true,
            majorEnhancements: {
              where: {
                enhancementPurchases: {
                  some: {
                    purchase: {
                      currentOwnerId: user?.id
                    }
                  }
                }
              },
              orderBy: {
                ver: 'asc'
              },
              select: {
                id: true,
                title: true,
                description: true,
                cardNFTImage: true,
                ver: true,
                createdAt: true,
                enhancementPurchases: {
                  where: {
                    purchase: {
                      currentOwnerId: user?.id
                    }
                  },
                  select: {
                    id: true,
                    createdAt: true
                  }
                }
              }
            }
          }
        }
      }
    })
    .then((res) => {
      if (!res?.nftEntity?.majorEnhancements) return [];

      const allEnhancements = res.nftEntity.majorEnhancements || [];
      const sortedEnhancements = [...allEnhancements].sort((a, b) => a.ver - b.ver);

      return sortedEnhancements.map(enhancement => ({
        id: enhancement.id,
        type: enhancement.ver === 1 ? 'Base Card' : 
              enhancement.ver === sortedEnhancements.length ? 'Final Minted Card' : 
              `Enhancement ${enhancement.ver - 1}`,
        date: enhancement.createdAt,
        image: getEventImage({ image: enhancement.cardNFTImage }),
        description: enhancement.description,
        version: enhancement.ver,
        isOwned: true,
        purchaseDate: enhancement.enhancementPurchases[0]?.createdAt || null
      }));
    });

  return cardHistory;
};

const Section1CardDetails = async ({ cardId, user }) => {
  let cardData = await prisma.nFTPurchaseCard
    .findFirst({
      where: {
        id: cardId,
      },
      select: {
        id: true,
        nftEntity: {
          select: {
            id: true,
            title: true,
            description: true,
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
            avatars: {
              select: {
                id: true,
                title: true,
                description: true,
                year: true,
                tribe: {
                  select: {
                    tribeLogo: true,
                  },
                },
              },
            },
            majorEnhancements: {
              where: {
                enhancementPurchases: {
                  some: {
                    purchaseId: cardId
                  }
                }
              },
              select: {
                id: true,
                title: true,
                description: true,
                cardNFTImage: true,
                price: true,
                ver: true,
                createdAt: true
              }
            }
          }
        }
      }
    })
    .then(async (res) => {
      if (!res?.nftEntity) return null;

      const { athlete, avatars, majorEnhancements, ...cardDetails } = res.nftEntity;
      const avatar = avatars[0]; // Get the first avatar
      const currentEnhancement = majorEnhancements[0]; // Get the current enhancement

      return {
        purchaseId: res.id,
        ...cardDetails,
        nftImage: getEventImage({ image: currentEnhancement?.cardNFTImage }),
        cardDetails: {
          ...cardDetails,
        },
        athlete: {
          ...athlete,
          profileImage: getEventImage({ image: athlete.profileImage }),
        },
        avatar: {
          thumbnail: getEventImage({ image: avatar?.tribe?.tribeLogo }),
          title: avatar?.title,
          year: avatar?.year,
          edition: "G1E1",
          version: currentEnhancement?.ver,
        },
      };
    });

  return cardData;
};

const Section2CardList = async ({ cardId, user }) => {
  const enhCards = await prisma.nFTPurchaseCard
    .findFirst({
      where: {
        id: cardId,
      },
      select: {
        id: true,
        nftEntity: {
          select: {
            majorEnhancements: {
              where: {
                enhancementPurchases: {
                  some: {
                    purchase: {
                      currentOwnerId: user?.id
                    }
                  }
                }
              },
              select: {
                id: true,
                cardNFTImage: true,
                enhancementPurchases: {
                  where: {
                    purchase: {
                      currentOwnerId: user?.id
                    }
                  },
                  select: {
                    id: true,
                    purchase: {
                      select: {
                        id: true,
                        currentOwnerId: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })
    .then((res) => {
      if (!res?.nftEntity?.majorEnhancements) {
        return [];
      }

      return res.nftEntity.majorEnhancements.map((majorEnhancement) => ({
        id: majorEnhancement.id,
        nftImage: getEventImage({ image: majorEnhancement.cardNFTImage }),
        selected: majorEnhancement.enhancementPurchases.some(purchase => purchase.purchase.id === res.id),
        isOwned: true // Since we're only getting purchased enhancements
      }));
    });

  return {
    cards: enhCards || [],
    totalResult: enhCards?.length || 0,
  };
};


async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user = await isLoginUser({ req });
    let cardId = req.query.cardId as string;

    let [card, relatedCards, cardHistory] = await Promise.all([
      Section1CardDetails({ cardId, user }),
      Section2CardList({ cardId, user }),
      getCardHistory({ cardId, user })
    ]);

    return res.status(200).json({
      success: true,
      data: {
        card,
        relatedCards,
        cardHistory
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
