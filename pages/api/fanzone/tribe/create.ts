// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../../../lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const session = await getServerSession(req, res, authOptions);

//     if (!session) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     if (req.method === "POST") {
//       const {
//         organisationId,
//         tribeLogo,
//         tribeBanner,
//         tribeVerticalBanner,
//         tribeHorizontalBanner,
//         about,
//         socialLinks,
//       } = req.body;

      

//       // Create the new Tribe
//       const newTribe = await prisma.tribe.create({
//         data: {
//           organisationId,
//           tribeLogo,
//           tribeBanner,
//           tribeVerticalBanner,
//           tribeHorizontalBanner,
//           about,
//           socialLinks: {
//             create: socialLinks.map((link: { socialBrand: string; link: string }) => ({
//               socialBrand: link.socialBrand,
//               link: link.link,
//             })),
//           },
//         },
//         include: { socialLinks: true }, // Include socialLinks in response if necessary
//       });

//       return res.status(201).json(newTribe);
//     } else {
//       return res.status(405).json({ error: "Method not allowed" });
//     }
//   } catch (err) {
//     console.error("Error creating tribe:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
