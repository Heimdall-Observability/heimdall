'use client'

import { useState } from 'react'

import { WebsiteForm } from '@/components/websites/website-create-form'
import { userWebsitesAtom } from '@/jotai/store'
import { Dialog, DialogContent, DialogTrigger } from '@heimdall-logs/ui'
import { Button, ButtonProps } from '@heimdall-logs/ui'
import { useAtom } from 'jotai'

import { toast } from 'sonner'
import { Icons } from '../icons'

export function WebsiteCreateButton({ type, ...props }: ButtonProps) {
  const [websites] = useAtom(userWebsitesAtom)
  // const [, setCreateWebsite] = useAtom(websiteFormAtom);
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  async function onDialogOpenChange(state: boolean) {
    if (websites.length > 9) {
      return toast('Limit of 10 websites reached.', {
        description: 'We currently only support 10 websites per account.',
      })
    }
    setIsDialogOpen(state)
    // setCreateWebsite(true);
  }

  return (
    <Dialog onOpenChange={onDialogOpenChange} open={isDialogOpen}>
      <DialogTrigger>
        <Button {...props} icon={<Icons.add className="h-4 w-4 " />}>
          <span className="hidden md:block">New Website</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <WebsiteForm toggleDialog={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  )
}
