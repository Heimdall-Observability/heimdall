'use client'

import { ReactElement } from 'react'

import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

import { Icons } from './icons'

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
      <Icons.clipboard
        className={cn('ml-2 h-5 w-5 cursor-pointer', className)}
        onClick={() => {
          navigator.clipboard.writeText(text)
          toast({
            title: 'Copied to clipboard',
          })
        }}
      />
    </div>
  )
}
