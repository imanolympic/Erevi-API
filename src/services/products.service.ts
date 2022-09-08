import createProduct from "../entities/product.entity";
import productsDb from "../data-access/products.db";
import { Product, ProductEntity } from "../models/product.model";

class ProductsService {
  async createProduct(product: Product) {
    const newProduct: ProductEntity = createProduct(product);
    const result = await productsDb.insert(newProduct);
    return result;
  }

  async fetchProducts() {
    const result = await productsDb.fetchAll();
    return result;
  }

  async fetchProductById(id: string) {
    const parsedId: number = Number.parseInt(id);
    const result = await productsDb.fetchById(parsedId);
    return result;
  }
}

export default new ProductsService();
