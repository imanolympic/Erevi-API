import { ShippingAddress } from "../models/shippingAddress.model";

export default function createShippingAddress({
  address_line1,
  address_line2,
  state_province,
  city_locality,
  postal_code,
  country_code,
}: any): ShippingAddress {
  // validate existence of required fields
  if (address_line1 === undefined) {
    throw new Error(
      "Shipping address must contain address_line1 of type 'string'."
    );
  }

  if (address_line2 === undefined) {
    throw new Error(
      "Shipping address must contain address_line2 of type 'string'."
    );
  }

  if (state_province === undefined) {
    throw new Error(
      "Shipping address must contain state_province of type 'string'."
    );
  }

  if (city_locality === undefined) {
    throw new Error(
      "Shipping address must contain city_locality of type 'string'."
    );
  }

  if (postal_code === undefined) {
    throw new Error(
      "Shipping address must contain postal_code of type 'string'."
    );
  }

  if (country_code === undefined) {
    throw new Error(
      "Shipping address must contain country_code of type 'string'."
    );
  }

  // validate types of each field
  if (typeof address_line1 !== "string") {
    throw new Error(
      "Shipping address must contain address_line1 of type 'string'."
    );
  }

  if (typeof address_line2 !== "string") {
    throw new Error(
      "Shipping address must contain address_line2 of type 'string'."
    );
  }

  if (typeof state_province !== "string") {
    throw new Error(
      "Shipping address must contain state_province of type 'string'."
    );
  }

  if (typeof city_locality !== "string") {
    throw new Error(
      "Shipping address must contain city_locality of type 'string'."
    );
  }

  if (typeof postal_code !== "string") {
    throw new Error(
      "Shipping address must contain postal_code of type 'string'."
    );
  }

  if (typeof country_code !== "string") {
    throw new Error(
      "Shipping address must contain country_code of type 'string'."
    );
  }

  return Object.freeze({
    address_line1,
    address_line2,
    state_province,
    city_locality,
    postal_code,
    country_code,
  });
}
