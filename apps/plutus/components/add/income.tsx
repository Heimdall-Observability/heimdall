'use client'

import { Fragment, useMemo } from 'react'

import { incrementUsage } from '@/app/(dashboard)/app/apis'
import { addIncome, editIncome } from '@/app/(dashboard)/app/income/apis'
import AutoCompleteList from '@/components/autocomplete-list'
import { useUser } from '@/components/client-provider/auth-provider'
import CircleLoader from '@/components/loader/circle'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { DialogTitle } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { incomeCategory } from '@/constants/categories'
import { dateFormat } from '@/constants/date'
import messages from '@/constants/messages'
import { getCurrencySymbol } from '@/lib/formatter'
import { cn } from '@/lib/utils'
import { IncomeData, incomeCreateOrPatchSchema } from '@/lib/validations/income'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import debounce from 'debounce'
import { useForm } from 'react-hook-form'
import { Drawer } from 'vaul'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface AddIncomeProps {
  show: boolean
  selected: any
  onHide: () => void
  mutate: () => void
  lookup: (value: any) => void
}

const todayDate = new Date()

const defaultValues: Partial<IncomeData> = {
  category: '',
  date: todayDate,
  name: '',
  notes: '',
  price: '',
  autocomplete: [],
}

export default function AddIncome({
  onHide,
  mutate,
  selected,
  lookup,
}: AddIncomeProps) {
  const user = useUser()
  const { toast } = useToast()

  const form = useForm<IncomeData>({
    defaultValues,
    resolver: zodResolver(incomeCreateOrPatchSchema),
  })

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { isSubmitting, errors, isDirty, isValid },
  } = form

  const name = watch('name')
  const autocomplete = watch('autocomplete')

  const onLookup = useMemo(() => {
    const callbackHandler = (value: string) => {
      // @ts-expect-error
      setValue('autocomplete', lookup(value))
    }
    return debounce(callbackHandler, 500)
  }, [lookup])

  const onSubmit = async (data: IncomeData) => {
    try {
      const isEditing = selected?.id
      if (isEditing) {
        await editIncome(data)
      } else {
        await addIncome(data)
        await incrementUsage()
      }
      toast({
        description: `${isEditing ? messages.updated : messages.success}`,
      })
      if (mutate) mutate()
      onHide()
    } catch {
      toast({ description: messages.error, variant: 'destructive' })
    }
  }

  return (
    <Form {...form}>
      <div className="sm:flex sm:items-start">
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <fieldset
            disabled={isSubmitting}
            className="group md:[420px] grid w-full grid-cols-1 items-center gap-3"
          >
            {window.innerWidth <= 768 ? (
              <Drawer.Title className="text-xl text-primary font-semibold mb-4">{`${
                selected.id ? 'Edit' : 'Add'
              } Income`}</Drawer.Title>
            ) : (
              <DialogTitle className="text-xl text-primary">{`${
                selected.id ? 'Edit' : 'Add'
              } Income`}</DialogTitle>
            )}
            <div className="relative group-disabled:opacity-90">
              <FormField
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Fragment>
                        <Input
                          id="name"
                          className="mt-1.5"
                          placeholder="Salary"
                          maxLength={30}
                          required
                          autoFocus
                          autoComplete="off"
                          onBlur={onBlur}
                          onChange={(e) => {
                            const { value } = e.target
                            if (value.length) {
                              onChange(e)
                              if (value.length > 2) onLookup(value)
                            } else {
                              reset({
                                autocomplete: [],
                                name: '',
                                category: '',
                              })
                            }
                          }}
                          value={value}
                        />
                        <AutoCompleteList
                          onHide={() => {
                            reset({ autocomplete: [] })
                          }}
                          data={autocomplete as unknown as string[]}
                          searchTerm={name.length > 2 ? name.toLowerCase() : ''}
                          onClick={({ name, category }) => {
                            setValue('name', name)
                            reset({ autocomplete: [] })
                          }}
                          show={Boolean(autocomplete?.length)}
                        />
                      </Fragment>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-[32%,38%,30%] gap-1 group-disabled:opacity-90">
              <FormField
                control={control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Amount
                      <span className="text-muted-foreground ml-1 text-xs">
                        ({getCurrencySymbol(user.currency, user.locale)})
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="10000"
                        required
                        min="0"
                        step="any"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Received Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, dateFormat)
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              'w-full justify-between truncate',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value
                              ? incomeCategory[
                                  Object.keys(incomeCategory).find(
                                    (categoryKey) =>
                                      categoryKey === field.value,
                                  ) as keyof typeof incomeCategory
                                ]
                              : 'Select'}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search category..." />
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandGroup>
                            {Object.keys(incomeCategory).map((categoryKey) => (
                              <CommandItem
                                value={categoryKey}
                                key={categoryKey}
                                onSelect={() => {
                                  setValue('category', categoryKey)
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    categoryKey === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {incomeCategory[categoryKey]}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="group-disabled:opacity-90">
              <FormField
                control={control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Notes{' '}
                      <span className="text-center text-sm text-muted-foreground">
                        (optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="mt-2 h-20"
                        maxLength={60}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              disabled={isSubmitting || !isDirty || !isValid}
              size="lg"
              type="submit"
            >
              {isSubmitting ? <CircleLoader className="mr-2" /> : null}
              {selected?.id ? 'Update' : 'Submit'}
            </Button>
          </fieldset>
        </form>
      </div>
    </Form>
  )
}
