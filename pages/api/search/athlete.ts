import { NextApiRequest, NextApiResponse } from "next";
import getB2TokenForFileDownload from "../../../lib/backBlaze";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { org,  searchKey, primarySport, primaryPosition } = req.body;

      var whereClause : any = {
        currentSchool : org
      }

      if(primarySport){
        if(primaryPosition){
          return   whereClause = {...whereClause, primarySport, primaryPosition}
        }

        whereClause = {...whereClause, primarySport}
      }else{
        if(searchKey?.length > 0){
          whereClause = {...whereClause, OR : [
            { name: { contains: searchKey as string, mode: "insensitive" } },
            { username: { contains: searchKey as string, mode: "insensitive" } },
          ]}
        }
      }


      const users = await prisma.user.findMany({
        where: whereClause,
        include: {
          socialLinks: true,
          organisation: true,
        },
        orderBy: {
          createdAt: "desc",
        },

      });

      const b2res = (await getB2TokenForFileDownload()) as any;

      // Respond with data
      res.status(200).json({
        success: true,
        data: {
          list: users?.filter((_) => _.isMvpzAccount !== true && _.isMvpzTestingAccount !== true && _.deactivate !== true &&  !_.isDeleted),
          imageDownload: {
            downloadUrl: b2res.downloadUrl,
            authorizationToken: b2res.authorizationToken,
          },
        },
      });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ roleDataList: [], error: "Internal server error" });
  }
}
