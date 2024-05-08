import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@heimdall-logs/ui'

import { signIn } from '@/auth'
import { Icons } from './icons'

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string
  activeStrategy: {
    github?: boolean
    google?: boolean
  }
}

export function UserAuthForm({ className, activeStrategy, ...props }: Props) {
  return (
    <div className={cn('grid gap-4 ', className)} {...props}>
      <form>
        <Button
          size="lg"
          variant="outline"
          className="w-full"
          formAction={async () => {
            'use server'
            await signIn('github', {
              callbackUrl: '/dashboard',
            })
          }}
        >
          <Icons.gitHub className="mr-2 h-4 w-4" />
          Github
        </Button>
      </form>
    </div>
  )
}
