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
const express_1 = __importDefault(require("express"));
const checkout_controller_1 = __importDefault(require("../controllers/checkout.controller"));
const router = express_1.default.Router();
router.route("/session").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    checkout_controller_1.default
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
}));
exports.default = router;
