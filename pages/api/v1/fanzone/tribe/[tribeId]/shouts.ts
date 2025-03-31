import { NextApiRequest, NextApiResponse } from "next";
import { BB_BASE_URL } from "../../../../../../utils/global/global";
import prisma from "../../../../../../lib/prisma";
import { formateDateTimeOn } from "../../../../../../utils/global/formating";
import { isLoginUser } from "../../../../../../lib/global/getUserFromToken";
import { methodGuard } from "../../../../../../utils/global/methodNotAllowed";

const getEventImage = ({ image }) => {
  if (!image) return null;
  if (image.includes("https://")) {
    return image;
  } else {
    return `${BB_BASE_URL}${image}`;
  }
};

const Section1Shouts = async ({ user, tribeId }) => {
  const shouts = await prisma.tribeShout
    .findMany({
      where: {
        tribeId,
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
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
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

  return shouts;
};

const Sections3Tribes = async ({ user }) => {
  let tribes;

  if (!user) {
    tribes = await prisma.tribe
      .findMany({
        where : {
          deactivate: false,
        
        },
        select: {
          id: true,
          tribeId: true,
          tribeLogo: true,
          tribeName: true,
          tribeShortName: true,
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
        res.map((data) => ({
          ...data,
          tribeLogo: getEventImage({ image: data.tribeLogo }),
        }))
      );
  } else {
    tribes = await prisma.tribe
      .findMany({
        where: {
          deactivate: false,
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
        res.map((data) => ({
          ...data,
          tribeLogo: getEventImage({ image: data.tribeLogo }),
        }))
      );
  }

  return tribes;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user: any = await isLoginUser({ req });
    let tribeId = req.query.tribeId as string;

    const getTribe = await prisma.tribe.findFirst({
      where: {
        tribeId,
      },
    });

    if (!getTribe) {
      return res.status(400).json({
        success: false,
        data: {
          shouts: [],
          posts: [],
          tribes: [],
        },
        message: `Tribe Not Found`,
      });
    }

    const isTribeMember = await prisma.tribeMember.findFirst({
      where: {
        userId: user?.id,
        tribeId: getTribe?.id,
      },
    });

    if (!isTribeMember) {
      return res.status(400).json({
        success: false,
        data: {
          shouts: [],
          posts: [],
          tribes: [],
        },
        message: `Not Tribe Member`,
      });
    }

    let [shouts, tribes] = await Promise.all([
      Section1Shouts({ user, tribeId: getTribe.id }),
      Sections3Tribes({ user }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        shouts,
        tribes,
      },
      message: `Fanzone Loaded SuccessFully`,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Wrap the handler with methodGuard to allow only GET requests
export default methodGuard({
  allowedMethod: "GET",
  isAuthRequired: true,
  handler,
});
