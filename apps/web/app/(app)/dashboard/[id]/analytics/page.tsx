import { auth } from '@/auth'
import Analytics from '@/components/dashboard/analytics'
import SectionContainer from '@/components/layout/section-container'
import { PageHeader } from '@/components/page-header'
import { generateToken } from '@/lib/generate-token'
import { db } from '@heimdall-logs/db'

export default async function AnalyticsPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await auth()
  const user = session?.user
  const token = generateToken({
    id: user?.id ?? 'public',
    website: params.id as string,
  })

  const websites = await db.query.website.findMany({
    with: {
      teamWebsites: {
        with: {
          team: {
            with: {
              teamMembers: true,
            },
          },
        },
      },
    },
  })

  const website = websites.find(
    (d) =>
      d.id === params.id ||
      d.teamWebsites.find((tw) => tw.websiteId === params.id),
  )

  return (
    <SectionContainer className="sm:py-12 py-14 md:py-12 lg:py-16">
      <PageHeader
        title="Web analytics"
        description="Track and analyze your website traffic and user behavior."
      />
      {/* @ts-expect-error */}
      <Analytics token={token} website={website} />
    </SectionContainer>
  )
}
