'use client'

import { fetcher } from '@/lib/utils'
import { HeimdallTraces } from '@heimdall-logs/types'
import { env } from 'env.mjs'
import useSWR from 'swr'

import { TimeRange } from '@/components/dashboard/type'
import { getLast24Hour } from '@/lib/time-helper'
import { useState } from 'react'
import { columns } from './column'
import { DataTable } from './table-data'

const RuntimeLogs = ({ id }: { id: string }) => {
  const url = env.NEXT_PUBLIC_API_URL
  const [timeRange, _setTimeRange] = useState<TimeRange>({
    startDate: getLast24Hour(),
    endDate: new Date(),
    stringValue: '24hr',
  })
  const { startDate, endDate } = timeRange

  const { data, isLoading } = useSWR<HeimdallTraces[]>(
    `${url}/traces?websiteId=${id}&startDate=${startDate}&endDate=${endDate}`,
    fetcher,
  )

  return (
    <div className="no-scrollbar">
      <DataTable columns={columns} data={data ?? []} isLoading={isLoading} />
    </div>
  )
}
export default RuntimeLogs
