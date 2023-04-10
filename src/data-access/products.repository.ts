import connectClient from "./database";
import { Product } from "../models/product.model";
import ProductModel from "./productModel";

class ProductsDb {
  async insert(product: Product) {
    await connectClient();

    const validatedProduct = new ProductModel(product);

    try {
      const result = await validatedProduct.save();
      return result;
    } catch (error) {
      console.error(
        "In products.db.ts, in __insert__, failed to add product to database due to error:",
        error
      );
      throw new Error(
        "Failed to add product to database due to internal server error."
      );
    }
  }

  async update(id: string, product: Product) {
    await connectClient();

    try {
      const result = await ProductModel.findOneAndUpdate({ _id: id }, product, {
        new: true,
      });
      return result;
    } catch (error) {
      console.error(
        "In products.db.ts, in __update__, failed to update product in database due to error:",
        error
      );
      throw new Error(
        "Failed to update product in database due to internal server error."
      );
    }
  }

  async fetchAll() {
    await connectClient();

    try {
      const result = await ProductModel.find();
      return result;
    } catch (error) {
      console.error(
        "In products.db.ts, in __fetchAll__, failed to fetch products from database due to error:",
        error
      );
      throw new Error(
        "Failed to fetch products from database due to internal server error."
      );
    }
  }

  async fetchById(id: string) {
    await connectClient();

    try {
      const result = ProductModel.findById(id);
      return result;
    } catch (error) {
      console.error(
        "In products.db.ts, in __fetchById__, failed to fetch product from database due to error:",
        error
      );
      throw new Error(
        "Failed to fetch product from database due to internal server error."
      );
    }
  }

  async deleteById(id: string) {
    await connectClient();

    try {
      const result = await ProductModel.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.error(
        "In products.db.ts, in __deleteById__, failed to delete product from database due to error:",
        error
      );
      throw new Error(
        "Failed to delete product from database due to internal server error."
      );
    }
  }
}

export default new ProductsDb();
