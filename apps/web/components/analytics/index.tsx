import { Analytics as VercelAnalytics } from '@vercel/analytics/react'

const isProduction = process.env.NODE_ENV === 'production'

export default function Analytics() {
  return <>{isProduction && <VercelAnalytics />}</>
}
