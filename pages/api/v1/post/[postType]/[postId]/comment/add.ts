import { NextApiRequest, NextApiResponse } from "next";
import { isLoginUser } from "../../../../../../../lib/global/getUserFromToken";
import { methodGuard } from "../../../../../../../utils/global/methodNotAllowed";
import prisma from "../../../../../../../lib/prisma";

const PublicPost = async ({ res, user, postId, comment }) => {
  const getPost = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });

  if (!getPost) {
    return res.status(500).json({ error: "Internal Server Error" });
  }

  await prisma.comment.create({
    data: {
      postId,
      comment,
      userId: user?.id,
    },
  });

  return res.status(201).json({
    success: true,
    message: `User Comment Successfully!`,
  });
};

const TribePost = async ({ res, user, postId,  comment}) => {
    const getPost = await prisma.tribePost.findFirst({
        where: {
          id: postId,
        },
      });
    
      if (!getPost) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    
      await prisma.tComment.create({
        data: {
          postId,
          comment,
          userId: user?.id,
        },
      });
    
      return res.status(201).json({
        success: true,
        message: `User Comment Successfully!`,
      });
};

const ShoutPost = async ({ res, user, postId, comment }) => {
    const getPost = await prisma.tribeShout.findFirst({
        where: {
          id: postId,
        },
      });
    
      if (!getPost) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    
      await prisma.tShtComment.create({
        data: {
          shoutId : postId,
          comment,
          userId: user?.id,
        },
      });
    
      return res.status(201).json({
        success: true,
        message: `User Comment Successfully!`,
      });
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user: any = await isLoginUser({ req });
    const postId = req.query.postId as string;
    const {html} = req.body
    const postType = req.query.postType as
      | "publicpost"
      | "tribepost"
      | "shoutpost";

    switch (postType) {
      case "publicpost":
        return PublicPost({ res, user, postId, comment : html });
      case "tribepost":
        return TribePost({ res, user, postId, comment : html });
      case "shoutpost":
        return ShoutPost({ res, user, postId, comment : html });
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
