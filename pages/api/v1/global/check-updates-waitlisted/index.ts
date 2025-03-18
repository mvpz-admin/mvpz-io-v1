import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import { methodGuard } from "../../../../../utils/global/methodNotAllowed";
import { isLoginUser } from "../../../../../lib/global/getUserFromToken";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user : any = await isLoginUser({ req });
   let getWaitlist = await prisma.athleteWaitlist.findFirst({
    where : {
      email : user?.email
    },
   })
    return res.status(200).json({
      success: true,
      data: getWaitlist.isApproved,
      message: `All tribes Options Loaded SuccessFully`,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Wrap the handler with methodGuard to allow only GET requests
export default methodGuard({
  allowedMethod: "GET",
  isAuthRequired: true,
  handler,
});
