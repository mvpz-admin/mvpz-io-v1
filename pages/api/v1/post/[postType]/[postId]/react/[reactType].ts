import { NextApiRequest, NextApiResponse } from "next";
import { isLoginUser } from "../../../../../../../lib/global/getUserFromToken";
import { methodGuard } from "../../../../../../../utils/global/methodNotAllowed";
import prisma from "../../../../../../../lib/prisma";

const PublicPost = async ({ res, user, postId, reactType }) => {
  const getPost = await prisma.post
    .findFirst({
      where: {
        id: postId,
      },
      select: {
        likes: {
          where: {
            userId: user?.id,
          },
          select: {
            id: true,
          },
        },
        claps: {
          where: {
            userId: user?.id,
          },
          select: {
            id: true,
          },
        },
        bolts: {
          where: {
            userId: user?.id,
          },
          select: {
            id: true,
          },
        },
        clovers: {
          where: {
            userId: user?.id,
          },
          select: {
            id: true,
          },
        },
      },
    })
    .then((res) => ({
      likes: {
        isReacted: res?.likes?.length > 0,
        reactId: res?.likes[0]?.id,
      },
      claps: {
        isReacted: res?.claps?.length > 0,
        reactId: res?.claps[0]?.id,
      },
      bolts: {
        isReacted: res?.bolts?.length > 0,
        reactId: res?.bolts[0]?.id,
      },
      clovers: {
        isReacted: res?.clovers?.length > 0,
        reactId: res?.clovers[0]?.id,
      },
    }));

  if (!getPost) {
    return res.status(500).json({ error: "Internal Server Error" });
  }

  if (getPost.likes.isReacted) {
    await prisma.like.delete({
      where: {
        id: getPost.likes.reactId,
      },
    });
  } else {
    if (reactType == "hearts") await prisma.like.create({
        data: {
          postId: postId,
          userId: user?.id,
        },
      });
  }

  if (getPost.claps.isReacted) {
    await prisma.clap.delete({
      where: {
        id: getPost.claps.reactId,
      },
    });
  } else {
    if (reactType == "claps")
      await prisma.clap.create({
        data: {
          postId: postId,
          userId: user?.id,
        },
      });
  }

  if (getPost.bolts.isReacted) {
    await prisma.bolt.delete({
      where: {
        id: getPost.bolts.reactId,
      },
    });
  } else {
    if (reactType == "fires")
      await prisma.bolt.create({
        data: {
          postId: postId,
          userId: user?.id,
        },
      });
  }

  if (getPost.clovers.isReacted) {
    await prisma.clover.delete({
      where: {
        id: getPost.clovers.reactId,
      },
    });
  } else {
    if (reactType == "good_luck")
      await prisma.clover.create({
        data: {
          postId: postId,
          userId: user?.id,
        },
      });
  }

  return res.status(201).json({
    success: true,
    message: `User React Successfully!`,
  });
};

const TribePost = async ({ res, user, postId, reactType }) => {
  const getPost = await prisma.tribePost
    .findFirst({
      where: {
        id: postId,
      },
      select: {
        likes: {
          where: {
            userId: user?.id,
          },
          select: {
            id: true,
          },
        },
        claps: {
          where: {
            userId: user?.id,
          },
          select: {
            id: true,
          },
        },
        bolts: {
          where: {
            userId: user?.id,
          },
          select: {
            id: true,
          },
        },
        clovers: {
          where: {
            userId: user?.id,
          },
          select: {
            id: true,
          },
        },
      },
    })
    .then((res) => ({
      likes: {
        isReacted: res?.likes?.length > 0,
        reactId: res?.likes[0]?.id,
      },
      claps: {
        isReacted: res?.claps?.length > 0,
        reactId: res?.claps[0]?.id,
      },
      bolts: {
        isReacted: res?.bolts?.length > 0,
        reactId: res?.bolts[0]?.id,
      },
      clovers: {
        isReacted: res?.clovers?.length > 0,
        reactId: res?.clovers[0]?.id,
      },
    }));

  if (!getPost) {
    return res.status(500).json({ error: "Internal Server Error" });
  }

  if (getPost.likes.isReacted) {
    await prisma.tLike.delete({
      where: {
        id: getPost.likes.reactId,
      },
    });
  } else {
    if (reactType == "hearts") await prisma.tLike.create({
        data: {
          postId: postId,
          userId: user?.id,
        },
      });
  }

  if (getPost.claps.isReacted) {
    await prisma.tClap.delete({
      where: {
        id: getPost.claps.reactId,
      },
    });
  } else {
    if (reactType == "claps")
      await prisma.tClap.create({
        data: {
          postId: postId,
          userId: user?.id,
        },
      });
  }

  if (getPost.bolts.isReacted) {
    await prisma.tBolt.delete({
      where: {
        id: getPost.bolts.reactId,
      },
    });
  } else {
    if (reactType == "fires")
      await prisma.tBolt.create({
        data: {
          postId: postId,
          userId: user?.id,
        },
      });
  }

  if (getPost.clovers.isReacted) {
    await prisma.tClover.delete({
      where: {
        id: getPost.clovers.reactId,
      },
    });
  } else {
    if (reactType == "good_luck")
      await prisma.tClover.create({
        data: {
          postId: postId,
          userId: user?.id,
        },
      });
  }

  return res.status(201).json({
    success: true,
    message: `User React Successfully!`,
  });
};

