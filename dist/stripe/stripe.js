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
const stripe_1 = __importDefault(require("stripe"));
function connectToStripe() {
    return __awaiter(this, void 0, void 0, function* () {
        const stripeApiKey = process.env.STRIPE_API_KEY;
        console.log("stripeApiKey", stripeApiKey);
        try {
            const client = new stripe_1.default(stripeApiKey, {
                apiVersion: "2022-11-15",
            });
            console.log("Successfully connected to Stripe.");
            return client;
        }
        catch (error) {
            console.error("Unable to connect to Stripe due to error:", error);
            process.exit(1);
        }
    });
}
exports.default = connectToStripe;
