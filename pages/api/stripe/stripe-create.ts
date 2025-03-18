import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import prisma from "../../../lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {  email, userId } = req.body;

    try {
      const account = await stripe.accounts.create({
        type: "express",
        country: "US",
        email,
       
      });

      console.log({
        account
      });
      

      let alreadyThere = await prisma.webStripe.findFirst({
        where: {
          userId,
        },
      });

      if (!alreadyThere) {
        await prisma.webStripe.create({
          data: {
            customerId: account.id,
            userId: userId,
          },
        });
      } else {
        await prisma.webStripe.update({
          where: {
            id: alreadyThere.id,
          },
          data: {
            customerId: account.id,
            userId: userId,
          },
        });
      }

      const onboardingLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding/refresh`,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/customer/stripe/processing?id=${account.id}`,
        type: "account_onboarding",
      });

      console.log({
        onboardingLink
      });
      

      res.status(200).json({ account,  onboardingUrl: onboardingLink.url });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
