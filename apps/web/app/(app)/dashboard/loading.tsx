import WebSiteItem from '@/components/websites/website-item'

export default function LoadingDashboard() {
  return (
    <section className="pt-16">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 ">
        <WebSiteItem.Skeleton />
        <WebSiteItem.Skeleton />
        <WebSiteItem.Skeleton />
      </div>
    </section>
  )
}
