import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import prisma from "../../../lib/prisma";
import { BB_BASE_URL, JWT_SECRET_KEY } from "../../../utils/global/global";

const JWT_SECRET = JWT_SECRET_KEY;

const getEventImage = ({ image }) => {
  if (!image) return null;
  if (image.includes("https://")) {
    return image;
  } else {
    return `${BB_BASE_URL}${image}`;
  }
};

const getCardRequestStatus = async ({userId}) => {
  let response = await  prisma.cardRequest.findFirst({
    where : {
      requestedById :  userId
    },
    select : {
      cardApproval : true
    }
  })

  return response?.cardApproval || null
}

const getAthleteWaitlistStatus = async ({userEmail}) => {
  let response = await  prisma.athleteWaitlist.findFirst({
    where : {
      email : userEmail
    },
    select : {
      isApproved : true
    }
  })

  return response?.isApproved || null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, otp } = req.body;

  if (!email)
    return res.status(400).json({
      success: false,
      error: "Internal Server Error: Please Try Again!",
      redirectTo: "/auth/signin",
    });

  // Check if OTP exists and is valid
  const otpRecord = await prisma.oTP.findUnique({
    where: { email },
  });

  if (
    !otpRecord ||
    otpRecord.otpCode !== otp ||
    new Date() > new Date(otpRecord.expiresAt)
  ) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid or expired OTP" });
  }

  // Delete OTP after verification
  await prisma.oTP.delete({ where: { email } });

  let user = await prisma.user
    .findUnique({
      where: { email },
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
      profileImage: getEventImage({
        image:
          res?.profileImage ||
          "https://res.cloudinary.com/dv667zlni/image/upload/v1741476585/cat_nlpfmw.png",
      }),
      bannerImage: getEventImage({ image: res?.bannerImage }),
    }));

  if (!user?.email) {
    let response = await prisma.user
      .create({
        data: {
          email: email,
          profileImage:
              "https://res.cloudinary.com/dv667zlni/image/upload/v1741680187/man_wp3pfp.png",
          isProfileCompleted: false,
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

    const token = jwt.sign({ email: response.email }, JWT_SECRET, {
      expiresIn: "30d",
    });
    

    if (!token) {
      return res.status(400).json({
        success: false,
        error: "Internal Server Error: Please Try Again!",
        redirectTo: "/auth/signin",
      });
    }

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax", // ✅ Ensures cookies are sent in cross-origin requests
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      })
    );

    return res.status(200).json({
      success: true,
      message: "Token set successfully",
      data: {
        user: {...response,
        isCardCreated : await getCardRequestStatus({userId : response?.id})
        },
      },
      token,
    });
  }

  // Generate JWT token
  const token = jwt.sign({ email: user.email }, JWT_SECRET, {
    expiresIn: "30d",
  });

  if (!token) {
    return res.status(400).json({
      success: false,
      error: "Internal Server Error: Please Try Again!",
      redirectTo: "/auth/signin",
    });
  }

  // ✅ Set the cookie properly
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // ✅ Ensures cookies are sent in cross-origin requests
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    })
  );

  return res.status(200).json({
    success: true,
    message: "Token set successfully",
    data: {
      user : {
        ...user,
        isCardCreated : await getCardRequestStatus({userId : user?.id}),
        isWaitlisted : await getAthleteWaitlistStatus({userEmail : user?.email})
      },
    },
    token,
  });
}
