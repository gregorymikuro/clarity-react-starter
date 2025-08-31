import type { DefaultOmit } from "../types";
import { createdAtTimestamp, updatedAtTimestamp } from "../utils";
import { boolean, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: createdAtTimestamp,
  updatedAt: updatedAtTimestamp,
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const sessions = mysqlTable("sessions", {
  id: varchar("id", { length: 36 }).primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: createdAtTimestamp,
  updatedAt: updatedAtTimestamp,
});

export type Session = typeof sessions.$inferSelect;
export type InsertSession = Omit<typeof sessions.$inferInsert, DefaultOmit>;

export const accounts = mysqlTable("accounts", {
  id: varchar("id", { length: 36 }).primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: createdAtTimestamp,
  updatedAt: updatedAtTimestamp,
});

export type Account = typeof accounts.$inferSelect;
export type InsertAccount = Omit<typeof accounts.$inferInsert, DefaultOmit>;

export const verifications = mysqlTable("verifications", {
  id: varchar("id", { length: 36 }).primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: createdAtTimestamp,
  updatedAt: updatedAtTimestamp,
});

export type Verification = typeof verifications.$inferSelect;
export type InsertVerification = Omit<typeof verifications.$inferInsert, DefaultOmit>;
