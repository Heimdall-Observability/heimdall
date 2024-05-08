import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@heimdall-logs/db'
import { NextAuthConfig } from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const authConfig = {
  adapter: DrizzleAdapter(db),
  providers: [GitHub({ allowDangerousEmailAccountLinking: true })],
  pages: {
    signIn: '/login',
  },
  // callbacks: {
  //   authorized({ auth, request: { nextUrl } }) {
  //     const isLoggedIn = !!auth?.user
  //     const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
  //     if (isOnDashboard) {
  //       return isLoggedIn
  //       // Redirect unauthenticated users to login page
  //     } else if (isLoggedIn) {
  //       return Response.redirect(new URL('/dashboard', nextUrl))
  //     }
  //     return true
  //   },
  // },
  trustHost: true,
} satisfies NextAuthConfig
