import Image from 'next/image'
import Link from 'next/link'

import { useState } from 'react'

import { Website as WebsiteType } from '@heimdall-logs/types/models'
import { Skeleton } from '@heimdall-logs/ui'
import { Card, CardContent, CardHeader } from '@heimdall-logs/ui'
import { User2 } from 'lucide-react'

import logo from '../../public/android-chrome-512x512.png'

interface WebsiteProps {
  site: WebsiteType
  visitors: number
  setSelected: (id: string) => void
  setIsOpen: (state: boolean) => void
}

export function MonitorCardDetails({
  site,
  visitors,
  setSelected,
  setIsOpen,
}: WebsiteProps) {
  const [_isLoading, _setIsLoading] = useState(false)
  return (
    <Link href={`/s/${site.id}`}>
      <Card className="rounded-xl shadow-none @container/card hover:shadow-md">
        <CardHeader className="p-4 md:p-6 md:pb-3">
          <div className="flex items-center gap-2">
            <Image
              src={logo}
              alt="..."
              height={32}
              width={32}
              className="border rounded-full shrink"
            />
            <div className="">
              <h3 className="text-base">{site.title}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {site.url}
              </p>
            </div>
          </div>
          {/*<div className='flex items-center justify-between'>*/}
          {/*	<h3 className='text-base md:text-lg'>{site.title}</h3>*/}
          {/*	<MoreVertical*/}
          {/*		className='cursor-pointer'*/}
          {/*		size={18}*/}
          {/*		onClick={() => {*/}
          {/*			setIsOpen(true);*/}
          {/*			setSelected(site.id);*/}
          {/*		}}*/}
          {/*	/>*/}
          {/*</div>*/}
          {/*<p className='text-xs md:text-sm text-muted-foreground truncate'>*/}
          {/*	{site.url}*/}
          {/*</p>*/}
        </CardHeader>
        <CardContent className="flex justify-between gap-2 p-4 pt-0 md:p-6 md:pt-3">
          <div className="flex items-center gap-2 text-lime-500">
            <User2 size={20} />
            <p className="text-sm slashed-zero">
              {visitors}{' '}
              <span className="hidden md:inline-block">Visitors</span>
            </p>
          </div>
          {/*<NextLink*/}
          {/*	className='text-muted-foreground'*/}
          {/*	to={`/s/${site.id}`}*/}
          {/*></NextLink>*/}
        </CardContent>
      </Card>
    </Link>
  )
}

MonitorCardDetails.Skeleton = function WebsiteSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
