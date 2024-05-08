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
  const [_show, _setShow] = useState(false)
  // const [, setCreateWebsite] = useAtom(websiteFormAtom);
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  // const [keyboardHeight, setKeyboardHeight] = useState(0);

  // useEffect(() => {
  // 	const handleResize = () => {
  // 		const visualViewportHeight = window?.visualViewport?.height as number;
  // 		const windowHeight = window.innerHeight;
  // 		const keyboardHeight = windowHeight - visualViewportHeight;
  // 		setKeyboardHeight(keyboardHeight);
  // 	};
  //
  // 	if (typeof window !== 'undefined') {
  // 		window.addEventListener('resize', handleResize);
  // 	}
  //
  // 	return () => window.removeEventListener('resize', handleResize);
  // }, []);

  async function onDialogOpenChange(state: boolean) {
    if (websites.length > 9) {
      return toast.error('Limit of 10 websites reached.', {
        description: 'We currently only support 10 websites per account.',
      })
    }
    setIsDialogOpen(state)
    // setCreateWebsite(true);
  }

  return (
    <Dialog onOpenChange={onDialogOpenChange} open={isDialogOpen}>
      <DialogTrigger asChild>
        <Button
          type="primary"
          icon={<Icons.add className="h-4 w-4 " />}
          {...props}
        >
          <span className="hidden md:block">New Website</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <WebsiteForm toggleDialog={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  )
}
