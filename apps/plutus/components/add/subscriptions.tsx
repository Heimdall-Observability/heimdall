'use client'

import Image from 'next/image'

import { Fragment, useMemo, useRef, useState } from 'react'

import { incrementUsage } from '@/app/(dashboard)/app/apis'
import {
  addSubscription,
  editSubscription,
} from '@/app/(dashboard)/app/subscriptions/apis'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { subscriptionCategory } from '@/constants/categories'
import { dateFormat } from '@/constants/date'
import messages from '@/constants/messages'
import { getCurrencySymbol } from '@/lib/formatter'
import { cn, fancyId } from '@/lib/utils'
import {
  SubscriptionData,
  subscriptionCreateOrPatchSchema,
} from '@/lib/validations/subscriptions'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import debounce from 'debounce'
import { useForm } from 'react-hook-form'
import { Drawer } from 'vaul'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const _checkUrl = (urlString: string) => {
  let url
  try {
    url = new URL(urlString)
  } catch (_) {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}

interface AddSubscriptions {
  show: boolean
  selected: any
  onHide: () => void
  mutate: () => void
  lookup: (name: string) => void
}

const todayDate = new Date()

const defaultValues: Partial<SubscriptionData> = {
  date: todayDate,
  name: '',
  notes: '',
  price: '',
  autocomplete: [],
  paid: 'monthly',
}

export default function AddSubscriptions({
  show,
  onHide,
  mutate,
  selected,
  lookup,
}: AddSubscriptions) {
  const user = useUser()
  // const [state, setState] = useState<any>(initialState);
  const [_loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [_hasValidUrl, _setHasValidUrl] = useState(false)
  const _inputRef = useRef<any>(null)

  const form = useForm<SubscriptionData>({
    defaultValues,
    resolver: zodResolver(subscriptionCreateOrPatchSchema),
  })

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { isSubmitting, errors, isDirty, isValid },
  } = form

  // useEffect(() => setState(selected.id ? selected : initialState), [selected]);
  // useEffect(() => setHasValidUrl(checkUrl(state.url)), [state.url]);

  const name = watch('name')
  const autocomplete = watch('autocomplete')
  const url = watch('url')

  const onLookup = useMemo(() => {
    const callbackHandler = (value: string) => {
      // @ts-expect-error
      setValue('autocomplete', lookup(value))
    }
    return debounce(callbackHandler, 500)
  }, [lookup])

  const onSubmit = async (data: SubscriptionData) => {
    try {
      setLoading(true)
      const isEditing = selected?.id
      if (isEditing) {
        await editSubscription(data)
      } else {
        await addSubscription(data)
        await incrementUsage()
      }
      setLoading(false)
      toast({
        description: `${isEditing ? messages.updated : messages.success}`,
      })
      if (mutate) mutate()
      onHide()
    } catch {
      setLoading(false)
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
              } Subscription`}</Drawer.Title>
            ) : (
              <DialogTitle className="text-xl text-primary">{`${
                selected.id ? 'Edit' : 'Add'
              } Subscription`}</DialogTitle>
            )}
            <div className="relative group-disabled:opacity-90">
              <FormField
                control={form.control}
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

            <div className="group-disabled:opacity-90">
              <FormField
                control={control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Website
                      {errors.url && url ? (
                        <Image
                          src={`http://www.google.com/s2/favicons?domain=${url}&sz=125`}
                          width={15}
                          height={15}
                          alt={name}
                          className="ml-2"
                        />
                      ) : null}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="mt-1.5"
                        id="website"
                        type="url"
                        pattern="https://.*|http://.*"
                        maxLength={30}
                        placeholder="https://netflix.com"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/*<div className='grid grid-cols-[100%] gap-1'>*/}
            {/*	<Label className='flex grow-0 items-center' htmlFor='website'>*/}
            {/*		Website*/}
            {/*		{errors.url && url ? (*/}
            {/*			<Image*/}
            {/*				src={`http://www.google.com/s2/favicons?domain=${url}&sz=125`}*/}
            {/*				width={15}*/}
            {/*				height={15}*/}
            {/*				alt={state?.name}*/}
            {/*				className='ml-2'*/}
            {/*			/>*/}
            {/*		) : null}*/}
            {/*	</Label>*/}
            {/*	<Input*/}
            {/*		className='mt-1.5'*/}
            {/*		id='website'*/}
            {/*		type='url'*/}
            {/*		pattern='https://.*|http://.*'*/}
            {/*		maxLength={30}*/}
            {/*		placeholder='https://netflix.com'*/}
            {/*		required*/}
            {/*		onChange={(event) =>*/}
            {/*			setState({*/}
            {/*				...state,*/}
            {/*				url: event.target.value,*/}
            {/*			})*/}
            {/*		}*/}
            {/*		value={state.url}*/}
            {/*	/>*/}
            {/*</div>*/}

            <div className="grid grid-cols-[34%,36%,30%] gap-1">
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
                        placeholder="399"
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
                    <FormLabel>Bought Date</FormLabel>
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
                control={form.control}
                name="paid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paying</FormLabel>
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
                        {Object.keys(subscriptionCategory).map(
                          (categoryKey) => (
                            <SelectItem
                              value={categoryKey}
                              key={fancyId()}
                              onSelect={() => {
                                setValue('paid', categoryKey)
                              }}
                            >
                              {subscriptionCategory[categoryKey]}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
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
