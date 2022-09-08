import { Product, ProductEntity } from "../models/product.model";

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
  depth_inches = null,
}: any): ProductEntity {
  // validate existence of required fields
  if (title === undefined) {
    throw new Error("Product must contain a title of type 'string'.");
  }

  if (price === undefined) {
    throw new Error("Product must contain a price of type 'number'.");
  }

  if (image_url === undefined) {
    throw new Error("Product must contain image_url of type 'string'.");
  }

  // validate types of each field
  if (typeof title !== "string") {
    throw new Error("Product 'title' field must be of type 'string'.");
  }

  if (typeof image_url !== "string") {
    throw new Error("Product 'image_url' field must be of type 'string'.");
  }

  if (typeof price !== "number") {
    throw new Error("Product 'price' field must be of type 'number'.");
  }

  if (typeof description !== "string") {
    throw new Error("Product 'description' field must be of type 'string'.");
  }

  if (inventory !== null && typeof inventory !== "number") {
    throw new Error("Product 'inventory' field must be of type 'number'.");
  }

  if (weight_lbs !== null && typeof weight_lbs !== "number") {
    throw new Error("Product 'weight_lbs' field must be of type 'number'.");
  }

  if (width_inches !== null && typeof width_inches !== "number") {
    throw new Error("Product 'width_inches' field must be of type 'number'.");
  }

  if (height_inches !== null && typeof height_inches !== "number") {
    throw new Error("Product 'height_inches' field must be of type 'number'.");
  }

  if (depth_inches !== null && typeof depth_inches !== "number") {
    throw new Error("Product 'depth_inches' field must be of type 'number'.");
  }

  if (typeof listed !== "boolean") {
    throw new Error("Product 'listed' field must be of type 'boolean'.");
  }

  // validate requirements of fields
  if (image_url.trim().length === 0) {
    throw new Error("Product must contain a non-empty image url.");
  }

  if (price < 0) {
    throw new Error("Product must contain a non-negative price.");
  }

  return Object.freeze({
    title: title,
    description: description,
    price: price,
    listed: listed,
    inventory: inventory,
    weight_lbs: weight_lbs,
    height_inches: height_inches,
    width_inches: width_inches,
    depth_inches: depth_inches,
    image_url: image_url,
  });
}
