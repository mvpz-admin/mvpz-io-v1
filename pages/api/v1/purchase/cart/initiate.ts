import { NextApiRequest, NextApiResponse } from "next";
import { methodGuard } from "../../../../../utils/global/methodNotAllowed";
import { isLoginUser } from "../../../../../lib/global/getUserFromToken";
import prisma from "../../../../../lib/prisma";
import { BB_BASE_URL } from "../../../../../utils/global/global";

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
    const { cart } = req.body; // Array of cart items

    if (cart.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid cart items",
      });
    }

    let totalCartPrice = 0;
    const lineItems = [];
    const paymentCartItems = [];

    // Process each item in cart
    for (const item of cart) {
      switch (item?.productType) {
        case "card":
          let card = item?.card;
          let getBaseCard = await prisma.nFTMajorEnhancement.findFirst({
            where: {
              id: card?.baseCard?.id,
            },
            include: {
              avatar: true,
              enhancementPurchases: true,
              type: true,
              nftEntity: true,
            },
          });

          // if first time minting
          if (!card?.baseCard?.serialNumber) {
            let checkPurchaseAvailable = await prisma.nFTPurchaseCard.findFirst(
              {
                where: {
                  nftEntityId: getBaseCard?.nftEntity?.id,
                  status: {
                    equals: "UNASSIGNED",
                  },
                  isMinted: false,
                },
              }
            );

            if (!checkPurchaseAvailable) {
              return res.status(500).json({
                success: false,
                error:
                  "Enhancement card is sold out! You need a enhancement card to buy an enhancement card. Check the marketplace to see if anyone is selling one.",
              });
            }

            let checkEnhancmentAvailable = await Promise.all(
              card?.cardProductEnhancementCard?.map(async (data) => {
                let checkEnhancment = await prisma.nFTMajorEnhancementPurchase
                  .findFirst({
                    where: {
                      nftMajorEnhancementId: data?.id,
                      status: {
                        equals: "UNASSIGNED",
                      },
                      isMinted: false,
                    },
                    include: {
                      nftMajorEnhancement: true,
                    },
                  })
                  .then((res) => {
                    return {
                      purchaseId: res?.id,
                      enhId: res?.nftMajorEnhancement?.id,
                      enhprice: res?.nftMajorEnhancement?.price,
                      enhTitle: res?.nftMajorEnhancement?.title,
                    };
                  });

                if (!checkEnhancment) {
                  return res.status(500).json({
                    success: false,
                    error:
                      "Enhancement card is sold out! You need a enhancement card to buy an enhancement card. Check the marketplace to see if anyone is selling one.",
                  });
                }
                return checkEnhancment;
              })
            );

            if (!checkPurchaseAvailable) {
              return res.status(500).json({
                success: false,
                error:
                  "Base card is sold out! You need a base card to buy an enhancement card. Check the marketplace to see if anyone is selling one.",
              });
            }

            let baseCardPrice = card?.baseCard?.serialNumber ? 0 : getBaseCard?.price || 0;
            let allEnhancementPrice = checkEnhancmentAvailable?.reduce(
              (acc, curr) => acc + (curr?.enhprice || 0),
              0
            ) || 0;

            const totalAmount = Math.round((baseCardPrice + allEnhancementPrice) * 100);

            lineItems.push({
              price_data: {
                currency: "usd",
                product_data: {
                  name: getBaseCard?.title,
                  description:
                    card?.cardProductEnhancementCard?.length > 0
                      ? `Digital Card - ${getBaseCard?.title}`
                      : `Digital Card - ${getBaseCard?.title} & ${card?.cardProductEnhancementCard?.length} enhancement`,
                  images: [
                    card?.baseCard?.thumnail,
                    ...(card?.cardProductEnhancementCard?.map(data => data?.image) || [])
                  ].filter(Boolean),
                },
                unit_amount: totalAmount,
              },
              quantity: 1,
            });

          
            let cardItem = {
              nftEntityId: getBaseCard?.nftEntity?.id,
              baseCard: {
                nftEntityId: getBaseCard?.nftEntity?.id,
                assignOnSerialNumber: null,
                purchaseCardId: checkPurchaseAvailable?.id,
                cardSerialNumber: checkPurchaseAvailable?.cardSerialNumber,
              },
              enhancementCards: checkEnhancmentAvailable,
            };

            

            paymentCartItems.push({
              productId: getBaseCard?.id,
              productType: "card",
              entityId: getBaseCard?.nftEntity?.id,
              cardItem,
              quantity: 1 + checkEnhancmentAvailable?.length,
            });

            await prisma.nFTPurchaseCard.update({
              where: { id: cardItem?.baseCard?.purchaseCardId },
              data: {
                isMinted: true,
              },
            });

            await Promise.all(
              cardItem?.enhancementCards?.map(async (data) => {
                await prisma.nFTMajorEnhancementPurchase.update({
                  where: { id: data?.purchaseId },
                  data: {
                    isMinted: true,
                  },
                });
              })
            )
            

          }else{
            let checkPurchaseAvailable = await prisma.nFTPurchaseCard.findFirst(
              {
                where: {
                  nftEntityId: getBaseCard?.nftEntity?.id,
                  currentOwnerId : user?.id,
                  cardSerialNumber : card?.baseCard?.serialNumber,
                },
              }
            );

            if (!checkPurchaseAvailable) {
              return res.status(500).json({
                success: false,
                error:
                  "Internal Server Error",
              });
            }

 
            let checkEnhancmentAvailable = await Promise.all(
              card?.cardProductEnhancementCard?.map(async (data) => {
                let checkEnhancment = await prisma.nFTMajorEnhancementPurchase
                  .findFirst({
                    where: {
                      nftMajorEnhancementId: data?.id,
                      status: {
                        equals: "UNASSIGNED",
                      },
                      isMinted: false,
                    },
                    include: {
                      nftMajorEnhancement: true,
                    },
                  })
                  .then((res) => {
                    return {
                      purchaseId: res?.id,
                      enhId: res?.nftMajorEnhancement?.id,
                      enhprice: res?.nftMajorEnhancement?.price,
                      enhTitle: res?.nftMajorEnhancement?.title,
                    };
                  });

                if (!checkEnhancment) {
                  return res.status(500).json({
                    success: false,
                    error:
                      "Enhancement card is sold out! You need a enhancement card to buy an enhancement card. Check the marketplace to see if anyone is selling one.",
                  });
                }
                return checkEnhancment;
              })
            );

            let baseCardPrice =  card?.baseCard?.serialNumber ? 0 :  getBaseCard?.price || 0;
            let allEnhancementPrice = checkEnhancmentAvailable?.reduce(
              (acc, curr) => acc + (curr?.enhprice || 0),
              0
            ) || 0;

            const totalAmount = Math.round((baseCardPrice + allEnhancementPrice) * 100);

            lineItems.push({
              price_data: {
                currency: "usd",
                product_data: {
                  name: getBaseCard?.title,
                  description:
                  card?.baseCard?.serialNumber 
                      ? `${card?.cardProductEnhancementCard?.length} enhancement`
                      : `Digital Card - ${getBaseCard?.title} & ${card?.cardProductEnhancementCard?.length} enhancement`,
                  images: [
                    card?.baseCard?.thumnail,
                    ...(card?.cardProductEnhancementCard?.map(data => data?.image) || [])
                  ].filter(Boolean),
                },
                unit_amount: totalAmount,
              },
              quantity: card?.baseCard?.serialNumber  ? checkEnhancmentAvailable?.length : 1 + checkEnhancmentAvailable?.length,
            });



            let cardItem = {
              nftEntityId: getBaseCard?.nftEntity?.id,
              baseCard: {
                nftEntityId: getBaseCard?.nftEntity?.id,
                assignOnSerialNumber: card?.baseCard?.serialNumber,
                purchaseCardId: checkPurchaseAvailable?.id,
                cardSerialNumber: null,
              },
              enhancementCards: checkEnhancmentAvailable,
            };

            

            paymentCartItems.push({
              productId: getBaseCard?.id,
              productType: "card",
              entityId: getBaseCard?.nftEntity?.id,
              cardItem,
              quantity: 1 + checkEnhancmentAvailable?.length,
            });

            await prisma.nFTPurchaseCard.update({
              where: { id: cardItem?.baseCard?.purchaseCardId },
              data: {
                isMinted: true,
              },
            });

            await Promise.all(
              cardItem?.enhancementCards?.map(async (data) => {
                await prisma.nFTMajorEnhancementPurchase.update({
                  where: { id: data?.purchaseId },
                  data: {
                    isMinted: true,
                  },
                });
              })
            )

          }
          break;

        case "pack":
          break;

        case "apparel":
          let apparel = item?.apparel;

          let findApparel = await prisma.apparel.findFirst({
            where: {
              id: apparel?.id,
            },
          });

          if(!findApparel){
            return res.status(500).json({
              success: false,
              error: "Apparel not found",
            });
          }

          // Convert price to cents for Stripe and ensure it's a number
          const priceInCents = Math.round(parseFloat(apparel.price) * 100);

          lineItems.push({
            price_data: {
              currency: "usd",
              product_data: {
                name: apparel?.title,
                description: `Apparel - ${apparel?.title}, Size: ${apparel?.size}, Quantity: ${apparel?.qty}`,
                images: [apparel?.thumbnail].filter(Boolean),
              },
              unit_amount: priceInCents,
            },
            quantity: apparel.qty,
          });

          let apparelItem = {
            apparelId: apparel?.id,
            quantity: apparel?.qty,
            price: parseFloat(apparel?.price), // Convert string price to float
            size: apparel?.size,
          };

          paymentCartItems.push({
            productId: apparel?.id,
            productType: "apparel",
            apparelItem,
          });

          break;

        default:
          return res.status(400).json({
            success: false,
            error: `Invalid product type: ${item?.productType}`,
          });
      }
    }

    // Create payment attempt for the entire cart
    const paymentAttempt = await prisma.paymentAttempt.create({
      data: {
        user: { connect: { id: user?.id } },
        totalPrice: parseFloat(totalCartPrice.toFixed(2)),
        paymentStatus: "INITIATED",
        productType: cart[0]?.productType || "card",
        cardItems: {
          create: paymentCartItems.filter(item => item.productType === "card").map(item => item.cardItem)
        },
        packItems: {
          create: paymentCartItems.filter(item => item.productType === "pack").map(item => item.packItem)
        },
        apparelItems: {
          create: paymentCartItems.filter(item => item.productType === "apparel").map(item => item.apparelItem)
        },
        quantity: 1,
      },
    });

    const stripeSession = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: lineItems,
      payment_intent_data: {
        metadata: {
          payment_attempt_id: paymentAttempt.id.toString(),
        },
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cart/success?paymentId=${paymentAttempt.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cart/failure?paymentId=${paymentAttempt.id}`,
      allow_promotion_codes: true,
      shipping_address_collection: {
        allowed_countries: [
          "AC",
          "AD",
          "AE",
          "AF",
          "AG",
          "AI",
          "AL",
          "AM",
          "AO",
          "AQ",
          "AR",
          "AT",
          "AU",
          "AW",
          "AX",
          "AZ",
          "BA",
          "BB",
          "BD",
          "BE",
          "BF",
          "BG",
          "BH",
          "BI",
          "BJ",
          "BL",
          "BM",
          "BN",
          "BO",
          "BQ",
          "BR",
          "BS",
          "BT",
          "BV",
          "BW",
          "BY",
          "BZ",
          "CA",
          "CD",
          "CF",
          "CG",
          "CH",
          "CI",
          "CK",
          "CL",
          "CM",
          "CN",
          "CO",
          "CR",
          "CV",
          "CW",
          "CY",
          "CZ",
          "DE",
          "DJ",
          "DK",
          "DM",
          "DO",
          "DZ",
          "EC",
          "EE",
          "EG",
          "EH",
          "ER",
          "ES",
          "ET",
          "FI",
          "FJ",
          "FK",
          "FO",
          "FR",
          "GA",
          "GB",
          "GD",
          "GE",
          "GF",
          "GG",
          "GH",
          "GI",
          "GL",
          "GM",
          "GN",
          "GP",
          "GQ",
          "GR",
          "GS",
          "GT",
          "GU",
          "GW",
          "GY",
          "HK",
          "HN",
          "HR",
          "HT",
          "HU",
          "ID",
          "IE",
          "IL",
          "IM",
          "IN",
          "IO",
          "IQ",
          "IS",
          "IT",
          "JE",
          "JM",
          "JO",
          "JP",
          "KE",
          "KG",
          "KH",
          "KI",
          "KM",
          "KN",
          "KR",
          "KW",
          "KY",
          "KZ",
          "LA",
          "LB",
          "LC",
          "LI",
          "LK",
          "LR",
          "LS",
          "LT",
          "LU",
          "LV",
          "LY",
          "MA",
          "MC",
          "MD",
          "ME",
          "MF",
          "MG",
          "MK",
          "ML",
          "MM",
          "MN",
          "MO",
          "MQ",
          "MR",
          "MS",
          "MT",
          "MU",
          "MV",
          "MW",
          "MX",
          "MY",
          "MZ",
          "NA",
          "NC",
          "NE",
          "NG",
          "NI",
          "NL",
          "NO",
          "NP",
          "NR",
          "NU",
          "NZ",
          "OM",
          "PA",
          "PE",
          "PF",
          "PG",
          "PH",
          "PK",
          "PL",
          "PM",
          "PN",
          "PR",
          "PS",
          "PT",
          "PY",
          "QA",
          "RE",
          "RO",
          "RS",
          "RU",
          "RW",
          "SA",
          "SB",
          "SC",
          "SD",
          "SE",
          "SG",
          "SH",
          "SI",
          "SJ",
          "SK",
          "SL",
          "SM",
          "SN",
          "SO",
          "SR",
          "SS",
          "ST",
          "SV",
          "SX",
          "SZ",
          "TA",
          "TC",
          "TD",
          "TF",
          "TG",
          "TH",
          "TJ",
          "TK",
          "TL",
          "TM",
          "TN",
          "TO",
          "TR",
          "TT",
          "TV",
          "TW",
          "TZ",
          "UA",
          "UG",
          "US",
          "UY",
          "UZ",
          "VA",
          "VC",
          "VE",
          "VG",
          "VN",
          "VU",
          "WF",
          "WS",
          "XK",
          "YE",
          "YT",
          "ZA",
          "ZM",
          "ZW",
          "ZZ",
        ],
      },
      shipping_options: [],
    });

    await prisma.paymentAttempt.update({
      where: { id: paymentAttempt.id },
      data: {
        stripeCheckoutLink: stripeSession.url,
        stripeCheckoutId: stripeSession.id,
      },
    });

    return res.status(200).json({
      success: true,
      data: { checkoutUrl: stripeSession.url },
      message: "Stripe Checkout Created Successfully!",
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export default methodGuard({
  allowedMethod: "POST",
  isAuthRequired: true,
  handler,
});
