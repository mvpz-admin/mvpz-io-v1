import { NextApiRequest, NextApiResponse } from "next";
import { isLoginUser } from "../../../../../lib/global/getUserFromToken";
import { methodGuard } from "../../../../../utils/global/methodNotAllowed";
import prisma from "../../../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user: any = await isLoginUser({ req });

    await prisma.notification.deleteMany({
      where: {
        userId: user.id,
      },
     
    });

    return res.status(200).json({
      success: true,
      message: `Notifications Cleared All`,
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
