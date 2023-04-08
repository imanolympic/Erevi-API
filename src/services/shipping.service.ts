import createShippingAddress from "../entities/shippingAddress.entity";
import { getShippingRates } from "../apis/shipengine.api";
import { Rate } from "../models/rate.model";

class ShippingService {
  async fetchRate(shipping_info: any) {
    // validate shipping info
    if (shipping_info.address === undefined) {
      throw new Error("Unable to determine rate without destination address.");
    }

    if (
      shipping_info.products === undefined ||
      shipping_info.products.length === 0
    ) {
      throw new Error("Unable to determine rate for cart with no products.");
    }

    const destinationAddress = createShippingAddress(shipping_info.address);
    const packages = [];
    for (const product of shipping_info.products) {
      if (
        product.weight_lbs === undefined ||
        product.weight_lbs == null ||
        product.length_inches === undefined ||
        product.length_inches == null ||
        product.width_inches === undefined ||
        product.width_inches == null ||
        product.height_inches === undefined ||
        product.height_inches == null
      ) {
        throw new Error(
          "Unable to determine rate for products without weight, length, width, and height dimensions."
        );
      }
      for (let i = 0; i < product.quantity; i++) {
        packages.push({
          weight: {
            unit: "pound",
            value: product.weight_lbs,
          },
          dimensions: {
            unit: "inch",
            length: product.length_inches,
            width: product.width_inches,
            height: product.height_inches,
          },
        });
      }
    }

    try {
      const result: any = await getShippingRates(destinationAddress, packages);

      if (Object.keys(result).includes("data")) {
        const rates: Rate[] = result.data.rate_response.rates;
        rates.sort(
          (a, b) => a.shipping_amount.amount - b.shipping_amount.amount
        );
        return rates;
      } else {
        console.log(result.errors);
        return [];
      }
    } catch (error: any) {
      console.log(error);
      throw new Error("Something went wrong while fetching shipping rates.");
    }
  }
}

export default new ShippingService();
