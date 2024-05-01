'use client'

import { useEffect, useState } from 'react'

import { fancyId } from '@/lib/utils'
import { Website as WebsiteType } from '@heimdall-logs/types/models'

import { EmptyPlaceholder } from '../empty-placeholder'
import { MonitorCardDetails } from './monitor-card-details'
import { WebsiteCreateButton } from './website-create-button'
import { DeleteWebsiteAlert } from './website-delete-alert'
import { EditWebsiteForm } from './website-edit-form'

export default function WebsitesCard({
  websites,
}: {
  websites: (WebsiteType & { visitors: number })[]
}) {
  const [selected, setSelected] = useState<string>('')
  const [selectedWebsite, setWebsite] = useState<WebsiteType | undefined>(
    undefined,
  )
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setWebsite(websites.find((website) => website.id === selected))
  }, [selected, websites])

  return (
    <>
      {websites.length ? (
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-1 xl:grid-cols-3">
          {websites.map((website) => (
            <MonitorCardDetails
              key={fancyId()}
              site={website}
              visitors={website.visitors}
              setSelected={setSelected}
              setIsOpen={setIsOpen}
            />
          ))}
        </div>
      ) : (
        <EmptyPlaceholder className="my-4">
          <EmptyPlaceholder.Icon name="monitor" />
          <EmptyPlaceholder.Title>No Website Added</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You haven&apos;t added any website yet. Start adding website
          </EmptyPlaceholder.Description>
          <WebsiteCreateButton />
        </EmptyPlaceholder>
      )}
      <EditWebsiteForm
        data={selectedWebsite}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
      <DeleteWebsiteAlert id={selected} />
    </>
  )
}
