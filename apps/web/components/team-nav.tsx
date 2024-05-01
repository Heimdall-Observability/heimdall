'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { absoluteUrl, cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface DashboardNavProps {
  teams: any
}

export function TeamNav({ teams }: DashboardNavProps) {
  const pathname = usePathname()

  if (!teams?.length) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[1] hidden h-screen w-24 flex-col justify-between overflow-y-hidden p-2 backdrop-blur md:flex">
      <ul className="mt-14 flex flex-col space-y-4">
        {teams.map((item) => {
          const { id, image, name, slug } = item
          const userInitials = name ?? 'SA'
          const url = absoluteUrl(`/team/${slug}`)

          return (
            <Link
              key={id}
              href={url}
              className={cn(
                'm-2 flex flex-col items-center justify-center text-center font-medium transition-colors hover:text-foreground/80',
                pathname === slug ? 'text-foreground' : 'text-foreground/60',
              )}
            >
              <Avatar className="h-8 w-8">
                {image ? (
                  <AvatarImage src={image} alt={name} />
                ) : (
                  <AvatarFallback>
                    <span className="lowerrcase text-sm text-primary-foreground ">
                      {userInitials.length > 2
                        ? userInitials.split('').slice(0, 2)
                        : userInitials}
                    </span>
                  </AvatarFallback>
                )}
              </Avatar>
            </Link>
          )
        })}

        <Button variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </ul>
    </div>
  )
}
