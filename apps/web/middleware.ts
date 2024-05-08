import { auth } from '@/auth'
import { NextResponse } from 'next/server'

const publicAppPaths = ['/login']

export default auth(async (req) => {
  const pathname = req.nextUrl.pathname

  const isPublicAppPath = publicAppPaths.some((path) =>
    pathname.startsWith(path),
  )

  if (!req.auth && pathname.startsWith('/dashboard') && !isPublicAppPath) {
    return NextResponse.redirect(
      new URL(`/login?redirectTo=${encodeURIComponent(pathname)}`, req.url),
    )
  }
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/dashboard/:path*',
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
