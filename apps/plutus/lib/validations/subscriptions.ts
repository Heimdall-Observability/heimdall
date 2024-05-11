import * as z from 'zod'

export const subscriptionCreateOrPatchSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).max(255),
  url: z.string().url(),
  price: z.string(),
  date: z.date(),
  notes: z.string().max(60),
  paid: z.string(),
  autocomplete: z.array(z.string()).optional(),
  notify: z.enum(['day', 'week', 'month', 'year', 'never']).optional(),
  category: z.string().optional(),
  active: z.boolean().optional(),
  renewal_date: z.string().optional(),
  prev_renewal_date: z.string().optional(),
  paid_dates: z.array(z.date()).optional(),
  cancelled_at: z.string().optional(),
})

export const subscriptionFetchSchema = z.object({
  _id: z.string(),
  name: z.string(),
})

export type SubscriptionData = z.infer<typeof subscriptionCreateOrPatchSchema>
