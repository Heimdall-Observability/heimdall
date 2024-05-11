import { Icons } from '@/components/icons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface OverviewCardProps {
  heading: string
  data: string
  icon?: keyof typeof Icons
  caption?: string
  tooltip?: string
  className?: string
}

export default function OverviewCard({
  heading,
  icon = 'chart',
  data,
  caption,
  tooltip = '',
  className,
}: OverviewCardProps) {
  const Icon = Icons[icon]

  const IconWithTooltip = () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Icon className="absolute right-3 top-1 h-4 w-4" />
      </TooltipTrigger>
      <TooltipContent className="normal-case" side="bottom">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  )

  return (
    <Card className={cn(className, 'relative p-0')}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
        <CardTitle className="text-sm font-medium">{heading}</CardTitle>
        {icon && tooltip ? (
          <IconWithTooltip />
        ) : Icon ? (
          <Icon className="h-5 w-5" />
        ) : null}
      </CardHeader>
      <CardContent className="px-4">
        <div className="md:text-2xl text-xl font-bold">{data}</div>
        <p className="text-xs">{caption}</p>
      </CardContent>
    </Card>
  )
}
