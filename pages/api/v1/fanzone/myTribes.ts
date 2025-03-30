import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { methodGuard } from "../../../../utils/global/methodNotAllowed";
import { BB_BASE_URL } from "../../../../utils/global/global";
import { isLoginUser } from "../../../../lib/global/getUserFromToken";
import { formateDateTimeOn } from "../../../../utils/global/formating";

const getEventImage = ({ image }) => {
  if (!image) return null;
  if (image.includes("https://")) {
    return image;
  } else {
    return `${BB_BASE_URL}${image}`;
  }
};

const Section1MyTribes = async ({ user }) => {
  const tribes = await prisma.tribe
    .findMany({
      where: {
        members: {
          some: {
            userId: user?.id,
          },
        },
      },
      select: {
        id: true,
        tribeId: true,
        tribeShortName: true,
        tribeName: true,
        tribeLogo: true,
        _count: {
          select: {
            members: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    .then(async (tribes) => {
      return tribes.map((tribe) => ({
        ...tribe,
        tribeLogo: getEventImage({ image: tribe?.tribeLogo }),
        url: `/t/${tribe.tribeId}/community`,
      }));
    });

  return tribes;
};

const Section2TribeSuggestions = async () => {
  return prisma.tribe
    .findMany({
      select: {
        id: true,
        tribeId: true,
        tribeShortName: true,
        tribeName: true,
        tribeLogo: true,
        _count: {
          select: {
            members: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    })
    .then(async (tribes) => {
      return tribes.map((tribe) => ({
        ...tribe,
        tribeLogo: getEventImage({ image: tribe?.tribeLogo }),
        url: `/t/${tribe.tribeId}`,
      }));
    });
};

const Section3MyAthletes = async ({ user }) => {
  return prisma.tribeAthlete
    .findMany({
      where: {
        athlete: {
          following: {
            some: {
              followerId: user?.id,
            },
          },
        },
      },
      select: {
        athlete: {
          select: {
            profileImage: true,
            name: true,
            username: true,
            isVerified: true,
          },
        },
      },
    })
    .then(async (athletes) => {
      return athletes.map((athlete) => ({
        ...athlete?.athlete,
        profileImage: getEventImage({ image: athlete?.athlete?.profileImage }),
        url: `/a/${athlete?.athlete?.username}`,
      }));
    });
};

const Section4SuggestedAthletes = async () => {
  return prisma.tribeAthlete
    .findMany({
      select: {
        athlete: {
          select: {
            profileImage: true,
            name: true,
            username: true,
            isVerified: true,
          },
        },
      },
      orderBy: {
        athlete: {
          following: {
            _count: "desc",
          },
        },
      },
    })
    .then(async (athletes) => {
      return athletes.map((athlete) => ({
        ...athlete?.athlete,
        profileImage: getEventImage({ image: athlete?.athlete?.profileImage }),
        url: `/a/${athlete?.athlete?.username}`,
      }));
    });
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user = await isLoginUser({ req });

    if (user) {
      let [myTribes, myAthletes] = await Promise.all([
        Section1MyTribes({ user }),
        Section3MyAthletes({ user }),
      ]);

      return res.status(200).json({
        success: true,
        data: {
          tribes: myTribes,
          athletes: myAthletes,
        },

        message: `My Tribes Loaded SuccessFully`,
      });
    } else {
      let [tribeSuggestions, athleteSuggestions] = await Promise.all([
        Section2TribeSuggestions(),
        Section4SuggestedAthletes(),
      ]);
      return res.status(200).json({
        success: true,
        data: {
          tribes: tribeSuggestions,
          athletes: athleteSuggestions,
        },
        message: `Tribes Suggestion Loaded SuccessFully`,
      });
    }
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
