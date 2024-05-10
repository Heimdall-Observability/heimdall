import { createClient } from '@clickhouse/client-web'

// This client can only be used in node.js environment

const clickhouseClient = createClient({
  url: process.env.CLICKHOUSE_URL,
  // username: env.CLICKHOUSE_USERNAME,
  // password: env.CLICKHOUSE_PASSWORD,
  database: 'default',
  /* configuration */
})

export { clickhouseClient }
