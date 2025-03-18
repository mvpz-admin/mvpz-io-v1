import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import getB2TokenForFileDownload from "../../../../lib/backBlaze";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    
    const shortname = req.query.shortname;
    console.log({shortname});
    
    const org = await prisma.organisation.findFirst({
      where: {
        shortName: shortname as string,
      },
      include : {
        tribe : {
            where : {
                isPrimary : true
            }
        }
      }
    });

    if (!org) {
      return res.status(404).json({
        success: false,
        message: "organisation not found",
      });
    }

    let teamcard;

    if (org) {
      teamcard = await prisma.nFTEntity.findFirst({
        where: {
          type: "Team",
          school: org.name,
        },
      });
    }

    console.log({ success: true, teamcard, org, tribe: org.tribe[0]});
    

    const b2res = (await getB2TokenForFileDownload()) as any;
    res.status(200).json({ success: true, teamcard, org,  imageDownload: {
        downloadUrl: b2res.downloadUrl,
        authorizationToken: b2res.authorizationToken,
      },});
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}
