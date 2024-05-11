'use client'

import Image from 'next/image'

import DataTableColumnHeader from '@/components/table/data-table-column-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { formatCurrency, formatDate } from '@/lib/formatter'
import { cn } from '@/lib/utils'
import { SubscriptionData } from '@/lib/validations/subscriptions'
import { ColumnDef } from '@tanstack/react-table'
import { isThisMonth } from 'date-fns'
import { Pencil, Trash2 } from 'lucide-react'

export const columns: ColumnDef<SubscriptionData>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: (props) => {
      const { row } = props
      const name = row.getValue<string>('name')
      const url = row.original?.url
      return (
        <div className="relative flex items-center font-medium">
          <Image
            className="absolute inline-block text-transparent"
            src={`https://www.google.com/s2/favicons?domain=${url}`}
            width={18}
            height={18}
            alt={name}
          />
          <a
            target="_blank"
            className="text-primary ml-6 hover:underline"
            href={url}
            rel="noreferrer"
          >
            {name}
          </a>
        </div>
      )
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: (props) => {
      const {
        row,
        table: { options },
      } = props
      const user = options.meta?.user
      const price = parseFloat(row.getValue('price'))
      const paid = row.original?.paid
      const formatted = formatCurrency({
        value: price,
        currency: user?.currency,
        locale: user?.locale,
      })
      return (
        <div className="my-1 font-medium tabular-nums">
          {formatted}
          <p className="text-muted-foreground mt-[2px] text-xs">
            {' '}
            per {paid.replace(/ly/, '')}
          </p>
        </div>
      )
    },
  },
  {
    accessorKey: 'renewal_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Renewal Date" />
    ),
    cell: (props) => {
      const {
        row,
        table: { options },
      } = props
      const user = options.meta?.user
      const renewalDate = row.getValue<string>('renewal_date')
      const active = row.getValue<boolean>('active')
      const isItThisMonth = active && isThisMonth(new Date(renewalDate))
      const formatted = renewalDate
        ? formatDate({
            date: renewalDate,
            locale: user?.locale,
          })
        : '-'
      return (
        <div
          title={isItThisMonth ? 'Due this month' : ''}
          className={isItThisMonth ? 'font-medium text-red-500' : ''}
        >
          {formatted}
        </div>
      )
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start/Cancel Date" />
    ),
    cell: (props) => {
      const {
        row,
        table: { options },
      } = props
      const user = options.meta?.user
      const startDate = row.getValue<string>('date')
      const cancelledAt = row.original?.cancelled_at
      const formatted = formatDate({ date: startDate, locale: user?.locale })
      return (
        <div className="my-1">
          {formatted}
          {cancelledAt ? (
            <p className="text-muted-foreground mt-[2px] text-xs">
              Cancel: {formatDate({ date: cancelledAt, locale: user.locale })}
            </p>
          ) : null}
        </div>
      )
    },
  },
  { accessorKey: 'notes', header: 'Notes' },
  {
    accessorKey: 'active',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: (props) => {
      const { row } = props
      const active = row.getValue<boolean>('active')
      return (
        <Badge
          className={cn(
            active
              ? 'bg-success/10 text-success hover:bg-success/20 hover:text-success/90'
              : 'bg-destructive/10 hover:bg-destructive/20 text-red-800 hover:text-red-900',
            'inline-flex items-center rounded-full px-2 py-1 text-xs shadow-sm',
          )}
        >
          {active ? 'Active' : 'Cancelled'}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: (props) => {
      const {
        row,
        table: {
          options: { meta },
        },
      } = props
      const active = row.original?.active
      return (
        <div className="flex items-center">
          <Checkbox
            onCheckedChange={(checked: boolean) => {
              const updated = { ...row.original, active: checked }
              if (checked) {
                updated.cancelled_at = ''
              }
              if (meta?.onChange)
                meta?.onChange({
                  ...row.original,
                  active: checked,
                  cancelled_at: '',
                })
            }}
            checked={active}
            className="mr-4 p-0 hover:bg-transparent hover:opacity-70"
          />
          <Button
            className="mr-4 rounded-lg p-0 hover:bg-transparent hover:opacity-70"
            variant={'ghost'}
          >
            <Pencil
              className="h-4 w-4"
              onClick={() => {
                meta?.onEdit(row.original)
              }}
            />
          </Button>
          <Button
            className="rounded-lg p-0 hover:bg-transparent hover:opacity-70"
            variant={'ghost'}
          >
            <Trash2
              className="h-4 w-4"
              onClick={() => {
                meta?.onDelete(row.original?.id)
              }}
            />
          </Button>
        </div>
      )
    },
  },
]
