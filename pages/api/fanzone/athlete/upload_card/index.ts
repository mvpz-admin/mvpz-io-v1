import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "../../../../../lib/emailService";

const emailForAthlete = (base64Image) => {
    return `<body style="font-family: 'Arial', sans-serif; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 40px auto; padding: 20px; text-align: center; border-radius: 8px; box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);">
              <img
                src="${base64Image}"
                alt="Image Preview"
                style="width: 100%; height: auto; object-fit: cover; border-radius: 8px;"
              />
            </div>
          </body>`;
  };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const userBody = req.body;

   
      let email = await sendEmail({
        emailAddress: "Team@mvpz.io",
        subject: `${userBody?.name} has request card `,
        bodyHtml: emailForAthlete(userBody?.previewImage),
      });


      if (email) {
        console.log("Email sent");
      }

      res.status(200).json({
        message: "Image Upload Send Successfully!",
      });
    } else {
      res.status(400).json({ error: "ONLY POST ALLOWED" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
