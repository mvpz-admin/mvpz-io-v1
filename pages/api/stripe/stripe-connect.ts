import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { customerId } = req.body;

    try {
      // Create a Customer Portal Session
      const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/customer/stripe/processing?id=${customerId}`,
      });

      res.status(200).json({ url: session.url });
    } catch (error) {
        
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

// {
//     "customer": {
//         "id": "cus_RNl5Ovbt83brWF",
//         "object": "customer",
//         "address": null,
//         "balance": 0,
//         "created": 1733960658,
//         "currency": null,
//         "default_source": null,
//         "delinquent": false,
//         "description": null,
//         "discount": null,
//         "email": "x0abhie@gmail.com",
//         "invoice_prefix": "9C69FC70",
//         "invoice_settings": {
//             "custom_fields": null,
//             "default_payment_method": null,
//             "footer": null,
//             "rendering_options": null
//         },
//         "livemode": false,
//         "metadata": {},
//         "name": "abhishek yadav",
//         "next_invoice_sequence": 1,
//         "phone": null,
//         "preferred_locales": [],
//         "shipping": null,
//         "tax_exempt": "none",
//         "test_clock": null
//     }
// }