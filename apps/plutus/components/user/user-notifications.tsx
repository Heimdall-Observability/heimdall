'use client'

import { useRouter } from 'next/navigation'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const notifications = [
  {
    title: 'TASK-001 has been completed.',
    description: '4 hour ago',
  },
  {
    title: 'Access denied on servers!',
    description: '1 hour ago',
  },
  {
    title: 'Dragon has been spotted in the corner.',
    description: '2 hours ago',
  },
]

const UserNotifications = () => {
  const { push } = useRouter()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label="User Notifications"
          variant="outline"
          className="h-8 w-8 rounded-full p-0 ring-gray-300 transition-all hover:ring-2 dark:bg-gray-600"
        >
          <Icons.bell className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-4">
        <div className="flex items-center justify-start gap-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">Notifications</p>
            <p className="w-[250px] truncate text-sm text-muted-foreground">
              {`You have ${notifications.length} new notifications`}
            </p>
          </div>
          <Button
            aria-label="User Notifications"
            variant="ghost"
            className="h-6 w-6 rounded-full p-0"
            onClick={() => push('/')}
          >
            <Icons.settings className="h-4 w-4" />
          </Button>
        </div>
        <DropdownMenuSeparator className="my-4" />
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="grid grid-cols-[25px_1fr] items-start rounded-md p-2 last:mb-0 last:pb-0 hover:bg-accent"
          >
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
            <div className="space-y-1">
              <p className="truncate text-sm font-medium leading-none">
                {notification.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {notification.description}
              </p>
            </div>
          </div>
        ))}
        <Button className="mt-2 w-full">
          <Icons.check className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default UserNotifications
