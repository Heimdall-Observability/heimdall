import { apiUrls } from '@/lib/apiUrls'

export type OnboardingData = {
  email: string
}

export const addIncome = async (data: OnboardingData) => {
  const res = await fetch(apiUrls.income.add, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw await res.json()
  }
  return await res.json()
}
