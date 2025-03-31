// import axios from "axios";
// import prisma from "../../lib/prisma";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   try {
//     const nftEntities = await prisma.nFTEntity.findMany({
//       where: {
//         type: "Team",
//       },
//       include: {
//         majorEnhancements: true,
//       },
//     });

//     await Promise.all(
//       nftEntities.map(async (nft) => {
//         if (nft.majorEnhancements.length == 0) {

//             console.log("finding for", nft.title);

//           let getTribe = await prisma.tribe.findFirst({
//             where : {
//                 tribeName : nft.title
//             }
//           })

//           if(getTribe) {
//             console.log( "Tribe Found", nft.id, nft.title, getTribe.id);

          


//             let createAvatar = await prisma.avatars.create({
//                 data : {
//                     title : getTribe.tribeName,
//                     description : getTribe.about,
//                     nftEntityId : nft.id,
//                     tribeId : getTribe.id,
//                 }
//             })

//             if(createAvatar) {
//                 console.log("Avatar Created", nft.id);
//             }else {
//                 console.log("Avatar Not Created", nft.id);
//             }

//             let nftMajorEnhancementType = await prisma.majorEnhancementType.create({
//                 data : {
//                    subType : "TEAM_ADD",
//                    type : "ATHLETE_PERSONALIZATIONS"

//                 }
//             })

//                 let nftMajorEnhancement = await prisma.nFTMajorEnhancement.create({
//                     data : {
//                     nftEntityId : nft.id,
//                     typeId   : nftMajorEnhancementType.id,
//                     duration : "PERMANENT",
//                     title : nft.title,
//                     ver :1,
//                     avatarsId : createAvatar.id,
//                     isBaseCard : true,
//                     cardNFTImage : nft.cardImageNFT,
//                     price : 20,

//                 }
//             })

//             if(nftMajorEnhancement) {
//                 console.log("NFT Major Enhancement Created", nft.id,  nftMajorEnhancement.id);
//             }else {
//                 console.log("NFT Major Enhancement Not Created", nft.id, );
//             }

//           }else {
//             console.log( "Tribe Not Found", nft.id, nft.title);
//           }

//         }
//       })
//     );
//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(500).json({ success: false, error: error.message });
//   }
// }

// import axios from "axios";
// import prisma from "../../lib/prisma";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   try {
//     const nftEntities = await prisma.nFTPurchaseCard.findMany({
//       where: {
//         status: "ASSIGNED",
//       },
//       include: {
//         majorEnhancementPurchases: true,
//         nftEntity: true,
//       },
//     });

//     await Promise.all(
//       nftEntities.map(async (nft) => {
//         if (nft.majorEnhancementPurchases.length == 0) {
//           let getMajorEnh = await prisma.nFTMajorEnhancement.findFirst({
//             where: {
//               nftEntityId: nft.nftEntityId,
//             },
//           });

//           if (getMajorEnh) {
//             console.log("Major Enhancement Found");
//           } else {
//             console.log("Major Enhancement Not Found");
//             return;
//           }

//           let getAvatar = await prisma.avatars.findFirst({
//             where: {
//               nftEntityId: nft.nftEntityId,
//             },
//           });

//           if (getAvatar) {
//             console.log("Avatar Found");
//           } else {
//             console.log("Avatar Not Found");
//             return;
//           }

//           let res = await prisma.nFTMajorEnhancementPurchase.create({
//             data: {
//               nftMajorEnhancementId: getMajorEnh.id,
//               purchaseId: nft.id,
//               avatarId: getAvatar.id,
//             },
//           });

//           if (res) {
//             console.log("Major Enhancement Purchase Created");
//           } else {
//             console.log("Major Enhancement Purchase Not Created");
//           }
//         }
//       })
//     );
//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(500).json({ success: false, error: error.message });
//   }
// }

// import axios from "axios";
// import prisma from "../../lib/prisma";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   try {
//     const nftEntities = await prisma.nFTMajorEnhancement.findMany({
      
//       include: {
//      nftEntity : true
//       },
//     });

//     await Promise.all(
//       nftEntities.map(async (nft) => {
//         await prisma.nFTMajorEnhancement.update({
//           where: {
//             id: nft.id,
//           },
//           data: {
//            cardNFTImage : nft.nftEntity.cardImageNFT
//           },
//         });
//       })
//     );
//     return res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(500).json({ success: false, error: error.message });
//   }
// }

