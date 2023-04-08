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
const shippingAddress_entity_1 = __importDefault(require("../entities/shippingAddress.entity"));
const shipengine_api_1 = require("../apis/shipengine.api");
class ShippingService {
    fetchRate(shipping_info) {
        return __awaiter(this, void 0, void 0, function* () {
            // validate shipping info
            if (shipping_info.address === undefined) {
                throw new Error("Unable to determine rate without destination address.");
            }
            if (shipping_info.products === undefined ||
                shipping_info.products.length === 0) {
                throw new Error("Unable to determine rate for cart with no products.");
            }
            const destinationAddress = (0, shippingAddress_entity_1.default)(shipping_info.address);
            const packages = [];
            for (const product of shipping_info.products) {
                if (product.weight_lbs === undefined ||
                    product.weight_lbs == null ||
                    product.length_inches === undefined ||
                    product.length_inches == null ||
                    product.width_inches === undefined ||
                    product.width_inches == null ||
                    product.height_inches === undefined ||
                    product.height_inches == null) {
                    throw new Error("Unable to determine rate for products without weight, length, width, and height dimensions.");
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
                const result = yield (0, shipengine_api_1.getShippingRates)(destinationAddress, packages);
                if (Object.keys(result).includes("data")) {
                    const rates = result.data.rate_response.rates;
                    rates.sort((a, b) => a.shipping_amount.amount - b.shipping_amount.amount);
                    return rates;
                }
                else {
                    console.log(result.errors);
                    return [];
                }
            }
            catch (error) {
                console.log(error);
                throw new Error("Something went wrong while fetching shipping rates.");
            }
        });
    }
}
exports.default = new ShippingService();
