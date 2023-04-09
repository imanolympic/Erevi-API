import { Product } from "../models/product.model";

export default function createProduct({
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
