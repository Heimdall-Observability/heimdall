'use client'

import { useMemo } from 'react'

import { useUser } from '@/components/client-provider/auth-provider'
import { useOverview } from '@/components/client-provider/overview-provider'
import { DataTable } from '@/components/recent-activities/data-table'
import { extractRecentData } from '@/lib/extractor'

import { columns } from './columns'

const dummy = {
  no: '1.',
  category: 'Food',
  amount: 'Ksh 100',
  name: 'Mutura',
}

export default function RecentActivitiesTable() {
  const _user = useUser()
  const { data, loading } = useOverview()

  const recentData = useMemo(
    () =>
      extractRecentData(
        data.expenses,
        data.subscriptions,
        data.investments,
        data.income,
      ),
    [data],
  )

  if (loading) {
    return (
      <DataTable
        data={[dummy, dummy, dummy, dummy, dummy]}
        loading={loading}
        columns={columns}
      />
    )
  }

  if (!recentData.length) {
    return (
      <p className="flex h-64 items-center justify-center text-sm">No data</p>
    )
  }

  return (
    <DataTable
      columns={columns}
      data={recentData.map((datum, index) => ({
        no: `${index + 1}.`,
        category: datum.category,
        amount: datum.price,
        name: datum.name,
      }))}
    />
  )
}
