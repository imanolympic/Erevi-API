import { Pool, PoolClient } from "pg";

let cachedClient: PoolClient;

export default async function connectClient(): Promise<PoolClient> {
  if (cachedClient) {
    return cachedClient;
  }

  const pool = new Pool({
    host: process.env.PS_DB_HOST,
    database: process.env.PS_DB_NAME,
    password: process.env.PS_DB_PASSWORD,
    port: 5432,
  });

  try {
    const client: PoolClient = await pool.connect();
    console.log("DB successfully connected.");
    cachedClient = client;
    return cachedClient;
  } catch (error) {
    console.log("Unable to connect to DB.");
    process.exit(1);
  }
}
