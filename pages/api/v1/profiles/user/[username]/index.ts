import { NextApiRequest, NextApiResponse } from "next";
import { isLoginUser } from "../../../../../../lib/global/getUserFromToken";
import { BB_BASE_URL } from "../../../../../../utils/global/global";
import { methodGuard } from "../../../../../../utils/global/methodNotAllowed";
import prisma from "../../../../../../lib/prisma";

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

    const getUser = await prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        id : true,
        name: true,
        username: true,
        profileImage: true,
        bannerImage: true,
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
        createdAt: true,
        bio: true,
        socialLinks: true,
        isVerified : true
      },
    })?.then((res) => ({
      ...res,
      profileImage : getEventImage({image : res?.profileImage}),
      bannerImage : getEventImage({image : res?.bannerImage}),
    }))

    if(!getUser){
      return res.status(500).json({ error: "Internal Server Error" });
    }
    
    let userFollowing = false

    if(user){
      let checkFollowing = await prisma.userFollower.findFirst({
        where : {
          followerId : user?.id,
          followingId : getUser.id
        }
      })

      userFollowing = !!checkFollowing
    }

    return res.status(200).json({
      success: true,
      data: {
        ...getUser,
        userFollowing
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
