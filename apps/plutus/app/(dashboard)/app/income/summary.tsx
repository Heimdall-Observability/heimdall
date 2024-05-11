'use client'

import OverviewCard from '@/app/(dashboard)/app/_components/overview-card'
import { useUser } from '@/components/client-provider/auth-provider'
import { useData } from '@/components/client-provider/data-provider'
import CardLoader from '@/components/loader/card'
import { formatCurrency } from '@/lib/formatter'

export default function IncomeSummary() {
  const user = useUser()
  const { data = [], loading = true } = useData()

  return (
    <>
      {loading ? (
        <CardLoader cards={2} className="mb-6" />
      ) : (
        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
          <OverviewCard
            heading="Total income"
            data={data.length}
            className="bg-[#D9E9BA] text-[#3E4E56]"
          />
          <OverviewCard
            heading="Total amount"
            data={formatCurrency({
              value: data.reduce(
                (acc: any, datum: any) => Number(datum.price) + acc,
                0,
              ),
              currency: user?.currency,
              locale: user?.locale,
            })}
            className="bg-[#D5E4EB] text-[#34383B]"
          />
          {/* <SummaryCard title="top spent category" data={formatCurrency({ value: 1 })} /> */}
        </div>
      )}
    </>
  )
}
