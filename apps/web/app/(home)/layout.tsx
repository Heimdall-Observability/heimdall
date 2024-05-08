import { ReactNode } from 'react'

import { auth } from '@/auth'
import { SiteHeader } from '@/components/header'
import { SiteFooter } from '@/components/site-footer'
import { SessionProvider } from 'next-auth/react'

export const dynamic = 'force-dynamic'

interface HomeLayoutProps {
  children: ReactNode
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  const session = await auth()

  return (
    <SessionProvider>
      <main className="flex min-h-screen w-full flex-col items-center justify-center space-y-6 p-4 md:p-8">
        <SiteHeader
          user={session?.user}
          className="mx-auto w-full max-w-[calc(95ch+8rem)]"
        />
        <div className="flex w-full max-w-[calc(95ch+8rem)] flex-1 flex-col justify-center">
          {children}
        </div>
        <SiteFooter className="mx-auto w-full max-w-[calc(95ch+8rem)]" />
      </main>
    </SessionProvider>
  )
}
