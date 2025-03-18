import { NextApiRequest, NextApiResponse } from "next";
import { isLoginUser } from "../../../../../../lib/global/getUserFromToken";
import { BB_BASE_URL } from "../../../../../../utils/global/global";
import { methodGuard } from "../../../../../../utils/global/methodNotAllowed";
import prisma from "../../../../../../lib/prisma";
import { formateDateTimeOn } from "../../../../../../utils/global/formating";

const getEventImage = ({ image }) => {
  if (!image) return null;
  if (image.includes("https://")) {
    return image;
  } else {
    return `${BB_BASE_URL}${image}`;
  }
};

const getAthleteFollowerShouts = async ({ athleteId }) => {
  return await prisma.tribeShout
    .findMany({
      where: {
        userId: athleteId,
        isMemberOnly: false,
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
        createdAt: true,
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
        upload_on: formateDateTimeOn({ date: data.createdAt }),
      }))
    );
};

const getAthleteShoutsForLoggedUser = async ({
  athleteId,
  activeTribeId,
  userId,
}) => {
  const isTribeMember = activeTribeId
    ? await prisma.tribeMember.findFirst({
        where: {
          tribeId: activeTribeId,
          userId,
        },
      })
    : false;

  return await prisma.tribeShout
    .findMany({
      where: {
        userId: athleteId,
        ...(isTribeMember ? {} : { isMemberOnly: false }),
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
        createdAt: true,
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
        upload_on: formateDateTimeOn({ date: data.createdAt }),
      }))
    );
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user = await isLoginUser({ req });
    let username = req.query.username as string;

    let getAthlete = await prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        athleteTribes: {
          where: {
            active: true,
          },
        },
      },
    });

    if (!getAthlete) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    let shouts = [];

    if (!user) {
      shouts = await getAthleteFollowerShouts({ athleteId: getAthlete.id });
    } else {
      shouts = await getAthleteShoutsForLoggedUser({
        athleteId: getAthlete.id,
        activeTribeId: getAthlete?.athleteTribes[0]?.tribeId,
        userId: user?.id,
      });
    }

    return res.status(200).json({
      success: true,
      data: shouts,
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
