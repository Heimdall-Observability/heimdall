import { auth } from '@/auth'
import { Span, SpanStatusCode, trace as traceApi } from '@opentelemetry/api'
import { NextResponse } from 'next/server'

const publicAppPaths = ['/login']

function trace<T>(name: string, fn: (span: Span) => Promise<T>): Promise<T> {
  const tracer = traceApi.getTracer('mxl-frontend')
  return tracer.startActiveSpan(name, async (span) => {
    try {
      const result = fn(span)
      span.end()
      return result
    } catch (e) {
      if (e instanceof Error) {
        span.recordException(e)
        span.setStatus({ code: SpanStatusCode.ERROR, message: e.message })
      } else {
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: JSON.stringify(e),
        })
      }
      span.end()
      throw e
    }
  })
}

export default auth(async (req) => {
  const pathname = req.nextUrl.pathname

  const isPublicAppPath = publicAppPaths.some((path) =>
    pathname.startsWith(path),
  )

  if (!req.auth && pathname.startsWith('/dashboard') && !isPublicAppPath) {
    return trace(`app-redirect-span`, async () => {
      NextResponse.redirect(
        new URL(`/login?redirectTo=${encodeURIComponent(pathname)}`, req.url),
      )
    })
  }
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // '/dashboard/:path*',
  ],
}

// export const config = {
//   matcher: [
//     '/logs/:path*',
//     '/uptime/:path*',
//     '/dashboard/:path*',
//     '/insights/:path*',
//     '/login',
//   ],
// }
