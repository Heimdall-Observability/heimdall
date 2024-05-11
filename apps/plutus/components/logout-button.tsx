import { Button } from '@/components/ui/button'
import { LogOutIcon } from 'lucide-react'

export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <Button className="flex w-full justify-between">
        Logout
        <LogOutIcon />
      </Button>
    </form>
  )
}
