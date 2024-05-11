import { Metadata } from 'next'

import { Fragment } from 'react'

import ExpensesSummary from '@/app/(dashboard)/app/expenses/summary'
import ExpenseTable from '@/app/(dashboard)/app/expenses/table'
import AppLayoutHeader from '@/components/app-layout-header'
import { DataContextProvider } from '@/components/client-provider/data-provider'

export const metadata: Metadata = {
  title: 'Expenses',
  description: 'Plutus finance tracker.',
}

export default function Income() {
  return (
    <Fragment>
      <AppLayoutHeader heading="Expenses" />
      <DataContextProvider name="expenses">
        <ExpensesSummary />
        <ExpenseTable />
      </DataContextProvider>
    </Fragment>
  )
}
