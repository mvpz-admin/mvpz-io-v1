import { NextApiRequest, NextApiResponse } from "next";
import { BB_BASE_URL } from "../../../../../utils/global/global";
import prisma from "../../../../../lib/prisma";
import { formatNumber } from "../../../../../utils/global/formating";
import { isLoginUser } from "../../../../../lib/global/getUserFromToken";
import { methodGuard } from "../../../../../utils/global/methodNotAllowed";

const getEventImage = ({ image }) => {
  if (!image)
    return "https://res.cloudinary.com/dv667zlni/image/upload/v1741115201/user_ox0yse.png";
  if (image.includes("https://")) {
    return image;
  } else {
    return `${BB_BASE_URL}${image}`;
  }
};

const getTopAthletes = async ({ key }) => {
  const topAthletes = await prisma.user
    .findMany({
      where: {
        role: "Athlete",
        OR: [
          { name: { contains: key, mode: "insensitive" } },
          { username: { contains: key, mode: "insensitive" } },
          {
            athleteTribes: {
              some: {
                tribe: {
                  tribeName: { contains: key, mode: "insensitive" },
                  tribeId: { contains: key, mode: "insensitive" },
                  tribeShortName: { contains: key, mode: "insensitive" },
                },
              },
            },
          },
        ],
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

  return topAthletes;
};

const getTribes = async ({ key }) => {
  let topTribes = await prisma.tribe
    .findMany({
      where: {
        OR: [
          { tribeName: { contains: key, mode: "insensitive" } },
          { tribeId: { contains: key, mode: "insensitive" } },
          { tribeShortName: { contains: key, mode: "insensitive" } },
          {
            organisation: {
              name: { contains: key, mode: "insensitive" },
              shortName: { contains: key, mode: "insensitive" },
            },
          },
        ],
      },

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

const getUsers = async ({ key }) => {
  const searchedUser = await prisma.user
    .findMany({
      where: {
        role: "User",
        OR: [
          { name: { contains: key, mode: "insensitive" } },
          { username: { contains: key, mode: "insensitive" } },
        ],
        AND: [{ isMvpzAccount: { not: true } }],
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
    })
    ?.then((res) =>
      res.map((data, idx) => {
        return {
          thumbnail: getEventImage({ image: data.profileImage }),
          title: data?.name,
          isVerified: data?.isVerified,
          subtitle1: data?.username,
          subtitle2: `${formatNumber(data?._count?.followers)} Followers`,
          url: `/p/${data.username}`,
        };
      })
    );

  return searchedUser;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let key = req.query.key as string;

    let [topAthletes, topTribes, searchedUser] = await Promise.all([
      getTopAthletes({ key }),
      getTribes({ key }),
      getUsers({ key }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        topAthletes,
        topTribes,
        searchedUser,
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
