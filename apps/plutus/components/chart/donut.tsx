'use client'

import { useMemo } from 'react'

import { useUser } from '@/components/client-provider/auth-provider'
import { useOverview } from '@/components/client-provider/overview-provider'
import ChartLoader from '@/components/loader/chart'
import {
  extractSubscriptionCategories,
  extractSubscriptions,
} from '@/lib/extractor'
import { formatCurrency } from '@/lib/formatter'
import { DonutChart, Legend } from '@tremor/react'

export default function Donut() {
  const user = useUser()
  const { data, loading } = useOverview()
  const chartData = useMemo<Array<any>>(
    () => extractSubscriptions(data.subscriptions),
    [data.subscriptions],
  )
  const categories = useMemo<Array<any>>(
    () => extractSubscriptionCategories(data.subscriptions),
    [data.subscriptions],
  )

  if (loading) {
    return <ChartLoader className="h-[340px]" type="donut" />
  }

  if (!chartData.length) {
    return (
      <p className="flex h-80 items-center justify-center text-sm">No data</p>
    )
  }

  return (
    <>
      <div className="flex justify-end">
        <Legend className="-mt-4" categories={categories} />
      </div>
      <DonutChart
        data={chartData}
        category={'price'}
        index="name"
        valueFormatter={(value) => {
          return formatCurrency({
            value,
            currency: user.currency,
            locale: user.locale,
          })
        }}
        showAnimation={false}
        showTooltip
        showLabel
        className="mt-8 h-80 text-3xl font-bold"
        colors={['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber']}
      />
    </>
  )
}
