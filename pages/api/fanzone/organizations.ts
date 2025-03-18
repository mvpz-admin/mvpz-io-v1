import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const organisationWithFullName = await prisma.organisation.findMany({
      select: {
        id : true,
        name: true,
      },
    });

 

    return res.status(200).json({ names: organisationWithFullName });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
