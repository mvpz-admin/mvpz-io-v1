import { NextApiRequest, NextApiResponse } from "next";
import { BB_BASE_URL } from "../../../../../utils/global/global";
import prisma from "../../../../../lib/prisma";
import { isLoginUser } from "../../../../../lib/global/getUserFromToken";
import { methodGuard } from "../../../../../utils/global/methodNotAllowed";


const getEventImage = ({ image }) => {
  if (!image) return null;
  if (image.includes("https://")) {
    return image;
  } else {
    return `${BB_BASE_URL}${image}`;
  }
};

const getApparelProduct = async ({productId}) => {
  return await prisma.apparel
    .findFirst({
      where: {
        id: productId,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        thumbnail: true,
        tags: true,
        price: true,
        discountPercent: true,
        sizeQuantities: true,
        images: true,
        productInfo: true,
        tribeId: true,
        athleteId: true,
        tribe: {
          select: {
            id: true,
            tribeName: true,
            tribeLogo: true,
          },
        },
        athlete: {
          select: {
            id: true,
            name: true,
            username: true,
            profileImage: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    .then((res) => ({
        ...res,
        thumbnail: getEventImage({ image: res.thumbnail }),
        images: res.images.map((image) => getEventImage({ image })),
        tribe: res.tribe
          ? {
              ...res.tribe,
              tribeLogo: getEventImage({ image: res.tribe.tribeLogo }),
            }
          : null,
        athlete: res.athlete
          ? {
              ...res.athlete,
              profileImage: getEventImage({
                image: res.athlete.profileImage,
              }),
            }
          : null,
        price: {
          netPrice: res.discountPercent
            ? Number(
                res.price * (1 - res.discountPercent / 100)
              )?.toFixed(2)
            : Number(res?.price).toFixed(2),
          orignalPrice: Number(res?.price).toFixed(2),
          discount: res?.discountPercent,
        },
        isNewArrival: res.tags.includes("NEW_ARRIVAL"),
      })
    );
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user = await isLoginUser({ req });
    const productId = req.query.productId as string;

    const products = await getApparelProduct({productId});

    return res.status(200).json({
      success: true,
      data: products,
      message: `Apparel Products Loaded Successfully`,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Wrap the handler with methodGuard to allow only GET requests
export default methodGuard({
  allowedMethod: "GET",
  isAuthRequired: false,
  handler,
});
