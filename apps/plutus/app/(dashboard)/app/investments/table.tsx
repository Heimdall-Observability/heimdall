'use client'

import { useCallback, useState } from 'react'

import Add from '@/components/add-button'
import { useUser } from '@/components/client-provider/auth-provider'
import { useData } from '@/components/client-provider/data-provider'
import DataTable from '@/components/table/data-table'
import { useToast } from '@/components/ui/use-toast'
import { investmentCategory } from '@/constants/categories'
import messages from '@/constants/messages'
import { lookup } from '@/lib/lookup'

import { InvestmentData, deleteInvestment } from './apis'
import { columns } from './columns'

const categories = Object.keys(investmentCategory)
  .filter(Boolean)
  .map((categoryKey) => ({
    label: investmentCategory[categoryKey],
    value: categoryKey,
  }))

export default function InvestmentTable() {
  const [selected, setSelected] = useState({})
  const { data, loading, filter, mutate } = useData()
  const user = useUser()
  const { toast } = useToast()

  const onDelete = useCallback(
    async (id: string) => {
      try {
        await deleteInvestment(id)
        toast({ description: messages.deleted })
        mutate()
      } catch {
        toast({ description: messages.error, variant: 'destructive' })
      }
    },
    [mutate, toast],
  )

  const onEdit = useCallback(async (data: InvestmentData | any) => {
    setSelected(data)
  }, [])

  const onHide = useCallback(() => {
    setSelected({})
  }, [])

  const onLookup = useCallback(
    (name: string) =>
      lookup({
        data,
        name,
      }),
    [data],
  )

  return (
    <>
      <DataTable
        options={{ user, onDelete, onEdit }}
        filter={filter}
        columns={columns}
        data={data}
        loading={loading}
        filename="Investments"
        categories={categories}
      />
      <Add
        onHide={onHide}
        onLookup={onLookup}
        selected={selected}
        mutate={mutate}
        type="investments"
      />
    </>
  )
}
