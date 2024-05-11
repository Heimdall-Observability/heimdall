import { Metadata } from 'next'

import { Fragment } from 'react'

import AddData from '@/app/(dashboard)/app/_components/add-data'
import OverviewCardLayout from '@/app/(dashboard)/app/_components/overview-card-layout'
import OverviewCharts from '@/app/(dashboard)/app/_components/overview-charts'
import AppLayoutHeader from '@/components/app-layout-header'
import { OverviewContextProvider } from '@/components/client-provider/overview-provider'

export const metadata: Metadata = {
  title: 'Overview',
  description: 'Plutus finance tracker.',
}

const _items = [
  {
    title: 'Total Income',
    icon: 'income',
    subTitle: 'Ksh 120,000',
    caption: '+20.1% from last month',
  },
  {
    title: 'Available Balance',
    icon: 'expenses',
    subTitle: 'Ksh 120,000',
    caption: '+20.1% from last month',
  },
  {
    title: 'Total Expenses',
    icon: 'chart',
    subTitle: 'Ksh 120,000',
    caption: '+20.1% from last month',
  },
  {
    title: 'Total Investments',
    icon: 'investments',
    subTitle: 'Ksh 120,000',
    caption: '+20.1% from last month',
  },
]

export default function Dashboard() {
  return (
    <Fragment>
      <AppLayoutHeader heading="Account Overview" showDatePicker />
      <OverviewContextProvider>
        <OverviewCardLayout />
        <OverviewCharts />
        <AddData />
      </OverviewContextProvider>
    </Fragment>
  )
}
