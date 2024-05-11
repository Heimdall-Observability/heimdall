'use client'

import ExpenseChart from '@/components/chart/bar'
import TopSpentExpenses from '@/components/chart/bar-list'
import DonutChart from '@/components/chart/donut'
import { useUser } from '@/components/client-provider/auth-provider'
import RecentActivitiesTable from '@/components/recent-activities/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function OverviewCharts() {
  const user = useUser()

  return (
    <div className="mb-8 grid grid-cols-1 gap-2 lg:grid-cols-2">
      <div className="mr-4 flex min-h-full w-full flex-col">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Expenses</CardTitle>
            <CardDescription>
              Amount spent for the selected date range.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ExpenseChart />
          </CardContent>
        </Card>
      </div>

      <div className="mb-8 flex min-h-full w-full flex-col md:my-0">
        <Card className="h-full w-full">
          <CardHeader>
            <CardTitle>Subscriptions</CardTitle>
            <CardDescription>
              Estimated total amount spent for selected date range.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DonutChart />
          </CardContent>
        </Card>
      </div>

      {!user.isPremium ? (
        <>
          <div className="mb-8 flex min-h-full w-full flex-col md:my-0">
            <Card className="h-full w-full">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentActivitiesTable />
              </CardContent>
            </Card>
          </div>

          <div className="mb-8 flex min-h-full w-full flex-col md:my-0">
            <Card className="h-full w-full">
              <CardHeader>
                <CardTitle>Top Spent Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <TopSpentExpenses />
              </CardContent>
            </Card>
          </div>
        </>
      ) : null}
    </div>
  )
}
