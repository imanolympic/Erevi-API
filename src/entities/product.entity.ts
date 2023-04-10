import { Product } from "../models/product.model";

export function validateProduct(product: any): Product {
  if (!product.title) {
    throw new Error("Product title is required.");
  }
  if (!product.price) {
    throw new Error("Product price is required.");
  }
  if (!product.image_url) {
    throw new Error("Product image_url is required.");
  }
  return product;
}

export default function createProduct({
  _id,
  title,
  price,
  image_url,
  description = "",
  inventory = 0,
  listed = false,
  weight_lbs = null,
  height_inches = null,
  width_inches = null,
  length_inches = null,
}: any): Product {
  return Object.freeze({
    _id: _id,
    title: title,
    description: description,
    price: price,
    listed: listed,
    inventory: inventory,
    weight_lbs: weight_lbs,
    height_inches: height_inches,
    width_inches: width_inches,
    length_inches: length_inches,
    image_url: image_url,
  });
}
