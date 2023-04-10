"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const stripeApiKey = process.env.MONGODB_URI;
console.log("stripeApiKey:", stripeApiKey);
const stripe = new stripe_1.default(stripeApiKey, {
    apiVersion: "2022-11-15",
});
exports.default = stripe;
