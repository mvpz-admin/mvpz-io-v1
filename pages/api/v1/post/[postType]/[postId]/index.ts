import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../../lib/prisma";
import { isLoginUser } from "../../../../../../lib/global/getUserFromToken";
import { methodGuard } from "../../../../../../utils/global/methodNotAllowed";
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
const handleModifyReplies = async (replies) => {
  return await Promise.all(
    replies?.map((reply) => ({
      ...reply,
      postedBy: {
        ...reply.postedBy,
        profileImage: getEventImage({ image: reply.postedBy.profileImage }),
        repliedOn: formateDateTimeOn({ date: reply.createdAt }),
      },
    }))
  );
};

const handleModifyComments = async (comments) => {
  return await Promise.all(
    comments?.map(async (comment) => ({
      ...comment,
      postedBy: {
        ...comment.postedBy,
        profileImage: getEventImage({ image: comment.postedBy.profileImage }),
        commentedOn: formateDateTimeOn({ date: comment.createdAt }),
    },
    replies: await handleModifyReplies(comment?.replies),
    }))
  );
};

const PublicPost = async ({ res, user, postId }) => {
  let getPost = await prisma.post
    .findFirst({
      where: {
        id: postId,
      },
      select: {
        id: true,
        thumbnail: true,
        message: true,
        postedBy: {
          select: {
            id : true,
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
        comments: {
          select: {
            id : true,
            comment: true,
            replies: {
              select: {
                id : true,
                reply : true,
                createdAt: true,
                postedBy: {
                  select: {
                    profileImage: true,
                    name: true,
                    username: true,
                    isVerified: true,
                  },
                },
              },
              orderBy : {
                createdAt : "desc"
              }
            },
            createdAt: true,
            postedBy: {
              select: {
                profileImage: true,
                name: true,
                username: true,
                isVerified: true,
              },
            },
            _count : {
                select : {
                    replies : true
                }
              }
          },
          take: 10,
          orderBy : {
            createdAt : "desc"
          }
        },
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
    })
    .then(async (post) => {
      return {
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
        comments: await handleModifyComments(post?.comments),
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
      };
    });

  if (!getPost) {
    return res.status(500).json({ error: "Internal Server Error" });
  }

  return res.status(200).json({
    success: true,
    data: getPost,
    message: `User React Successfully!`,
  });
};

const TribePost = async ({ res, user, postId }) => {
  let getPost = await prisma.tribePost
    .findFirst({
      where: {
        id: postId,
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
        comments: {
          select: {
            id : true,
            comment: true,
            replies: {
              select: {
                id : true,
                reply : true,
                createdAt: true,
                postedBy: {
                  select: {
                    profileImage: true,
                    name: true,
                    username: true,
                    isVerified: true,
                  },
                },
              },
              orderBy : {
                createdAt : "desc"
              }
            },
            createdAt: true,
            postedBy: {
              select: {
                profileImage: true,
                name: true,
                username: true,
                isVerified: true,
              },
            },
            _count : {
                select : {
                    replies : true
                }
              }
          },
          take: 10,
          orderBy : {
            createdAt : "desc"
          }
        },
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
    })
    .then(async (post) => {
      return {
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
        comments: await handleModifyComments(post?.comments),
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
      };
    });

  if (!getPost) {
    return res.status(500).json({ error: "Internal Server Error" });
  }

  return res.status(200).json({
    success: true,
    data: getPost,
    message: `User React Successfully!`,
  });
};

const ShoutPost = async ({ res, user, postId }) => {
  let getPost = await prisma.tribeShout
    .findFirst({
      where: {
        id: postId,
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
        comments: {
          select: {
            id : true,
            comment: true,
            replies: {
              select: {
                id : true,
                reply : true,
                createdAt: true,
                postedBy: {
                  select: {
                    profileImage: true,
                    name: true,
                    username: true,
                    isVerified: true,
                  },
                },
              },
              orderBy : {
                createdAt : "desc"
              }
            },
            createdAt: true,
            postedBy: {
              select: {
                profileImage: true,
                name: true,
                username: true,
                isVerified: true,
              },
            },
            _count : {
                select : {
                    replies : true
                }
              }
          },
          take: 10,
          orderBy : {
            createdAt : "desc"
          }
        },
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
    })
    .then(async (post) => {
      return {
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
        comments: await handleModifyComments(post?.comments),
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
      };
    });

  if (!getPost) {
    return res.status(500).json({ error: "Internal Server Error" });
  }

  return res.status(200).json({
    success: true,
    data: getPost,
    message: `User React Successfully!`,
  });
};


async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user: any = await isLoginUser({ req });
    const postId = req.query.postId as string;
    const postType = req.query.postType as
      | "publicpost"
      | "tribepost"
      | "shoutpost";

    switch (postType) {
      case "publicpost":
        return PublicPost({ res, user, postId });
      case "tribepost":
        return TribePost({ res, user, postId });
      case "shoutpost":
        return ShoutPost({ res, user, postId });
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
  allowedMethod: "GET",
  isAuthRequired: false,
  handler,
});
