import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('bg-muted/80 animate-pulse rounded-md', className)}
      {...props}
    />
  )
}

export { Skeleton }
