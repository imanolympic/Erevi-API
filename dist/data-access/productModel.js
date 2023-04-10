"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.productSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    listed: {
        type: Boolean,
        required: true,
    },
    inventory: {
        type: Number,
        min: 0,
    },
    weight_lbs: {
        type: Number,
        min: 0,
    },
    height_inches: {
        type: Number,
        min: 0,
    },
    width_inches: {
        type: Number,
        min: 0,
    },
    length_inches: {
        type: Number,
        min: 0,
    },
    image_url: {
        type: String,
        required: true,
        validate: {
            validator: (v) => /^https?:\/\//i.test(v),
            message: (props) => `${props.value} is not a valid URL!`,
        },
    },
});
const ProductModel = mongoose_1.default.model("Product", exports.productSchema);
exports.default = ProductModel;
