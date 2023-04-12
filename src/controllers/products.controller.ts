import { Request } from "express";
import ProductsService from "../services/products.service";

class ProductsController {
  async postProduct(http_request: Request) {
    const product = http_request.body;

    try {
      await ProductsService.createProduct(product);
      return {
        status: 200,
        body: {
          message: "Successfully created product.",
          insertCount: 1,
        },
      };
    } catch (error) {
      console.error(
        "In products.controller.ts, in __postProduct__, failed to add product to database due to error:",
        error
      );
      return {
        status: 400,
        body: {
          message: `${error}`,
          insertCount: 0,
        },
      };
    }
  }

  async putProduct(http_request: Request) {
    const id = http_request.params.id;
    const product = http_request.body;

    if (!id) {
      return {
        status: 400,
        body: {
          message: "Product id is required.",
          updateCount: 0,
        },
      };
    }

    if (!product) {
      return {
        status: 400,
        body: {
          message: "No product to update provided.",
          updateCount: 0,
        },
      };
    }

    try {
      await ProductsService.updateProduct(id, product);
      return {
        status: 200,
        body: {
          message: `Successfully updated product with id: ${id}`,
          updateCount: 1,
        },
      };
    } catch (error) {
      console.error(
        `In products.controller.ts, in __putProduct__, error updating product with id: ${id} due to error:`,
        error
      );
      return {
        status: 400,

        body: {
          message: `${error}`,
          updateCount: 0,
        },
      };
    }
  }

  async getProducts() {
    try {
      const result = await ProductsService.fetchProducts();
      return {
        status: 200,
        body: {
          message: "Successfully fetched products.",
          products: result,
        },
      };
    } catch (error) {
      console.error(
        "In products.controller.ts, in __getProducts__, failed to fetch products due to error",
        error
      );
      return {
        status: 400,
        body: {
          message: `${error}`,
        },
      };
    }
  }

  async getProductById(http_request: Request) {
    const id = http_request.params.id;

    if (!id) {
      return {
        status: 400,
        body: {
          message: "Product id is required.",
        },
      };
    }

    try {
      const result = await ProductsService.fetchProductById(id);
      return {
        status: 200,
        body: {
          message: "Successfully fetched product.",
          product: result,
        },
      };
    } catch (error) {
      console.error(
        `In products.controller.ts, in __getProductById__, failed to fetch product with id: ${id} due to error:`,
        error
      );
      return {
        status: 400,
        body: {
          message: `${error}`,
        },
      };
    }
  }

  async deleteProduct(http_request: Request) {
    const id = http_request.params.id;

    if (!id) {
      return {
        status: 400,
        body: {
          message: "Product id is required.",
          deletionCount: 0,
        },
      };
    }

    try {
      await ProductsService.deleteProductById(id);
      return {
        status: 200,
        body: {
          message: "Successfully deleted product.",
          deletionCount: 1,
        },
      };
    } catch (error) {
      console.error(
        `In products.controller.ts, in __deleteProduct__, failed to delete product with id: ${id} due to error:`,
        error
      );
      return {
        status: 400,
        body: {
          message: `${error}`,
          deletionCount: 0,
        },
      };
    }
  }
}

export default new ProductsController();
