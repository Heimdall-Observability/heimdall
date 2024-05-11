'use client'

import OverviewCard from '@/app/(dashboard)/app/_components/overview-card'
import { useUser } from '@/components/client-provider/auth-provider'
import { useData } from '@/components/client-provider/data-provider'
import CardLoader from '@/components/loader/card'
import { formatCurrency } from '@/lib/formatter'

export default function InvestmentSummary() {
  const user = useUser()
  const { data = [], loading = true } = useData()

  return (
    <>
      {loading ? (
        <CardLoader cards={2} className="mb-6" />
      ) : (
        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
          <OverviewCard heading="total investments" data={data.length} />
          <OverviewCard
            heading="total amount"
            data={formatCurrency({
              value: data.reduce(
                (acc: any, datum: any) =>
                  Number(datum.price) * Number(datum.units) + acc,
                0,
              ),
              currency: user?.currency,
              locale: user?.locale,
            })}
          />
        </div>
      )}
    </>
  )
}
