import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { error } from "console";
import { sendEmail } from "../../../lib/emailService";

const emailForAtheleToMVPZ = (name, email, socialMediaURL, orgName) => {
  let emailTemp = `<body style="font-family: 'Arial', sans-serif; margin: 0;padding: 0 ">
        <div style="max-width: 600px;margin: 40px auto;padding: 20px;text-align: center;border-radius: 8px;box-shadow: 0 4px 8px rgba(255,255,255,0.1);">
        <article>New Athlete In Waitlist</article>
         <ul>
         <li>name  : ${name}</li>
         <li>email  : ${email}</li>
         <li>Social Media Info  : ${socialMediaURL}</li>
         <li>Organisation Name  : ${orgName}</li>
         </ul>
        </body>`;

  return emailTemp;
};

const emailForAthele = () => {
  let emailTemp = `<body style="font-family: 'Arial', sans-serif; background-color: #1a1a1a; color: #ffffff; margin: 0; padding: 0;">
  <div style="max-width: 600px; height: 800px; margin: 40px auto; background: #000000; text-align: center; border-radius: 8px; box-shadow: 0 4px 8px rgba(255,255,255,0.1);">
    <div style="margin-bottom: 30px;">
      <img src="https://f005.backblazeb2.com/file/mvpz-other-assest/main-bg.png" alt="MVPz Logo" style="width: 100%; height: 200px; object-fit: cover;">
    </div>
    <div style="width: 100%; padding-bottom: 20px;">
      <div style="margin-bottom: 20px; width: 575px; margin: 0px auto; text-align: center;">
        <h1 style="color: #854df2;">You Got This!</h1>
        <h4 style="color: #ffffff;">You're on the waitlist for MVPz! </h4>
        <p style="color: #ffffff; line-height:25px">
         Once you're approved, you'll receive an email granting you access to the platform as one of the very first MVPz athletes!
          <br/>
           <br/>
          Until then, follow our journey on our socials below.
        </p>
        <div style="display:flex;justify-content:center;align-items:center;gap:20px;margin-bottom:10px">
          <a href="https://x.com/mvpz_sport?lang=en">
            <img src="https://f005.backblazeb2.com/file/mvpz-other-assest/twitter+(1).png" alt="MVPz Logo"  style="object-fit:contain;width:25px;height:25px ;background:#fff;border-radius:10px">
          </a>
          <a href="https://www.instagram.com/mvpz_sport/"> <img src="https://f005.backblazeb2.com/file/mvpz-other-assest/instagram+(1).png" alt="MVPz Logo"  style="object-fit:contain;width:25px;height:25px ;"></a>
          <a href="https://www.tiktok.com/@mvpz_sport"> 
            <img src="https://f005.backblazeb2.com/file/mvpz-other-assest/social-media.png" alt="MVPz Logo"  style="object-fit:contain;width:25px;height:25px ;"></a>
        </div>
        <a href="https://mvpz.io" style="display: inline-block; font-size: 16px; font-weight: bold; color: #ffffff; text-decoration: none; background-color: #854df2; padding: 12px 20px; border-radius: 6px; margin-bottom: 30px; margin: 20px 0;">Open MVPz.io</a>
      </div>
      <p style="font-size: 16px; color: #ffffff; margin-bottom: 20px; line-height: 20px;">
        Need assistance? Contact us at<br>
        <a href="mailto:team@mvpz.io" style="color: #007bff; text-decoration: none;">team@mvpz.io</a>.
      </p>
      <hr style="border: 0; height: 1px; background-color: #e9ecef; margin: 20px auto; opacity: 0.2; width: 500px;">
      <p style="font-size: 14px; color: #495057; width:500px; margin:0 auto">
        <strong style"padding-bottom:20px">Why MVPz?</strong><br>
        MVPz is a platform designed to help athletes like you monetize your fanbase, build a community, and grow your influence. We're here to empower you every step of the way.
      </p>
<!--       <p style="font-size: 14px; color: #6c757d; margin-top: 30px;">MVPz</p> -->
      <img src="https://mvpz-src-public.s3.us-east-005.backblazeb2.com/images/mvpz-transparent-logo.png" alt="MVPz Logo"  style="object-fit:contain;width:50px;height:50px ;margin-top: 20px;margin-bottom:0">
      <p style="font-size: 12px; color: #adb5bd; ">Built in the USA</p>
      <p style="font-size: 12px; color: #adb5bd; ;">
        If you did not request this email, please ignore it or contact our support team.
      </p>
<!--       <div style="margin-bottom: 20px; width: 575px; margin: 0px auto; text-align: center;">
        <p style="margin: 0;">MVPz</p>
        <p style="margin: 0;">Built in USA</p>
      </div> -->
    </div>
  </div>
</body>
`;

  return emailTemp;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { name, email, socialMediaURL, orgName } = req.body;

      let userAlreadyExits = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (userAlreadyExits) {
        return res.status(200).json({
          message: `This email address is already registered!. Please, Click sign button to sign.`,
        });
      }

      let alreadyInWaitlist = await prisma.athleteWaitlist.findFirst({
        where: {
          email,
        },
      });

      if (alreadyInWaitlist) {
        if (alreadyInWaitlist.isApproved !== "Approved") {
          await prisma.athleteWaitlist.update({
            where: {
              email,
            },
            data: {
              name,
              email,
              socialMedia: socialMediaURL,
              // orgName,
              isActive: true,
              isApproved: "UnderReview",
            },
          });
          return res.status(400).json({
            message: `You're profile got updated in MVPZ waitlist. Stay tuned—we'll notify you with updates soon!`,
          });
        }

        await sendEmail({
          emailAddress: process.env.EMAIL_SENDER,
          subject: `${name} has updated there information waitlist.`,
          bodyHtml: emailForAtheleToMVPZ(name, email, socialMediaURL, orgName),
        });

        await sendEmail({
          emailAddress: email,
          subject: `${name} You're profile got updated.`,
          bodyHtml: emailForAthele(),
        });

        return res.status(400).json({
          error: `Opps's, You cannot use this email.`,
        });
      }

      let addToWaitlist = await prisma.athleteWaitlist.create({
        data: {
          name,
          email,
          socialMedia: socialMediaURL,
          // orgName,
          isActive: true,
          isApproved: "UnderReview",
        },
      });

      if (!addToWaitlist) {
        return res
          .status(500)
          .json({ error: "Internal Server Error: Please, try again later." });
      }

      await sendEmail({
        emailAddress: process.env.EMAIL_SENDER,
        subject: `${name} has joined the waitlist.`,
        bodyHtml: emailForAtheleToMVPZ(name, email, socialMediaURL, orgName),
      });

      await sendEmail({
        emailAddress: email,
        subject: `${name} You're on the waitlist for MVPz!.`,
        bodyHtml: emailForAthele(),
      });

      return res.status(200).json({
        data: addToWaitlist,
        message:
          "You’re now on the MVPZ waitlist! We’ll notify you as soon as you’re ready to join the community.",
      });
    } else {
      return res.status(400).json({ error: "ONLY POST ALLOWED" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
