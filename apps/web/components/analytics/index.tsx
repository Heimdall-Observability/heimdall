import { env } from '@/env.mjs'
import { HeimdallAnalytics } from '@heimdall-logs/tracker/react'
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import { Fragment } from 'react'

const isProduction = process.env.NODE_ENV === 'production'

export default function Analytics() {
  return (
    <Fragment>
      <HeimdallAnalytics
        config={{
          id: env.NEXT_PUBLIC_OTEL_SERVICE_ID,
          consent: 'granted',
          host: '/api/heimdall',
          collector: '/api/trace',
          // collector: env.NEXT_PUBLIC_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
          // host: env.NEXT_PUBLIC_API_URL,
          autoTrack: true,
          env: 'prod',
          debug: true,
        }}
      />
      {isProduction && <VercelAnalytics />}
    </Fragment>
  )
}
