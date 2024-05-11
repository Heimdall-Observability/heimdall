import * as z from 'zod'

export const incomeCreateOrPatchSchema = z.object({
  category: z.string(),
  date: z.date(),
  name: z.string(),
  price: z.string(),
  notes: z.string(),
  autocomplete: z.array(z.string()).optional(),
})

export type IncomeData = z.infer<typeof incomeCreateOrPatchSchema>
