'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { UserAccountNav } from '@/components/user-account-nav'
import { cn } from '@/lib/utils'
import { SidebarNavItem } from '@/types'
import { ExcludeSquare } from '@phosphor-icons/react'
import { User } from 'next-auth'

interface DashboardNavProps {
  items: SidebarNavItem[]
  user: User
}

export function SideNav({ items, user }: DashboardNavProps) {
  const pathname = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <aside className="fixed inset-0 z-[1] hidden h-screen w-24 flex-col justify-between overflow-y-hidden p-2 md:flex">
      <ul className="flex flex-col space-y-2">
        <div className="flex items-center justify-center gap-2 align-middle">
          <Link
            href="/"
            aria-label="heimdall-home"
            className="mb-8 mt-2 block whitespace-nowrap text-xl font-medium transition focus:outline-none"
          >
            <ExcludeSquare size={32} color="#0074a6" weight="duotone" />
          </Link>
        </div>

        {items.map((item) => {
          const Icon = Icons[item.icon || 'arrowRight']
          return (
            <Link
              key={item.id}
              href={item.disabled ? '/' : item.href}
              className={cn(
                'm-4 flex flex-col items-center justify-center text-center font-medium transition-colors',
                pathname === item.href ? 'text-primary' : 'text-primary/60',
              )}
            >
              <Button
                aria-label={item.title}
                variant="ghost"
                size="icon"
                className={cn(
                  pathname === item.href
                    ? 'bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary'
                    : 'text-gray-500',
                  'h-8 w-14 rounded-full p-0 font-medium ring-primary/40 transition-all hover:bg-primary/10 hover:ring-1 disabled:cursor-not-allowed disabled:text-muted-foreground/50 disabled:opacity-80',
                )}
              >
                <Icon className="h-5 w-5" />
              </Button>
              <span className="mt-1 text-xs">{item.title}</span>
            </Link>
          )
        })}
      </ul>
      <ul className="flex flex-col justify-center space-y-2">
        <Link
          href="/dashboard/settings"
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
          <UserAccountNav user={user} />
        </div>
      </ul>
    </aside>
  )
}
