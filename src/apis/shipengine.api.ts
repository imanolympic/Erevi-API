import axios from "axios";
import { Package } from "../models/package.model";
import { Rate } from "../models/rate.model";
import { ShippingAddress } from "../models/shippingAddress.model";

const shipengineApiClient = axios.create({
  baseURL: "https://api.shipengine.com/v1",
  headers: {
    "Content-Type": "application/json",
    Host: "api.shipengine.com",
    "API-Key": "TEST_ChYSgSpR2JVLo2mCruKl6X0UV9ooM6+sCLM2E5cD/Mc",
  },
});

export const getShippingRates = async (
  destinationAddress: ShippingAddress,
  packages: Package[]
): Promise<Rate[]> => {
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
};
