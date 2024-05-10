import { auth } from '@/auth'
import { SpeedInsight } from '@/components/dashboard/speed-insight'
import SectionContainer from '@/components/layout/section-container'
import { PageHeader } from '@/components/page-header'
import { generateToken } from '@/lib/generate-token'

export default async function WebVitalsPage({
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

  return (
    <SectionContainer className="sm:py-12 py-14 md:py-12 lg:py-16">
      <PageHeader
        title="Runtime logs"
        description="A view of your application's runtime logs."
      />
      <SpeedInsight
        token={token}
        website={{
          id: params.id,
          url: 'http://localhost:3000',
          title: 'MXL Console',
        }}
      />
    </SectionContainer>
  )
}
