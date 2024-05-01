import { createClient } from '@clickhouse/client'

import { env } from '../../env'

export const client = env.CLICKHOUSE_HOST
  ? createClient({
      url: env.CLICKHOUSE_HOST,
      password: env.CLICKHOUSE_PASSWORD,
      username: env.CLICKHOUSE_USERNAME,
      database: env.CLICKHOUSE_DB,
    })
  : null
