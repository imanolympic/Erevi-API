"use strict";
//create a servvice class that will handle all the stripe logic
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
const stripe_1 = __importDefault(require("./stripe"));
class StripeService {
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const stripeClient = yield (0, stripe_1.default)();
            const stripeProduct = yield stripeClient.products.create({
                name: product.title,
                id: product._id,
                default_price_data: {
                    unit_amount: product.price * 100,
                    currency: "usd",
                },
            });
            return stripeProduct;
        });
    }
    fetchProducts(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const stripeClient = yield (0, stripe_1.default)();
            let stripeProducts;
            if (ids) {
                stripeProducts = yield stripeClient.products.list({
                    ids: ids,
                });
            }
            else {
                stripeProducts = yield stripeClient.products.list();
            }
            return stripeProducts.data;
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const stripeClient = yield (0, stripe_1.default)();
            const result = yield stripeClient.products.del(id);
            return result;
        });
    }
    createCheckoutSession(line_items) {
        return __awaiter(this, void 0, void 0, function* () {
            const stripeClient = yield (0, stripe_1.default)();
            const session = yield stripeClient.checkout.sessions.create({
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
        });
    }
}
exports.default = new StripeService();
