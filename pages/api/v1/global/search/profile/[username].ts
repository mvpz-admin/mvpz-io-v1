import { NextApiRequest, NextApiResponse } from "next";
import { methodGuard } from "../../../../../../utils/global/methodNotAllowed";
import prisma from "../../../../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let username = req.query.username as string;

    const getUser = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (getUser) {
      return res.status(200).json({
        success: false,
        message: `Usermame is already taken!`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Username is available!`,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Wrap the handler with methodGuard to allow only GET requests
export default methodGuard({
  allowedMethod: "GET",
  isAuthRequired: true,
  handler,
});
