'use client'

import { ServerError } from '@/components/errors'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return <ServerError error={error} reset={reset} />
}
