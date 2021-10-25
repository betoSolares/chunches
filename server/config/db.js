import { Pool } from "pg";

const user = process.env.POSTGRES_USER || "postgres";
const password = process.env.POSTGRES_PASSWORD || "postgres";
const host = process.env.POSTGRES_HOST || "localhost";
const database = process.env.POSTGRES_DB || "default";
const port = process.env.POSTGRES_PORT || 5432;
const ssl = process.env.POSTGRES_SSLMODE || "disable";

const pool = new Pool({
  connectionString: `postgres://${user}:${password}@${host}:${port}/${database}?sslmode=${ssl}`,
});

const query = (text, params) => {
  return pool.query(text, params);
};

export default {
  query,
};
