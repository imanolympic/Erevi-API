"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createProduct({ title, description, price, image_urls, }) {
    // validate existence of required fields
    if (title === undefined) {
        throw new Error("Product must contain a title of type 'string'");
    }
    if (price === undefined) {
        throw new Error("Product must contain a price of type 'number'");
    }
    if (image_urls === undefined) {
        throw new Error("Product must contain image_urls of type '[string]'");
    }
    // validate types of each field
    if (typeof title !== "string") {
        throw new Error("Product 'title' field must be of type 'string'");
    }
    if (typeof description !== "string") {
        throw new Error("Product 'description' field must be of type 'string'");
    }
    if (typeof price !== "number") {
        throw new Error("Product 'price' field must be of type 'number'");
    }
    if (!Array.isArray(image_urls)) {
        throw new Error("Product 'imageUrls' field must be of type '[string]'");
    }
    else {
        for (var i = 0; i < image_urls.length; i++) {
            if (typeof image_urls[i] !== "string") {
                throw new Error("Product 'imageUrls' field must be of type '[string]'");
            }
        }
    }
    // validate requirements of fields
    if (image_urls.length < 1) {
        throw new Error("Product must contain at least one non-empty image url");
    }
    else {
        for (var i = 0; i < image_urls.length; i++) {
            if (!image_urls[i].trim()) {
                throw new Error("Product image url must not be empty.");
            }
        }
    }
    if (price < 0) {
        throw new Error("Product must contain a non-negative price.");
    }
    return Object.freeze({
        title: title,
        description: description,
        price: price,
        listed: false,
        inventory: 0,
        weight_lbs: null,
        height_inches: null,
        width_inches: null,
        depth_inches: null,
        image_urls: image_urls,
    });
}
exports.default = createProduct;
