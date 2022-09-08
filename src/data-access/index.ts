import { Pool, PoolClient } from "pg";

let cachedClient: PoolClient;

export default async function connectClient(): Promise<PoolClient> {
  if (cachedClient) {
    return cachedClient;
  }

  const pool = new Pool({
    host: process.env.PS_PRODUCTS_DB_HOST,
    database: process.env.PS_PRODUCTS_DB_NAME,
    port: 5432,
  });

  try {
    const client: PoolClient = await pool.connect();
    console.log("DB successfully connected.");
    cachedClient = client;
    return cachedClient;
  } catch (error) {
    console.log("Unable to connect to DB.");
    console.log(error);
    process.exit(1);
  }
}
