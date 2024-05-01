import { ServerError } from '@/components/errors'

export default function ErrorBoundaryPage({
  error,
  resetErrorBoundary,
}: {
  error: Error
  resetErrorBoundary: () => void
}) {
  return <ServerError error={error} reset={resetErrorBoundary} />
}
