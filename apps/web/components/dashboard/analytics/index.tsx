'use client'

import { InsightCard } from '@/components/dashboard/insight/card'
import LocationMap from '@/components/dashboard/insight/location-map'
import { InsightTables } from '@/components/dashboard/insight/tables'
import { Graph } from '@/components/dashboard/insight/visitor-graph'
import { Filter, FilterProp, TimeRange } from '@/components/dashboard/type'
import { env } from '@/env.mjs'
import { localSettingAtom } from '@/jotai/store'
import { getLast24Hour } from '@/lib/time-helper'
import { cn, fetcher } from '@/lib/utils'
import { heimdall } from '@heimdall-logs/tracker'
import { GetInsightResponse } from '@heimdall-logs/types'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@heimdall-logs/ui'
import { useAtom } from 'jotai/index'
import {
  Activity,
  BarChart,
  Eye,
  Laptop2,
  LineChart,
  MoreHorizontal,
  TimerIcon,
  User2,
  Users2,
} from 'lucide-react'
import { Fragment, useEffect, useState } from 'react'
import useSWR from 'swr'

export default function Analytics({
  website,
  token,
}: {
  website: { id: string; url: string; title: string | null }
  token: string
}) {
  const [timeRange, setTimeRange] = useState<TimeRange>({
    startDate: getLast24Hour(),
    endDate: new Date(),
    stringValue: '24hr',
  })
  const [_customTime, _setCustomTime] = useState(false)
  const [filters, setFilters] = useState<Filter[]>([])
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const [setting] = useAtom(localSettingAtom)
  const url = env.NEXT_PUBLIC_API_URL
  const { data, isLoading } = useSWR<GetInsightResponse>(
    `${url}?websiteId=${
      website.id
    }&startDate=${timeRange.startDate.toUTCString()}&endDate=${timeRange.endDate.toUTCString()}&timeZone=${
      setting.timezone ?? timezone
    }&filter=${JSON.stringify(filters)}&token=${token}`,
    fetcher,
  )

  function addFilter(f: Filter) {
    setFilters([...filters, f])
  }

  function clearFilter(key: string) {
    setFilters((prev) => prev.filter((f) => f.key !== key))
  }

  const isFilterActive = (key: string) =>
    filters.some((filter) => filter.key === key)

  const filter: FilterProp = {
    addFilter,
    clearFilter,
    isFilterActive,
  }

  const [curTableTab, setCurTableTab] = useState('')
  const [viCardSwitch, setViCardSwitch] = useState<
    'New Visitors' | 'Unique Visitors' | 'Retaining Visitors'
  >('Unique Visitors')
  const [isBar, setIsBar] = useState(setting.graph === 'bar-graph')
  useEffect(() => {
    if (setting) {
      setIsBar(setting.graph === 'bar-graph')
    }
  }, [setting])

  return (
    <Fragment>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <InsightCard
          title={viCardSwitch}
          Icon={User2}
          data={
            data
              ? viCardSwitch === 'New Visitors'
                ? data.insight.newVisitors
                : viCardSwitch === 'Unique Visitors'
                  ? data.insight.uniqueVisitors
                  : viCardSwitch === 'Retaining Visitors'
                    ? data.insight.returningVisitor
                    : { change: 0, current: 0 }
              : { change: 0, current: 0 }
          }
          isLoading={isLoading}
          tooltip={
            viCardSwitch === 'New Visitors'
              ? 'The number of people visiting your website for the first time.'
              : viCardSwitch === 'Unique Visitors'
                ? 'The total number of different people who visited your website.'
                : viCardSwitch === 'Retaining Visitors'
                  ? 'The number of visitors who returned to your website multiple times.'
                  : ''
          }
          BottomChildren={() => (
            <div className=" cursor-pointer">
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <MoreHorizontal className="h-4 w-4" />
                  </PopoverTrigger>
                  <PopoverContent className="w-48 ">
                    <RadioGroup
                      onValueChange={(
                        v:
                          | 'New Visitors'
                          | 'Unique Visitors'
                          | 'Retaining Visitors',
                      ) => {
                        setViCardSwitch(v)
                        heimdall.track('visitor-card-switched', {
                          websiteId: website.id,
                          switch: viCardSwitch,
                        })
                      }}
                      defaultValue={viCardSwitch}
                      className="grid gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Unique Visitors" id="r2" />
                        <Label htmlFor="r2">Unique Visitors</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="New Visitors" id="r1" />
                        <Label htmlFor="r1">New Visitors</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Retaining Visitors" id="r3" />
                        <Label htmlFor="r3">Retaining Visitors</Label>
                      </div>
                    </RadioGroup>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}
        />
        <InsightCard
          title={'Views'}
          Icon={Eye}
          data={data ? data.insight.totalPageViews : { change: 0, current: 0 }}
          isLoading={isLoading}
          tooltip="The total number of pages viewed. Repeated views of a single page are counted."
        />
        <InsightCard
          title={'Average Time'}
          Icon={TimerIcon}
          data={data ? data.insight.averageTime : { change: 0, current: 0 }}
          valuePrefix={''}
          isLoading={isLoading}
          tooltip="The average amount of time visitors spend on your website."
        />
        <InsightCard
          title={'Bounce Rate'}
          valuePrefix={'%'}
          Icon={Activity}
          negative
          data={data ? data.insight.bounceRate : { change: 0, current: 0 }}
          isLoading={isLoading}
          tooltip=" The percentage of visitors who quickly exit your website without exploring further."
        />
      </div>
      <div className="grid min-h-max grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4 shadow-none">
          {curTableTab === 'locations' ? (
            <Fragment>
              <CardHeader className="flex flex-row items-end gap-2">
                <CardTitle className="py-2">Visitors Map</CardTitle>
              </CardHeader>
              <CardContent
                className={cn(curTableTab === 'locations' && 'zoom-in-95')}
              >
                <LocationMap data={data ? data.data.locations.country : []} />
              </CardContent>
            </Fragment>
          ) : (
            <Tabs defaultValue="visitors" className="">
              <CardHeader className=" flex flex-row items-center justify-between">
                <CardTitle className="text-base">
                  <TabsList className="">
                    <TabsTrigger value="visitors">Visitors</TabsTrigger>
                    <TabsTrigger value="sessions">Sessions</TabsTrigger>
                  </TabsList>
                </CardTitle>
                <div className=" flex items-center gap-2">
                  <Tabs
                    defaultValue={isBar ? 'bar-graph' : 'line-graph'}
                    onValueChange={(v) => setIsBar(v === 'bar-graph')}
                    value={isBar ? 'bar-graph' : 'line-graph'}
                  >
                    <TabsList className="">
                      <TabsTrigger value="line-graph">
                        <LineChart size={18} />
                      </TabsTrigger>
                      <TabsTrigger value="bar-graph">
                        <BarChart size={18} />
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <div className="pl-2">
                  <TabsContent value="visitors" className="rounded-lg">
                    <Graph
                      bar={isBar}
                      data={data ? data.graph.uniqueVisitorsByDate : []}
                      name="Visitors"
                      Icon={Users2}
                      isLoading={isLoading}
                      setTimeRange={setTimeRange}
                    />
                  </TabsContent>
                  <TabsContent value="sessions" className="">
                    <Graph
                      data={data ? data.graph.uniqueSessionByDate : []}
                      name="Sessions"
                      Icon={Laptop2}
                      isLoading={isLoading}
                      setTimeRange={setTimeRange}
                      bar={isBar}
                    />
                  </TabsContent>
                </div>
              </CardContent>
            </Tabs>
          )}
        </Card>
        <InsightTables
          isLoading={isLoading}
          filter={filter}
          data={data}
          websiteUrl={website.url}
          setCurrentTableTab={setCurTableTab}
        />
      </div>
    </Fragment>
  )
}
