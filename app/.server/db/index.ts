import { env } from "../env";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2/promise";

const pool = createPool(env.DATABASE_URL);

const db = drizzle({ client: pool, schema, mode: "default" });

export { db, schema };
