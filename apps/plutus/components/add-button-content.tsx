import { Fragment } from 'react'

import AddExpense from '@/components/add/expenses'
import AddIncome from '@/components/add/income'
import AddInvestments from '@/components/add/investments'
import AddSubscriptions from '@/components/add/subscriptions'

type TypeProps = 'expenses' | 'income' | 'investments' | 'subscriptions'

type AddButtonProps = {
  mutate?: any
  type?: TypeProps
  selected?: any
  onHide?: () => void
  setShow: (state: boolean) => void
  show: boolean
  onLookup?: (name: string) => void
}

export default function AddButtonContent({
  mutate,
  type,
  selected,
  onHide,
  onLookup,
  setShow,
  show,
}: AddButtonProps) {
  return (
    <Fragment>
      {type === 'expenses' ? (
        <AddExpense
          lookup={(value: string) => {
            if (onLookup) return onLookup(value)
          }}
          show={show}
          selected={selected}
          mutate={mutate}
          onHide={() => {
            if (onHide) onHide()
            setShow(false)
          }}
        />
      ) : null}
      {type === 'income' ? (
        <AddIncome
          lookup={(value: string) => {
            if (onLookup) return onLookup(value)
          }}
          show={show}
          selected={selected}
          mutate={mutate}
          onHide={() => {
            if (onHide) onHide()
            setShow(false)
          }}
        />
      ) : null}
      {type === 'investments' ? (
        <AddInvestments
          lookup={(value: string) => {
            if (onLookup) return onLookup(value)
          }}
          show={show}
          selected={selected}
          mutate={mutate}
          onHide={() => {
            if (onHide) onHide()
            setShow(false)
          }}
        />
      ) : null}
      {type === 'subscriptions' ? (
        <AddSubscriptions
          lookup={(value: string) => {
            if (onLookup) return onLookup(value)
          }}
          show={show}
          selected={selected}
          mutate={mutate}
          onHide={() => {
            if (onHide) onHide()
            setShow(false)
          }}
        />
      ) : null}
    </Fragment>
  )
}
