import { redirect } from 'next/navigation'

import { ReactNode } from 'react'

import { MobileDashboardHeader } from '@/components/header'
import { SideNav } from '@/components/side-nav'
import { dashboardConfig } from '@/config/dashboard'
// import {
// 	DashboardHeader,
// 	PublicDashboardHeader,
// } from '@/components/site-header';
import { getCurrentUser } from '@/lib/session'

export default async function layout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser()

  if (!user) {
    return redirect('/login')
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/50 pb-12">
      <div className="flex h-full">
        <main className="flex w-full flex-1 flex-col space-y-0 overflow-hidden mx-auto max-w-[1820px] md:px-16 px-4 min-h-[99vh]">
          <MobileDashboardHeader
            user={user}
            items={dashboardConfig.projectNav}
          />
          <SideNav items={dashboardConfig.sideNav} user={user} />
          <div>{children}</div>
        </main>
      </div>
    </div>
  )
}
