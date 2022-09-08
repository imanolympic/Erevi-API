import connectClient from ".";
import { ProductEntity } from "../models/product.model";

class ProductsDb {
  async insert(product: ProductEntity) {
    const client = await connectClient();

    try {
      const result = await client.query(
        "insert into products" +
          "(title, description, price, listed, inventory, weight_lbs, height_inches, width_inches, depth_inches, image_url)" +
          "values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
        [
          product.title,
          product.description,
          product.price,
          product.listed,
          product.inventory,
          product.weight_lbs,
          product.height_inches,
          product.width_inches,
          product.depth_inches,
          product.image_urls[0],
        ]
      );
      return result;
    } catch (error: any) {
      throw new Error(
        "Something went wrong while adding the product to the database."
      );
    }
  }

  async fetchAll() {
    const client = await connectClient();

    try {
      const result = await client.query("select * from products");
      return result.rows;
    } catch (error: any) {
      throw new Error(
        "Something went wrong while fetching products from the database."
      );
    }
  }

  async fetchById(id: number) {
    const client = await connectClient();

    try {
      const result = await client.query(
        "select * from products where id = $1",
        [id]
      );
      if (result.rowCount == 1) {
        return result.rows[0];
      } else {
        return {};
      }
    } catch (error) {
      console.log(error);
      throw new Error(
        "Something went wrong while fetching a product from the database."
      );
    }
  }
}

export default new ProductsDb();
