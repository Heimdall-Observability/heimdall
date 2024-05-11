import RuntimeLogs from '@/components/dashboard/runtime-logs'
import SectionContainer from '@/components/layout/section-container'
import { PageHeader } from '@/components/page-header'

export default function RuntimeLogsPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <SectionContainer className="sm:py-12 py-14 md:py-12 lg:py-16">
      <PageHeader
        title="Runtime logs"
        description="A view of your application's runtime logs."
      />
      <RuntimeLogs id={params.id} />
    </SectionContainer>
  )
}
