import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import prisma from "../../../lib/prisma";
import { sendEmail } from "../../../lib/emailService";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

function html(params: {name: string }) {
  const { name } = params;

  return `<body style="font-family: 'Arial', sans-serif; background-color: #1a1a1a; color: #ffffff; margin: 0; padding: 0;">
  <div style="max-width: 600px; height: 800px; margin: 40px auto; background: #000000; text-align: center; border-radius: 8px; box-shadow: 0 4px 8px rgba(255,255,255,0.1);">
    <div style="margin-bottom: 30px;">
      <img src="https://f005.backblazeb2.com/file/mvpz-other-assest/main-bg.png" alt="MVPz Logo" style="width: 100%; height: 200px; object-fit: cover;">
    </div>
    <div style="width: 100%; padding-bottom: 20px;">
      <div style="margin-bottom: 20px; width: 575px; margin: 0px auto; text-align: center;">
        <h1 style="color: #854df2;">Congratulations!</h1>
        <h4 style="color: #ffffff;">Hey, ${name}</h4>
        <p style="color: #ffffff;">
           Your Stripe account has been successfully connected to MVPz.
          <br/>You’re now all set to manage transactions seamlessly and make the most out of your MVPz experience.
        </p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/profile/wallet" style="display: inline-block; font-size: 16px; font-weight: bold; color: #ffffff; text-decoration: none; background-color: #854df2; padding: 12px 20px; border-radius: 6px; margin-bottom: 30px; margin: 20px 0;">Open Wallet</a>
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
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { accountId } = req.body;

    const customer = await stripe.accounts.retrieve(accountId);

    let alreadyThere = await prisma.webStripe.findFirst({
      where: {
        customerId : accountId,
      },
      include : {
        user : true
      }
    });

    if(alreadyThere){
      let response = await prisma.webStripe.update({
        where: {
          id: alreadyThere.id,
        },
        data: {
          stripeLinked: true,
        },
      });
  
      if(response){
       await sendEmail({
               emailAddress: alreadyThere.user.email,
               subject: `🎉 Congratulations! Your Stripe Account is Connected to MVPZ`,
               bodyHtml: html({name: alreadyThere.user.name}),
             });
      }
    }

    res.status(200).json({ customer });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
