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
exports.getShippingRates = void 0;
const axios_1 = __importDefault(require("axios"));
const shipengineApiClient = axios_1.default.create({
    baseURL: "https://api.shipengine.com/v1",
    headers: {
        "Content-Type": "application/json",
        Host: "api.shipengine.com",
        "API-Key": "TEST_ChYSgSpR2JVLo2mCruKl6X0UV9ooM6+sCLM2E5cD/Mc",
    },
});
const getShippingRates = (destinationAddress, packages) => __awaiter(void 0, void 0, void 0, function* () {
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
                address_residential_indicator: "yes",
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
    return shipengineApiClient.post("rates", data);
});
exports.getShippingRates = getShippingRates;
