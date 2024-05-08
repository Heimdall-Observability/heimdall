import Search from '@/components/search'
import { WebsiteCreateButton } from '@/components/websites/website-create-button'
import WebsitesCard from '@/components/websites/websites-card'
import WebsitesList from '@/components/websites/websites-list'
import { cn } from '@/lib/utils'
import { getWebsite } from '@/server/query/website'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@heimdall-logs/ui'
import { LayoutGrid, List } from 'lucide-react'

export default async function DashboardPage() {
  const { userWebsites, teamWebsites } = await getWebsite()
  const websites = userWebsites.concat(teamWebsites)

  return (
    <div
      className={cn(
        'scrollbar-hide w-full space-y-4 py-4 transition-all duration-700 dark:text-white/80',
      )}
    >
      <Tabs defaultValue="list" className="w-full">
        <div className="flex items-center justify-between gap-2 px-0">
          <Search />
          <div className="flex items-center">
            <TabsList className="grid h-10 grid-cols-2">
              <TabsTrigger value="card">
                <LayoutGrid size={18} />
              </TabsTrigger>
              <TabsTrigger value="list">
                <List size={18} />
              </TabsTrigger>
            </TabsList>
            {websites?.length ? <WebsiteCreateButton /> : null}
          </div>
        </div>
        <TabsContent value="card">
          <WebsitesCard websites={websites} />
        </TabsContent>
        <TabsContent value="list">
          <WebsitesList websites={websites} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
