"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProduct = void 0;
function validateProduct(product) {
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
exports.validateProduct = validateProduct;
function createProduct({ _id, title, price, image_url, description = "", inventory = 0, listed = false, weight_lbs = null, height_inches = null, width_inches = null, length_inches = null, }) {
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
exports.default = createProduct;
