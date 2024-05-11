import { ReactNode } from 'react'

import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: ReactNode
  className?: string
}

export function DashboardHeader({
  heading,
  text,
  children,
  className,
}: DashboardHeaderProps) {
  return (
    <div
      className={cn(
        className,
        'flex flex-col-reverse items-start justify-between gap-2 md:flex-row',
      )}
    >
      <div className="grid gap-1">
        <div className="flex items-center space-x-2">
          <div className="block md:hidden">
            <Icons.logo height={36} width={36} />
          </div>
          <h1 className="bg-clip-text font-semibold leading-none md:text-xl">
            {heading}
          </h1>
        </div>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  )
}
