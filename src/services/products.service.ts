import createProduct from "../entities/product.entity";
import productsDb from "../data-access/products.db";
import { Product, ProductEntity } from "../models/product.model";

class ProductsService {
  async createProduct(product: object) {
    const newProduct: ProductEntity = createProduct(product);
    const result = await productsDb.insert(newProduct);
    return result;
  }

  async updateProduct(product: Product) {
    if (product.id === undefined || product.id === null) {
      throw new Error(`Cannot update product with id '${product.id}'.`);
    }

    const parsedId: number = Number.parseInt(product.id);
    const existing_product = await this.fetchProductById(product.id);
    if (Object.keys(existing_product).length === 0) {
      throw new Error(`Product with id '${product.id}' not found.`);
    }

    const updated_product = createProduct({ ...existing_product, ...product });

    const result = await productsDb.update(parsedId, updated_product);
    return result;
  }

  async fetchProducts() {
    const result = await productsDb.fetchAll();
    return result;
  }

  async fetchListedProducts() {
    const result = await productsDb.fetchListed();
    return result;
  }

  async fetchProductById(id: string) {
    const parsedId: number = Number.parseInt(id);
    const result = await productsDb.fetchById(parsedId);
    return result;
  }
}

export default new ProductsService();
