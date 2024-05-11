import { apiUrls } from '@/lib/apiUrls'
import { SubscriptionData } from '@/lib/validations/subscriptions'

type SubscriptionCreateOrPatchData = Omit<SubscriptionData, 'autocomplete'>

export const addSubscription = async (data: SubscriptionCreateOrPatchData) => {
  const res = await fetch(apiUrls.subscriptions.add, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw await res.json()
  }
  return await res.json()
}

export const deleteSubscription = async (id: string) => {
  const res = await fetch(apiUrls.subscriptions.modify, {
    method: 'DELETE',
    body: JSON.stringify({ id: [id] }),
  })
  return await res.json()
}

export const editSubscription = async (data: SubscriptionCreateOrPatchData) => {
  const res = await fetch(apiUrls.subscriptions.modify, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
  return await res.json()
}
