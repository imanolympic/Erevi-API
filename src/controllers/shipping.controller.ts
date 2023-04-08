import shippingService from "../services/shipping.service";
import { Request } from "express";

class ShippingController {
  async getShippingRates(http_request: Request) {
    const shipping_info = http_request.body;

    try {
      const rates = await shippingService.fetchRate(shipping_info);
      return {
        status: 200,
        message: "Successfully fetched rate.",
        rates: rates,
      };
    } catch (error) {
      console.log(error);
      return { status: 400, message: `${error}`, rates: [] };
    }
  }
}

export default new ShippingController();
