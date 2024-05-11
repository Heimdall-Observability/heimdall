'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { UserAccountNav } from '@/components/user/user-account-nav'
import { cn } from '@/lib/utils'
import { SidebarNavItem } from '@/types'
import { For } from 'million/react'

interface DashboardNavProps {
  items: SidebarNavItem[]
  user: any
}

export default function AppNav({ items, user }: DashboardNavProps) {
  const pathname = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <div className="bg-background fixed inset-0 z-[1] hidden h-screen w-24 flex-col justify-between overflow-y-hidden p-2 backdrop-blur md:flex">
      <ul className="flex flex-col space-y-8">
        <Link href="/" className="my-4 hidden justify-center md:flex">
          <Icons.logo width={36} />
        </Link>
        <For each={items}>
          {({ id, href, disabled, title, icon }) => {
            const Icon = Icons[icon || 'arrowRight']
            return (
              href && (
                <Link
                  key={id}
                  href={disabled ? '/' : href}
                  className={cn(
                    'hover:text-foreground/80 m-4 flex flex-col items-center justify-center text-center font-medium transition-colors',
                    pathname === href
                      ? 'text-foreground'
                      : 'text-foreground/60',
                    disabled && 'cursor-not-allowed opacity-80',
                  )}
                >
                  <Button
                    aria-label={title}
                    disabled={disabled}
                    variant="ghost"
                    size="icon"
                    className={cn(
                      pathname === href
                        ? 'bg-primary/10 hover:bg-primary/10 hover:text-primary text-primary'
                        : 'text-gray-500',
                      'h-8 w-14 rounded-full p-0 font-medium ring-primary/40 transition-all hover:bg-primary/10 hover:ring-1 disabled:cursor-not-allowed disabled:text-muted-foreground/50 disabled:opacity-80',
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </Button>
                  <span className="mt-1 text-xs">{title}</span>
                </Link>
              )
            )
          }}
        </For>
      </ul>
      <ul className="flex flex-col justify-center space-y-2">
        <Link
          href="/app/settings"
          className={cn(
            'hover:text-foreground/80 m-4 flex flex-col items-center justify-center text-center font-medium transition-colors',
            pathname === 'settings' ? 'text-foreground' : 'text-foreground/60',
          )}
        >
          <Button
            aria-label="settings"
            variant="ghost"
            size="icon"
            className={cn(
              pathname === 'settings'
                ? 'bg-primary/10 hover:bg-primary/10 hover:text-primary text-primary'
                : 'text-gray-500',
              'h-8 w-14 rounded-full p-0 font-medium ring-primary/40 transition-all hover:bg-primary/10 hover:ring-1 disabled:cursor-not-allowed disabled:text-muted-foreground/50 disabled:opacity-80',
            )}
          >
            <Icons.settings className="h-5 w-5" />
          </Button>
        </Link>
        <div className="my-4 hidden justify-center md:flex">
          <UserAccountNav
            user={{
              name: user?.user_metadata?.name || 'noname',
              image:
                user?.user_metadata?.avatar_url || '/static/icons/avatar.svg',
              email: user?.user_metadata?.email,
            }}
          />
        </div>
      </ul>
    </div>
  )
}
