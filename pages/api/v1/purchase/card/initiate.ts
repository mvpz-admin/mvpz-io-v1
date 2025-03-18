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
    const body = req.body;
    const { id: cardId } = body;

    let checkAvaCard = await prisma.nFTMajorEnhancement
      .findFirst({
        where: {
          id: cardId,
        },
        select: {
          id: true,
          title: true,
          description: true,
          cardNFTImage: true,
          price: true,
          nftEntity: {
            select: {
              id: true,
              price: true,
              puchaseCards: {
                where: {
                  status: {
                    equals: "UNASSIGNED",
                  },
                },
              },
            },
          },
        },
      })
      .then((res) => {
        let { nftEntity, ...otherData } = res;
        return {
          ...otherData,
          nftEntity: {
            ...nftEntity,
            avaBaseCard: nftEntity.puchaseCards?.length,
          },
        };
      });

    if (checkAvaCard?.nftEntity?.avaBaseCard == 0) {
      return res.status(500).json({
        success: false,
        error:
          "Base card is sold out! You need a base card to buy an enhancement card. Check the marketplace to see if anyone is selling one.",
      });
    }

    const checkIfBaseCardIsAavailable = await prisma.nFTPurchaseCard.findFirst({
      where: {
        nftEntityId: checkAvaCard?.nftEntity?.id,
        status: "UNASSIGNED",
      },
    });


    const checkUserHasBaseCard = await prisma.nFTPurchaseCard.findFirst({
      where : {
        nftEntityId : checkAvaCard?.nftEntity?.id,
        currentOwnerId : user?.id
      }
    })

    let baseCardPrice = !checkIfBaseCardIsAavailable
      ? checkAvaCard?.nftEntity?.price
      : 0;
    const totalPrice = (checkAvaCard?.price || 20) + baseCardPrice;

    const paymentAttempt = await prisma.paymentAttempt.create({
      data: {
        user: { connect: { id: user?.id } },
        quantity: 1,
        totalPrice: parseFloat(totalPrice.toFixed(2)),
        paymentStatus: "INITIATED",
        entityId: checkAvaCard?.nftEntity?.id,
        productId: checkAvaCard?.id,
        extraProductId: checkUserHasBaseCard?.id,
        cardIssueType: "digital",
        packQuantity: 1,
      },
    });

    const stripeSession = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: checkAvaCard.title,
              description: checkAvaCard?.description || `${checkAvaCard?.title} card`,
              images: [getEventImage({ image: checkAvaCard?.cardNFTImage })],
            },
            unit_amount: Math.round(totalPrice * 100),
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
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/card/success?paymentId=${paymentAttempt.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/card/failure?paymentId=${paymentAttempt.id}`,
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
      where: {
        id: paymentAttempt.id,
      },
      data: {
        stripeCheckoutLink: stripeSession.url,
        stripeCheckoutId: stripeSession.id,
      },
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

// Wrap the handler with methodGuard to allow only PUT requests
export default methodGuard({
  allowedMethod: "POST",
  isAuthRequired: true,
  handler,
});
