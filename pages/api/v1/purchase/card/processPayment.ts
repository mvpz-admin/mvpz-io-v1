import { NextApiRequest, NextApiResponse } from "next";
import { methodGuard } from "../../../../../utils/global/methodNotAllowed";
import { isLoginUser } from "../../../../../lib/global/getUserFromToken";
import prisma from "../../../../../lib/prisma";
import { BB_BASE_URL, paymentStatus } from "../../../../../utils/global/global";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getEventImage = ({ image }) => {
  if (!image) return null;
  if (image.includes("https://")) {
    return image;
  } else {
    return `${BB_BASE_URL}${image}`;
  }
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user: any = await isLoginUser({ req });
    const paymentId = req.query.paymentId;

    if (!paymentId) {
      return res.status(500).json({
        success: false,
        paymentStatus: 100,
        error: paymentStatus[100],
      });
    }

    const paymentAttempt = await prisma.paymentAttempt.findFirst({
      where: {
        id: paymentId.toString(),
        userId: user?.id,
      },
    });

    if (!paymentAttempt) {
      return res.status(500).json({
        success: false,
        paymentStatus: 200,
        error: paymentStatus[200],
      });
    }

    if (["SUCCESS", "MINTED"].includes(paymentAttempt.paymentStatus))
      return res.status(200).json({
        success: false,
        paymentStatus: 300,
        error: paymentStatus[300],
      });

    if (!paymentAttempt.stripeCheckoutId) {
      return res.status(500).json({
        success: false,
        error: "No stripe checkout session found",
      });
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.retrieve(
      paymentAttempt.stripeCheckoutId
    );

    let paymentMethodId = null;

    if (stripeCheckoutSession.payment_intent) {
      const stripePaymentIntent = await stripe.paymentIntents.retrieve(
        stripeCheckoutSession.payment_intent
      );
      const stripePaymentMethod = await stripe.paymentMethods.retrieve(
        stripePaymentIntent.payment_method
      );

      if (stripePaymentMethod) {
        const paymentMethod = await prisma.paymentMethod.create({
          data: {
            type: stripePaymentMethod.type,
            brand: stripePaymentMethod.card?.brand,
            country: stripePaymentMethod.card?.country,
            expMonth: stripePaymentMethod.card?.exp_month,
            expYear: stripePaymentMethod.card?.exp_year,
            last4: stripePaymentMethod.card?.last4,
            userId: user.id,
          },
        });
        paymentMethodId = paymentMethod.id;
      }
    }

    if (stripeCheckoutSession && stripeCheckoutSession.shipping_details) {
      await prisma.userAddress.create({
        data: {
          type: "Shipping",
          name: stripeCheckoutSession.shipping_details.name,
          city: stripeCheckoutSession.shipping_details.address?.city,
          country: stripeCheckoutSession.shipping_details.address?.country,
          line1: stripeCheckoutSession.shipping_details.address?.line1,
          line2: stripeCheckoutSession.shipping_details.address?.line2,
          postalCode:
            stripeCheckoutSession.shipping_details.address?.postal_code,
          state: stripeCheckoutSession.shipping_details.address?.state,
          userId: user?.id,
        },
      });
    }

    let [response] = await Promise.all([
      assignedCards({ paymentAttempt, loggedInUser: user?.id }),
      handleAutoPayment({ paymentAttempt, loggedInUser: user?.id }),
    ]);

    await prisma.paymentAttempt.update({
      where: {
        id: paymentAttempt.id,
      },
      data: {
        verifiedAt: new Date(),
        paymentStatus: "SUCCESS",
        paymentMethodId,
      },
    });

    if (response?.paymentStatus == 500) {
      return res.status(500).json({
        success: false,
        ...response,
      });
    }

    return res.status(200).json({
      success: true,
      ...response,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

const handleAutoPayment = async ({ paymentAttempt, loggedInUser }) => {
  const payPercentage = await prisma.payoutPercentage.findFirst();
  let totalPercentage = payPercentage
    ? payPercentage.signup + payPercentage.productReferral
    : 0;

  let user = await prisma.user.findFirst({ where: { id: loggedInUser?.id } });

  if (user.referrerId && payPercentage?.signup) {
    let stripePayout = await prisma.stripePayout.create({
      data: {
        amount: parseFloat(
          ((paymentAttempt.totalPrice * totalPercentage) / 100).toFixed(2)
        ),
        metadata: JSON.stringify({
          collection: "referralInvite",
          referralType: "signup",
        }),
        type: "referral",
        payoutUserId: user.referrerId,
      },
    });

    const getWebstribeId = await prisma.webStripe.findFirst({
      where: {
        userId: user.referrerId,
      },
    });

    let account = getWebstribeId
      ? await stripe.accounts.retrieve(getWebstribeId.customerId)
      : null;

    let withdrawType = await prisma.earningWithdrawAccess.findFirst();

    if (withdrawType.type == "instant") {
      if (account?.payouts_enabled) {
        //transfer money
        const payout = await stripe.transfers.create({
          amount: stripePayout.amount * 100,
          currency: "usd",
          destination: account.id,
        });

        //transfer money
        if (payout) {
          await prisma.stripePayout.update({
            where: {
              id: stripePayout.id,
            },
            data: {
              isWithdraw: true,
            },
          });
        }

        await prisma.notification.create({
          data: {
            type: "GENERAL",
            title: `$${stripePayout.amount} has claim successfully!`,
            message: `We have transfer $${stripePayout.amount} to your stripe account successfully!`,
            userId: user.referrerId,
          },
        });
      } else {
        await prisma.notification.create({
          data: {
            type: "GENERAL",
            title: `You Earn $${stripePayout.amount} from referral!`,
            message: `To claim your money, Click, Here to connect your stripe account.`,
            userId: user.referrerId,
            url: `${process.env.NEXT_PUBLIC_APP_URL}/profile/wallet`,
          },
        });
      }
    }
  }
};

const assignedCards = async ({ paymentAttempt, loggedInUser }) => {
  let user = await prisma.user.findFirst({ where: { id: loggedInUser } });
  let purchaseCardId = null;


  if (!paymentAttempt?.extraProductId) {
    const getAvailablePurchasecard = await prisma.nFTPurchaseCard.findFirst({
      where: {
        nftEntityId: paymentAttempt?.entityId,
        status: {
          equals: "UNASSIGNED",
        },
      },
    });

    let updatedPurcahseCard = await prisma.nFTPurchaseCard.update({
      where: {
        id: getAvailablePurchasecard.id,
      },
      data: {
        purchaseDatetime: new Date(),
        purchasePrice: 20,
        cardIssueType: paymentAttempt.cardIssueType,
        bundleType: "athlete",
        currentOwner: {
          connect: { id: user.id },
        },
        status: "ASSIGNED",
        productId: paymentAttempt.entityId,
      },
    });

    purchaseCardId = updatedPurcahseCard?.id;
  }

  let [mintCard, purchaseCard] = await Promise.all([
    prisma.nFTMintCard.findFirst({
      where: {
        nftEntityId: paymentAttempt?.entityId,
        currentOwnerId: user?.id,
      },
    }),
    prisma.nFTPurchaseCard.findFirst({
      where: {
        nftEntityId: paymentAttempt?.entityId,
        currentOwnerId: user?.id,
      },
    }),
  ]);

  purchaseCardId = mintCard?.id || purchaseCard?.id;

  if (!purchaseCardId) {
    return {
      paymentStatus: 500,
      data: {
        cards: null,
      },
      error: paymentStatus[500],
    };
  }

  let assignEnh = await prisma.nFTMajorEnhancementPurchase.create({
    data: {
      nftMajorEnhancementId: paymentAttempt?.productId,
      purchaseId: purchaseCardId,
    },
    include: {
      nftMajorEnhancement: {
        select: {
          cardNFTImage: true,
        },
      },
    },
  });

  return {
    paymentStatus: 600,
    data: {
      cards: [getEventImage({
        image: assignEnh?.nftMajorEnhancement?.cardNFTImage,
      })],
    },
    error: paymentStatus[600],
  };
};

// Wrap the handler with methodGuard to allow only PUT requests
export default methodGuard({
  allowedMethod: "POST",
  isAuthRequired: true,
  handler,
});
