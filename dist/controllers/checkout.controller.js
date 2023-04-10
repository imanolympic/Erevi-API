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
const checkout_service_1 = __importDefault(require("../services/checkout.service"));
class CheckoutController {
    postCheckoutSession(http_request) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = http_request.body.cart;
            try {
                const sessionUrl = yield checkout_service_1.default.createCheckoutSession(cart);
                return {
                    status: 200,
                    body: {
                        sessionUrl: sessionUrl,
                        message: "Successfully created checkout session.",
                    },
                };
            }
            catch (error) {
                console.error("In checkout.controller.ts, __postCheckout__, failed to create checkout session due to error:", error);
                return {
                    status: 400,
                    body: {
                        message: `${error}`,
                    },
                };
            }
        });
    }
}
exports.default = new CheckoutController();
