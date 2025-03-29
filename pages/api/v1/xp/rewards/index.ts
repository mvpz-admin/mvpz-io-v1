import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import { BB_BASE_URL } from "../../../../../utils/global/global";
import { isLoginUser } from "../../../../../lib/global/getUserFromToken";
import { methodGuard } from "../../../../../utils/global/methodNotAllowed";




async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user : any= await isLoginUser({ req });

    let getAllXp = await prisma.user.findMany({
        where : {

        },
 
  })


    return res.status(200).json({
      success: true,
      data: getAllXp,
      message: `Home Loaded SuccessFully`,
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
