import { timestamp } from "drizzle-orm/mysql-core";

export const createdAtTimestamp = timestamp("created_at", {
  mode: "date",
})
  .defaultNow()
  .notNull();

export const updatedAtTimestamp = timestamp("updated_at", {
  mode: "date",
})
  .defaultNow()
  .$onUpdateFn(() => new Date())
  .notNull();
