import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

interface DashboardShellProps extends HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className={cn('mt-8 grid items-start gap-8', className)} {...props}>
      {children}
    </div>
  )
}
