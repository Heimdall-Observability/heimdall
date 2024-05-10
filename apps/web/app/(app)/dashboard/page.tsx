import { PageHeader } from '@/components/page-header'
import WebsiteView from '@/components/websites/website-view'
import { getWebsite } from '@/server/query/website'

export default async function DashboardPage() {
  const { userWebsites, teamWebsites } = await getWebsite()
  const websites = userWebsites.concat(teamWebsites)

  return (
    <>
      <PageHeader title="Web experience" />
      <WebsiteView websites={websites} />
    </>
  )
}