const ShoutPost = async ({ res, user, postId, reactType }) => {
  const getPost = await prisma.tribeShout
    .findFirst({
      where: {
        id: postId,
      },
      select: {
        likes: {
          where: {
            userId: user?.id,
          },
          select: {
            id: true,
          },
        },
        claps: {
          where: {
            userId: user?.id,
          },
          select: {
            id: true,
          },
        },
        bolts: {
          where: {
            userId: user?.id,
          },
          select: {
            id: true,
          },
        },
        clovers: {
          where: {
            userId: user?.id,
          },
          select: {
            id: true,
          },
        },
      },
    })
    .then((res) => ({
      likes: {
        isReacted: res?.likes?.length > 0,
        reactId: res?.likes[0]?.id,
      },
      claps: {
        isReacted: res?.claps?.length > 0,
        reactId: res?.claps[0]?.id,
      },
      bolts: {
        isReacted: res?.bolts?.length > 0,
        reactId: res?.bolts[0]?.id,
      },
      clovers: {
        isReacted: res?.clovers?.length > 0,
        reactId: res?.clovers[0]?.id,
      },
    }));

  if (!getPost) {
    return res.status(500).json({ error: "Internal Server Error" });
  }

  if (getPost.likes.isReacted) {
    await prisma.tShtLike.delete({
      where: {
        id: getPost.likes.reactId,
      },
    });
  } else {
    if (reactType == "hearts") await prisma.tShtLike.create({
        data: {
          shoutId: postId,
          userId: user?.id,
        },
      });
  }

  if (getPost.claps.isReacted) {
    await prisma.tShtClap.delete({
      where: {
        id: getPost.claps.reactId,
      },
    });
  } else {
    if (reactType == "claps")
      await prisma.tShtClap.create({
        data: {
          shoutId: postId,
          userId: user?.id,
        },
      });
  }

  if (getPost.bolts.isReacted) {
    await prisma.tShtBolt.delete({
      where: {
        id: getPost.bolts.reactId,
      },
    });
  } else {
    if (reactType == "fires")
      await prisma.tShtBolt.create({
        data: {
          shoutId: postId,
          userId: user?.id,
        },
      });
  }

  if (getPost.clovers.isReacted) {
    await prisma.tShtClover.delete({
      where: {
        id: getPost.clovers.reactId,
      },
    });
  } else {
    if (reactType == "good_luck")
      await prisma.tShtClover.create({
        data: {
          shoutId: postId,
          userId: user?.id,
        },
      });
  }

  return res.status(201).json({
    success: true,
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
    const reactType = req.query.reactType as
      | "hearts"
      | "claps"
      | "fires"
      | "good_luck";

    switch (postType) {
      case "publicpost":
        return PublicPost({ res, user, postId, reactType });
      case "tribepost":
        return TribePost({ res, user, postId, reactType });
      case "shoutpost":
        return ShoutPost({ res, user, postId, reactType });
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
  allowedMethod: "PUT",
  isAuthRequired: true,
  handler,
});
