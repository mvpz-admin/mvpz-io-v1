import { NextApiRequest, NextApiResponse } from "next";
import { isLoginUser } from "../../../../../../lib/global/getUserFromToken";
import prisma from "../../../../../../lib/prisma";
import { methodGuard } from "../../../../../../utils/global/methodNotAllowed";
import { postType } from "../../../../../../utils/global/global";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user: any = await isLoginUser({ req });
    const body = req.body;
    const { fromUserId, toUserId, tipAmount, postId, callbackUrl } = body;
    const tipFor = req.query.tipFor as string;

    const tipLimit = await prisma.tipLimit.findFirst({
      where: {
        forContent: postType[tipFor],
      },
    });

    if (tipLimit && tipLimit.timeFrame !== "UNLIMITED") {
      // Check the tip count based on the time frame
      const currentDate = new Date();
      let timeConstraint: any = {};

      if (tipLimit.timeFrame === "DAILY") {
        const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));
        timeConstraint = { gte: startOfDay, lte: endOfDay };
      }

      let tipCount = await getPostTypeTipCount({
        type: tipFor,
        fromUserId,
        postId,
        timeConstraint,
        tipLimit,
      });

      if (tipCount >= tipLimit.tipLimitCount) {
        return res.status(200).json({
          success: false,
          limitExceed: true,
          data: { checkoutUrl: null },
          error: `You cannot tip the same post more than ${
            tipLimit.tipLimitCount
          } times within the ${tipLimit.timeFrame.toLowerCase()} timeframe.`,
        });
      }
    }

    const getUserShare = await prisma.userTipShare.findFirst();
    const getMvpzShare = await prisma.mvpzTipShare.findFirst();

    // Add null checks for shares
    if (!getUserShare || !getMvpzShare) {
      return res.status(400).json({
        success: false,
        data : {
          getUserShare,
          getMvpzShare 
        },
        error: "Tip share configuration is not set up properly",
      });
    }

    const paymentAttempt = await createPaymentAttempt({
      fromUserId,
      getMvpzShare,
      getUserShare,
      postId,
      tipAmount,
      toUserId,
      type: tipFor
    });

    const stripeSession = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Tip",
              description: `Tip for post ID: ${postId}`,
            },
            unit_amount: Math.round(tipAmount * 100),
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        metadata: {
          payment_attempt_id: paymentAttempt.id.toString(),
        },
      },
      mode: "payment",
      success_url: `${
        process.env.NEXT_PUBLIC_APP_URL
      }/api/v1/pay/tip/${tipFor}/success?paymentId=${
        paymentAttempt.id
      }&callbackUrl=${callbackUrl || "/"}`,
      cancel_url: `${
        process.env.NEXT_PUBLIC_APP_URL
      }/api/v1/pay/tip/${tipFor}/failure?paymentId=${
        paymentAttempt.id
      }&callbackUrl=${callbackUrl || "/"}`,
    });

    // update the payment attempt with the stripe session id and url
    await updatePaymentAttempt({
      paymentAttemptId: paymentAttempt.id,
      stripeSession,
      type: tipFor
    });

    return res.status(200).json({
      success: true,
      data: { checkoutUrl: stripeSession.url },
      message: "Stripe Checkout Created Successfull!",
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Simple mapping between post types and their Prisma models
const tipModelMap = {
  publicpost: prisma.publicPostTips,
  tribepost: prisma.tribePostTips,
  shoutpost: prisma.tribeShoutsTips,
  athleteprofile: prisma.athleteTips,
};

const getPostTypeTipCount = async ({
  type,
  fromUserId,
  postId,
  tipLimit,
  timeConstraint,
}) => {
  const model = tipModelMap[type];
  if (!model) throw new Error(`Invalid post type: ${type}`);

  const where = {
    fromUserId,
    ...(postId && type !== 'athleteprofile' && { postId }),
    ...(tipLimit.timeFrame !== 'ALL_TIME' && { createdAt: timeConstraint }),
  };

  return await model.count({ where });
};

const createPaymentAttempt = async ({
  type,
  tipAmount,
  fromUserId,
  getMvpzShare,
  postId,
  toUserId,
  getUserShare
}) => {
  const model = tipModelMap[type];
  if (!model) throw new Error(`Invalid post type: ${type}`);

  const data = {
    amount: tipAmount,
    fromUserId,
    mvpzShareId: getMvpzShare.id,
    toUserId,
    userShareId: getUserShare.id,
    ...(postId && type !== 'athleteprofile' && { postId }),
  };

  return await model.create({ data });
};

const updatePaymentAttempt = async ({
  type,
  paymentAttemptId,
  stripeSession
}) => {
  const model = tipModelMap[type];
  if (!model) throw new Error(`Invalid post type: ${type}`);

  return await model.update({
    where: { id: paymentAttemptId },
    data: {
      stripeCheckoutLink: stripeSession.url,
      stripeCheckoutId: stripeSession.id,
    },
  });
};

// Wrap the handler with methodGuard to allow only PUT requests
export default methodGuard({
  allowedMethod: "POST",
  isAuthRequired: true,
  handler,
});
