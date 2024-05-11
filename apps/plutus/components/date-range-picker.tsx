'use client'

import { useDate } from '@/components/client-provider/datepicker-provider'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { CalendarIcon } from '@radix-ui/react-icons'
import { addDays, format, startOfMonth, startOfYear, subDays } from 'date-fns'
import { DateRange } from 'react-day-picker'

export default function DatePicker() {
  const { date, onChange } = useDate()

  return (
    <div className="flex">
      <DatePickerWithRange date={date} onChange={onChange} />
      <DatePickerSelect onChange={onChange} selectedValue={date?.selected} />
    </div>
  )
}

function DatePickerWithRange({
  className,
  date,
  onChange,
}: {
  className?: string
  date: DateRange
  onChange: any
}) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-full justify-start rounded-r-none border border-r-0 !border-border p-2 text-left font-normal shadow-none hover:bg-accent focus:bg-accent focus-visible:!ring-1 focus-visible:!ring-gray-400 dark:bg-muted dark:hover:opacity-[0.8] sm:min-w-[235px]',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className={`mr-2 hidden h-4 w-4 sm:inline-block`} />
            {date?.from ? (
              date.to ? (
                <span className="truncate">
                  {format(date.from, 'LLL dd y')} -{' '}
                  {format(date.to, 'LLL dd y')}
                </span>
              ) : (
                <span>{format(date.from, 'LLL dd, y')}</span>
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

function DatePickerSelect({
  onChange,
  selectedValue,
}: {
  onChange: any
  selectedValue: string
}) {
  return (
    <Select
      value={selectedValue}
      onValueChange={(selected) => {
        switch (selected) {
          case 'tdy': {
            onChange({
              selected,
              from: addDays(new Date(), 0),
              to: addDays(new Date(), 0),
            })
            break
          }
          case '7days': {
            onChange({
              selected,
              to: addDays(new Date(), 0),
              from: subDays(new Date(), 7),
            })
            break
          }
          case '30days': {
            onChange({
              selected,
              from: subDays(new Date(), 30),
              to: addDays(new Date(), 0),
            })
            break
          }
          case 'm': {
            onChange({
              selected,
              from: startOfMonth(new Date()),
              to: addDays(new Date(), 0),
            })
            break
          }
          case 'y': {
            onChange({
              selected,
              from: startOfYear(new Date()),
              to: addDays(new Date(), 0),
            })
            break
          }
        }
      }}
    >
      <SelectTrigger className="w-full min-w-[120px] rounded-l-none !border-border bg-background p-2 shadow-none hover:bg-accent focus:ring-0 focus-visible:!ring-1 focus-visible:!ring-gray-400 dark:bg-muted dark:hover:opacity-[0.8]">
        <SelectValue className="truncate" placeholder="Select" />
      </SelectTrigger>
      <SelectContent className="!border-border" position="popper">
        <SelectItem value="none">Select</SelectItem>
        <SelectItem value="tdy">Today</SelectItem>
        <SelectItem value="7days">Last 7 days</SelectItem>
        <SelectItem value="30days">Last 30 days</SelectItem>
        <SelectItem value="m">Month to Date</SelectItem>
        <SelectItem value="y">Year to Date</SelectItem>
      </SelectContent>
    </Select>
  )
}
