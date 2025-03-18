import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "./global";

type MethodGuardOptions = {
  allowedMethod: "GET" | "POST" | "PUT" | "DELETE";
  isAuthRequired: boolean;
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
};

export function methodGuard({
  allowedMethod,
  isAuthRequired,
  handler,
}: MethodGuardOptions) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    // Check if method is allowed
    if (req.method !== allowedMethod) {
      res.setHeader("Allow", allowedMethod);
      return res
        .status(405)
        .json({ error: `Method ${req.method} Not Allowed` });
    }

    // Check if auth is required
    if (isAuthRequired) {
      const cookies = cookie.parse(req.headers.cookie || "");
      const token = cookies.token;
      

      if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const decoded = jwt.verify(token, JWT_SECRET_KEY) as { email: string };

      if (!decoded.email) {
        return res.status(400).json({ error: "Invalid token format" });
      }
    }

    return handler(req, res);
  };
}
