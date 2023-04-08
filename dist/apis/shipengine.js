"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShippingRate = void 0;
const axios_1 = __importDefault(require("axios"));
const shipengineApiClient = axios_1.default.create({
    baseURL: "https://api.shipengine.com/v1",
    headers: {
        "Content-Type": "application/json",
        Host: "api.shipengine.com",
        "API-Key": "TEST_ChYSgSpR2JVLo2mCruKl6X0UV9ooM6+sCLM2E5cD/Mc",
    },
});
const getShippingRate = (destinationAddress, packages) => {
    const data = {
        rate_options: {
            carrier_ids: ["se-2368419", "se-2368420"],
        },
        shipment: {
            validate_address: "validate_only",
            ship_to: destinationAddress,
            ship_from: {
                name: "theron kumar",
                phone: "209-395-6525",
                address_line1: "3258 Princeton Ave",
                address_line2: "",
                city_locality: "Stockton",
                state_province: "CA",
                postal_code: "95204",
                country_code: "US",
                address_residential_indicator: "no",
            },
            packages: packages,
            service_codes: [
                "fedex_ground",
                "fedex_home_delivery",
                "ups_ground",
                "ups_2nd_day_air",
                "ups_next_day_air",
            ],
        },
    };
    const result = shipengineApiClient.post("rates", data);
    if (Object.keys(result).includes("data")) {
        const rates = result.data.rate_response.rates;
        rates.sort((a, b) => a.shipping_amount.amount - b.shipping_amount.amount);
        return rates;
    }
    else {
        console.log(result.errors);
        return null;
    }
    // console.log(error.response.data);
};
exports.getShippingRate = getShippingRate;
