import stripeService from "../stripe/stripe.service";

class CheckoutService {
  async createCheckoutSession(cart: any[]) {
    const productIds = cart.map((cartItem) => cartItem._id);

    const stripeProducts = await stripeService.fetchProducts(productIds);

    console.log("stripeProducts", stripeProducts);

    // get quantity from cart and price from stripeProducts
    const line_items = cart.map((cartItem) => {
      const product = stripeProducts.find(
        (product) => product.id === cartItem._id
      );

      if (!product) {
        throw new Error(
          `Product with id '${cartItem._id}' not found in Stripe.`
        );
      }

      return {
        price: product.default_price,
        quantity: cartItem.quantity,
      };
    });

    const session = await stripeService.createCheckoutSession(line_items);

    return session.url;
  }
}

export default new CheckoutService();
