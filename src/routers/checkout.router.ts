import express, { Request, Response } from "express";
import checkoutController from "../controllers/checkout.controller";

const router = express.Router();

router.route("/session").post(async (req: Request, res: Response) => {
  checkoutController
    .postCheckoutSession(req)
    .then((response) => res.status(response.status).json(response.body));

  // const session = await stripe.checkout.sessions.create({
  //   line_items: [
  //     {
  //       // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
  //       price: "price_1MuXOxAi4qhAylYUkyb5Qjon",
  //       quantity: 1,
  //     },
  //   ],
  //   mode: "payment",
  //   success_url: `${webAppUrl}/order/success?session_id={CHECKOUT_SESSION_ID}`,
  //   cancel_url: `${webAppUrl}?canceled=true`,
  //   shipping_address_collection: {
  //     allowed_countries: ["US"],
  //   },
  //   // automatic_tax: {
  //   //   enabled: true,
  //   // }
  // });

  // res.status(200).json({
  //   sessionId: session.id,
  //   sessionUrl: session.url,
  // });
});

export default router;
