import { NextApiRequest, NextApiResponse } from "next";
import { BB_BASE_URL } from "../../../../utils/global/global";
import prisma from "../../../../lib/prisma";
import { isLoginUser } from "../../../../lib/global/getUserFromToken";
import { methodGuard } from "../../../../utils/global/methodNotAllowed";

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
    const { email, profileImage, username, firstName, lastName, dob, gender } =
      req.body;

    let dateConverstion = new Date(dob);

    let checkUsernameAvailable = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (checkUsernameAvailable) {
      return res.status(200).json({
        success: false,
        message: `Usermame is already taken!`,
      });
    }

    let response = await prisma.user
      .update({
        where: {
          email,
        },
        data: {
          profileImage,
          username,
          name: `${firstName} ${lastName ? lastName : ""}`,
          dob: dateConverstion,
          sex: gender,
          isProfileCompleted: true,
          role: "User",
        },
        select: {
          id: true,
          role: true,
          username: true,
          name: true,
          email: true,
          isVerified: true,
          profileImage: true,
          bannerImage: true,
          isProfileCompleted: true,
        },
      })
      .then((res) => ({
        ...res,
        profileImage: getEventImage({ image: res.profileImage }),
        bannerImage: getEventImage({ image: res.bannerImage }),
      }));

    await prisma.notification.create({
      data: {
        userId: response.id,
        title: "Profile Completed",
        message: "Your profile has been completed successfully!",
      },
    });

    let xPType = await prisma.xPType.findFirst({
      where: {
        name: "Complete Profile",
      },
    });

    let userXpCompleted = await prisma.userXPEarn.count({
      where: {
        xpTypeId: xPType.id,
      },
    });

    if (userXpCompleted <= xPType.limit) {
      await prisma.notification.create({
        data: {
          userId: user.id,
          title: "You have earned 5 XP",
          message: "You have earned 5 XP for completing your profile",
          url: "/rewards",
        },
      });

      await prisma.userXPEarn.create({
        data: {
          userId: user.id,
          xpTypeId: xPType.id,
          xpEarn: xPType.xpValue,
        },
      });
    }
    return res.status(200).json({
      success: true,
      data: response,
      message: `Profile Completed Successfully!`,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Wrap the handler with methodGuard to allow only PUT requests
export default methodGuard({
  allowedMethod: "PUT",
  isAuthRequired: true,
  handler,
});
