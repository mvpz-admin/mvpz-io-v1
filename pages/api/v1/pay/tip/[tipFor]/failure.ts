import { NextApiRequest, NextApiResponse } from "next";
import { isLoginUser } from "../../../../../../lib/global/getUserFromToken";
import prisma from "../../../../../../lib/prisma";
import { methodGuard } from "../../../../../../utils/global/methodNotAllowed";
import { postType } from "../../../../../../utils/global/global";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user: any = await isLoginUser({ req });
    const tipFor = req.query.tipFor as string;
    const paymentId = req.query.paymentId as string;
    const callbackUrl = req.query.callbackUrl as string;

    if (!paymentId) {
      res.redirect(callbackUrl);
      return;
    }

    const paymentInfo = await updatePaymentInfo({ type: tipFor, paymentId });

    prisma.notification.create({
      data: {
        title: " Tip Not Sent!",
        message: `Your $${paymentInfo?.amount} tip got failed. Please try again.`,
        userId: paymentInfo?.fromUserId,
      },
    });

    res.redirect(callbackUrl);

    res.redirect(callbackUrl);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

const updatePaymentInfo = async ({ type, paymentId }) => {
  switch (type) {
    case "publicpost":
      return await prisma.publicPostTips.update({
        where: {
          id: paymentId as string,
        },
        data: {
          isPaymentSuccess: false,
        },
        include: {
          fromUser: true,
          toUser: true,
        },
      });
    case "tribepost":
      return await prisma.tribePostTips.update({
        where: {
          id: paymentId as string,
        },
        data: {
          isPaymentSuccess: false,
        },
        include: {
          fromUser: true,
          toUser: true,
        },
      });

    case "shoutpost":
      return await prisma.athleteTips.update({
        where: {
          id: paymentId as string,
        },
        data: {
          isPaymentSuccess: false,
        },
        include: {
          fromUser: true,
          toUser: true,
        },
      });

    case "athleteprofile":
      return await prisma.publicPostTips.update({
        where: {
          id: paymentId as string,
        },
        data: {
          isPaymentSuccess: false,
        },
        include: {
          fromUser: true,
          toUser: true,
        },
      });
  }
};

// Wrap the handler with methodGuard to allow only PUT requests
export default methodGuard({
    allowedMethod: "GET",
    isAuthRequired: false,
    handler,
  });
  