import { Request } from "express";
import ProductsService from "../services/products.service";

class ProductsController {
  async postProduct(http_request: Request) {
    const product = http_request.body;

    try {
      await ProductsService.createProduct(product);
      return {
        status: 200,
        message: "Successfully created product.",
        addCount: 1,
      };
    } catch (error) {
      console.log(error);
      return { status: 400, message: `${error}`, addCount: 0 };
    }
  }

  async getProducts() {
    try {
      const result = await ProductsService.fetchProducts();
      return {
        status: 200,
        message: "Successfully fetched products.",
        products: result,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        message: `${error}`,
        products: [],
      };
    }
  }

  async getProductById(http_request: Request) {
    const id = http_request.params.id;

    try {
      const result = await ProductsService.fetchProductById(id);
      return {
        status: 200,
        message:
          Object.keys(result).length === 0
            ? `Product with id '${id}' not found.`
            : "Successfully fetched product.",
        product: result,
      };
    } catch (error) {
      console.log(error);
      return { status: 400, addCount: 0, message: `${error}` };
    }
  }
}

export default new ProductsController();
