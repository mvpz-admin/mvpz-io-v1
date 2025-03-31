import { NextApiRequest, NextApiResponse } from "next";
import { methodGuard } from "../../../../../utils/global/methodNotAllowed";
import { BB_BASE_URL } from "../../../../../utils/global/global";
import { isLoginUser } from "../../../../../lib/global/getUserFromToken";
import prisma from "../../../../../lib/prisma";

const getEventImage = ({ image }) => {
  if (!image) return null;
  if (image.includes("https://")) {
    return image;
  } else {
    return `${BB_BASE_URL}${image}`;
  }
};
``;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user: any = await isLoginUser({ req });
    let username = req.query.username as string;
    let {
      username: usernameFromBody,
      name,
      bio,
      bannerImage,
      profileImage,
    } = req.body;

    usernameFromBody = usernameFromBody.toLowerCase()?.substring(0, 1) === "@" ? usernameFromBody : `@${usernameFromBody}`;

    let getUser = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (getUser?.username !== usernameFromBody) {
      let checkUsername = await prisma.user.findFirst({
        where: {
          username: usernameFromBody,
        },
      });

      if (checkUsername) {

        return res.status(400).json({success:false, error: "Username already exists" });
      }
    }

    let updateUser = await prisma.user
      .update({
        where: {
          id: getUser?.id,
        },
        data: {
          username: usernameFromBody,
          name,
          bio,
          bannerImage: bannerImage ? bannerImage : getUser?.bannerImage,
          profileImage: profileImage ? profileImage : getUser?.profileImage,
        },
        select: {
          id: true,
          username: true,
          name: true,
          bio: true,
          bannerImage: true,
          profileImage: true,
        },
      })
      .then((res) => ({
        ...res,
        profileImage: getEventImage({
          image:
            res?.profileImage ||
            "https://res.cloudinary.com/dv667zlni/image/upload/v1741476585/cat_nlpfmw.png",
        }),
        bannerImage: getEventImage({ image: res?.bannerImage }),
      }));

    return res.status(200).json({
      success: true,
      data: {
        user: updateUser,
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
  allowedMethod: "PUT",
  isAuthRequired: true,
  handler,
});
