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

const Section1Shouts = async ({ user }) => {
  const shouts = await prisma.tribeShout
    .findMany({
      where: {
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
      take: 5,
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

const Section2Posts = async ({ user, postId }) => {
  return prisma.post
    .findMany({
      where: {
        id: {
          not: postId,
        },
      },
      select: {
        id: true,
        thumbnail: true,
        message: true,
        postedBy: {
          select: {
            id: true,
            profileImage: true,
            name: true,
            username: true,
            isVerified: true,
            following: {
              where: {
                followerId: user?.id,
              },
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
      take : 5
    })
    .then(async (posts) => {
      return posts.map((post) => ({
        ...post,
        postedBy: {
          ...post.postedBy,
          profileImage: getEventImage({ image: post.postedBy.profileImage }),
          following: post.postedBy.following?.length > 0,
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
          (post.likes.length > 0 && { isLiked: true, likedType: "hearts" }) || {
            isLiked: false,
            likedType: null,
          },
      }));
    });
};

const Sections3Tribes = async ({ user }) => {
  let tribes;

  if (!user) {
    tribes = await prisma.tribe
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
  } else {
    tribes = await prisma.tribe
      .findMany({
        where: {
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
        take: 5,
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
    let user = await isLoginUser({ req });
    const postId = req.query.postId as string;
    const postType = req.query.postType as
      | "publicpost"
      | "tribepost"
      | "shoutpost";

    let [shouts, posts, tribes] = await Promise.all([
      Section1Shouts({ user }),
      Section2Posts({ user, postId }),
      Sections3Tribes({ user }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        shouts,
        posts,
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
  isAuthRequired: false,
  handler,
});
