'use client'

import { createContext, useContext } from 'react'

import { dateFormat } from '@/constants/date'
import { apiUrls } from '@/lib/apiUrls'
import { format } from 'date-fns'
import useSWR from 'swr'

import { useDate } from './datepicker-provider'

const OverviewContext = createContext(null)

interface Data {
  expenses: Array<any>
  income: Array<any>
  subscriptions: Array<any>
  investments: Array<any>
}

export const OverviewContextProvider = (props: any) => {
  const { date } = useDate()
  const from = format(date.from || date.to, dateFormat)
  const to = format(date.to || date.from, dateFormat)
  const { children, ...others } = props
  const {
    data: expensesData = [],
    isLoading: isExpenseLoading,
    mutate: mutateExpenses,
  } = useSWR(apiUrls.expenses.getExpenses({ from, to }))
  const { data: investmentData = [], isLoading: isInvestmentsLoading } = useSWR(
    apiUrls.investments.getInvestments({ from, to }),
  )
  const { data: incomeData = [], isLoading: isIncomeLoading } = useSWR(
    apiUrls.income.getIncome({ from, to }),
  )
  const { data: subscriptionData = [], isLoading: isSubscriptionsLoading } =
    useSWR(apiUrls.subscriptions.getSubscriptions({ from, to }))

  const data = {
    expenses: expensesData,
    investments: investmentData,
    income: incomeData,
    subscriptions: subscriptionData,
    mutate: {
      mutateExpenses,
    },
  }
  const loading =
    isExpenseLoading ||
    isInvestmentsLoading ||
    isIncomeLoading ||
    isSubscriptionsLoading

  return (
    <OverviewContext.Provider value={{ loading, data }} {...others}>
      {children}
    </OverviewContext.Provider>
  )
}

export const useOverview = () => {
  const context = useContext<any>(OverviewContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a OverviewContext.`)
  }
  return context
}
