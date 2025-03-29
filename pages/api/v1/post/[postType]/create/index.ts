import { NextApiRequest, NextApiResponse } from "next";
import { isLoginUser } from "../../../../../../lib/global/getUserFromToken";
import { methodGuard } from "../../../../../../utils/global/methodNotAllowed";
import prisma from "../../../../../../lib/prisma";
import { BB_BASE_URL } from "../../../../../../utils/global/global";
import { formateDateTimeOn } from "../../../../../../utils/global/formating";

const getEventImage = ({ image }) => {
  if (!image) return null;
  if (image.includes("https://")) {
    return image;
  } else {
    return `${BB_BASE_URL}${image}`;
  }
};

const PublicPost = async ({ res, user, html, thumbnail }) => {
  let post = await prisma.post
    .create({
      data: {
        message: html,
        thumbnail,
        userId: user?.id,
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
    })
    .then((res) => ({
      ...res,
      postedBy: {
        ...res.postedBy,
        profileImage: getEventImage({ image: res.postedBy.profileImage }),
        following: res.postedBy.followers?.length > 0,
      },
      reactions: {
        hearts: res?._count?.likes,
        claps: res?._count?.claps,
        fires: res?._count?.bolts,
        good_luck: res?._count?.clovers,
        totalReactions:
          res._count.bolts +
          res._count.claps +
          res._count.clovers +
          res._count.likes,
      },
      upload_on: formateDateTimeOn({ date: res.createdAt }),
      isLiked: (res.bolts.length > 0 && {
        isLiked: true,
        likedType: "fires",
      }) ||
        (res.claps.length > 0 && { isLiked: true, likedType: "claps" }) ||
        (res.clovers.length > 0 && { isLiked: true, likedType: "good_luck" }) ||
        (res.likes.length > 0 && { isLiked: true, likedType: "hearts" }) || {
          isLiked: false,
          likedType: null,
        },
    }));

    await prisma.notification.create({
      data : {
        userId : user?.id,
        title : "Post Created!",
        message : "Your post has been created successfully!",
      }
    })


    let xPType = await prisma.xPType.findFirst({
      where: {
        name: "Create Post",
      },
    });

    let userXpCompleted = await prisma.userXPEarn.count({
      where: {
        xpTypeId: xPType.id,
      },
    });

    if (userXpCompleted <= xPType.limit) {
      await prisma.notification.create({
        data: {
          userId: user.id,
          title: "You have earned 5 XP",
          message: "You have earned 5 XP for creating a post",
          url: "/rewards",
        },
      });

      await prisma.userXPEarn.create({
        data: {
          userId: user.id,
          xpTypeId: xPType.id,
          xpEarn: xPType.xpValue,
        },
      });
    }




  return res.status(201).json({
    success: true,
    data: post,
    message: `Post Created Successfully!`,
  });
};

const TribePost = async ({ res, user, html, thumbnail, tribeId }) => {
  let post = await prisma.tribePost
    .create({
      data: {
        message: html,
        thumbnail,
        userId: user?.id,
        tribeId,
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
    })
    .then((res) => ({
      ...res,
      postedBy: {
        ...res.postedBy,
        profileImage: getEventImage({ image: res.postedBy.profileImage }),
        following: res.postedBy.followers?.length > 0,
      },
      reactions: {
        hearts: res?._count?.likes,
        claps: res?._count?.claps,
        fires: res?._count?.bolts,
        good_luck: res?._count?.clovers,
        totalReactions:
          res._count.bolts +
          res._count.claps +
          res._count.clovers +
          res._count.likes,
      },
      upload_on: formateDateTimeOn({ date: res.createdAt }),
      isLiked: (res.bolts.length > 0 && {
        isLiked: true,
        likedType: "fires",
      }) ||
        (res.claps.length > 0 && { isLiked: true, likedType: "claps" }) ||
        (res.clovers.length > 0 && { isLiked: true, likedType: "good_luck" }) ||
        (res.likes.length > 0 && { isLiked: true, likedType: "hearts" }) || {
          isLiked: false,
          likedType: null,
        },
    }));

  return res.status(201).json({
    success: true,
    data: post,
    message: `User React Successfully!`,
  });
};

const ShoutPost = async ({ res, user, html, thumbnail, tribeId, athletePostTo }) => {
  let post = await prisma.tribeShout
    .create({
      data: {
        message: html,
        thumbnail,
        userId: user?.id,
        tribeId,
        isMemberOnly : athletePostTo == "membersOnly"
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
    })
    .then((res) => ({
      ...res,
      postedBy: {
        ...res.postedBy,
        profileImage: getEventImage({ image: res.postedBy.profileImage }),
        following: res.postedBy.followers?.length > 0,
      },
      reactions: {
        hearts: res?._count?.likes,
        claps: res?._count?.claps,
        fires: res?._count?.bolts,
        good_luck: res?._count?.clovers,
        totalReactions:
          res._count.bolts +
          res._count.claps +
          res._count.clovers +
          res._count.likes,
      },
      upload_on: formateDateTimeOn({ date: res.createdAt }),
      isLiked: (res.bolts.length > 0 && {
        isLiked: true,
        likedType: "fires",
      }) ||
        (res.claps.length > 0 && { isLiked: true, likedType: "claps" }) ||
        (res.clovers.length > 0 && { isLiked: true, likedType: "good_luck" }) ||
        (res.likes.length > 0 && { isLiked: true, likedType: "hearts" }) || {
          isLiked: false,
          likedType: null,
        },
    }));

  return res.status(201).json({
    success: true,
    data: post,
    message: `Shouts React Successfully!`,
  });
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user: any = await isLoginUser({ req });
    const postType = req.query.postType as
      | "publicpost"
      | "tribepost"
      | "shoutpost";
    const athletePostTo = req.query.athletePostTo as
      | "all"
      | "followersOnly"
      | "membersOnly";
    const { html, thumbnail, tribeId } = req.body;

    let tribe

    if(tribeId){
      let isTribe = await prisma.tribe.findFirst({
        where : {
          tribeId
        }
      })
      tribe = isTribe
      if(!isTribe){
        return res.status(500).json({success:false, message: "Tribe Not Fount" });
      }
    }
  

    switch (postType) {
      case "publicpost":
        return PublicPost({ res, user, html, thumbnail });
      case "tribepost":
        return TribePost({ res, user, html, thumbnail, tribeId : tribe?.id });
      case "shoutpost":
        return ShoutPost({ res, user, html, thumbnail, tribeId : tribe?.id, athletePostTo });
      default:
        return res.status(400).json({ error: "Invalid post type" });
    }
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Wrap the handler with methodGuard to allow only PUT requests
export default methodGuard({
  allowedMethod: "POST",
  isAuthRequired: true,
  handler,
});
