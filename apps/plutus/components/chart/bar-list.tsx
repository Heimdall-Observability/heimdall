'use client'

import { useMemo } from 'react'

import { useUser } from '@/components/client-provider/auth-provider'
import { useOverview } from '@/components/client-provider/overview-provider'
import ChartLoader from '@/components/loader/chart'
import { extractTopExpenseCategories } from '@/lib/extractor'
import { formatCurrency } from '@/lib/formatter'
import { BarList } from '@tremor/react'

export default function TopSpentExpenses() {
  const user = useUser()
  const { data, loading } = useOverview()
  const chartData = useMemo<Array<any>>(
    () => extractTopExpenseCategories(data.expenses),
    [data.expenses],
  )

  if (loading) {
    return <ChartLoader className="mb-10 h-[230px] pl-0 pt-0" type="barlist" />
  }

  if (!chartData.length) {
    return (
      <p className="flex h-64 items-center justify-center text-sm">No data</p>
    )
  }

  return (
    <BarList
      data={chartData}
      valueFormatter={(value: any) => {
        return formatCurrency({
          value,
          currency: user.currency,
          locale: user.locale,
        })
      }}
      showAnimation={false}
      className="mt-2"
      color="blue"
    />
  )
}
