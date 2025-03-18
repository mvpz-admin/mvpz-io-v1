import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { methodGuard } from "../../../../utils/global/methodNotAllowed";
import { BB_BASE_URL } from "../../../../utils/global/global";
import { isLoginUser } from "../../../../lib/global/getUserFromToken";
import { formatNumber } from "../../../../utils/global/formating";

const getEventImage = ({ image }) => {
  if (!image) return null;
  if (image.includes("https://")) {
    return image;
  } else {
    return `${BB_BASE_URL}${image}`;
  }
};

const Section1GetSearchList = async () => {
  const getTopAthletes = async () => {
    const topAthletes = await prisma.user
      .findMany({
        where: {
          role: "Athlete",
        },
        select: {
          id: true,
          name: true,
          username: true,
          profileImage: true,
          isVerified: true,
          _count: {
            select: {
              followers: true,
            },
          },
        },
        orderBy: {
          followers: {
            _count: "desc",
          },
        },
        take: 5,
      })
      ?.then((res) =>
        res.map((data, idx) => {
          return {
            thumbnail: getEventImage({ image: data.profileImage }),
            title: data?.name,
            isVerified: data?.isVerified,
            subtitle1: data?.username,
            subtitle2: `${formatNumber(data?._count?.followers)} Followers`,
            url: `/a/${data.username}`,
          };
        })
      );

      return topAthletes
  };

  const getTopTribes = async () => {
    let topTribes = await prisma.tribe
      .findMany({
        select: {
          id: true,
          tribeId: true,
          tribeLogo: true,
          tribeName: true,
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
        take: 5,
      })
      .then((res) =>
        res.map((data) => ({
          thumbnail: getEventImage({ image: data.tribeLogo }),
          title: data?.tribeName,
          isVerified: false,
          subtitle1: data?.tribeId,
          subtitle2: `${formatNumber(data?._count?.members)} Members`,
          url: `/t/${data.tribeId}`,
        }))
      );

    return topTribes;
  };

  let [topAthletes, topTribes] = await Promise.all([
    getTopAthletes(),
    getTopTribes(),
  ]);
  return { topAthletes, topTribes };
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user = await isLoginUser({ req });

    let [defaultSearchList] = await Promise.all([Section1GetSearchList()]);

    return res.status(200).json({
      success: true,
      data: {
        defaultSearchList,
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
