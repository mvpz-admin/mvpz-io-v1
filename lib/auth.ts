import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "js-cookie";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parseCookies({ req });
  const token = cookies.auth_token; // ✅ Read token from cookies

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
