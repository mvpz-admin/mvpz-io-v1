import { NextApiRequest, NextApiResponse } from "next";
import { methodGuard } from "../../../../../../../utils/global/methodNotAllowed";
import { BB_BASE_URL } from "../../../../../../../utils/global/global";
import prisma from "../../../../../../../lib/prisma";
import { isLoginUser } from "../../../../../../../lib/global/getUserFromToken";

const getEventImage = ({ image }) => {
  if (!image) return null;
  if (image.includes("https://")) {
    return image;
  } else {
    return `${BB_BASE_URL}${image}`;
  }
};

const Section1TopAthlete = async ({ tribeId }) => {
  const athletes = await prisma.tribeAthlete
    .findMany({
      where: {
        tribeId,
      },
      select: {
        id: true,
        athlete: {
          select: {
            id: true,
            name: true,
            username: true,
            profileImage: true,
            verticalImage: true,
            isVerified: true,
          },
        },
      },
      take: 8,
    })
    ?.then((res) =>
      res.map((data, idx) => {
        return {
          ...data.athlete,
          tribeId : data.id,
          verticalImage: getEventImage({ image: data.athlete.verticalImage }),
          profileImage: getEventImage({ image: data.athlete.profileImage }),
        };
      })
    );

  return athletes;
};

const Section2EnhCards = async ({ tribeId }) => {
  let enh = await prisma.nFTMajorEnhancement
    .findMany({
      where : {
        avatar : {
          tribeId 
        }
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
    let tribeId = req.query.tribeId as string;

    const tribe = await prisma.tribe.findFirst({
      where: {
        tribeId,
      },
    });

    if (!tribe) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    let [topAthletes, enhCards] = await Promise.all([
      Section1TopAthlete({ tribeId: tribe?.id }),
      Section2EnhCards({ tribeId: tribe?.id }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        topAthletes,
        enhCards,
      },
      message: `Tribe All Loaded SuccessFully`,
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
