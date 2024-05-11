import { Metadata } from 'next'

import { Fragment } from 'react'

import InvestmentSummary from '@/app/(dashboard)/app/investments/summary'
import InvestmentTable from '@/app/(dashboard)/app/investments/table'
import AppLayoutHeader from '@/components/app-layout-header'
import { DataContextProvider } from '@/components/client-provider/data-provider'

export const metadata: Metadata = {
  title: 'Investments',
  description: 'Plutus finance tracker.',
}

export default function Investments() {
  return (
    <Fragment>
      <AppLayoutHeader heading="Investments" />
      <DataContextProvider name="investments">
        <InvestmentSummary />
        <InvestmentTable />
      </DataContextProvider>
    </Fragment>
  )
}
