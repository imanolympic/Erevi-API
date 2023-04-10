//create a servvice class that will handle all the stripe logic

import connectToStripe from "./stripe";
import { Product } from "../models/product.model";

class StripeService {
  async createProduct(product: Product) {
    const stripeClient = await connectToStripe();

    const stripeProduct = await stripeClient.products.create({
      name: product.title,
      id: product._id,
      default_price_data: {
        unit_amount: product.price * 100,
        currency: "usd",
      },
    });

    return stripeProduct;
  }

  async fetchProducts(ids?: string[]) {
    const stripeClient = await connectToStripe();

    let stripeProducts;
    if (ids) {
      stripeProducts = await stripeClient.products.list({
        ids: ids,
      });
    } else {
      stripeProducts = await stripeClient.products.list();
    }

    return stripeProducts.data;
  }

  async deleteProduct(id: string) {
    const stripeClient = await connectToStripe();

    const result = await stripeClient.products.del(id);

    return result;
  }

  async createCheckoutSession(line_items: any[]) {
    const stripeClient = await connectToStripe();

    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `${process.env.WEB_APP_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.WEB_APP_URL}?canceled=true`,
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
    });

    return session;
  }
}

export default new StripeService();
