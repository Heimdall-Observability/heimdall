import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import "dotenv/config";

export const env = createEnv({
  server: {
    DATABASE_HOST: z.string(),
    DATABASE_USERNAME: z.string(),
    DATABASE_PASSWORD: z.string(),
    CLICKHOUSE_HOST: z.string().optional(),
    CLICKHOUSE_PASSWORD: z.string().optional(),
    NEXTAUTH_SECRET: z.string(),
    CLIENT_IP_ADDRESS: z.string().optional(),

    //this is for rate limiting
    KV_REST_API_URL: z.string().optional(),
    KV_REST_API_TOKEN: z.string().optional(),
    KV_REST_API_READ_ONLY_TOKEN: z.string().optional(),
  },
  runtimeEnv: {
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    CLICKHOUSE_HOST: process.env.CLICKHOUSE_HOST,
    CLICKHOUSE_PASSWORD: process.env.CLICKHOUSE_PASSWORD,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    CLIENT_IP_ADDRESS: process.env.CLIENT_IP_ADDRESS,
  },
});
