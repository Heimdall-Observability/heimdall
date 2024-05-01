'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import COUNTRIES from '@/lib/constants'
import { fancyId } from '@/lib/utils'
import { HeimdallCustomEvent } from '@heimdall-logs/types'
import { Row } from '@tanstack/react-table'

const renderSubComponent = ({ row }: { row: Row<HeimdallCustomEvent> }) => {
  const data = row.original
  const automaticProperties = {
    Browser: data.browser,
    City: data.city,
    Country: COUNTRIES[data.country ?? ''] ?? data.country,
    Device: data.device,
    Referrer: data.referrerPath,
    'Initial Referrer': data.referrerDomain,
    path: `${data.currentPath}`,
    'Operating System': data.os,
    'Session Duration':
      data.duration && data.duration > 100
        ? `${Math.floor(data.duration / 60)} min ${data.duration % 60} sec`
        : `${data.duration} sec`,
    'Session Id': data.sessionId,
    'Event Type': data.type,
    'User Id': data.visitorId,
    Language: data.language,
    Time: new Date(data.timestamp).toLocaleString(),
  }
  const customProperties = {
    ...data.payload,
  }
  const allProperties = {
    ...automaticProperties,
    ...customProperties,
  }
  return (
    <div className="w-full dark:border-muted-foreground/20 bg-muted/60 rounded-xl">
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Properties</TabsTrigger>
          <TabsTrigger value="auto">Automatic Properties</TabsTrigger>
          <TabsTrigger value="custom">Custom Properties</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid grid-cols-3 place-content-center gap-4 px-2 py-4 ">
            {Object.keys(allProperties).map((key) => {
              return (
                <div
                  className=" flex gap-2 border-b py-2 dark:border-muted-foreground/20"
                  key={fancyId()}
                >
                  <div className="font-bold">{key}:</div>

                  <div>
                    {JSON.stringify(
                      allProperties[key as keyof typeof allProperties],
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </TabsContent>
        <TabsContent value="auto">
          <div className="grid grid-cols-3 place-content-center gap-4 px-2 py-4 ">
            {Object.keys(automaticProperties).map((key) => {
              return (
                <div
                  className=" flex gap-2 border-b py-2 dark:border-muted-foreground/20"
                  key={fancyId()}
                >
                  <div className="font-bold">{key}:</div>
                  <div>
                    {automaticProperties[key as keyof typeof allProperties]}
                  </div>
                </div>
              )
            })}
          </div>
        </TabsContent>
        <TabsContent value="custom">
          <div className="grid grid-cols-3 place-content-center gap-4 px-2 py-4 ">
            {Object.keys(customProperties).map((key) => {
              return (
                <div
                  className=" flex gap-2 border-b py-2 dark:border-muted-foreground/20"
                  key={fancyId()}
                >
                  <div className="font-bold">{key}:</div>
                  <div>{JSON.stringify(customProperties[key])}</div>
                </div>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export { renderSubComponent }
