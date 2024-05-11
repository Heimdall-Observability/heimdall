'use client'

import { useCallback, useState } from 'react'

import Add from '@/components/add-button'
import { useUser } from '@/components/client-provider/auth-provider'
import { useData } from '@/components/client-provider/data-provider'
import DataTable from '@/components/table/data-table'
import MobileTable from '@/components/table/mobile-table'
import { useToast } from '@/components/ui/use-toast'
import messages from '@/constants/messages'
import { sortByKey } from '@/lib/extractor'
import { lookup } from '@/lib/lookup'
import { SubscriptionData } from '@/lib/validations/subscriptions'

import { deleteSubscription, editSubscription } from './apis'
import { columns } from './columns'

export default function SubscriptionTable() {
  const [selected, setSelected] = useState({})
  const { data, loading, filter, mutate } = useData()
  const user = useUser()

  const { toast } = useToast()

  const onDelete = useCallback(
    async (id: string) => {
      try {
        await deleteSubscription(id)
        toast({ description: messages.deleted })
        mutate()
      } catch {
        toast({ description: messages.error, variant: 'destructive' })
      }
    },
    [mutate, toast],
  )

  const onChange = useCallback(
    async (data: SubscriptionData) => {
      try {
        await editSubscription(data)
        toast({ description: messages.updated })
        mutate()
      } catch {
        toast({ description: messages.error, variant: 'destructive' })
      }
    },
    [mutate, toast],
  )

  const onEdit = useCallback((data: SubscriptionData) => {
    setSelected(data)
  }, [])

  const onHide = useCallback(() => {
    setSelected({})
  }, [])

  const onLookup = useCallback((name: string) => lookup({ data, name }), [data])

  return (
    <>
      <DataTable
        options={{ user, onDelete, onEdit, onChange }}
        filter={filter}
        columns={columns}
        data={sortByKey(sortByKey(data, 'renewal_date'), 'active')}
        loading={loading}
        filename="Subscriptions"
        hideViewOptions
      />
      <MobileTable data={data} title="Subscriptions" />
      <Add
        onHide={onHide}
        onLookup={onLookup}
        selected={selected}
        mutate={mutate}
        type="subscriptions"
      />
    </>
  )
}
