import { Metadata } from 'next'

import { Fragment } from 'react'

import Account from '@/app/(dashboard)/app/settings/account'
import DeleteAccount from '@/app/(dashboard)/app/settings/delete-account'
import Plans from '@/app/(dashboard)/app/settings/plans'
import Theme from '@/app/(dashboard)/app/settings/theme'
import Usage from '@/app/(dashboard)/app/settings/usage'
import AppLayoutHeader from '@/components/app-layout-header'

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Plutus finance tracker.',
}

export default function Investments() {
  return (
    <Fragment>
      <AppLayoutHeader heading="Settings" />
      <div className="mt-6 w-full overflow-x-auto pt-3">
        <div className="m-auto flex w-full max-w-2xl flex-col items-center space-y-2 md:space-y-6">
          <Account />
          <Theme />
          <Usage />
          <Plans />
          <DeleteAccount />
        </div>
      </div>
    </Fragment>
  )
}
