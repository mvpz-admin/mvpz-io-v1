import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma"; // Adjust path if needed
import cookie from "cookie";
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Get the token from cookies
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };

    if (!decoded.email) {
      return res.status(400).json({ error: "Invalid token format" });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
      select: {
        id: true,
        role: true,
        name: true,
        isVerified: true,
        username: true,
        email: true,
        bannerImage: true,
        isProfileCompleted: true,
        profileImage: true,
      },
    }).then((res) => ({
      ...res,
      profileImage :  getEventImage({image : res.profileImage || "https://res.cloudinary.com/dv667zlni/image/upload/v1741476585/cat_nlpfmw.png"}),
      bannerImage : getEventImage({image : res.bannerImage})
     }))

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
