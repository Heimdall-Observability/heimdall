import { ReactNode } from 'react'

import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'

export const dynamic = 'force-dynamic'

interface HomeLayoutProps {
  children: ReactNode
}

export default async function Layout({ children }: HomeLayoutProps) {
  const _session = await auth()

  return <SessionProvider>{children}</SessionProvider>
}
