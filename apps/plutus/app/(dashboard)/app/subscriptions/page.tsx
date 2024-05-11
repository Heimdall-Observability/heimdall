import { Metadata } from 'next'

import { Fragment } from 'react'

import SubscriptionSummary from '@/app/(dashboard)/app/subscriptions/summary'
import SubscriptionTable from '@/app/(dashboard)/app/subscriptions/table'
import AppLayoutHeader from '@/components/app-layout-header'
import { DataContextProvider } from '@/components/client-provider/data-provider'

export const metadata: Metadata = {
  title: 'Subscriptions',
  description: 'Plutus finance tracker.',
}

export default function Subscriptions() {
  return (
    <Fragment>
      <AppLayoutHeader heading="Subscriptions" />
      <DataContextProvider name="subscriptions" isNotRange={true}>
        <SubscriptionSummary />
        <SubscriptionTable />
      </DataContextProvider>
    </Fragment>
  )
}
