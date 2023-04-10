import createProduct from "../entities/product.entity";
import productsDb from "../data-access/products.repository";
import stripeService from "../stripe/stripe.service";
import { Product } from "../models/product.model";
import { v4 as uuidv4 } from "uuid";

class ProductsService {
  async createProduct(product: any) {
    const productId = uuidv4();

    const newProduct: Product = createProduct({
      _id: productId,
      ...product,
    });

    await stripeService.createProduct(newProduct);

    await productsDb.insert(newProduct);

    return;
  }

  async updateProduct(id: string, product: Product) {
    const existing_product = await this.fetchProductById(id);
    if (!existing_product) {
      throw new Error(`Product with id '${id}' not found.`);
    }

    const updated_product = createProduct({ ...existing_product, ...product });

    const result = await productsDb.update(id, updated_product);
    return result;
  }

  async fetchProducts() {
    const result = await productsDb.fetchAll();
    return result;
  }

  async fetchProductById(id: string) {
    const result = await productsDb.fetchById(id);
    return result;
  }

  async deleteProductById(id: string) {
    await productsDb.deleteById(id);

    await stripeService.deleteProduct(id);

    return;
  }
}

export default new ProductsService();
