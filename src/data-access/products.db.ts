import connectClient from ".";
import { Product } from "../models/product.model";

class ProductsDb {
  async insert(product: Product) {
    const client = await connectClient();

    try {
      const result = await client.query(
        "insert into products" +
          "(title, description, price, listed, inventory, weight_lbs, height_inches, width_inches, length_inches, image_url)" +
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
          product.length_inches,
          product.image_url,
        ]
      );
      return result;
    } catch (error: any) {
      console.log(error);
      throw new Error(
        "Something went wrong while adding the product to the database."
      );
    }
  }

  async update(id: number, product: Product) {
    const client = await connectClient();

    try {
      const result = await client.query(
        `update products set \
        title = $2, \
        description = $3, \
        price = $4, \
        listed = $5, \
        inventory = $6, \
        weight_lbs = $7, \
        height_inches = $8, \
        width_inches = $9, \
        length_inches = $10, \
        image_url = $11 \
        where id = $1;`,
        [
          id,
          product.title,
          product.description,
          product.price,
          product.listed,
          product.inventory,
          product.weight_lbs,
          product.height_inches,
          product.width_inches,
          product.length_inches,
          product.image_url,
        ]
      );
      return result.rowCount;
    } catch (error: any) {
      console.log(error);
      throw new Error(
        "Something went wrong while updating the product in the database."
      );
    }
  }

  async fetchAll() {
    const client = await connectClient();

    try {
      const result = await client.query(
        "select * from products order by title asc"
      );
      return result.rows;
    } catch (error: any) {
      throw new Error(
        "Something went wrong while fetching products from the database."
      );
    }
  }

  async fetchListed() {
    const client = await connectClient();

    try {
      const result = await client.query(
        "select * from products where inventory > 0 and listed = true order by title asc"
      );
      return result.rows;
    } catch (error: any) {
      throw new Error(
        "Something went wrong while fetching products from the database."
      );
    }
  }

  async fetchById(id: number) {
    const client = await connectClient();

    let result;
    try {
      result = await client.query("select * from products where id = $1", [id]);
    } catch (error) {
      console.log(error);
      throw new Error(
        "Something went wrong while fetching a product from the database."
      );
    }

    if (result.rowCount == 1) {
      return result.rows[0];
    } else {
      throw new Error(`Product with id '${id}' not found.`);
    }
  }

  async deleteById(id: number) {
    const client = await connectClient();

    try {
      const result = await client.query("DELETE FROM products WHERE id = $1;", [
        id,
      ]);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(
        "Something went wrong while fetching a product from the database."
      );
    }
  }
}

export default new ProductsDb();
