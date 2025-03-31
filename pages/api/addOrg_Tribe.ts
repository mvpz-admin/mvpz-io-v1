import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }


    let entity = await prisma.nFTEntity.findMany({
      where : {
        type : "Team"
      }
    })

    console.log({
      entityCount : entity.length
    });
    

    let respone = await Promise.all(entity.map(async (entity) => {
      let getAvatar = await prisma.avatars.findFirst({
        where : {
          nftEntityId : entity.id
        }
      })

      if(getAvatar){
        // First delete all major enhancements associated with this avatar
        await prisma.nFTMajorEnhancement.deleteMany({
          where : {
            avatarsId : getAvatar.id
          }
        })

        // Then delete the avatar
        await prisma.avatars.delete({
          where : {
            id : getAvatar.id
          }
        })
      }

      let majorEnhancement = await prisma.nFTMajorEnhancement.findFirst({
        where : {
          nftEntityId : entity.id
        }
      })

      if(majorEnhancement){
        await prisma.nFTMajorEnhancement.delete({
          where : {
            id : majorEnhancement.id
          }
        })
      }

      let getTribe = await prisma.tribe.findFirst({
        where : {
          tribeName : entity.school
        }
      })

      if(getTribe){
        console.log("Tribe found for", entity.id)
      }else{
        return console.log("Tribe not found for", entity.id)
      }


      let createAvatar = await prisma.avatars.create({
        data : {
         title : getTribe?.tribeName,
         nftEntityId : entity.id,
         tribeId : getTribe?.id,
        }
      })
      
      
      if(createAvatar){
        console.log("Avatar created successfully for", entity.id)
      }else{
      return  console.log("Avatar creation failed for", entity.id)
      }

      let createEnhType = await prisma.majorEnhancementType.create({
        data : {
         type :"ATHLETE_PERSONALIZATIONS",
         subType : "TEAM_ADD",

        }
      })

      let createMajorEnhancement = await prisma.nFTMajorEnhancement.create({
        data : {
          title : entity.title,
          duration : "PERMANENT",
          ver : 1,
          avatarsId : createAvatar.id,
          nftEntityId : entity.id,
          tribeId : getTribe?.id,
          cardNFTImage : entity.cardImageNFT,
          isBaseCard : true,
          price : 20,
          typeId : createEnhType?.id
        }
      })

      if(createMajorEnhancement){
        console.log("Major enhancement created successfully for", entity.id)
      }else{
        return console.log("Major enhancement creation failed for", entity.id)
      }
      

      
      
      
    }))

    return res.status(200).json({
      success: true,
      message: "Enhancements created successfully",
      data : respone,
     
    });
  } catch (error) {
    console.error("Error creating enhancement purchases:", error);
    return res.status(500).json({
      error: "Failed to create enhancement purchases",
      details:
        error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
}
