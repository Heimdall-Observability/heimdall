import * as dotenv from "dotenv";

dotenv.config();
import { type Config } from "drizzle-kit";

export default {
  out: "./migrations",
  schema: "./src/schema",
  breakpoints: true,
  driver: "turso",
  dbCredentials: {
    url: (process.env.TURSO_DB_URL as string) ?? "file:./db.sqlite",
    authToken: process.env.TURSO_DB_AUTH_TOKEN as string,
  },
} satisfies Config;
