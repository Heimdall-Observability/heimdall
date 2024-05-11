'use client'

import { Fragment, useMemo } from 'react'

import { incrementUsage } from '@/app/(dashboard)/app/apis'
import { addExpense, editExpense } from '@/app/(dashboard)/app/expenses/apis'
import AutoCompleteList from '@/components/autocomplete-list'
import { useUser } from '@/components/client-provider/auth-provider'
import CircleLoader from '@/components/loader/circle'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import {
  expensesCategory,
  expensesPay,
  groupedExpenses,
} from '@/constants/categories'
import { dateFormat } from '@/constants/date'
import messages from '@/constants/messages'
import { getCurrencySymbol } from '@/lib/formatter'
import { cn } from '@/lib/utils'
import {
  ExpenseData,
  expenseCreateOrPatchSchema,
} from '@/lib/validations/expenses'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import debounce from 'debounce'
import { useForm } from 'react-hook-form'
import { Drawer } from 'vaul'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectViewPort,
} from '../ui/select'

interface AddExpenseProps {
  show: boolean
  selected: any
  onHide: () => void
  mutate: () => void
  lookup: (value: any) => void
}

const todayDate = new Date()

const defaultValues: Partial<ExpenseData> = {
  category: 'food',
  paid_via: 'upi',
  name: '',
  notes: '',
  price: '',
  date: todayDate,
  // id: null,
  autocomplete: [],
}

