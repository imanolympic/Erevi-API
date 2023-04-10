import { Request } from "express";
import CheckoutService from "../services/checkout.service";

class CheckoutController {
  async postCheckoutSession(http_request: Request) {
    const cart = http_request.body.cart;

    try {
      const sessionUrl = await CheckoutService.createCheckoutSession(cart);
      return {
        status: 200,
        body: {
          sessionUrl: sessionUrl,
          message: "Successfully created checkout session.",
        },
      };
    } catch (error) {
      console.error(
        "In checkout.controller.ts, __postCheckout__, failed to create checkout session due to error:",
        error
      );
      return {
        status: 400,
        body: {
          message: `${error}`,
        },
      };
    }
  }
}

export default new CheckoutController();
