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
    const {
      email,
      profileImage,
      username,
      firstName,
      lastName,
      dob,
      gender,
      instgramId,
      position,
      sport,
      school,
    } = req.body;

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
          role : "Athlete"
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

    let checkIsWishlisted = await prisma.athleteWaitlist.findFirst({
      where: {
        email,
      },
    });

    if (checkIsWishlisted) {
      return res.status(200).json({
        success: true,
        data: response,
        message: `Profile Completed Successfully!`,
      });
    }

    let waitlist = await prisma.athleteWaitlist.create({
      data: {
        email,
        name: `${firstName} ${lastName ? lastName : ""}`,
        tribeName: school,
        position,
        sport,
        socialMedia: instgramId,
        
      },
    });

    return res.status(200).json({
      success: true,
      data: { ...response, isWaitlisted: waitlist.isApproved },
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
