import { createEnv } from '@t3-oss/env-core'
import 'dotenv/config'
import { z } from 'zod'

export const env = createEnv({
  server: {
    CLICKHOUSE_HOST: z.string(),
    CLICKHOUSE_PASSWORD: z.string(),
    CLICKHOUSE_USERNAME: z.string(),
    CLICKHOUSE_DB: z.string().optional(),
    KAFKA_BROKER: z.string(),
    KAFKA_USERNAME: z.string(),
    KAFKA_PASSWORD: z.string(),
  },
  runtimeEnv: {
    CLICKHOUSE_HOST: process.env.CLICKHOUSE_HOST,
    CLICKHOUSE_PASSWORD: process.env.CLICKHOUSE_PASSWORD,
    CLICKHOUSE_USERNAME: process.env.CLICKHOUSE_USERNAME,
    CLICKHOUSE_DB: process.env.CLICKHOUSE_DB,
    KAFKA_BROKER: process.env.KAFKA_BROKER,
    KAFKA_USERNAME: process.env.KAFKA_USERNAME,
    KAFKA_PASSWORD: process.env.KAFKA_PASSWORD,
  },
})