export default function AddExpense({
  show,
  onHide,
  mutate,
  selected,
  lookup,
}: AddExpenseProps) {
  const user = useUser()
  const { toast } = useToast()

  const form = useForm<ExpenseData>({
    defaultValues,
    resolver: zodResolver(expenseCreateOrPatchSchema),
  })

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { isSubmitting, errors, isDirty, isValid },
  } = form

  // const inputRef = useRef<any>(null);
  //
  // useEffect(() => {
  // 	inputRef.current?.focus();
  // }, []);
  //
  // useEffect(
  // 	() =>
  // 		setState(
  // 			selected.id
  // 				? {
  // 						...selected,
  // 						...{
  // 							paid_via: selected.paid_via
  // 								? selected.paid_via
  // 								: initialState.paid_via,
  // 						},
  // 				  }
  // 				: initialState
  // 		),
  // 	[selected]
  // );

  const name = watch('name')
  const autocomplete = watch('autocomplete')

  const onLookup = useMemo(() => {
    const callbackHandler = (value: string) => {
      // @ts-expect-error
      setValue('autocomplete', lookup(value))
    }
    return debounce(callbackHandler, 500)
  }, [lookup])

  const onSubmit = async (data: ExpenseData) => {
    try {
      const isEditing = selected?.id
      if (isEditing) {
        await editExpense(data)
      } else {
        await addExpense(data)
        await incrementUsage()
      }
      toast({
        description: `${isEditing ? messages.updated : messages.success}`,
      })
      if (mutate) mutate()
      onHide()
      reset()
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
              } Expense`}</Drawer.Title>
            ) : (
              <DialogTitle className="text-xl text-primary">{`${
                selected.id ? 'Edit' : 'Add'
              } Expense`}</DialogTitle>
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
                          placeholder="Mbuzi Choma"
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

            <div className="grid grid-cols-[50%,50%] gap-1 group-disabled:opacity-90">
              <FormField
                control={control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Price
                      <span className="text-muted-foreground ml-1 text-xs">
                        ({getCurrencySymbol(user.currency, user.locale)})
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="299"
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
                    <FormLabel>Spent Date</FormLabel>
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
            </div>

            <div className="grid grid-cols-[50%,50%] gap-1 group-disabled:opacity-90">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="h-96">
                        <SelectViewPort>
                          {Object.keys(groupedExpenses).map((key) => {
                            return (
                              <SelectGroup key={groupedExpenses[key].name}>
                                <SelectLabel>
                                  {groupedExpenses[key].name}
                                </SelectLabel>
                                {Object.keys(groupedExpenses[key].list).map(
                                  (listKey) => {
                                    return (
                                      <SelectItem key={listKey} value={listKey}>
                                        {
                                          groupedExpenses[key].list[listKey]
                                            .name
                                        }
                                      </SelectItem>
                                    )
                                  },
                                )}
                              </SelectGroup>
                            )
                          })}
                          <SelectItem key={'other'} value={'other'}>
                            {expensesCategory.other.name}
                          </SelectItem>
                        </SelectViewPort>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*<FormField*/}
              {/*	control={control}*/}
              {/*	name='category'*/}
              {/*	render={({ field }) => (*/}
              {/*		<FormItem>*/}
              {/*			<FormLabel>Category</FormLabel>*/}
              {/*			<Popover>*/}
              {/*				<PopoverTrigger asChild>*/}
              {/*					<FormControl>*/}
              {/*						<Button*/}
              {/*							variant='outline'*/}
              {/*							role='combobox'*/}
              {/*							className={cn(*/}
              {/*								'w-full justify-between truncate',*/}
              {/*								!field.value && 'text-muted-foreground'*/}
              {/*							)}*/}
              {/*						>*/}
              {/*							{field.value*/}
              {/*								? incomeCategory[*/}
              {/*										Object.keys(groupedExpenses).find(*/}
              {/*											(categoryKey) => categoryKey === field.value*/}
              {/*										) as keyof typeof incomeCategory*/}
              {/*								  ]*/}
              {/*								: 'Select'}*/}
              {/*							<CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />*/}
              {/*						</Button>*/}
              {/*					</FormControl>*/}
              {/*				</PopoverTrigger>*/}
              {/*				<PopoverContent className='w-[200px] p-0'>*/}
              {/*					<Command>*/}
              {/*						<CommandInput placeholder='Search category...' />*/}
              {/*						<CommandEmpty>No category found.</CommandEmpty>*/}
              {/*						{Object.keys(groupedExpenses).map((key) => {*/}
              {/*							return (*/}
              {/*								<CommandGroup*/}
              {/*									heading={groupedExpenses[key].name}*/}
              {/*									key={groupedExpenses[key].name}*/}
              {/*								>*/}
              {/*									{Object.keys(groupedExpenses[key].list).map(*/}
              {/*										(listKey) => {*/}
              {/*											return (*/}
              {/*												<CommandItem*/}
              {/*													key={listKey}*/}
              {/*													value={listKey}*/}
              {/*												>*/}
              {/*													{*/}
              {/*														groupedExpenses[key].list[listKey]*/}
              {/*															.name*/}
              {/*													}*/}
              {/*												</CommandItem>*/}
              {/*											);*/}
              {/*										}*/}
              {/*									)}*/}
              {/*								</CommandGroup>*/}
              {/*							);*/}
              {/*						})}*/}
              {/*						<CommandItem key={'other'} value={'other'}>*/}
              {/*							{expensesCategory.other.name}*/}
              {/*						</CommandItem>*/}
              {/*					</Command>*/}
              {/*				</PopoverContent>*/}
              {/*			</Popover>*/}
              {/*			<FormMessage />*/}
              {/*		</FormItem>*/}
              {/*	)}*/}
              {/*/>*/}

              {/*<div className='mr-3'>*/}
              {/*	<Label htmlFor='category'>Category</Label>*/}
              {/*	<select*/}
              {/*		id='category'*/}
              {/*		className='mt-1.5 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'*/}
              {/*		onChange={(event) => {*/}
              {/*			setState({ ...state, category: event.target.value });*/}
              {/*		}}*/}
              {/*		value={state.category}*/}
              {/*		required*/}
              {/*	>*/}
              {/*		{Object.keys(groupedExpenses).map((key) => {*/}
              {/*			return (*/}
              {/*				<optgroup*/}
              {/*					label={groupedExpenses[key].name}*/}
              {/*					key={groupedExpenses[key].name}*/}
              {/*				>*/}
              {/*					{Object.keys(groupedExpenses[key].list).map(*/}
              {/*						(listKey) => {*/}
              {/*							return (*/}
              {/*								<option key={listKey} value={listKey}>*/}
              {/*									{groupedExpenses[key].list[listKey].name}*/}
              {/*								</option>*/}
              {/*							);*/}
              {/*						}*/}
              {/*					)}*/}
              {/*				</optgroup>*/}
              {/*			);*/}
              {/*		})}*/}
              {/*		<option key={'other'} value={'other'}>*/}
              {/*			{expensesCategory.other.name}*/}
              {/*		</option>*/}
              {/*	</select>*/}
              {/*</div>*/}

              <FormField
                control={form.control}
                name="paid_via"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paid Via</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.keys(expensesPay).map((key) => {
                          return (
                            <SelectItem key={key} value={key}>
                              {expensesPay[key].name}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*<div className='mr-3'>*/}
              {/*	<Label htmlFor='paid'>Paid Via</Label>*/}
              {/*	<select*/}
              {/*		id='paid'*/}
              {/*		className='mt-1.5 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'*/}
              {/*		onChange={(event) => {*/}
              {/*			setState({ ...state, paid_via: event.target.value });*/}
              {/*		}}*/}
              {/*		value={state.paid_via}*/}
              {/*		required*/}
              {/*	>*/}
              {/*		{Object.keys(expensesPay).map((key) => {*/}
              {/*			return (*/}
              {/*				<option key={key} value={key}>*/}
              {/*					{expensesPay[key].name}*/}
              {/*				</option>*/}
              {/*			);*/}
              {/*		})}*/}
              {/*	</select>*/}
              {/*</div>*/}
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
