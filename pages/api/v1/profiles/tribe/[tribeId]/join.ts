import { NextApiRequest, NextApiResponse } from "next";
import { isLoginUser } from "../../../../../../lib/global/getUserFromToken";
import { methodGuard } from "../../../../../../utils/global/methodNotAllowed";
import prisma from "../../../../../../lib/prisma";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user: any = await isLoginUser({ req });
    const tribeId = req.query.tribeId as string;

    const tribe = await prisma.tribe.findFirst({
      where: {
        tribeId,
      },
    });

    if (!tribe) {
      return res.status(400).json({ error: "Tribe ID is required" });
    }

    const existingMember = await prisma.tribeMember.findFirst({
      where: {
        userId: user?.id,
        tribeId: tribe.id,
      },
    });

    if (existingMember) {
      await prisma.tribeMember.delete({
        where: {
          id: existingMember?.id,
        },
      });
      return res.status(200).json({
        success: true,
        data: {
          isMember: false,
        },
        message: "Tribe Leaved Successfully",
      });
    }

    await prisma.tribeMember.create({
      data: {
        userId: user?.id,
        tribeId: tribe?.id,
      },
    });
    return res.status(200).json({
      success: true,
      data: {
        isMember: true,
      },
      message: "Tribe Joined Successfully",
    });
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
