import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    RESEND_EMAIL_SECRET: z.string().min(1).optional(),
    TURSO_DB_URL: z.string().min(1),
    TURSO_DB_AUTH_TOKEN: z.string().optional(),
    CLICKHOUSE_HOST: z.string().min(1),
    CLICKHOUSE_PASSWORD: z.string().min(0),
    CLICKHOUSE_USERNAME: z.string().min(0),
    CLICKHOUSE_DB: z.string().min(0),
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_SECRET_KEY_LIVE: z.string().min(1),
    AUTH_SECRET: z.string().min(1),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_API_URL: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT: z.string().min(1),
    NEXT_PUBLIC_OTEL_SERVICE_ID: z.string().min(1),
    NEXT_PUBLIC_OTEL_SERVICE_NAME: z.string().min(1),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    TURSO_DB_URL: process.env.TURSO_DB_URL,
    TURSO_DB_AUTH_TOKEN: process.env.TURSO_DB_AUTH_TOKEN,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    RESEND_EMAIL_SECRET: process.env.RESEND_EMAIL_SECRET,
    CLICKHOUSE_HOST: process.env.CLICKHOUSE_HOST,
    CLICKHOUSE_PASSWORD: process.env.CLICKHOUSE_PASSWORD,
    CLICKHOUSE_USERNAME: process.env.CLICKHOUSE_USERNAME,
    CLICKHOUSE_DB: process.env.CLICKHOUSE_DB,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_SECRET_KEY_LIVE: process.env.STRIPE_SECRET_KEY_LIVE,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT:
      process.env.NEXT_PUBLIC_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
    NEXT_PUBLIC_OTEL_SERVICE_ID: process.env.NEXT_PUBLIC_OTEL_SERVICE_ID,
    NEXT_PUBLIC_OTEL_SERVICE_NAME: process.env.NEXT_PUBLIC_OTEL_SERVICE_NAME,
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
})
