import { NextApiRequest, NextApiResponse } from "next";
import { isLoginUser } from "../../../../../../lib/global/getUserFromToken";
import { BB_BASE_URL } from "../../../../../../utils/global/global";
import { methodGuard } from "../../../../../../utils/global/methodNotAllowed";
import prisma from "../../../../../../lib/prisma";
import { calculateAge, formatDOB, formatName } from "../../../../../../utils/global/formating";

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
    let user = await isLoginUser({ req });
    let username = req.query.username as string;

    const getAthlete = await prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        id : true,
        name: true,
        tpProfileImage: true,
        height :true,
        weight : true,
        dob : true,
        currentLeague : true,
        primarySport : true,
        primaryPosition : true,
        nationality : true,
        biography : true,
        athleteTribes : {
          where : {
            active : true
          },
          select : {
            tribe : {
              select : {
                tribeShortName : true,
                tribeHorizontalBanner : true,
                organisation : {
                  select : {
                    primaryColorHex : true
                  }
                }
              }
            }
          }
        }
      },
    })?.then((res) => {
      let {athleteTribes,...data} = res
      return ({
        ...data,
        name : formatName({fullName : data?.name}),
        tpProfileImage : getEventImage({image : data?.tpProfileImage}),
        age : calculateAge(data?.dob),
        dob : formatDOB({dob : data?.dob}),
        currentTeam : athleteTribes[0]?.tribe?.tribeShortName,
        theme : {
          color : athleteTribes[0]?.tribe?.organisation?.primaryColorHex,
          bgImage : getEventImage({image : athleteTribes[0]?.tribe?.tribeHorizontalBanner})
        }
      })
    })

    if(!getAthlete){
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.status(200).json({
      success: true,
      data: {
       ...getAthlete
      },
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
  isAuthRequired: false,
  handler,
});
