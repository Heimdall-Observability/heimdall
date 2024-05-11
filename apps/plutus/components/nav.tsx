'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { MainNavItem } from '@/types'

interface DashboardNavProps {
  items: MainNavItem[]
}

export function Nav({ items }: DashboardNavProps) {
  const pathname = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <nav className="hidden gap-6 md:flex">
      {items.map(({ title, href, disabled }) => {
        return (
          <Link
            key={title}
            href={disabled ? '/' : href}
            className={cn(
              'flex items-center font-medium transition-colors hover:text-foreground/80',
              pathname === href ? 'text-foreground' : 'text-foreground/60',
              disabled && 'cursor-not-allowed opacity-80',
            )}
          >
            {title}
          </Link>
        )
      })}
    </nav>
  )
}
