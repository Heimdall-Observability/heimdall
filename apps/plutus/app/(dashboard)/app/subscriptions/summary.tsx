'use client'

import { useMemo } from 'react'

import OverviewCard from '@/app/(dashboard)/app/_components/overview-card'
import { useUser } from '@/components/client-provider/auth-provider'
import { useData } from '@/components/client-provider/data-provider'
import CardLoader from '@/components/loader/card'
import { formatCurrency } from '@/lib/formatter'

export default function SubscriptionSummary() {
  const user = useUser()
  const { data = [], loading = true } = useData()
  const monthlyData = useMemo(
    () => data.filter((datum: any) => datum.active && datum.paid === 'monthly'),
    [data],
  )
  const yearlyData = useMemo(
    () => data.filter((datum: any) => datum.active && datum.paid === 'yearly'),
    [data],
  )

  return (
    <>
      {loading ? (
        <CardLoader cards={4} className="mb-6" />
      ) : (
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          <OverviewCard
            heading="Total Subscriptions"
            data={data.length}
            className="bg-[#EADDFF] text-[#21005D]"
          />
          <OverviewCard
            heading="Active - Cancelled"
            data={`${data.filter((datum: any) => datum.active).length} - ${
              data.filter((datum: any) => !datum.active).length
            }`}
            className="bg-[#D5E4EB] text-[#34383B]"
          />
          <OverviewCard
            heading="Active - Monthly"
            data={formatCurrency({
              value: monthlyData.reduce(
                (acc: any, datum: any) => Number(datum.price) + acc,
                0,
              ),
              currency: user.currency,
              locale: user.locale,
            })}
            className="bg-[#B9E3FD] text-[#282B2D]"
          />

          <OverviewCard
            heading="Active - Yearly"
            data={formatCurrency({
              value: yearlyData.reduce(
                (acc: any, datum: any) => Number(datum.price) + acc,
                0,
              ),
              currency: user.currency,
              locale: user.locale,
            })}
            className="bg-[#efebe9] text-[#3e2723]"
          />
        </div>
      )}
    </>
  )
}
