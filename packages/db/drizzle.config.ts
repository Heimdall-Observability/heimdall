import * as dotenv from 'dotenv'
import { type Config } from 'drizzle-kit'

dotenv.config()

export default {
  out: './migrations',
  schema: './src/schema/index.ts',
  breakpoints: true,
  driver: 'turso',
  strict: true,
  dbCredentials: {
    url: (process.env.TURSO_DB_URL as string) ?? 'file:./heimdall.db',
    authToken: process.env.TURSO_DB_AUTH_TOKEN as string,
  },
} satisfies Config
