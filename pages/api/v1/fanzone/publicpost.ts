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

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user: any = await isLoginUser({ req });
    let page = Number(req.query.page as string) ||  1 
    let renderData = 10

    let posts = await prisma.post
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
              followers: {
                where: { followingId: user?.id },
                select: { followingId: true },
              },
            },
          },
          bolts: { where: { userId: user?.id } },
          claps: { where: { userId: user?.id } },
          clovers: { where: { userId: user?.id } },
          likes: { where: { userId: user?.id } },
          _count: {
            select: {
              comments: true,
              bolts: true,
              claps: true,
              clovers: true,
              likes: true,
            },
          },
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        skip : (page - 1) * renderData,
        take : renderData
      })
      .then((posts) =>
        posts.map((post) => ({
          ...post,
          postedBy: {
            ...post.postedBy,
            profileImage: getEventImage({ image: post.postedBy.profileImage }),
            following: post.postedBy.followers?.length > 0,
          },
          reactions: {
            hearts: post?._count?.likes,
            claps: post?._count?.claps,
            fires: post?._count?.bolts,
            good_luck: post?._count?.clovers,
            totalReactions:
              post._count.bolts +
              post._count.claps +
              post._count.clovers +
              post._count.likes,
          },
          upload_on: formateDateTimeOn({ date: post.createdAt }),
          isLiked: (post.bolts.length > 0 && {
            isLiked: true,
            likedType: "fires",
          }) ||
            (post.claps.length > 0 && { isLiked: true, likedType: "claps" }) ||
            (post.clovers.length > 0 && {
              isLiked: true,
              likedType: "good_luck",
            }) ||
            (post.likes.length > 0 && {
              isLiked: true,
              likedType: "hearts",
            }) || { isLiked: false, likedType: null },
        }))
      );

    return res.status(200).json({
      success: true,
      data: posts,
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
  isAuthRequired: false,
  handler,
});
