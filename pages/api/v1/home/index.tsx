import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { methodGuard } from "../../../../utils/global/methodNotAllowed";
import { BB_BASE_URL } from "../../../../utils/global/global";
import { isLoginUser } from "../../../../lib/global/getUserFromToken";

const getEventImage = ({ image }) => {
  if (!image) return null;
  if (image.includes("https://")) {
    return image;
  } else {
    return `${BB_BASE_URL}${image}`;
  }
};

const Section1EnhCards = async () => {
  let enh = await prisma.nFTMajorEnhancement
    .findMany({
      select: {
        id: true,
        avatarsId: true,
        price: true,
        cardNFTImage: true,
        nftEntity: {
          select: {
            athlete: {
              select: {
                profileImage: true,
                username: true,
                name: true,
                isVerified: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 8,
    })
    ?.then((res) =>
      res.map((data) => ({
        ...data,
        price: data.price || 20,
        cardNFTImage: getEventImage({ image: data.cardNFTImage }),
        nftEntity: {
          ...data.nftEntity,
          athlete: {
            ...data.nftEntity.athlete,
            profileImage: getEventImage({
              image: data.nftEntity.athlete.profileImage,
            }),
          },
        },
      }))
    );

  return enh || [];
};

const Section2Fanzone = async ({ user }) => {
  const shouts = await prisma.tribeShout
    .findMany({
      where: {
        isMemberOnly:false,
        thumbnail: {
          not: null,
        },
      },
      select: {
        id: true,
        thumbnail: true,
        message: true,
        postedBy: {
          select: {
            profileImage: true,
            name: true,
            username: true,
            isVerified: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    })
    .then((res) =>
      res.map((data) => ({
        ...data,
        postedBy: {
          ...data.postedBy,
          profileImage: getEventImage({
            image: data.postedBy.profileImage,
          }),
        },
      }))
    );

  let tribes;

  if (!user) {
    tribes = await prisma.tribe
      .findMany({
        select: {
          id: true,
          tribeId: true,
          tribeLogo: true,
          tribeName: true,
          tribeShortName: true,
          members : true,
          _count: {
            select: {
              athletes: true,
              members: true,
            },
          },
        },
        orderBy: {
          members: {
            _count: "desc",
          },
        },
        take: 10,
      })
      .then((res) =>
        res.map((data) => {
          let {members,...tribeData} = data
          let checkMember  = members.every((member) => member.userId == user?.id)
          return ({
          ...tribeData,
          tribeLogo: getEventImage({ image: tribeData.tribeLogo }),
          isMember : checkMember
        })})
      );
  } else {
    tribes = await prisma.tribe
      .findMany({
        where: {
          members: {
            none: {
              userId: user.id,
            },
          },
        },
        select: {
          id: true,
          tribeId: true,
          tribeLogo: true,
          tribeName: true,
          tribeShortName: true,
          members : true,
          _count: {
            select: {
              athletes: true,
              members: true,
            },
          },
        },
        orderBy: {
          members: {
            _count: "desc",
          },
        },
        take: 10,
      })
      .then((res) =>
        res.map((data) => {
          let {members,...tribeData} = data
          let checkMember  = members.every((member) => member.userId == user?.id)
          return ({
          ...tribeData,
          tribeLogo: getEventImage({ image: tribeData.tribeLogo }),
          isMember : checkMember
        })})
      );
  }

  return {
    shouts,
    tribes,
  };
};

const Section3Leaderboard = async () => {
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

  return { topLeaderboard, trendingLeaderboard };
};

const Section4TopAthlete = async () => {
  const athletes = await prisma.user
    .findMany({
      where: {
        role: "Athlete",
      },
      select: {
        id: true,
        name: true,
        username: true,
        profileImage: true,
        verticalImage: true,
        isVerified: true,
      },
      orderBy: {
        followers: {
          _count: "desc",
        },
      },
      take: 8,
    })
    ?.then((res) =>
      res.map((data, idx) => {
        return {
          ...data,
          verticalImage : getEventImage({ image: data.verticalImage }),
          profileImage: getEventImage({ image: data.profileImage }),
        };
      })
    );

  return athletes;
};

const Section4Cards = async () => {
  let enh = await prisma.nFTMajorEnhancement
    .findMany({
      where: {
        isBaseCard: true,
      },
      select: {
        id: true,
        avatarsId: true,
        price: true,
        cardNFTImage: true,
        nftEntity: {
          select: {
            athlete: {
              select: {
                profileImage: true,
                username: true,
                name: true,
                isVerified: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 8,
    })
    ?.then((res) =>
      res.map((data) => ({
        ...data,
        price: data.price || 20,
        cardNFTImage: getEventImage({ image: data.cardNFTImage }),
        nftEntity: {
          ...data.nftEntity,
          athlete: {
            ...data.nftEntity.athlete,
            profileImage: getEventImage({
              image: data.nftEntity.athlete.profileImage,
            }),
          },
        },
      }))
    );

  return enh || [];
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user = await isLoginUser({ req });

    let [enhCards, fanzone, leaderboard, topAthletes, baseCards] =
      await Promise.all([
        Section1EnhCards(),
        Section2Fanzone({ user }),
        Section3Leaderboard(),
        Section4TopAthlete(),
        Section4Cards(),
      ]);

    return res.status(200).json({
      success: true,
      data: {
        enhCards,
        fanzone,
        leaderboard,
        topAthletes,
        baseCards,
      },
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
  isAuthRequired: false,
  handler,
});
