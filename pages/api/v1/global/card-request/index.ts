import { NextApiRequest, NextApiResponse } from "next";
import { isLoginUser } from "../../../../../lib/global/getUserFromToken";
import { methodGuard } from "../../../../../utils/global/methodNotAllowed";
import { sendEmail } from "../../../../../lib/emailService";
import prisma from "../../../../../lib/prisma";

const emailForAthele = (
  cropped_image_url,
  origin_image_url,
  frame_image_url,
  user
) => {
  let email = `<body style="font-family: 'Arial', sans-serif; margin: 0;padding: 0 ">
          <div style="max-width: 600px;margin: 40px auto;padding: 20px;text-align: center;border-radius: 8px;box-shadow: 0 4px 8px rgba(255,255,255,0.1);">
           <ul>
           <li>Id  : ${user?.id}</li>
           <li>Name  : ${user?.name}</li>
           <li>Email  : ${user?.email}</li>
           <li>Username  : ${user?.username}</li>
           <li>Current School  : ${user?.currentSchool}</li>
           <li>Previous School  : ${user?.previousSchool}</li>
           <li>Primary Sport  : ${user?.primarySport}</li>
           <li>SecondarySport  : ${user?.secondarySport}</li>
           <li>Primary Position  : ${user?.primaryPosition}</li>
           <li>Secondary Position  : ${user?.secondaryPosition}</li>
           <li>Cropped Image Url  : ${cropped_image_url}</li>
           <li>Original Image Url  : ${origin_image_url}</li>
           <li>Frame Image Url  : ${frame_image_url}</li>
           </ul>
          </body>`;

  return email;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let user : any = await isLoginUser({ req });

    let userDetails = await prisma.user.findFirst({where : {
        id : user?.id
    }})

    const { 
        cropped_image_url,
        origin_image_url,
        frame_image_url,
        canUseSchoolLogo,
       } = req.body;

       let email = await sendEmail({
        emailAddress: process.env.EMAIL_SENDER,
        subject: `${userDetails?.name} from ${userDetails?.currentSchool} has request a athlete card.`,
        bodyHtml: emailForAthele(
          cropped_image_url,
          origin_image_url,
          frame_image_url,
          userDetails
        ),
      });

      if (email) {
        const isAvailable = await prisma.cardRequest.findFirst({
          where : {
            requestedById : userDetails?.id
          }
        })
        
        let card 

        if (isAvailable) {
          card =  await prisma.cardRequest.update({
            where : {
              id : isAvailable.id
            },
            data: { 
              requestedById : userDetails?.id,
              croppedCardImage : cropped_image_url,
              originalCardImage : origin_image_url,
              croppedCardImageWFrame : frame_image_url,
              cardApproval: "Pending",
              cardRequestDate : new Date(),
              canUseSchoolLogo
             },
          });
        }else{
          card =  await prisma.cardRequest.create({
            data: { 
              requestedById : userDetails?.id,
              croppedCardImage : cropped_image_url,
              originalCardImage : origin_image_url,
              croppedCardImageWFrame : frame_image_url,
              cardApproval: "Pending",
              cardRequestDate : new Date(),
              canUseSchoolLogo
             },
          });
        }

     
        res.status(200).json({ status: true, card });
      }

  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Wrap the handler with methodGuard to allow only GET requests
export default methodGuard({
  allowedMethod: "POST",
  isAuthRequired: true,
  handler,
});
