'use client'

import { useUser } from '@/components/client-provider/auth-provider'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { formatCurrency } from '@/lib/formatter'
import { fancyId } from '@/lib/utils'
import { SubscriptionData } from '@/lib/validations/subscriptions'
import { Pencil, Trash2 } from 'lucide-react'

interface Props {
  data: SubscriptionData[]
  title: string
}

function AccordionItemContent({
  heading,
  content,
}: {
  heading: string
  content: string
}) {
  return (
    <div className="flex flex-row items-center justify-between w-full">
      <div className="flex flex-row items-center">
        <div className="text-sm font-medium text-primary">{heading}</div>
      </div>
      <div className="text-xs mr-2 text-muted-foreground">{content}</div>
    </div>
  )
}

export default function MobileTable({ data, title }: Props) {
  const user = useUser()
  return (
    <Card className="block h-full w-full border-none md:hidden">
      <CardHeader className="px-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Estimated total amount spent for selected date range.
        </CardDescription>
      </CardHeader>
      <Accordion type="single" collapsible>
        {data.map((item, _idx) => (
          <AccordionItem value={item.id as string} key={fancyId()}>
            <AccordionTrigger>
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-row items-center">
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="text-xs ml-2 text-muted-foreground tabular-nums flex items-center">
                    {formatCurrency({
                      value: +item.price,
                      currency: user?.currency,
                      locale: user?.locale,
                    })}
                    <p className="text-xs text-muted-foreground ml-1">
                      {' '}
                      per {item.paid.replace(/ly/, '')}
                    </p>
                  </div>
                </div>
                <div className="text-xs mr-2 text-muted-foreground">
                  {item.renewal_date}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="bg-muted/30 p-2">
              <AccordionItemContent heading="URL" content={item.url} />
              <AccordionItemContent
                heading="Renewal date"
                content={item.renewal_date as string}
              />
              <AccordionItemContent
                heading="Prev. Renewal date"
                content={item.prev_renewal_date as string}
              />
              <div className="flex items-center justify-end">
                <Checkbox
                  // onCheckedChange={(checked: boolean) => {
                  // 	let updated = { ...row.original, active: checked };
                  // 	if (checked) {
                  // 		updated.cancelled_at = '';
                  // 	}
                  // 	if (meta?.onChange)
                  // 		meta?.onChange({
                  // 			...row.original,
                  // 			active: checked,
                  // 			cancelled_at: '',
                  // 		});
                  // }}
                  checked={item.active}
                  className="mr-4 p-0 hover:bg-transparent hover:opacity-70"
                />
                <Button
                  className="mr-4 rounded-lg p-0 hover:bg-transparent hover:opacity-70"
                  variant={'ghost'}
                >
                  <Pencil
                    className="h-4 w-4"
                    // onClick={() => {
                    // 	meta?.onEdit(row.original);
                    // }}
                  />
                </Button>
                <Button
                  className="rounded-lg p-0 hover:bg-transparent hover:opacity-70"
                  variant={'ghost'}
                >
                  <Trash2
                    className="h-4 w-4"
                    // onClick={() => {
                    // 	meta?.onDelete(row.original?.id);
                    // }}
                  />
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  )
}
