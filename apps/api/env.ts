import { createEnv } from '@t3-oss/env-core'
import 'dotenv/config'
import { z } from 'zod'

export const env = createEnv({
  server: {
    CLICKHOUSE_HOST: z.string(),
    CLICKHOUSE_PASSWORD: z.string(),
    CLICKHOUSE_USERNAME: z.string(),
    CLICKHOUSE_DB: z.string().optional(),
    NEXTAUTH_SECRET: z.string(),
    CLIENT_IP_ADDRESS: z.string().optional(),

    //this is for rate limiting
    KV_REST_API_URL: z.string().optional(),
    KV_REST_API_TOKEN: z.string().optional(),
    KV_REST_API_READ_ONLY_TOKEN: z.string().optional(),
  },
  runtimeEnv: {
    CLICKHOUSE_HOST: process.env.CLICKHOUSE_HOST,
    CLICKHOUSE_PASSWORD: process.env.CLICKHOUSE_PASSWORD,
    CLICKHOUSE_USERNAME: process.env.CLICKHOUSE_USERNAME,
    CLICKHOUSE_DB: process.env.CLICKHOUSE_DB,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    CLIENT_IP_ADDRESS: process.env.CLIENT_IP_ADDRESS,
  },
})
