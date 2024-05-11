import * as z from 'zod'

export const expenseCreateOrPatchSchema = z.object({
  category: z.string(),
  paid_via: z.string(),
  date: z.date(),
  name: z.string(),
  price: z.string(),
  notes: z.string(),
  autocomplete: z.array(z.string()).optional(),
})

export type ExpenseData = z.infer<typeof expenseCreateOrPatchSchema>
