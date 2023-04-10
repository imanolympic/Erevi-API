import Stripe from "stripe";

export default async function connectToStripe(): Promise<Stripe> {
  const stripeApiKey = process.env.STRIPE_API_KEY;
  console.log("stripeApiKey", stripeApiKey);

  try {
    const client = new Stripe(stripeApiKey as string, {
      apiVersion: "2022-11-15",
    });

    console.log("Successfully connected to Stripe.");

    return client;
  } catch (error) {
    console.error("Unable to connect to Stripe due to error:", error);
    process.exit(1);
  }
}
