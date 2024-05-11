import CardLoader from '@/components/loader/card'

export default function Loading() {
  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-1">
      <div className="flex flex-col space-y-1.5 p-6">
        <CardLoader cards={2} className="mb-6" />
      </div>
    </div>
  )
}
