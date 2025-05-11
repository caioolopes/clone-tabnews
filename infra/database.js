import { Client, Cliente, DatabaseError } from "pg";
import { prototype } from "pg/lib/type-overrides";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSOWORD,
  });
  await client.connect();
  const resulta = await client.query(queryObject);
  await client.end;
  return resulta;
}
export default {
  query: query,
};
