import { Website as WebsiteType } from '@heimdall-logs/types/models'
import { Skeleton } from '@heimdall-logs/ui'
import { MoreVertical, User2 } from 'lucide-react'

interface WebsiteProps {
  site: WebsiteType
  visitors: number
  setSelected: (id: string) => void
  setIsOpen: (state: boolean) => void
}

export default function WebSiteItem({
  visitors,
  site,
  setIsOpen,
  setSelected,
}: WebsiteProps) {
  return (
    <div className="cursor-pointer grid grid-cols-12 bg-card border rounded-xl items-center justify-between px-2 md:px-6 py-3 hover:bg-accent/50">
      <div className="flex items-center gap-1 text-lime-500 col-span-2 md:col-span-1">
        <User2 size={20} />
        <p className="text-sm">{visitors}</p>
      </div>
      <div className="col-span-9 md:col-span-10">
        <div className="grid gap-1">
          {site.title}
          <p className="text-xs text-muted-foreground">{site.url}</p>
        </div>
      </div>
      <MoreVertical
        className="cursor-pointer col-span-1"
        size={18}
        onClick={() => {
          setIsOpen(true)
          setSelected(site.id)
        }}
      />
    </div>
  )
}

WebSiteItem.Skeleton = function EndpointItemSkeleton() {
  return (
    <div className="mb-2 p-4">
      <div className="gap-1 space-y-2">
        <Skeleton className=" h-4 w-1/5" />
        <Skeleton className="h-3 w-3/5" />
        {/*<Skeleton className='h-3 w-3/5' />*/}
      </div>
    </div>
  )
}
