import { env } from "../env";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/mysql2";

const db = drizzle(env.DATABASE_URL, { schema, mode: "default" });

export { db, schema };
