import { NextApiRequest, NextApiResponse } from "next";
import { isLoginUser } from "../../../../../../lib/global/getUserFromToken";
import { methodGuard } from "../../../../../../utils/global/methodNotAllowed";
import prisma from "../../../../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user: any = await isLoginUser({ req });
    let username = req.query.username as string;

    const getAthlete = await prisma.user
      .findFirst({
        where: {
          username,
        },
        select: {
          id: true,
          followers: {
            where: {
              followerId: user?.id,
            },
          },
        },
      })
      ?.then((res) => ({
        id: res?.id,
        isFollowing: res?.followers?.length > 0,
        follower: res?.followers[0],
      }));

    if (!getAthlete) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (getAthlete?.isFollowing) {
      await prisma.userFollower.deleteMany({
        where: {
          followerId: user?.id,
          followingId : getAthlete?.id
        },
      });
      return res.status(200).json({
        success: true,
        message: `User Unfollowed Successfully!`,
      });
    } else {
      await prisma.userFollower.create({
        data: {
          followerId: user?.id,
          followingId: getAthlete?.id,
        },
      });
      return res.status(201).json({
        success: true,
        message: `User followed Successfully!`,
      });
    }
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
