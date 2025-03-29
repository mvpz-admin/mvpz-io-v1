import { NextApiRequest, NextApiResponse } from "next";
import { isLoginUser } from "../../../../../lib/global/getUserFromToken";
import { methodGuard } from "../../../../../utils/global/methodNotAllowed";
import prisma from "../../../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user: any = await isLoginUser({ req });
    let notifyId = req.query.notifyId as string

    await prisma.notification.delete({
      where: {
        userId: user.id,
        id: notifyId,
      },
    });

    return res.status(200).json({
      success: true,
      message: `Notification Cleared Successfully`,
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
