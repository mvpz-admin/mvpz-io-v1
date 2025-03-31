import { NextApiRequest, NextApiResponse } from "next";
import { methodGuard } from "../../utils/global/methodNotAllowed";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
 
    console.log("hellow");
    
    
    return res.status(201).json({
        success: true,
        message: `User followed Successfully!`,
      });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Wrap the handler with methodGuard to allow only GET requests
export default methodGuard({
  allowedMethod: "POST",
  isAuthRequired: false,
  handler,
});
