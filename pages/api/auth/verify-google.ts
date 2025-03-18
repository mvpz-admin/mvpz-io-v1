import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { BB_BASE_URL, JWT_SECRET_KEY } from "../../../utils/global/global";
import jwt from "jsonwebtoken";
import cookie from "cookie";

const JWT_SECRET = JWT_SECRET_KEY;

const getEventImage = ({ image }) => {
  if (!image) return null;
  if (image.includes("https://")) {
    return image;
  } else {
    return `${BB_BASE_URL}${image}`;
  }
};

const getCardRequestStatus = async ({ userId }) => {
  let response = await prisma.cardRequest.findFirst({
    where: {
      requestedById: userId,
    },
    select: {
      cardApproval: true,
    },
  });

  return response?.cardApproval || null;
};

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

  try {
    const googletoken = req.query.googletoken as string;

    if (!googletoken) {
      return res.status(400).json({
        success: false,
        error: "Token is required",
      });
    }

    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${googletoken}`,
        },
      }
    );

    if (!response.ok) {
      return res.status(400).json({
        success: false,
        error: "Invalid Token or Token Expired",
      });
    }

    const { name, email } = await response.json();

    const peopleResponse = await fetch(
      "https://people.googleapis.com/v1/people/me?personFields=genders,birthdays",
      {
        headers: {
          Authorization: `Bearer ${googletoken}`,
        },
      }
    );

    const peopleData = await peopleResponse.json();

    const rawGender = peopleData.genders?.[0]?.value || null;

    // Extract Gender
    const gender =
      rawGender === "male"
        ? "Male"
        : rawGender === "female"
        ? "Female"
        : "Prefer_Not_To_Say";

    // Extract Date of Birth
    const birthdate = peopleData.birthdays?.[0]?.date || null;
    const dob = birthdate
      ? new Date(`${birthdate.year}-${birthdate.month}-${birthdate.day}`)
      : null;

    let user = await prisma.user
      .findUnique({
        where: { email: email },
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
            role: "User",
            username: `@${email?.split("@")[0]}`,
            name,
            email,
            isVerified: false,
            profileImage:
              "https://res.cloudinary.com/dv667zlni/image/upload/v1741680187/man_wp3pfp.png",
            bannerImage: "",
            sex: gender,
            dob,
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
          user: {
            ...response,
            isCardCreated: await getCardRequestStatus({ userId: response?.id }),
          },
        },
        token,
      });
    }

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
        user: {
          ...user,
          isCardCreated : await getCardRequestStatus({userId : user?.id}),
          isWaitlisted : await getAthleteWaitlistStatus({userEmail : user?.email})
        },
      },
      token,
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error: Please Try Again!",
    });
  }
}
