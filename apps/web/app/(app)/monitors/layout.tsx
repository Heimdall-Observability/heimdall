import { redirect } from 'next/navigation'

import { ReactNode } from 'react'

import { auth } from '@/auth'
import { MobileDashboardHeader } from '@/components/header'
import { SideNav } from '@/components/side-nav'
import { dashboardConfig } from '@/config/dashboard'
import { getWebsite } from '@/server/query/website'

export default async function APIKeysLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await auth()
  const user = session?.user
  if (!user) {
    return redirect('/login')
  }

  const { userWebsites, teamWebsites } = await getWebsite()
  const _websites = userWebsites.concat(teamWebsites)

  return (
    <main className="flex min-h-screen flex-col bg-muted/50 pb-12">
      <div className="flex h-full">
        <div className="flex w-full flex-1 flex-col overflow-hidden">
          <MobileDashboardHeader
            user={user}
            items={dashboardConfig.projectNav}
          />
          <SideNav items={dashboardConfig.sideNav} user={user} />
          <div className="container">{children}</div>
        </div>
      </div>
    </main>
  )
}
