import mongoose, { Schema } from "mongoose";

export const productSchema = new Schema({
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
      validator: (v: string) => /^https?:\/\//i.test(v),
      message: (props: any) => `${props.value} is not a valid URL!`,
    },
  },
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
