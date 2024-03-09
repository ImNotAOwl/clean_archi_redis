import mariadb, { Pool, PoolConfig } from "mariadb";
import dotenv from "dotenv";

dotenv.config({ path: `./config/${process.env.NODE_ENV}.env` });
let client: Pool;

const options: PoolConfig = {
  host: process.env.DB_HOST,
  port: parseInt(`${process.env.DB_PORT}`),
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
};

export const mariadbClient = () => {
  if (!client) client = mariadb.createPool(options);

  return client;
};
