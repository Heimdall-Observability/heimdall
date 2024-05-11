'use client'

import { useMemo } from 'react'

import { useUser } from '@/components/client-provider/auth-provider'
import { useOverview } from '@/components/client-provider/overview-provider'
import ChartLoader from '@/components/loader/chart'
import {
  extractChartAxis,
  extractExpenses,
  extractExpensesCategory,
} from '@/lib/extractor'
import { BarChart } from '@tremor/react'

const dataFormatter = (number: number) => {
  return Intl.NumberFormat('us').format(number).toString()
}

export default function ExpenseChart() {
  const user = useUser()
  const { data, loading } = useOverview()
  const chartData = useMemo<Array<any>>(
    () => extractExpenses(data.expenses, user.locale),
    [data.expenses, user.locale],
  )
  const categoryData = useMemo<Array<string>>(
    () => extractExpensesCategory(data.expenses),
    [data.expenses],
  )
  const [maxXAxisValue] = useMemo<Array<any>>(
    () => extractChartAxis(data.expenses),
    [data.expenses],
  )

  if (loading) {
    return <ChartLoader className="h-[340px]" type="bar" />
  }

  if (!chartData.length) {
    return (
      <p className="flex h-80 items-center justify-center text-sm">No data</p>
    )
  }

  return (
    <BarChart
      className="-mt-4 h-96"
      data={chartData}
      index="date"
      categories={categoryData}
      valueFormatter={(value) => {
        return dataFormatter(value)
      }}
      yAxisWidth={84}
      maxValue={maxXAxisValue?.value}
      showTooltip
      showLegend
      showGridLines
      stack
    />
  )
}
