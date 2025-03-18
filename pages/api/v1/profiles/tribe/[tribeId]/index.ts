import { NextApiRequest, NextApiResponse } from "next";
import { BB_BASE_URL } from "../../../../../../utils/global/global";
import { isLoginUser } from "../../../../../../lib/global/getUserFromToken";
import prisma from "../../../../../../lib/prisma";
import { methodGuard } from "../../../../../../utils/global/methodNotAllowed";


const getEventImage = ({ image }) => {
  if (!image) return null;
  if (image.includes("https://")) {
    return image;
  } else {
    return `${BB_BASE_URL}${image}`;
  }
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user : any = await isLoginUser({ req });
    let tribeId = req.query.tribeId as string;

    const tribe = await prisma.tribe.findFirst({
      where: {
        tribeId,
      },
      select: {
        id : true,
        tribeId : true,
        tribeName : true,
        tribeShortName : true,
        about : true,
        tribeLogo : true,
        tribeHorizontalBanner : true,
        members : {
          where : {
            userId : user?.id
          }
        },
        _count : {
          select : {
            members : true
          }
        }
      },
    })?.then((res) => {
      const {members, ...otherData} = res
      return ({
      ...otherData,
      tribeHorizontalBanner : getEventImage({image : otherData?.tribeHorizontalBanner}),
      tribeLogo : getEventImage({image : otherData?.tribeLogo}),
      isMember : members?.length > 0
    })})

    if(!tribe){
      return res.status(500).json({ error: "Internal Server Error" });
    }
    


    return res.status(200).json({
      success: true,
      data: {
        tribe
      },
      message: `Tribe Loaded SuccessFully`,
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
