'use client'

import OverviewCard from '@/app/(dashboard)/app/_components/overview-card'
import { useUser } from '@/components/client-provider/auth-provider'
import { useOverview } from '@/components/client-provider/overview-provider'
import CardLoader from '@/components/loader/card'
import { formatCurrency } from '@/lib/formatter'

export default function OverviewCardLayout() {
  const user = useUser()
  const { data, loading } = useOverview()

  const totalExpenses = data.expenses.reduce(
    (acc: any, { price }: any) => Number(price) + acc,
    0,
  )
  const totalIncome = data.income.reduce(
    (acc: any, { price }: any) => Number(price) + acc,
    0,
  )
  const totalInvestment = data.investments.reduce(
    (acc: any, { price, units }: any) => Number(price) * Number(units) + acc,
    0,
  )
  const totalSubscriptions = data.subscriptions.reduce(
    (acc: any, { price, paid_dates }: any) =>
      Number(price) * paid_dates.length + acc,
    0,
  )
  const totalSpent = totalExpenses + totalInvestment + totalSubscriptions
  const totalBalance = totalIncome - totalSpent

  return loading ? (
    <CardLoader cards={4} />
  ) : (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
      <OverviewCard
        heading="Income"
        icon="income"
        data={formatCurrency({
          value: totalIncome,
          currency: user.currency,
          locale: user.locale,
        })}
        className="bg-[#EADDFF] text-[#21005D]"
        // caption={caption}
      />
      <OverviewCard
        heading="Spendings"
        icon="expenses"
        data={formatCurrency({
          value: totalSpent,
          currency: user.currency,
          locale: user.locale,
        })}
        className="bg-[#D5E4EB] text-[#34383B]"
        // caption={caption}
      />
      <OverviewCard
        heading="Balance"
        icon="balance"
        data={formatCurrency({
          value: totalBalance,
          currency: user.currency,
          locale: user.locale,
        })}
        className="bg-[#B9E3FD] text-[#282B2D]"
        // caption={caption}
      />
      <OverviewCard
        heading="Subscriptions"
        icon="subscriptions"
        data={formatCurrency({
          value: totalSubscriptions,
          currency: user.currency,
          locale: user.locale,
        })}
        className="bg-[#efebe9] text-[#3e2723]"
        // caption={caption}
      />
    </div>
  )
}
