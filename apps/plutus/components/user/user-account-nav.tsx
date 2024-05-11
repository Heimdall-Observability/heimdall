import { HTMLAttributes } from 'react'

import LogoutButton from '@/components/logout-button'
import ThemeSwitch from '@/components/theme-switch'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserAvatar } from '@/components/user/user-avatar'

interface UserAccountNavProps extends HTMLAttributes<HTMLDivElement> {
  user: any
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          className="h-10 w-10 ring-gray-300 transition-all hover:ring-2 dark:bg-gray-600"
          user={user}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="space-y-1.5 p-2">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-row items-center justify-between space-y-1">
            <span className="text-sm">Theme</span>
            <ThemeSwitch />
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
