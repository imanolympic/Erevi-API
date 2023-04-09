import createProduct from "../entities/product.entity";
import productsDb from "../data-access/products.db";
import { Product } from "../models/product.model";

class ProductsService {
  async createProduct(product: object) {
    const newProduct: Product = createProduct(product);

    const result = await productsDb.insert(newProduct);
    return result;
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
    const result = await productsDb.deleteById(id);
    return result;
  }
}

export default new ProductsService();
