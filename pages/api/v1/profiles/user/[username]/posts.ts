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

    let posts = await prisma.user
      .findFirst({
        where: {
          username,
        },
        select: {
          post: {
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
          },
        },
      })
      .then((res) =>
        res.post.map((data) => ({
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

    if (!posts) {
      return res.status(500).json({ error: "Internal Server Error" });
    }



    return res.status(200).json({
      success: true,
      data: posts,
      message: `Posts Loaded SuccessFully`,
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
