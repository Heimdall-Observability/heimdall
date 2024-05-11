import { apiUrls } from '@/lib/apiUrls'
import { IncomeData } from '@/lib/validations/income'

type IncomeCreateOrPatchData = Omit<IncomeData, 'autocomplete'>

export const addIncome = async (data: IncomeCreateOrPatchData) => {
  const res = await fetch(apiUrls.income.add, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw await res.json()
  }
  return await res.json()
}

export const deleteIncome = async (id: string) => {
  const res = await fetch(apiUrls.income.modify, {
    method: 'DELETE',
    body: JSON.stringify({ id: [id] }),
  })
  return await res.json()
}

export const editIncome = async (data: IncomeCreateOrPatchData) => {
  const res = await fetch(apiUrls.income.modify, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
  return await res.json()
}
