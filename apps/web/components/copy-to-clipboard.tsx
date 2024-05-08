'use client'

import { cn } from '@/lib/utils'
import type { ReactElement } from 'react'
import { toast } from 'sonner'

import { IconClipboard } from '@heimdall-logs/ui'

export const CopyToClipboard = ({
  text,
  children,
  className,
}: {
  text: string
  children?: string | ReactElement
  className?: string
}) => {
  return (
    <div className=" flex items-center">
      {children}
      <IconClipboard
        size={14}
        className={cn('cursor-pointer', className)}
        onClick={() => {
          navigator.clipboard.writeText(text)
          toast('Copied to clipboard')
        }}
      />
    </div>
  )
}
