'use client'

import Search from '@/components/search'
import { WebsiteCreateButton } from '@/components/websites/website-create-button'
import WebsitesCard from '@/components/websites/websites-card'
import WebsitesList from '@/components/websites/websites-list'
import { Button, IconGrid, IconList } from '@heimdall-logs/ui'
import { Fragment, useState } from 'react'

interface Props {
  websites: any
}

export default function WebsiteView({ websites }: Props) {
  const [viewStyle, setViewStyle] = useState<'card' | 'list'>('card')
  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <Search />
        <div className="flex items-center space-x-4">
          <Button
            type="default"
            icon={viewStyle === 'card' ? <IconGrid /> : <IconList />}
            onClick={() => setViewStyle(viewStyle === 'card' ? 'list' : 'card')}
          />
          {websites?.length ? <WebsiteCreateButton /> : null}
        </div>
      </div>

      {viewStyle === 'card' ? (
        <WebsitesCard websites={websites} />
      ) : (
        <WebsitesList websites={websites} />
      )}
    </Fragment>
  )
}
