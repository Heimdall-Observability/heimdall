import ThemeSwitch from '@/components/theme-switch'
import { UserAvatar } from '@/components/user-avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Skeleton,
} from '@heimdall-logs/ui'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export function UserAccountNav() {
  const session = useSession()

  if (session.status !== 'authenticated') {
    return <Skeleton className="h-8 w-8 rounded-full" />
  }

  const user = session?.data?.user

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.name || null, image: user.image || null }}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-row items-center justify-between space-y-1">
            <span>Theme</span>
            <ThemeSwitch />
          </div>
        </DropdownMenuLabel>

        <DropdownMenuItem
          asChild
          className="cursor-pointer flex items-center gap-2"
        >
          <Link href="/dashboard" className="w-full cursor-pointer">
            Dashboard
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem asChild className=" cursor-pinter flex items-center gap-2">
          <button
            className="w-full cursor-pointer"
          >
            Setting
          </button>
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
