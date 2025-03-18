const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getStripeCharges = async (checkOutId) => {
  const stripeSession = await stripe.checkout.sessions.retrieve(checkOutId);

  const paymentIntentId = stripeSession.payment_intent;

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  const charge = await stripe.charges.retrieve(paymentIntent.latest_charge);

  const balanceTransaction = await stripe.balanceTransactions.retrieve(
    charge.balance_transaction
  );

  const stripeFees = balanceTransaction.fee / 100;

  return stripeFees
};
