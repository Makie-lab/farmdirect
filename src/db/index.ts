import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const DATABASE_URL = process.env.DATABASE_URL;

// Only connect if DATABASE_URL is provided and valid
const sql = DATABASE_URL && DATABASE_URL !== "postgresql://user:password@localhost:5432/farmdirect"
  ? neon(DATABASE_URL)
  : null;

export const db = sql ? drizzle(sql, { schema }) : null;
export type DB = NonNullable<typeof db>;
