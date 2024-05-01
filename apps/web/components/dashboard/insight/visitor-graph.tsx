import { useEffect, useState } from 'react'

import { EmptyPlaceholder } from '@/components/empty-placeholder'
import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { TimeRange } from '../type'

export function Graph({
  data,
  name,
  isLoading,
  setTimeRange,
  Icon,
  bar,
}: {
  data: { date: string; visits: number }[]
  name: string
  Icon: LucideIcon
  isLoading: boolean
  setTimeRange: (range: TimeRange) => void
  bar: boolean
}) {
  const [isMobile, setIsMobile] = useState<boolean>()
  const [, setFilter] = useState(false)
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])
  const ParentDiv = bar ? BarChart : LineChart
  return (
    <ResponsiveContainer
      width="100%"
      height={isMobile ? 250 : 400}
      className=" rounded-lg"
    >
      {data.length ? (
        <ParentDiv
          data={data}
          onClick={(e) => {
            if (!data) return
            const startDate = new Date(
              e.activePayload?.[0].payload.originalDate,
            )
            const stringDate = e.activePayload?.[0].payload.date.split(' ')
            const endDate = new Date(e.activePayload?.[0].payload.originalDate)
            if (stringDate[1] === 'AM' || stringDate[1] === 'PM') {
              endDate.setHours(endDate.getHours() + 1)
            } else if (stringDate[1]) {
              endDate.setDate(startDate.getDate() + 1)
            } else {
              endDate.setMonth(startDate.getMonth() + 1)
            }
            setTimeRange({
              startDate: new Date(startDate),
              endDate: new Date(endDate),
              stringValue: 'custom',
            })
            setFilter(true)
          }}
        >
          <XAxis
            dataKey="date"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            interval="preserveStartEnd"
            fontSize={12}
            tickLine={false}
            width={30}
            axisLine={false}
            tickMargin={0}
            tickFormatter={(value) => `${value}`}
          />
          {bar ? (
            <Bar
              dataKey="visits"
              fill="#B9E3FD"
              color="#000"
              label="Visitors"
              stroke="#B9E3FD"
            />
          ) : (
            <Line
              dataKey="visits"
              fill="#fff"
              label="Visitors"
              stroke="#494141"
            />
          )}

          <Tooltip
            contentStyle={{
              backgroundColor: 'black',
              borderRadius: '10px',
              color: 'black',
            }}
            label="visitors"
            cursor={!bar}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="custom-tooltip rounded-md border bg-background p-2 dark:bg-muted">
                    <div className=" dark:text-emphasis flex items-center gap-2 text-emphasis">
                      <Icon size={16} />
                      <p className=" font-medium">{`${payload[0]?.value} ${name}`}</p>
                    </div>
                    <p className="text-sm text-gray-400">{label}</p>
                  </div>
                )
              }
              return null
            }}
          />
        </ParentDiv>
      ) : (
        <div className=" flex flex-col justify-center gap-2">
          <div className="text-center text-2xl font-bold ">
            {isLoading ? (
              <p className="animate-pulse text-sm font-medium">Loading data</p>
            ) : (
              <div className="mt-12 flex flex-col items-center justify-center text-center animate-in fade-in-50">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
                  {/* @ts-ignore */}
                  <Icons.reports
                    className={cn('h-8 w-8 text-muted-foreground')}
                  />
                </div>
                <EmptyPlaceholder.Title>
                  No Data Just Yet
                </EmptyPlaceholder.Title>
                <EmptyPlaceholder.Description>
                  if you haven&apos;t setup tracker refer to the{' '}
                  <a
                    href="https://heimdall.francismasha.com/docs"
                    target="_blank"
                    className=" text-primary underline"
                    rel="noreferrer"
                  >
                    docs
                  </a>{' '}
                  how to do that.
                </EmptyPlaceholder.Description>
              </div>
            )}
          </div>
        </div>
      )}
    </ResponsiveContainer>
  )
}
