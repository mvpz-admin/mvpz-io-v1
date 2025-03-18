import { NextApiRequest, NextApiResponse } from "next";
import getB2TokenForFileDownload from "../../../lib/backBlaze";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const org = await prisma.organisation.findMany({
        include: {
          tribe: {
            where: {
              isPrimary: true,
            },
          },
        },
      });

      if (!org) {
        res.status(500).json({
          success: false,
          data: {
            orgList: [],
            error: `Internal Server Error`,
          },
        });
      }

      return res.status(300).json({
        success: true,
        data: {
          orgList: org?.filter((_) =>  _.deactivate !== true && !_.isDeleted),
          message: "Org. Found" ,
        },
      });
    } else {
      res.status(405).json({
        success: false,
        data: {
          orgList: [],
          error: `Method Not Allowed`,
        },
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ roleDataList: [], error: "Internal server error" });
  }
}
