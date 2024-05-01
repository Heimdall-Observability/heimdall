import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from '@heimdall-logs/types/models'
import { AvatarProps } from '@radix-ui/react-avatar'

import { Icons } from './icons'

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'image' | 'name'>
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <Icons.user className="h-8 w-8" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}
