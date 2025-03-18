// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../auth/[...nextauth]";
// import { sendEmail } from "../../../../../lib/emailService";
// import prisma from "../../../../../lib/prisma";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     if (req.method === "GET") {
//       const session = await getServerSession(req, res, authOptions);

//       let card = await prisma.cardRequest.findFirst({
//         where: {
//           requestedById: session?.user?.id,
//         },
//       });

//       res.status(200).json({ status: true, card });
//     } else {
//       res.status(400).json({ error: "ONLY POST ALLOWED" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
