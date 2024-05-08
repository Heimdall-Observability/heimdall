import { Skeleton } from '@heimdall-logs/ui'
import { Card, CardContent, CardFooter, CardHeader } from '@heimdall-logs/ui'

export function CardSkeleton() {
  return (
    <Card>
      <CardHeader className="gap-2">
        <Skeleton className="h-5 w-1/5" />
        <Skeleton className="h-4 w-4/5" />
      </CardHeader>
      <CardContent className="h-6" />
      <CardFooter>
        <Skeleton className="h-4 w-[120px]" />
      </CardFooter>
    </Card>
  )
}
