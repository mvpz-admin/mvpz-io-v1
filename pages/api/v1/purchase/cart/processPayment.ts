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
      include: {
        apparelItems: true, // Include cart items
        cardItems: true, // Include cart items
        packItems: true, // Include cart items
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

    // Handle payment method creation
    let paymentMethodId = await handlePaymentMethod(
      stripeCheckoutSession,
      user
    );

    // Handle shipping address
    if (stripeCheckoutSession?.shipping_details) {
      await createShippingAddress(
        stripeCheckoutSession,
        user,
        paymentAttempt.id
      );
    }

    // Process each cart item based on product type
    const processResults = await processCartItems(paymentAttempt, user);

    // Handle auto payment (referral system)
    await handleAutoPayment({ paymentAttempt, loggedInUser: user?.id });

    // Update payment attempt status
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

    // Check for any processing errors
    const hasErrors = processResults.some(
      (result) => result.paymentStatus === 500
    );
    if (hasErrors) {
      return res.status(500).json({
        success: false,
        results: processResults,
      });
    }

    return res.status(200).json({
      success: true,
      data: processResults,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handlePaymentMethod(stripeCheckoutSession, user) {
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
  return paymentMethodId;
}

async function createShippingAddress(
  stripeCheckoutSession,
  user,
  paymentAttemptId
) {
  let addressResponse = await prisma.userAddress.create({
    data: {
      type: "Shipping",
      name: stripeCheckoutSession.shipping_details.name,
      city: stripeCheckoutSession.shipping_details.address?.city,
      country: stripeCheckoutSession.shipping_details.address?.country,
      line1: stripeCheckoutSession.shipping_details.address?.line1,
      line2: stripeCheckoutSession.shipping_details.address?.line2,
      postalCode: stripeCheckoutSession.shipping_details.address?.postal_code,
      state: stripeCheckoutSession.shipping_details.address?.state,
      userId: user?.id,
    },
  });

  await prisma.paymentAttempt.update({
    where: {
      id: paymentAttemptId,
    },
    data: {
      addressId: addressResponse.id,
    },
  });
}

async function processCartItems(paymentAttempt, user) {
  const results = [];

  // Process card items
  if (paymentAttempt.cardItems && paymentAttempt.cardItems.length > 0) {
    const cardResult = await processCard(paymentAttempt, user);
    results.push(cardResult);
  }

  // Process pack items
  if (paymentAttempt.packItems && paymentAttempt.packItems.length > 0) {
    results.push({
      paymentStatus: 600,
      productType: "pack",
      message: "Pack processing not implemented yet",
    });
  }

  // Process apparel items
  if (paymentAttempt.apparelItems && paymentAttempt.apparelItems.length > 0) {
    const apparelResult = await processApparel(paymentAttempt, user);
    results.push(apparelResult);
  }

  return results;
}

async function processCard(paymentAttempt, user) {
  let data = await Promise.all(
    paymentAttempt.cardItems.map(async (cardItem) => {
      const { nftEntityId, assignOnSerialNumber, purchaseCardId } =
        cardItem.baseCard as {
          nftEntityId: string;
          assignOnSerialNumber: string | null;
          purchaseCardId: string;
        };

      const enhancementCards = cardItem.enhancementCards as Array<{
        purchaseId: string;
        enhId: string;
        enhPrice: number;
        enhTitle: string;
      }>;

      let getBaseCard;

      if (!assignOnSerialNumber) {
        getBaseCard = await prisma.nFTPurchaseCard
          .update({
            where: {
              id: purchaseCardId,
            },
            data: {
              purchaseDatetime: new Date(),
              purchasePrice: cardItem.price,
              cardIssueType: "digital",
              bundleType: "athlete",
              currentOwner: {
                connect: { id: user.id },
              },
              status: "ASSIGNED",
              productId: nftEntityId,
            },
            select: {
              id: true,
              nftEntity: {
                select: { title: true, description: true, cardImageNFT: true },
              },
            },
          })
          .then((res) => ({
            ...res.nftEntity,
            purchaseCardId: res.id,
            cardImageNFT: getEventImage({ image: res.nftEntity.cardImageNFT }),
          }));
      } else {
        getBaseCard = await prisma.nFTPurchaseCard
          .findFirst({
            where: {
              cardSerialNumber: assignOnSerialNumber,
            },
            select: {
              id: true,
              nftEntity: {
                select: { title: true, description: true, cardImageNFT: true },
              },
            },
          })
          .then((res) => ({
            ...res.nftEntity,
            purchaseCardId: res.id,
            cardImageNFT: getEventImage({ image: res.nftEntity.cardImageNFT }),
          }));
      }

      let getEnhancementCards = await Promise.all(
        enhancementCards.map(async (enhancementCard) => {
          return await prisma.nFTMajorEnhancementPurchase
            .update({
              where: {
                id: enhancementCard.purchaseId,
              },
              data: {
                status: "ASSIGNED",
                purchaseId: getBaseCard.purchaseCardId,
              },
              select: {
                id: true,
                nftMajorEnhancement: {
                  select: {
                    title: true,
                    description: true,
                    cardNFTImage: true,
                  },
                },
              },
            })
            .then((res) => ({
              ...res.nftMajorEnhancement,
              purchaseId: res.id,
              cardNFTImage: getEventImage({
                image: res.nftMajorEnhancement.cardNFTImage,
              }),
            }));
        })
      );

      return {
        baseCard: getBaseCard,
        enhancementCards: getEnhancementCards,
      };
    })
  );

  return {
    paymentStatus: 600,
    productType: "card",
    data: {
      cards: data,
    },
    message: paymentStatus[600],
  };
}

async function processApparel(paymentAttempt, user) {
  // Create a single order for all apparel items
  let getPaymentAddress = await prisma.paymentAttempt.findFirst({
    where: {
      id: paymentAttempt.id,
    },
    select: {
      addressId: true,
    },
  });

  // Create a single order for all items
  const apparelOrder = await prisma.apparelOrder.create({
    data: {
      size: paymentAttempt.apparelItems[0].size, // Use first item's size or handle multiple sizes differently
      orderNumber: paymentAttempt.id,
      userId: user.id,
      productId: paymentAttempt.apparelItems[0].id, // You might need to handle this differently
      status: "ORDERED",
      paymentAttemptId: paymentAttempt.id,
      addressId: getPaymentAddress?.addressId,
    },
  });

  // Get apparel info for all items
  let data = await Promise.all(
    paymentAttempt.apparelItems.map(async (apparelItem) => {
      const apparelInfo = await prisma.apparel
        .findFirst({
          where: {
            id: apparelItem.apparelId,
          },
          select: {
            name: true,
            thumbnail: true,
          },
        })
        .then((res) => ({
          ...res,
          thumbnail: getEventImage({ image: res.thumbnail }),
        }));

      return {
        ...apparelOrder,
        ...apparelInfo,
        size: apparelItem.size, // Keep individual item sizes
      };
    })
  );

  return {
    paymentStatus: 200,
    productType: "apparel",
    data: {
      orders: data,
    },
    message: "Apparel order processed successfully!",
  };
}

// Keep the existing handleAutoPayment function
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
            title: `$${stripePayout.amount} has claim successfully!`,
            message: `We have transfer $${stripePayout.amount} to your stripe account successfully!`,
            userId: user.referrerId,
          },
        });
      } else {
        await prisma.notification.create({
          data: {
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

export default methodGuard({
  allowedMethod: "POST",
  isAuthRequired: true,
  handler,
});
