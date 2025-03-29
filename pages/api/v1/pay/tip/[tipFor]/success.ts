import { NextApiRequest, NextApiResponse } from "next";
import { isLoginUser } from "../../../../../../lib/global/getUserFromToken";
import prisma from "../../../../../../lib/prisma";
import { methodGuard } from "../../../../../../utils/global/methodNotAllowed";
import { postType } from "../../../../../../utils/global/global";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Add TypeScript interfaces for better type safety
interface PaymentInfo {
  id: string;
  stripeCheckoutId: string;
  amount: number;
  fromUserId: string;
  toUserId: string;
  fromUser: { username: string };
  toUser: { username: string };
  mvpzShare: { shareAmount: number };
  userShare: { shareAmount: number };
}

interface ShareCalculation {
  amount: number;
  userSharePercentage: number;
  mvpzSharePercentage: number;
  stripeCharges: number;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user: any = await isLoginUser({ req });
    const { tipFor, paymentId, callbackUrl } = req.query as { [key: string]: string };

    if (!paymentId) {
      return res.redirect(callbackUrl);
    }

    const paymentInfo = await updatePaymentInfo({ type: tipFor, paymentId });

    if (!paymentInfo?.stripeCheckoutId) {
      console.error('No stripeCheckoutId found in payment info');
      return res.redirect(callbackUrl);
    }

    // Fetch all required data in parallel
    const [getWebstripeId, stripeCharges, withdrawType] = await Promise.all([
      prisma.webStripe.findFirst({ where: { userId: paymentInfo.toUserId } }),
      prisma.stripeCharges.findFirst(),
      prisma.earningWithdrawAccess.findFirst()
    ]);

    // ----   get stripe info - what they charge while transaction ----
    const stripeSession = await stripe.checkout.sessions.retrieve(
      paymentInfo.stripeCheckoutId
    );

    const paymentIntentId = stripeSession.payment_intent;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    const charge = await stripe.charges.retrieve(paymentIntent.latest_charge);

    const balanceTransaction = await stripe.balanceTransactions.retrieve(
      charge.balance_transaction
    );

    const stripeFees: any = balanceTransaction.fee / 100;
    // ----   get stripe info - what they charge while transaction ----

    // stripe charges calculation what we set in mvpz db
    let stripeChargesCal =
      (paymentInfo.amount * stripeCharges.transactionCharge) / 100 +
      stripeCharges.paymentSuccessCharge;

    // userShares, Mvpz shares calculations
    let calamount: {
      mvpzShare: any;
      userShare: any;
    } = calculateShare({
      amount: paymentInfo.amount,
      mvpzSharePercentage: paymentInfo.mvpzShare.shareAmount,
      userSharePercentage: paymentInfo.userShare.shareAmount,
      stripeCharges: stripeChargesCal,
    });

    // user payout creations
    let stripePayout = await prisma.stripePayout.create({
      data: {
        amount: parseFloat(calamount?.userShare),
        metadata: JSON.stringify({
          collection: postType[tipFor],
          payoutId: paymentInfo.id,
        }),
        type: "tip",
        fromUserId: paymentInfo.fromUserId,
        payoutUserId: paymentInfo.toUserId,
        userPaymentId: paymentInfo.stripeCheckoutId,
      },
    });

    // mvpz earning creations
    await prisma.mvpzEarnings.create({
      data: {
        earnedAmount: parseFloat(calamount.mvpzShare),
        stripeCharges: parseFloat(stripeFees),
        type: "tip",
        stripePayoutId: stripePayout?.id,
      },
    });

    // Create notifications helper function
    const createNotifications = async (userShare: number, stripePayout: any) => {
      await Promise.all([
        prisma.notification.create({
          data: {
            title: "New Tip Sent!",
            message: `You successfully sent a $${paymentInfo.amount} tip to ${paymentInfo.toUser.username}.`,
            userId: paymentInfo.fromUserId,
            url: `${process.env.NEXT_PUBLIC_APP_URL}/profile/earnings`,
          }
        }),
        prisma.notification.create({
          data: {
            title: "New Tip Received!",
            message: `You received a $${userShare} tip from ${paymentInfo.fromUser.username}.`,
            userId: paymentInfo.toUserId,
            url: `${process.env.NEXT_PUBLIC_APP_URL}/profile/earnings`,
          }
        })
      ]);
    };

    // Handle instant transfer
    const handleInstantTransfer = async (account: any, stripePayout: any) => {
      if (withdrawType.type === "instant" && account?.payouts_enabled) {
        const payout = await stripe.transfers.create({
          amount: Math.round(stripePayout.amount * 100), // Ensure whole number for cents
          currency: "usd",
          destination: account.id,
        });

        if (payout) {
          await Promise.all([
            prisma.stripePayout.update({
              where: { id: stripePayout.id },
              data: { isWithdraw: true }
            }),
            prisma.notification.create({
              data: {
                title: `$${stripePayout.amount} has been claimed successfully!`,
                message: `We have transferred $${stripePayout.amount} to your stripe account successfully!`,
                userId: paymentInfo.toUserId,
                url: `${process.env.NEXT_PUBLIC_APP_URL}/profile/earnings`,
              }
            })
          ]);
        }
      }
    };

    await createNotifications(parseFloat(calamount.userShare), stripePayout);
    await handleInstantTransfer(getWebstripeId, stripePayout);

    res.redirect(callbackUrl);
  } catch (error) {
    console.error('Payment processing error:', error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Optimize share calculation
function calculateShare({ amount, userSharePercentage, mvpzSharePercentage, stripeCharges }: ShareCalculation) {
  if (amount < 5) {
    return {
      mvpzShare: 0,
      userShare: Number(amount - stripeCharges).toFixed(2)
    };
  }

  const userShare = (amount * userSharePercentage) / 100;
  const mvpzShare = (amount * mvpzSharePercentage) / 100;

  return {
    mvpzShare: Number(mvpzShare - stripeCharges).toFixed(2),
    userShare
  };
}

// Optimize updatePaymentInfo with a more maintainable structure
const updatePaymentInfo = async ({ type, paymentId }: { type: string; paymentId: string }) => {
  const commonInclude = {
    fromUser: true,
    toUser: true,
    mvpzShare: true,
    userShare: true,
  };

  const updateData = { isPaymentSuccess: true };

  const modelMap = {
    publicpost: prisma.publicPostTips,
    tribepost: prisma.tribePostTips,
    shoutpost: prisma.tribeShoutsTips,
    athleteprofile: prisma.athleteTips
  };

  const model = modelMap[type];
  if (!model) {
    throw new Error(`Invalid tip type: ${type}`);
  }

  return model.update({
    where: { id: paymentId },
    data: updateData,
    include: commonInclude
  });
};

// Wrap the handler with methodGuard to allow only PUT requests
export default methodGuard({
  allowedMethod: "GET",
  isAuthRequired: false,
  handler,
});
