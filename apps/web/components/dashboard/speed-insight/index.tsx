'use client'
import { env } from '@/env.mjs'
import { useIsMobile } from '@/hooks/use-viewport'
import { localSettingAtom } from '@/jotai/store'
import { getLast24Hour } from '@/lib/time-helper'
import { cn, fetcher } from '@/lib/utils'
import { GetVitalsResponse } from '@heimdall-logs/types'
import { Tabs, TabsList, TabsTrigger } from '@heimdall-logs/ui'
import { Dialog, DialogContent, DialogTrigger } from '@heimdall-logs/ui'
import { Card, CardContent, CardHeader, CardTitle } from '@heimdall-logs/ui'
import { Button } from '@heimdall-logs/ui'
import { useAtom } from 'jotai/index'
import {
  ArrowDown,
  ArrowUpIcon,
  ArrowUpLeftFromCircle,
  BarChart,
  ExternalLinkIcon,
  GaugeCircle,
  LineChart,
  Monitor,
  Smartphone,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Filter, FilterProp, TimeRange } from '../type'
import { SpeedChart } from './chart'
import { Stat, stats } from './stats'
import { SpeedTables } from './table'

export const SpeedInsight = ({
  website,
  token,
}: {
  website: { id: string; url: string; title: string | null }
  token: string
}) => {
  const [timeRange, _setTimeRange] = useState<TimeRange>({
    startDate: getLast24Hour(),
    endDate: new Date(),
    stringValue: '24hr',
  })
  const [_customTime, _setCustomTime] = useState(false)
  const [filters, setFilters] = useState<Filter[]>([])
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const [setting] = useAtom(localSettingAtom)
  const url = env.NEXT_PUBLIC_API_URL

  function addFilter(f: Filter) {
    setFilters([...filters, f])
  }

  function clearFilter(key: string) {
    setFilters((prev) => prev.filter((f) => f.key !== key))
  }

  const isFilterActive = (key: string) =>
    filters.some((filter) => filter.key === key)

  const _filter: FilterProp = {
    addFilter,
    clearFilter,
    isFilterActive,
  }

  const { data, isLoading } = useSWR<GetVitalsResponse>(
    `${url}/vitals?websiteId=${
      website.id
    }&startDate=${timeRange.startDate.toUTCString()}&endDate=${timeRange.endDate.toUTCString()}&timeZone=${
      setting.timezone ?? timezone
    }&token=${token}`,
    fetcher,
  )

  const [activeStat, setActiveStat] = useState<(typeof stats)[0]>(stats[0])
  const isMobile = useIsMobile()
  const [statsList, setStatsList] = useState<Stat[]>([])
  useEffect(() => {
    setStatsList(isMobile ? stats.splice(0, 4) : stats)
  }, [])
  const [chartDevice, setChartDevice] = useState('desktop')
  const [chartType, setChartType] = useState('bar-graph')
  return (
    <div className="gap-4 space-y-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {statsList.map((stat) => {
          const value = data?.[stat.short].current
          const change = data?.[stat.short].change
          return (
            <Card
              className={cn(
                activeStat.name === stat.name
                  ? 'relative grow cursor-pointer bg-muted/10 p-0 shadow-none'
                  : 'grow cursor-pointer opacity-80 shadow-none',
              )}
              key={stat.name}
              onClick={() => setActiveStat(stat)}
            >
              {activeStat.name === stat.name && (
                <span className="absolute left-1/2 top-0 h-px w-1/2 rounded-md blur-sm"></span>
              )}
              <CardHeader className="md:flex-row md:items-center md:justify-between">
                <CardTitle className="text-sm font-normal">
                  {stat.name}
                </CardTitle>
                <Dialog>
                  <DialogTrigger>
                    <div className="relative flex w-max cursor-pointer items-center gap-2 rounded-md border px-3 py-1">
                      <ArrowUpLeftFromCircle size={12} />
                      <span className="text-xs">{stat.short}</span>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="h-min  space-y-2 p-4">
                      <div className="text-lg font-medium tracking-tight xl:text-xl">
                        {stat.name} ({stat.short})
                      </div>
                      <span className="text-muted-foreground">
                        {activeStat.description}
                      </span>
                      <Link
                        href={`https://web.dev/${stat.short.toLowerCase()}`}
                        target="_blank"
                      >
                        <Button
                          className="text-brand-400 mt-4 gap-2"
                          type="outline"
                          iconRight={<ExternalLinkIcon size={14} />}
                        >
                          <span>Learn More</span>
                        </Button>
                      </Link>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              {!isLoading && data ? (
                <CardContent className=" flex flex-col justify-between md:flex-row md:items-center">
                  <div className=" flex flex-col items-start gap-1">
                    <p className="text-xl font-medium tracking-tight xl:text-2xl">
                      {stat.formatter(data?.[stat.short].current ?? 0)}
                    </p>
                    <div className="hidden items-center justify-center rounded-md border px-3 py-px md:flex">
                      <span
                        className="text-brand-800 text-xs"
                        style={{
                          color: stat.getRating(value).style,
                        }}
                      >
                        {stat.getRating(value).label}
                      </span>
                    </div>
                  </div>
                  <div className=" flex justify-between gap-2  md:flex-col">
                    <div className="flex items-center justify-center rounded-md border px-3 py-px md:hidden">
                      <span
                        className="text-brand-800 text-xs"
                        style={{
                          color: stat.getRating(value).style,
                        }}
                      >
                        {stat.getRating(value).label}
                      </span>
                    </div>
                    <div className=" flex items-center justify-between">
                      {change ? (
                        <div className=" flex items-center text-xs xl:text-sm">
                          {change > 0 ? (
                            <ArrowUpIcon className=" w-4 text-green-500 xl:w-5" />
                          ) : (
                            <ArrowDown className=" w-4 text-red-500 xl:w-5" />
                          )}
                          <div>{`${change} %`}</div>
                        </div>
                      ) : (
                        <div>-</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              ) : (
                <CardContent className=" h-24 w-full animate-pulse">
                  <div className="flex flex-col justify-center gap-2">
                    <div className="text-2xl font-bold">
                      <div className="h-7 w-24 bg-gray-200 dark:bg-gray-800 "></div>
                    </div>
                    <div className="text-2xl font-bold">
                      <div className="h-4 w-9 bg-gray-200 dark:bg-gray-800 "></div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>
      <div className="grid min-h-max grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-7 md:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">
              <Tabs onValueChange={setChartDevice} value={chartDevice}>
                <TabsList>
                  <TabsTrigger value="desktop">
                    <div className=" flex items-center gap-1 text-xs md:text-sm">
                      <Monitor size={isMobile ? 10 : 16} />
                      Desktop
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="mobile">
                    <div className=" flex items-center gap-1  text-xs md:text-sm">
                      <Smartphone size={isMobile ? 10 : 16} />
                      Mobile
                    </div>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardTitle>

            <Tabs value={chartType} onValueChange={setChartType}>
              <TabsList>
                <TabsTrigger value="bar-graph">
                  <BarChart size={isMobile ? 14 : 18} />
                </TabsTrigger>
                <TabsTrigger value="line-graph">
                  <LineChart size={isMobile ? 14 : 18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className=" w-full">
            <SpeedChart
              data={data?.graph[chartDevice][activeStat.short]}
              Icon={GaugeCircle}
              activeStat={activeStat}
              bar={chartType === 'bar-graph'}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
        <SpeedTables
          data={data?.data}
          activeStat={activeStat}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
