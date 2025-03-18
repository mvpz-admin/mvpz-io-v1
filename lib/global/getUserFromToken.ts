import cookie from "cookie";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../utils/global/global";
import prisma from "../prisma";

export const isLoginUser = async ({ req }) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.token;

  if (!token) {
    return false;
  }

  const decoded = jwt.verify(token, JWT_SECRET_KEY) as { email: string };

  if (!decoded.email) {
    return false;
  }

  let user = await prisma.user.findFirst({
    where: {
      email: decoded.email,
    },
    select: {
      id: true,
      email: true,
      username: true,
    },
  });

  return user;
};
