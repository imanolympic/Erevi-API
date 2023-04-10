"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_service_1 = __importDefault(require("../stripe/stripe.service"));
class CheckoutService {
    createCheckoutSession(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            const productIds = cart.map((cartItem) => cartItem._id);
            const stripeProducts = yield stripe_service_1.default.fetchProducts(productIds);
            console.log("stripeProducts", stripeProducts);
            // get quantity from cart and price from stripeProducts
            const line_items = cart.map((cartItem) => {
                const product = stripeProducts.find((product) => product.id === cartItem._id);
                if (!product) {
                    throw new Error(`Product with id '${cartItem._id}' not found in Stripe.`);
                }
                return {
                    price: product.default_price,
                    quantity: cartItem.quantity,
                };
            });
            const session = yield stripe_service_1.default.createCheckoutSession(line_items);
            return session.url;
        });
    }
}
exports.default = new CheckoutService();
