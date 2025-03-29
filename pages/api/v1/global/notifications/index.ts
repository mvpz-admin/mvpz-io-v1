import { NextApiRequest, NextApiResponse } from "next";
import { isLoginUser } from "../../../../../lib/global/getUserFromToken";
import { methodGuard } from "../../../../../utils/global/methodNotAllowed";
import prisma from "../../../../../lib/prisma";
import { formateDateTimeOn } from "../../../../../utils/global/formating";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user: any = await isLoginUser({ req });

    let [userNotifications, UnReadNotificationsCount, XPs] = await Promise.all([
      prisma.notification
        .findMany({
          where: {
            userId: user.id,
          },
          orderBy: {
            createdAt: "desc",
          },
        })
        ?.then((data) => {
          return data.map((item) => {
            let { createdAt, updatedAt, userId, ...rest } = item;
            return {
              ...rest,
              notifyAt: formateDateTimeOn({ date: createdAt }),
            };
          });
        }),
      prisma.notification.count({
        where: {
          userId: user.id,
          isRead: false,
        },
      }),
      prisma.user.findUnique({
        where: {
          id: user.id,
        },
        select: {
          xp: true,
          xpEarnings: true,
        },
      }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        notifications: userNotifications,
        unreadNotificationsCount: UnReadNotificationsCount,
        xp: XPs,
      },
      message: `Notifications Loaded SuccessFully`,
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
