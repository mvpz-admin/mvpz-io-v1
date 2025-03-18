import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import { methodGuard } from "../../../../../utils/global/methodNotAllowed";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

   let getAlltribes = await prisma.tribe.findMany({
    select : {
       tribeId :  true,
       tribeShortName : true 
    },
   })?.then((res) => res.map((data) => ({id : data.tribeId, label : data.tribeShortName})))

    return res.status(200).json({
      success: true,
      data: getAlltribes,
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
  isAuthRequired: false,
  handler,
});
