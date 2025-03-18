import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email } = req.query;

    const user = await prisma.user.findFirst({
      where: {
        email: email as string,
      },
    });

    if(user && user?.role  !== "Athlete"){
        return res.status(500).json({error : "Opps's, You cannot use this email."});
    }

    if(!user){
        await prisma.athleteWaitlist.create({
            data :{
                email : email as string,
            }
        })
    }

    res.status(200).json({user});
  } catch (err) {
    res.status(500).json({ error: "Account Not Found!, Fill up waitlist form to join MVPz." });
  }
}