import axios from "axios";
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
  let bioList = [
    {
        "name":"Hunter Osborne",
        "currentSchool":"The University of Alabama",
        "primarySport":"Men Football",
        "bio":"Hunter Osborne is a standout in Men Football at The University of Alabama. Playing as a Defense: Defensive Line, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">With a passion for sports from a young age, this athlete has consistently demonstrated skill and perseverance.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Alice Barbieri",
        "currentSchool":"University of California, Los Angeles",
        "primarySport":"Women Soccer",
        "bio":"Alice Barbieri is a standout in Women Soccer at University of California, Los Angeles. Playing as a Midfielder, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">An inspiring competitor who has overcome challenges to achieve greatness in their field.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Trey Tintinger",
        "currentSchool":"University of Oregon",
        "primarySport":"Men Track and Field (Outdoor)",
        "bio":"Trey Tintinger is a standout in Men Track and Field (Outdoor) at University of Oregon. Playing as a Jumper, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">With a passion for sports from a young age, this athlete has consistently demonstrated skill and perseverance.<\/p>\n        <p style=\"font-size: 14px;\">Their journey is marked by hard work, discipline, and a commitment to excellence.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Carson Lydon",
        "currentSchool":"Ball State University",
        "primarySport":"Men Baseball",
        "bio":"Carson Lydon is a standout in Men Baseball at Ball State University. Playing as a Left Handed Pitcher, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Caleb Murphy",
        "currentSchool":"DePaul University",
        "primarySport":"Men Basketball",
        "bio":"Caleb Murphy is a standout in Men Basketball at DePaul University. Playing as a Shooting Guard, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">Beyond the field, they engage in community work and mentorship, shaping future champions.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Mikayla Parks",
        "currentSchool":"Kansas State University",
        "primarySport":"Basketball",
        "bio":"Mikayla Parks is a standout in Basketball at Kansas State University. Playing as a Guard, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">With a passion for sports from a young age, this athlete has consistently demonstrated skill and perseverance.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Heavenly Greer",
        "currentSchool":"Kansas State University",
        "primarySport":"Basketball",
        "bio":"Heavenly Greer is a standout in Basketball at Kansas State University. Playing as a Forward, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">An inspiring competitor who has overcome challenges to achieve greatness in their field.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Addisen Fisher",
        "currentSchool":"University of California, Los Angeles",
        "primarySport":"Women Softball",
        "bio":"Addisen Fisher is a standout in Women Softball at University of California, Los Angeles. Playing as a Pitcher, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">With a passion for sports from a young age, this athlete has consistently demonstrated skill and perseverance.<\/p>\n        <p style=\"font-size: 14px;\">They continue to push their limits, always striving for new personal bests and records.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Taylor Bigby",
        "currentSchool":"University of Southern California",
        "primarySport":"Basketball",
        "bio":"Taylor Bigby is a standout in Basketball at University of Southern California. Playing as a Point Guard, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Rileigh Powers",
        "currentSchool":"University of California, Los Angeles",
        "primarySport":"Women Beach Volleyball",
        "bio":"Rileigh Powers is a standout in Women Beach Volleyball at University of California, Los Angeles. Playing as a All Rounder, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">Their journey is marked by hard work, discipline, and a commitment to excellence.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Caiden Matheny",
        "currentSchool":"University of Central Florida",
        "primarySport":"Men Baseball",
        "bio":"Caiden Matheny is a standout in Men Baseball at University of Central Florida. Playing as a Out Fielder, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">With a passion for sports from a young age, this athlete has consistently demonstrated skill and perseverance.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Isaiah Mosely",
        "currentSchool":"Louisiana State University",
        "primarySport":"Men Football",
        "bio":"Isaiah Mosely is a standout in Men Football at Louisiana State University. Playing as a Running Back, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">An inspiring competitor who has overcome challenges to achieve greatness in their field.<\/p>\n        <p style=\"font-size: 14px;\">Beyond the field, they engage in community work and mentorship, shaping future champions.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Luther Mohammad",
        "currentSchool":"Arizona State University",
        "primarySport":"Men Basketball",
        "bio":"Luther Mohammad is a standout in Men Basketball at Arizona State University. Playing as a Point Guard, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Marlee Smith",
        "currentSchool":"Arizona State University",
        "primarySport":"Wrestling",
        "bio":"Marlee Smith is a standout in Wrestling at Arizona State University. Playing as a Wrestler, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">Known for their strategic gameplay and strong team leadership, they are a true role model.<\/p>\n        <p style=\"font-size: 14px;\">They continue to push their limits, always striving for new personal bests and records.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"JP Estrella",
        "currentSchool":"University of Tennessee",
        "primarySport":"Men Basketball",
        "bio":"JP Estrella is a standout in Men Basketball at University of Tennessee. Playing as a Center, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">An inspiring competitor who has overcome challenges to achieve greatness in their field.<\/p>\n        <p style=\"font-size: 14px;\">They continue to push their limits, always striving for new personal bests and records.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Kelze Howard",
        "currentSchool":"Oregon State University",
        "primarySport":"Men Football",
        "bio":"Kelze Howard is a standout in Men Football at Oregon State University. Playing as a Defense: Defensive Line, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">With a passion for sports from a young age, this athlete has consistently demonstrated skill and perseverance.<\/p>\n        <p style=\"font-size: 14px;\">They continue to push their limits, always striving for new personal bests and records.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Andre Johnson",
        "currentSchool":"University of Connecticut",
        "primarySport":"Men Basketball",
        "bio":"Andre Johnson is a standout in Men Basketball at University of Connecticut. Playing as a Shooting Guard, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">With a passion for sports from a young age, this athlete has consistently demonstrated skill and perseverance.<\/p>\n        <p style=\"font-size: 14px;\">Beyond the field, they engage in community work and mentorship, shaping future champions.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Taryn Sides",
        "currentSchool":"Kansas State University",
        "primarySport":"Basketball",
        "bio":"Taryn Sides is a standout in Basketball at Kansas State University. Playing as a Guard, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A dedicated athlete known for relentless training and exceptional performance in competitions.<\/p>\n        <p style=\"font-size: 14px;\">Their journey is marked by hard work, discipline, and a commitment to excellence.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Gisela Sanchez",
        "currentSchool":"Kansas State University",
        "primarySport":"Basketball",
        "bio":"Gisela Sanchez is a standout in Basketball at Kansas State University. Playing as a Forward, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">An inspiring competitor who has overcome challenges to achieve greatness in their field.<\/p>\n        <p style=\"font-size: 14px;\">Their journey is marked by hard work, discipline, and a commitment to excellence.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Sofia Mujica",
        "currentSchool":"University of California, Los Angeles",
        "primarySport":"Women Softball",
        "bio":"Sofia Mujica is a standout in Women Softball at University of California, Los Angeles. Playing as a Catcher, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">An inspiring competitor who has overcome challenges to achieve greatness in their field.<\/p>\n        <p style=\"font-size: 14px;\">They continue to push their limits, always striving for new personal bests and records.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"ALEENA GARCIA",
        "currentSchool":"University of California, Los Angeles",
        "primarySport":"Women Softball",
        "bio":"ALEENA GARCIA is a standout in Women Softball at University of California, Los Angeles. Playing as a nan, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">With a passion for sports from a young age, this athlete has consistently demonstrated skill and perseverance.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Joshua Swift",
        "currentSchool":"University of California, Los Angeles",
        "primarySport":"Men Football",
        "bio":"Joshua Swift is a standout in Men Football at University of California, Los Angeles. Playing as a Defensive Back, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">With a passion for sports from a young age, this athlete has consistently demonstrated skill and perseverance.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Joe Bruin",
        "currentSchool":"University of California, Los Angeles",
        "primarySport":"Men\u201a\u00c4\u00f4s Baseball",
        "bio":"Joe Bruin is a standout in Men\u201a\u00c4\u00f4s Baseball at University of California, Los Angeles. Playing as a Pitcher, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A dedicated athlete known for relentless training and exceptional performance in competitions.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"John Wick",
        "currentSchool":"University of California, Los Angeles",
        "primarySport":"Cricket",
        "bio":"John Wick is a standout in Cricket at University of California, Los Angeles. Playing as a Batsman, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A dedicated athlete known for relentless training and exceptional performance in competitions.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Nancy Wheeler",
        "currentSchool":"University of California, Los Angeles",
        "primarySport":"Women Soccer",
        "bio":"Nancy Wheeler is a standout in Women Soccer at University of California, Los Angeles. Playing as a Goalkeeper, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">An inspiring competitor who has overcome challenges to achieve greatness in their field.<\/p>\n        <p style=\"font-size: 14px;\">Their journey is marked by hard work, discipline, and a commitment to excellence.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"India Otto",
        "currentSchool":"University of Southern California",
        "primarySport":"Basketball",
        "bio":"India Otto is a standout in Basketball at University of Southern California. Playing as a Point Guard, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Jake Shipley",
        "currentSchool":"University of Oregon",
        "primarySport":"Men Football",
        "bio":"Jake Shipley is a standout in Men Football at University of Oregon. Playing as a Linebacker, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Brison Cobbins",
        "currentSchool":"University of Oregon",
        "primarySport":"Men Football",
        "bio":"Brison Cobbins is a standout in Men Football at University of Oregon. Playing as a Running Back, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">With a passion for sports from a young age, this athlete has consistently demonstrated skill and perseverance.<\/p>\n        <p style=\"font-size: 14px;\">Their journey is marked by hard work, discipline, and a commitment to excellence.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Madylyn Aulbach",
        "currentSchool":"Youngstown State University",
        "primarySport":"Basketball",
        "bio":"Madylyn Aulbach is a standout in Basketball at Youngstown State University. Playing as a Point Guard, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A dedicated athlete known for relentless training and exceptional performance in competitions.<\/p>\n        <p style=\"font-size: 14px;\">Beyond the field, they engage in community work and mentorship, shaping future champions.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Jason Brown",
        "currentSchool":"Jackson State University",
        "primarySport":"Men Football",
        "bio":"Jason Brown is a standout in Men Football at Jackson State University. Playing as a Offense: Quarterback, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Kevin Snyder",
        "currentSchool":"University of Miami",
        "primarySport":"Track and Field",
        "bio":"Kevin Snyder is a standout in Track and Field at University of Miami. Playing as a Jumper, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">Known for their strategic gameplay and strong team leadership, they are a true role model.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Cameron Warchuck",
        "currentSchool":"University of Colorado",
        "primarySport":"Football",
        "bio":"Cameron Warchuck is a standout in Football at University of Colorado. Playing as a Long Snapper, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">An inspiring competitor who has overcome challenges to achieve greatness in their field.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Jonathan Tchatchoua",
        "currentSchool":"Baylor University",
        "primarySport":"Men Basketball",
        "bio":"Jonathan Tchatchoua is a standout in Men Basketball at Baylor University. Playing as a Power Forward, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A dedicated athlete known for relentless training and exceptional performance in competitions.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Serena Sundell",
        "currentSchool":"Kansas State University",
        "primarySport":"Basketball",
        "bio":"Serena Sundell is a standout in Basketball at Kansas State University. Playing as a Guard, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">Known for their strategic gameplay and strong team leadership, they are a true role model.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Brylee Glenn",
        "currentSchool":"Kansas State University",
        "primarySport":"Basketball",
        "bio":"Brylee Glenn is a standout in Basketball at Kansas State University. Playing as a Guard, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">Known for their strategic gameplay and strong team leadership, they are a true role model.<\/p>\n        <p style=\"font-size: 14px;\">Beyond the field, they engage in community work and mentorship, shaping future champions.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Gabby Gregory",
        "currentSchool":"Kansas State University",
        "primarySport":"Basketball",
        "bio":"Gabby Gregory is a standout in Basketball at Kansas State University. Playing as a Guard, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">They continue to push their limits, always striving for new personal bests and records.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Rebekah Dallinger",
        "currentSchool":"Kansas State University",
        "primarySport":"Basketball",
        "bio":"Rebekah Dallinger is a standout in Basketball at Kansas State University. Playing as a Guard, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A dedicated athlete known for relentless training and exceptional performance in competitions.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Imani Lester",
        "currentSchool":"Kansas State University",
        "primarySport":"Basketball",
        "bio":"Imani Lester is a standout in Basketball at Kansas State University. Playing as a Forward, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">An inspiring competitor who has overcome challenges to achieve greatness in their field.<\/p>\n        <p style=\"font-size: 14px;\">Their journey is marked by hard work, discipline, and a commitment to excellence.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Alexis Hess",
        "currentSchool":"Kansas State University",
        "primarySport":"Basketball",
        "bio":"Alexis Hess is a standout in Basketball at Kansas State University. Playing as a Forward, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">An inspiring competitor who has overcome challenges to achieve greatness in their field.<\/p>\n        <p style=\"font-size: 14px;\">Their journey is marked by hard work, discipline, and a commitment to excellence.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Ayoka Lee",
        "currentSchool":"Kansas State University",
        "primarySport":"Basketball",
        "bio":"Ayoka Lee is a standout in Basketball at Kansas State University. Playing as a Center, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">An inspiring competitor who has overcome challenges to achieve greatness in their field.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Anthony Alexander",
        "currentSchool":"Colorado State University",
        "primarySport":"TRACK & FIELD",
        "bio":"Anthony Alexander is a standout in TRACK & FIELD at Colorado State University. Playing as a CROSS COUNTRY,TRACK & FIELD, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">They continue to push their limits, always striving for new personal bests and records.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Dillion Klein",
        "currentSchool":"University of Southern California",
        "primarySport":"Men Volleyball",
        "bio":"Dillion Klein is a standout in Men Volleyball at University of Southern California. Playing as a Outside Hitter, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">An inspiring competitor who has overcome challenges to achieve greatness in their field.<\/p>\n        <p style=\"font-size: 14px;\">Beyond the field, they engage in community work and mentorship, shaping future champions.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Jaylin Davies",
        "currentSchool":"University of California, Los Angeles",
        "primarySport":"Men Football",
        "bio":"Jaylin Davies is a standout in Men Football at University of California, Los Angeles. Playing as a Defensive Back, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">They continue to push their limits, always striving for new personal bests and records.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Ellis Bynum",
        "currentSchool":"University of Oregon",
        "primarySport":"Men Football",
        "bio":"Ellis Bynum is a standout in Men Football at University of Oregon. Playing as a Running Back, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">With a passion for sports from a young age, this athlete has consistently demonstrated skill and perseverance.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Alynah Torres",
        "currentSchool":"University of Oklahoma",
        "primarySport":"Women Softball",
        "bio":"Alynah Torres is a standout in Women Softball at University of Oklahoma. Playing as a Short Stop, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">Known for their strategic gameplay and strong team leadership, they are a true role model.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Reid Spachman",
        "currentSchool":"Columbia University",
        "primarySport":"Men Football",
        "bio":"Reid Spachman is a standout in Men Football at Columbia University. Playing as a Defense: Defensive Line, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">Their journey is marked by hard work, discipline, and a commitment to excellence.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Zyanna Walker",
        "currentSchool":"Kansas State University",
        "primarySport":"Basket ball",
        "bio":"Zyanna Walker is a standout in Basket ball at Kansas State University. Playing as a Guard, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A dedicated athlete known for relentless training and exceptional performance in competitions.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Ja'Mia Harris",
        "currentSchool":"Kansas State University",
        "primarySport":"Basketball",
        "bio":"Ja'Mia Harris is a standout in Basketball at Kansas State University. Playing as a Guard, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">Known for their strategic gameplay and strong team leadership, they are a true role model.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Jaelyn Glenn",
        "currentSchool":"Kansas State University",
        "primarySport":"Basketball",
        "bio":"Jaelyn Glenn is a standout in Basketball at Kansas State University. Playing as a Guard, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">Known for their strategic gameplay and strong team leadership, they are a true role model.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Eliza Maupin",
        "currentSchool":"Kansas State University",
        "primarySport":"Basketball",
        "bio":"Eliza Maupin is a standout in Basketball at Kansas State University. Playing as a Forward, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">With a passion for sports from a young age, this athlete has consistently demonstrated skill and perseverance.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Noah Carmichael",
        "currentSchool":"The Ohio State University",
        "primarySport":"Men Track and Field (Outdoor)",
        "bio":"Noah Carmichael is a standout in Men Track and Field (Outdoor) at The Ohio State University. Playing as a Men Track and Field (Indoor), they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">An inspiring competitor who has overcome challenges to achieve greatness in their field.<\/p>\n        <p style=\"font-size: 14px;\">Beyond the field, they engage in community work and mentorship, shaping future champions.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Ryan Rissas",
        "currentSchool":"University of California, Los Angeles",
        "primarySport":"Men Baseball",
        "bio":"Ryan Rissas is a standout in Men Baseball at University of California, Los Angeles. Playing as a Left Field, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">They continue to push their limits, always striving for new personal bests and records.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Noah Ferguson",
        "currentSchool":"Oregon State University",
        "primarySport":"Men Baseball",
        "bio":"Noah Ferguson is a standout in Men Baseball at Oregon State University. Playing as a Right Field, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">An inspiring competitor who has overcome challenges to achieve greatness in their field.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Ryan Smith",
        "currentSchool":null,
        "primarySport":"Men Football",
        "bio":"Ryan Smith is a standout in Men Football at nan. Playing as a nan, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">With a passion for sports from a young age, this athlete has consistently demonstrated skill and perseverance.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Gavin Jack",
        "currentSchool":null,
        "primarySport":"Men Football",
        "bio":"Gavin Jack is a standout in Men Football at nan. Playing as a nan, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">An inspiring competitor who has overcome challenges to achieve greatness in their field.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Aaron Richard",
        "currentSchool":null,
        "primarySport":"Men Football",
        "bio":"Aaron Richard is a standout in Men Football at nan. Playing as a nan, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">Known for their strategic gameplay and strong team leadership, they are a true role model.<\/p>\n        <p style=\"font-size: 14px;\">Beyond the field, they engage in community work and mentorship, shaping future champions.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Amy Jonathan",
        "currentSchool":null,
        "primarySport":"Men Track and Field (Outdoor)",
        "bio":"Amy Jonathan is a standout in Men Track and Field (Outdoor) at nan. Playing as a nan, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">Known for their strategic gameplay and strong team leadership, they are a true role model.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Jack Sterrett",
        "currentSchool":"Baylor University",
        "primarySport":"Track & Field",
        "bio":"Jack Sterrett is a standout in Track & Field at Baylor University. Playing as a Cross Country, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">They continue to push their limits, always striving for new personal bests and records.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Benny Beaver",
        "currentSchool":"Oregon State University",
        "primarySport":"All ROunder",
        "bio":"Benny Beaver is a standout in All ROunder at Oregon State University. Playing as a All ROunder, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Cruz Rushing",
        "currentSchool":"University of Oregon",
        "primarySport":"Men Football",
        "bio":"Cruz Rushing is a standout in Men Football at University of Oregon. Playing as a Defensive Back, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">With a passion for sports from a young age, this athlete has consistently demonstrated skill and perseverance.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Ava Lachey",
        "currentSchool":"University of California, Los Angeles",
        "primarySport":"Swimming",
        "bio":"Ava Lachey is a standout in Swimming at University of California, Los Angeles. Playing as a Free, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">Known for their strategic gameplay and strong team leadership, they are a true role model.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Jade McDonald",
        "currentSchool":"University of California, Los Angeles",
        "primarySport":"Track and Field",
        "bio":"Jade McDonald is a standout in Track and Field at University of California, Los Angeles. Playing as a Multi-event, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">With a passion for sports from a young age, this athlete has consistently demonstrated skill and perseverance.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Jenna Hauman",
        "currentSchool":"University of California, Los Angeles",
        "primarySport":"Water Polo",
        "bio":"Jenna Hauman is a standout in Water Polo at University of California, Los Angeles. Playing as a Point, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">Known for their strategic gameplay and strong team leadership, they are a true role model.<\/p>\n        <p style=\"font-size: 14px;\">Their journey is marked by hard work, discipline, and a commitment to excellence.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Anaiya Singer",
        "currentSchool":"University of California, Los Angeles",
        "primarySport":"Women Rowing",
        "bio":"Anaiya Singer is a standout in Women Rowing at University of California, Los Angeles. Playing as a Stroke, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">An inspiring competitor who has overcome challenges to achieve greatness in their field.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"MVPz",
        "currentSchool":null,
        "primarySport":null,
        "bio":"MVPz is a standout in nan at nan. Playing as a nan, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">Known for their strategic gameplay and strong team leadership, they are a true role model.<\/p>\n        <p style=\"font-size: 14px;\">Their journey is marked by hard work, discipline, and a commitment to excellence.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"MVPz Team",
        "currentSchool":null,
        "primarySport":null,
        "bio":"MVPz Team is a standout in nan at nan. Playing as a nan, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Bruiser Marigold",
        "currentSchool":"Baylor University",
        "primarySport":"Men Baseball",
        "bio":"Bruiser Marigold is a standout in Men Baseball at Baylor University. Playing as a Pitcher, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A dedicated athlete known for relentless training and exceptional performance in competitions.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Dayveon Bates",
        "currentSchool":"Youngstown State University",
        "primarySport":"Men Football",
        "bio":"Dayveon Bates is a standout in Men Football at Youngstown State University. Playing as a Defensive Back, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">With a passion for sports from a young age, this athlete has consistently demonstrated skill and perseverance.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Elsie McCutchan",
        "currentSchool":"Youngstown State University",
        "primarySport":"Women Beach Volleyball",
        "bio":"Elsie McCutchan is a standout in Women Beach Volleyball at Youngstown State University. Playing as a Defender, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A dedicated athlete known for relentless training and exceptional performance in competitions.<\/p>\n        <p style=\"font-size: 14px;\">They continue to push their limits, always striving for new personal bests and records.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Omar Adegbola",
        "currentSchool":"Baylor University",
        "primarySport":"Men Basketball",
        "bio":"Omar Adegbola is a standout in Men Basketball at Baylor University. Playing as a Shooting Guard, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A dedicated athlete known for relentless training and exceptional performance in competitions.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Noah Anderson",
        "currentSchool":"Jackson State University",
        "primarySport":"Men Football",
        "bio":"Noah Anderson is a standout in Men Football at Jackson State University. Playing as a Special Teams: Kicker, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A dedicated athlete known for relentless training and exceptional performance in competitions.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Quaveon Davis",
        "currentSchool":"Jackson State University",
        "primarySport":"Men Football",
        "bio":"Quaveon Davis is a standout in Men Football at Jackson State University. Playing as a Offensive Lineman, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">An inspiring competitor who has overcome challenges to achieve greatness in their field.<\/p>\n        <p style=\"font-size: 14px;\">They continue to push their limits, always striving for new personal bests and records.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Maddy Goldberg",
        "currentSchool":"University of Oregon",
        "primarySport":"Women Soccer",
        "bio":"Maddy Goldberg is a standout in Women Soccer at University of Oregon. Playing as a Goalkeeper, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">With a passion for sports from a young age, this athlete has consistently demonstrated skill and perseverance.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Skylar Kelly",
        "currentSchool":"University of Oregon",
        "primarySport":"Women Beach Volleyball",
        "bio":"Skylar Kelly is a standout in Women Beach Volleyball at University of Oregon. Playing as a All rounder, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">Known for their strategic gameplay and strong team leadership, they are a true role model.<\/p>\n        <p style=\"font-size: 14px;\">Beyond the field, they engage in community work and mentorship, shaping future champions.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Ethan Wrase",
        "currentSchool":"Baylor University",
        "primarySport":"Men Track and Field (Outdoor)",
        "bio":"Ethan Wrase is a standout in Men Track and Field (Outdoor) at Baylor University. Playing as a Long Distance, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">They continue to push their limits, always striving for new personal bests and records.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Aiden Ramshaw",
        "currentSchool":"Baylor University",
        "primarySport":"Men Track and Field (Outdoor)",
        "bio":"Aiden Ramshaw is a standout in Men Track and Field (Outdoor) at Baylor University. Playing as a Long Distance, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">With a passion for sports from a young age, this athlete has consistently demonstrated skill and perseverance.<\/p>\n        <p style=\"font-size: 14px;\">Their journey is marked by hard work, discipline, and a commitment to excellence.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Regina Paseiro",
        "currentSchool":"Baylor University",
        "primarySport":"Women Track and Field (Outdoor)",
        "bio":"Regina Paseiro is a standout in Women Track and Field (Outdoor) at Baylor University. Playing as a Long Distance, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">They continue to push their limits, always striving for new personal bests and records.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Ben Livorsi",
        "currentSchool":"Saint Louis University",
        "primarySport":"Men Baseball",
        "bio":"Ben Livorsi is a standout in Men Baseball at Saint Louis University. Playing as a Catcher, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Chase Arrington",
        "currentSchool":"Eastern Michigan University",
        "primarySport":"Men Football",
        "bio":"Chase Arrington is a standout in Men Football at Eastern Michigan University. Playing as a Defensive Back, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A dedicated athlete known for relentless training and exceptional performance in competitions.<\/p>\n        <p style=\"font-size: 14px;\">They continue to push their limits, always striving for new personal bests and records.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Somiyah Braggs",
        "currentSchool":"University of Pittsburgh",
        "primarySport":"Men Track and Field (Outdoor)",
        "bio":"Somiyah Braggs is a standout in Men Track and Field (Outdoor) at University of Pittsburgh. Playing as a Sprinter, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">They continue to push their limits, always striving for new personal bests and records.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Candace Yingling",
        "currentSchool":"University of Kansas",
        "primarySport":"Women Softball",
        "bio":"Candace Yingling is a standout in Women Softball at University of Kansas. Playing as a Center Field, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">With a passion for sports from a young age, this athlete has consistently demonstrated skill and perseverance.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"McKenna Harden",
        "currentSchool":"Vanderbilt University",
        "primarySport":"Men Lacrosse",
        "bio":"McKenna Harden is a standout in Men Lacrosse at Vanderbilt University. Playing as a Defense, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A dedicated athlete known for relentless training and exceptional performance in competitions.<\/p>\n        <p style=\"font-size: 14px;\">Their journey is marked by hard work, discipline, and a commitment to excellence.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Kendal Radke",
        "currentSchool":"Creighton University",
        "primarySport":"Women Soccer",
        "bio":"Kendal Radke is a standout in Women Soccer at Creighton University. Playing as a Forward, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">Known for their strategic gameplay and strong team leadership, they are a true role model.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Kiran Singh",
        "currentSchool":"Oral Roberts University",
        "primarySport":"Women Soccer",
        "bio":"Kiran Singh is a standout in Women Soccer at Oral Roberts University. Playing as a Midfielder, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">An inspiring competitor who has overcome challenges to achieve greatness in their field.<\/p>\n        <p style=\"font-size: 14px;\">Beyond the field, they engage in community work and mentorship, shaping future champions.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Nicolas Kennedy",
        "currentSchool":"University of Rhode Island",
        "primarySport":"Men Track and Field (Outdoor)",
        "bio":"Nicolas Kennedy is a standout in Men Track and Field (Outdoor) at University of Rhode Island. Playing as a Hammer Thrower, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">Known for their strategic gameplay and strong team leadership, they are a true role model.<\/p>\n        <p style=\"font-size: 14px;\">Beyond the field, they engage in community work and mentorship, shaping future champions.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Ke\u201a\u00c4\u00f4vina Finch",
        "currentSchool":"Oakland University",
        "primarySport":"Men Track and Field (Outdoor)",
        "bio":"Ke\u201a\u00c4\u00f4vina Finch is a standout in Men Track and Field (Outdoor) at Oakland University. Playing as a Sprinter, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">With a passion for sports from a young age, this athlete has consistently demonstrated skill and perseverance.<\/p>\n        <p style=\"font-size: 14px;\">Beyond the field, they engage in community work and mentorship, shaping future champions.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Mateusz Karpow",
        "currentSchool":"Ball State University",
        "primarySport":"Men Volleyball",
        "bio":"Mateusz Karpow is a standout in Men Volleyball at Ball State University. Playing as a Opposite Hitter, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">With a passion for sports from a young age, this athlete has consistently demonstrated skill and perseverance.<\/p>\n        <p style=\"font-size: 14px;\">Beyond the field, they engage in community work and mentorship, shaping future champions.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Alyssa White",
        "currentSchool":"Oregon State University",
        "primarySport":"Women Soccer",
        "bio":"Alyssa White is a standout in Women Soccer at Oregon State University. Playing as a Midfielder, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">Known for their strategic gameplay and strong team leadership, they are a true role model.<\/p>\n        <p style=\"font-size: 14px;\">Beyond the field, they engage in community work and mentorship, shaping future champions.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Camar Wheaton",
        "currentSchool":"Southern Methodist University",
        "primarySport":"Men Football",
        "bio":"Camar Wheaton is a standout in Men Football at Southern Methodist University. Playing as a Running Back, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">Beyond the field, they engage in community work and mentorship, shaping future champions.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Ashley Siyao Li",
        "currentSchool":"University of California, Berkeley",
        "primarySport":"Volleyball",
        "bio":"Ashley Siyao Li is a standout in Volleyball at University of California, Berkeley. Playing as a Outside hitter, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">Beyond the field, they engage in community work and mentorship, shaping future champions.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Igor Olaru",
        "currentSchool":"Baylor University",
        "primarySport":"Track and Field",
        "bio":"Igor Olaru is a standout in Track and Field at Baylor University. Playing as a Thrower, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">An inspiring competitor who has overcome challenges to achieve greatness in their field.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Noah Millard",
        "currentSchool":"Yale University",
        "primarySport":"Swimming",
        "bio":"Noah Millard is a standout in Swimming at Yale University. Playing as a Free Style, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A dedicated athlete known for relentless training and exceptional performance in competitions.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Edward Liao",
        "currentSchool":"Yale University",
        "primarySport":"Tennis",
        "bio":"Edward Liao is a standout in Tennis at Yale University. Playing as a nan, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">Known for their strategic gameplay and strong team leadership, they are a true role model.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"kenny jordan",
        "currentSchool":"Princeton University",
        "primarySport":"Football",
        "bio":"kenny jordan is a standout in Football at Princeton University. Playing as a Running Back, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">Their journey is marked by hard work, discipline, and a commitment to excellence.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Desteny DeJarnett",
        "currentSchool":"Oakland University",
        "primarySport":"Track and Field",
        "bio":"Desteny DeJarnett is a standout in Track and Field at Oakland University. Playing as a Thrower, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">Known for their strategic gameplay and strong team leadership, they are a true role model.<\/p>\n        <p style=\"font-size: 14px;\">Their journey is marked by hard work, discipline, and a commitment to excellence.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Jamal Mull",
        "currentSchool":"University of Central Arkansas",
        "primarySport":"Football",
        "bio":"Jamal Mull is a standout in Football at University of Central Arkansas. Playing as a Offensive lineman, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">With a passion for sports from a young age, this athlete has consistently demonstrated skill and perseverance.<\/p>\n        <p style=\"font-size: 14px;\">They continue to push their limits, always striving for new personal bests and records.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"AJ Hutcheson",
        "currentSchool":"Oregon State University",
        "primarySport":"Baseball",
        "bio":"AJ Hutcheson is a standout in Baseball at Oregon State University. Playing as a Right Handed Pitcher, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">An inspiring competitor who has overcome challenges to achieve greatness in their field.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Zachary Kmatz",
        "currentSchool":"Oregon State University",
        "primarySport":"Baseball",
        "bio":"Zachary Kmatz is a standout in Baseball at Oregon State University. Playing as a Right Hand Pitcher, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">With a passion for sports from a young age, this athlete has consistently demonstrated skill and perseverance.<\/p>\n        <p style=\"font-size: 14px;\">They continue to push their limits, always striving for new personal bests and records.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Bryce Johnson",
        "currentSchool":"Oregon State University",
        "primarySport":"Baseball",
        "bio":"Bryce Johnson is a standout in Baseball at Oregon State University. Playing as a Right Hand Pitcher, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">With a passion for sports from a young age, this athlete has consistently demonstrated skill and perseverance.<\/p>\n        <p style=\"font-size: 14px;\">Their journey is marked by hard work, discipline, and a commitment to excellence.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Adam Singer",
        "currentSchool":"Oregon State University",
        "primarySport":"Baseball",
        "bio":"Adam Singer is a standout in Baseball at Oregon State University. Playing as a In Field, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A dedicated athlete known for relentless training and exceptional performance in competitions.<\/p>\n        <p style=\"font-size: 14px;\">Their journey is marked by hard work, discipline, and a commitment to excellence.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Cameron williams",
        "currentSchool":"Georgia State University",
        "primarySport":"Football",
        "bio":"Cameron williams is a standout in Football at Georgia State University. Playing as a Outside Linebacker, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Eli Paton",
        "currentSchool":"Grand Canyon University",
        "primarySport":"Baseball",
        "bio":"Eli Paton is a standout in Baseball at Grand Canyon University. Playing as a Infield, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Amon Malakwen",
        "currentSchool":"Baylor University",
        "primarySport":"Track and Field",
        "bio":"Amon Malakwen is a standout in Track and Field at Baylor University. Playing as a Long Distance, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">Beyond the field, they engage in community work and mentorship, shaping future champions.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Wyatt Queen",
        "currentSchool":"Oregon State University",
        "primarySport":"Baseball",
        "bio":"Wyatt Queen is a standout in Baseball at Oregon State University. Playing as a Right handed pitcher, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">Known for their strategic gameplay and strong team leadership, they are a true role model.<\/p>\n        <p style=\"font-size: 14px;\">From early beginnings to professional achievements, their story is one of determination.<\/p>\n    <\/body>\n    "
    },
    {
        "name":"Kobe Williams",
        "currentSchool":"University of Memphis",
        "primarySport":"Football",
        "bio":"Kobe Williams is a standout in Football at University of Memphis. Playing as a Offensive Lineman, they bring exceptional talent to the team.",
        "Overview":"No overview available.",
        "Additional_Info":"More details coming soon.",
        "HTML_Overview":"\n    <body>\n        <p style=\"font-size: 14px;\">A rising star in the sports world, gaining recognition for outstanding talent and dedication.<\/p>\n        <p style=\"font-size: 14px;\">Balancing sports with personal growth, they aim to inspire the next generation of athletes.<\/p>\n    <\/body>\n    "
    }
]

    await Promise.all(
      bioList.map(async (userz) => {
        let user = await prisma.user.findFirst({
            where : {
                name : userz.name
            }
        })
        
        if(user) {
            await prisma.user.update({
                where : {
                    id : user.id
                },
                data : {
                    bio : userz.bio,
                    biography : userz.HTML_Overview
                }
            })
        }
      })
    );
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}



