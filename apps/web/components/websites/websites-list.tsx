'use client'

import { useEffect, useState } from 'react'

import WebSiteItem from '@/components/websites/website-item'
import { fancyId } from '@/lib/utils'
import { Website as WebsiteType } from '@heimdall-logs/types/models'

import { EmptyPlaceholder } from '../empty-placeholder'
import { WebsiteCreateButton } from './website-create-button'
import { DeleteWebsiteAlert } from './website-delete-alert'

export default function WebsitesList({
  websites,
}: {
  websites: (WebsiteType & { visitors: number })[]
}) {
  const [selected, setSelected] = useState<string>('')
  const [_selectedWebsite, setWebsite] = useState<WebsiteType | undefined>(
    undefined,
  )
  const [_isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setWebsite(websites.find((website) => website.id === selected))
  }, [selected, websites])

  return (
    <div className="space-y-2">
      {websites.length ? (
        websites.map((website) => (
          <WebSiteItem
            key={fancyId()}
            site={website}
            visitors={website.visitors}
            setSelected={setSelected}
            setIsOpen={setIsOpen}
          />
        ))
      ) : (
        <EmptyPlaceholder className=" my-4">
          <EmptyPlaceholder.Icon name="layout" />
          <EmptyPlaceholder.Title>No Website Added</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You haven&apos;t added any website yet. Start adding website
          </EmptyPlaceholder.Description>
          <WebsiteCreateButton />
        </EmptyPlaceholder>
      )}
      <DeleteWebsiteAlert id={selected} />
    </div>
  )
}
