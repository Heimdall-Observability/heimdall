'use client'

import { formatCurrency } from '@/lib/formatter'
import { ColumnDef } from '@tanstack/react-table'

export type recentActivities = {
  no: string
  name: string
  amount: string
  category: string
}

export const columns: ColumnDef<recentActivities>[] = [
  {
    accessorKey: 'no',
    header: 'No',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: (props) => {
      const {
        row,
        table: { options },
      } = props
      const user = options.meta?.user
      const price = parseFloat(row.getValue('amount'))
      const formatted = formatCurrency({
        value: price,
        currency: user?.currency,
        locale: user?.locale,
      })
      return <div className="tabular-nums">{formatted}</div>
    },
  },
]
