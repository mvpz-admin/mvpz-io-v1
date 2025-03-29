import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { methodGuard } from "../../../../utils/global/methodNotAllowed";
import { BB_BASE_URL } from "../../../../utils/global/global";
import { isLoginUser } from "../../../../lib/global/getUserFromToken";

const getEventImage = ({ image }) => {
  if (!image) return null;
  if (image.includes("https://")) {
    return image;
  } else {
    return `${BB_BASE_URL}${image}`;
  }
};

const getApparelProducts = async () => {
  return await prisma.apparel
    .findMany({
      where: {
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
    .then((products) =>
      products?.map((product) => ({
        ...product,
        thumbnail: getEventImage({ image: product.thumbnail }),
        images: product.images.map((image) => getEventImage({ image })),
        tribe: product.tribe
          ? {
              ...product.tribe,
              tribeLogo: getEventImage({ image: product.tribe.tribeLogo }),
            }
          : null,
        athlete: product.athlete
          ? {
              ...product.athlete,
              profileImage: getEventImage({
                image: product.athlete.profileImage,
              }),
            }
          : null,
        price: {
          netPrice: product.discountPercent
            ? Number(
                product.price * (1 - product.discountPercent / 100)
              )?.toFixed(2)
            : Number(product?.price).toFixed(2),
          orignalPrice: Number(product?.price).toFixed(2),
          discount: product?.discountPercent,
        },
        isNewArrival: product.tags.includes("NEW_ARRIVAL"),
      }))
    );
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user = await isLoginUser({ req });

    const products = await getApparelProducts();

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
