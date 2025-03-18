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

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user = await isLoginUser({ req });
    let username = req.query.username as string;

    let tribes = await prisma.user
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
                  id: true,
                  tribeId: true,
                  tribeHorizontalBanner: true,
                  tribeLogo: true,
                  about: true,
                  tribeName: true,
                  _count: {
                    select: {
                      members: true,
                    },
                  },
                },
              },
            },
          },
        },
      })
      .then((res) =>
        res.athleteTribes?.map((data) => ({
          ...data.tribe,
          tribeHorizontalBanner: getEventImage({
            image: data.tribe?.tribeHorizontalBanner,
          }),
          tribeLogo: getEventImage({ image: data.tribe?.tribeLogo }),
        }))
      );

    if (!tribes) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.status(200).json({
      success: true,
      data: tribes,
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
