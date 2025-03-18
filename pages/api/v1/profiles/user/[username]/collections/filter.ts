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


const Section1NftList = async ({ username }) => {
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
    .then((res) => {
      if (!res || !res.entities.length) return { cards: [], totalResult: 0 };
      
      return Promise.all(
        res.entities[0].majorEnhancements.map(async (data) => {
          let { avatar, ...card } = data;

          return {
            ...card,
            nftImage: getEventImage({ image: card?.cardNFTImage }),
            price: card?.price || res.entities[0]?.price,
            tribe: {
              ...avatar.tribe,
              tribeShortName : `#${avatar?.tribe?.tribeShortName}`,
              tribeLogo: getEventImage({ image: avatar.tribe.tribeLogo }),
            },
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
    let {
        filterType,
        filterValue
    } : {
        filterType : "SortBy" | "Status" | "Filter",
        filterValue : String
    } = req.body

    const getAthlete = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!getAthlete) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const [collections, teams] = await Promise.all([
      Section1NftList({ username }),
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
