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

const Section1Shouts = async ({ user }) => {
  const shouts = await prisma.tribeShout
    .findMany({
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
      take: 10,
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
  let tribes = await prisma.tribe
  .findMany({
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

  
  return tribes;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user = await isLoginUser({ req });

    let [shouts, tribes] = await Promise.all([
      Section1Shouts({ user }),
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
